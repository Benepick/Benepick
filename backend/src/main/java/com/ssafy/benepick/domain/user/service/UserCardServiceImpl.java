package com.ssafy.benepick.domain.user.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

import com.ssafy.benepick.domain.user.entity.*;
import com.ssafy.benepick.domain.user.repository.*;
import com.ssafy.benepick.global.api.dto.response.ApiMyDataCardResponseDto;
import com.ssafy.benepick.global.api.dto.response.ApiMyDataPaymentResponseDto;
import com.ssafy.benepick.domain.card.service.CardService;
import com.ssafy.benepick.domain.user.dto.response.UserCardResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserCardServiceImpl implements  UserCardService{

	private final UserCardRepository userCardRepository;
	private final UserRepository userRepository;
	private final UserPaymentRepository userPaymentRepository;
	private final UserCardCategory1Repository userCardCategory1Repository;
	private final UserCardBenefitRepository userCardBenefitRepository;
	private final UserService userService;

	@Override
	@Transactional
	public void linkUserCardAndUserPaymentByMyDataCard(List<ApiMyDataCardResponseDto> myDataCardList) {
		log.info("UserCardServiceImpl_linkUserCardAndUserPaymentByMyDataCard || 마이데이터 유저 카드 데이터를 유저 카드데이터에 연동");

		User user = userRepository.findById(myDataCardList.get(0).getApiMyDataUserResponseDto().getMyDataUserId()).get();
		myDataCardList.stream().forEach(myDataCard -> {
			
			UserCard userCard = myDataCard.toUserCard(user);
			userCard.updateCardCurrentPerformance(calculateCardPerformance(myDataCard,LocalDate.now()));
			userCardRepository.save(userCard);

			// 결제 내역 연동
			List<UserPayment> userCardPaymentList = myDataCard.getApiMyDataPaymentResponseDtoList().stream()
				.map(myDataPayment -> myDataPayment.toUserPayment(userCard))
				.collect(Collectors.toList());

			// 이번달 결제 내역 리스트
			List<UserPayment> monthPaymentList =
				userCardPaymentList
					.stream()
					.filter(userPayment -> {
						LocalDateTime paymentDate = userPayment.getUserPaymentDateTime();
						return paymentDate.getYear() == LocalDate.now().getYear() && paymentDate.getMonthValue() == LocalDate.now().getMonthValue();
					}).collect(Collectors.toList());


			List<UserCardCategory1> userCardCategory1List = new ArrayList<>();

			// 카테고리1 연동
			myDataCard.getApiCardResponseDto().getCategory1List().stream().forEach(category1 -> {
				UserCardCategory1 userCardCategory1 = category1.toUserCardCategory1(userCard);

				// 카드 혜택 연동
				category1.getCardBenefitList().stream().forEach(cardBenefit -> {
					UserCardBenefit userCardBenefit = cardBenefit.toUserCardBenefit(userCardCategory1);
					userCardCategory1.addUserCardBenefit(calculateReceivedCardBenefit(monthPaymentList, userCardBenefit));
				});

				// 카테고리1 에대하여 카테고리2 연동
				category1.getCategory2List().stream().forEach(category2 -> {
					UserCardCategory2 userCardCategory2 = category2.toUserCardCategory2();

					//카테고리2 에대하여 카테고리3 연동
					category2.getCategory3List().stream().forEach(category3 -> {
						userCardCategory2.addUserCardCategory3(category3.toUserCardCategory3());
					});

					userCardCategory1.addUserCardCategory2(userCardCategory2);
				});
				userCardCategory1List.add(userCardCategory1);
			});
			for (UserCardCategory1 userCardCategory1 : userCardCategory1List) {
				System.out.println("userCardCategory1 = " + userCardCategory1.getUserCard().getUserCardId());
			}

			userCardCategory1Repository.saveAll(userCardCategory1List);
			userPaymentRepository.saveAll(userCardPaymentList);
		});
		user.updateLastRenewalTime();
	}

	private UserCardBenefit calculateReceivedCardBenefit(List<UserPayment> userCardPaymentList , UserCardBenefit cardBenefit){
		int receivedAmount = userCardPaymentList
			.stream()
			.filter(userPayment -> userPayment.getUserPaymentCategory1().equals(cardBenefit.getUserCardCategory1().getUserCardCategory1Name()))
			.mapToInt(UserPayment::getUserPaymentReceivedBenefitAmount)
			.sum();
		cardBenefit.updateReceivedAmount(receivedAmount);
		return cardBenefit;
	}

	private int calculateCardPerformance(ApiMyDataCardResponseDto myDataCard , LocalDate now){
		log.info("카드 이번달 실적 파악");
		return myDataCard.getApiMyDataPaymentResponseDtoList()
			.stream()
			.filter(dto -> dto.getMyDataPaymentReceivedBenefitAmount() == 0)
			.filter(dto -> {
				LocalDateTime paymentDate = dto.getMyDataPaymentDate();
				return paymentDate.getYear() == now.getYear()  && paymentDate.getMonthValue() == now.getMonthValue();
			})
			.mapToInt(ApiMyDataPaymentResponseDto::getMyDataPaymentAmount)
			.sum();
	}

	 @Override
	 @Cacheable(value = "userCardList", key = "@userServiceImpl.getUserFromRequest(#request).getUserId()")
	 public List<UserCardResponseDto> getUserCards(HttpServletRequest request) {
	 	User user = userService.getUserFromRequest(request);
	 	List<UserCard> userCardList = userCardRepository.findByUser(user);
	 	List<UserCardResponseDto> userCardResponseDtos = new ArrayList<>();
	 	for (UserCard userCard : userCardList) {
	 		int curPerform = userCard.getUserCardCurrentPerformance();
	 		List<UserCardCategory1> category1s = getUserCardCategory1(userCard); //cardService.getCardCategory1(card);
			List<Integer> cardPerformLevelList = getCardBenefitsLevels(category1s.get(0));
	 		int currentLevel = 0, nextLevelAmount = 0;

	 		for (int i = 0; i < cardPerformLevelList.size() - 1; i++) {
	 			if (curPerform >= cardPerformLevelList.get(i) && curPerform < cardPerformLevelList.get(i+1)) {
	 				currentLevel = i;
	 				nextLevelAmount = cardPerformLevelList.get(i+1);
	 				break;
	 			}
	 		}
	 		UserCardResponseDto userCardResponseDto = userCard.toUserCardResponseDto(cardPerformLevelList, currentLevel, nextLevelAmount);
	 		userCardResponseDtos.add(userCardResponseDto);
	 	}
	 	return userCardResponseDtos;
	 }


	private List<UserCardBenefit> getCardBenefits(UserCardCategory1 userCardCategory1) {
		List<UserCardBenefit> cardBenefitList = userCardBenefitRepository.findByUserCardCategory1(userCardCategory1);
		log.info("CardServiceImpl_getCardBenefits| 해당 카드 카테고리 별 혜택 정보를 받아옴");
		return cardBenefitList;
	}

	 @Override
	 public List<Integer> getCardBenefitsLevels(UserCardCategory1 userCardCategory1) {
		 List<UserCardBenefit> cardBenefitList = getCardBenefits(userCardCategory1);
		 log.info("CardServiceImpl_getCardBenefits| 카드 혜택 실적 구간 정보를 받아옴");
		 Set<Integer> performLevelSet = new HashSet<>();
		 performLevelSet.add(0);
		 for (UserCardBenefit userCardBenefit : cardBenefitList) {
			 performLevelSet.add(userCardBenefit.getUserCardBenefitPerformanceStart());
			 performLevelSet.add(userCardBenefit.getUserCardBenefitPerformanceEnd());
		 }
		 List<Integer> performLevelList = new ArrayList<>(performLevelSet);
		 Collections.sort(performLevelList);
		 return performLevelList;
	 }
	@Override
	public List<UserCardCategory1> getUserCardCategory1(UserCard userCard) {
		List<UserCardCategory1> category1s = userCardCategory1Repository.findByUserCard(userCard);
		 for (UserCardCategory1 cate1 : category1s) {
			 System.out.println(cate1.getUserCardCategory1Name());
		 }
		 return category1s;
	}
}
