package com.ssafy.benepick.global.util;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.benepick.domain.user.entity.UserCard;
import com.ssafy.benepick.domain.user.entity.UserCardBenefit;
import com.ssafy.benepick.domain.user.entity.UserCardCompany;
import com.ssafy.benepick.domain.user.entity.UserPayment;
import com.ssafy.benepick.domain.user.repository.UserCardRepository;
import com.ssafy.benepick.domain.user.repository.UserPaymentRepository;
import com.ssafy.benepick.domain.user.repository.UserRepository;
import com.ssafy.benepick.global.api.service.ApiService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class SchedulerService {

	private UserRepository userRepository;
	private UserCardRepository userCardRepository;
	private UserPaymentRepository userPaymentRepository;
	private ApiService apiService;

	@Transactional
	@Scheduled(cron = "0 0 0 * * ?")
	public void updateUserTransactionEveryDay() {
		log.info("SchedulerService || 매일 자정 사용자들의 거래내역 갱신");
		userRepository.findAll()
			.stream()
			.forEach(user -> {
				List<UserCardCompany> userCardCompanyList = user.getUserCardCompanyList();

				userCardCompanyList
					.stream()
					.forEach(userCardCompany -> {
						apiService.getTransactionDataAfterLastRenewalTime(
								userCardCompany.getUserCardCompanyId(),
								user.getUserId(),
								user.getUserLastRenewalTime()).
							stream()
							.forEach(apiMyDataCardResponseDto -> {
								UserCard userCard = userCardRepository.findByUserCardCode(
									apiMyDataCardResponseDto.getApiCardResponseDto().getCardCode());

								int monthPerformance = 0;

								List<UserPayment> userPaymentList = apiMyDataCardResponseDto.getApiMyDataPaymentResponseDtoList()
									.stream()
									.map(apiMyDataPaymentResponseDto -> apiMyDataPaymentResponseDto.toUserPayment(userCard))
									.collect(Collectors.toList());

								monthPerformance = userPaymentList.stream()
									.filter(userPayment -> userPayment.getUserPaymentReceivedBenefitAmount() == 0)
									.mapToInt(UserPayment::getUserPaymentAmount)
									.sum();

								userPaymentList.stream()
									.filter(userPayment -> userPayment.getUserPaymentReceivedBenefitAmount() > 0)
									.forEach(userPayment -> {
										userCard.getUserCardCategory1List().stream().forEach(userCardCategory1 -> {
											if(userPayment.getUserPaymentCategory1().equals(userCardCategory1.getUserCardCategory1Name())){
												for (UserCardBenefit userCardBenefit : userCardCategory1.getUserCardBenefitList()) {
													userCardBenefit.updateReceivedAmount(userCardBenefit.getUserCardBenefitReceivedAmount() + userPayment.getUserPaymentReceivedBenefitAmount());
												}
											}
										});
									});

								// 카드 현월 실적 누적
								userCard.updateCardCurrentPerformance(userCard.getUserCardCurrentPerformance() + monthPerformance);
								userPaymentRepository.saveAll(userPaymentList);
							});
					});
				user.updateLastRenewalTime();
			});
	}

	@Transactional
	@Scheduled(cron = "0 0 0 1 * ?")
	public void updateUserCardBenefitAndPerformance() {
		log.info("SchedulerService || 매달 1일 사용자들의 카드 사용혜택,실적 갱신");
		userRepository.findAll()
			.stream()
			.forEach(user -> {
				user.getUserCardList()
					.stream()
					.forEach(userCard -> {
						// 실적 갱신
						userCard.updatePerformanceEveryMonth();

						// 혜택 갱신
						userCard.getUserCardCategory1List()
							.stream()
							.forEach(userCardCategory1 -> {
								userCardCategory1.getUserCardBenefitList()
									.stream()
									.forEach(userCardBenefit -> {
										userCardBenefit.updateReceivedAmount(0);
									});
							});
					});

			});
	}
}

