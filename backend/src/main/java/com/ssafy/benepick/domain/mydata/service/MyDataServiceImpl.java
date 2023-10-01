package com.ssafy.benepick.domain.mydata.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import com.ssafy.benepick.domain.user.entity.UserCardBenefit;
import com.ssafy.benepick.domain.user.entity.UserCardCompany;
import com.ssafy.benepick.domain.user.repository.UserCardRepository;
import com.ssafy.benepick.global.api.dto.response.ApiMyDataCardResponseDto;
import com.ssafy.benepick.global.api.service.ApiService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.benepick.domain.mydata.dto.response.CardInfoResponseDto;
import com.ssafy.benepick.domain.mydata.dto.response.CategoryPayResponseDto;
import com.ssafy.benepick.domain.mydata.dto.response.DayTransactionResponseDto;
import com.ssafy.benepick.domain.mydata.dto.response.MonthCategoryResultResponseDto;
import com.ssafy.benepick.domain.mydata.dto.response.MonthResultResponseDto;
import com.ssafy.benepick.domain.mydata.dto.response.RecentMonthResponseDto;
import com.ssafy.benepick.domain.mydata.dto.response.TransactionInfoResponseDto;
import com.ssafy.benepick.domain.user.entity.User;
import com.ssafy.benepick.domain.user.entity.UserCard;
import com.ssafy.benepick.domain.user.entity.UserPayment;
import com.ssafy.benepick.domain.user.repository.UserPaymentRepository;
import com.ssafy.benepick.domain.user.service.UserCardService;
import com.ssafy.benepick.domain.user.service.UserPaymentService;
import com.ssafy.benepick.domain.user.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class MyDataServiceImpl implements MyDataService {

	private final UserService userService;
	private final UserCardService userCardService;
	private final UserPaymentService userPaymentService;
	private final UserPaymentRepository userPaymentRepository;
	private final ApiService apiService;
	private final UserCardRepository userCardRepository;

	@Override
	//@Cacheable(value = "monthResult", key = "#request.getHeader('Authorization')")
	public MonthResultResponseDto getMonthResult(HttpServletRequest request) {
		log.info("MyDataServiceImpl_getMonthResult | 사용자 이번달 소비내역 , 받은 혜택 조회");
		User loginUser = userService.getUserFromRequest(request);

		int payAmount = 0;
		int benefitAmount = 0;
		int cardMaxPayAmount = 0;
		String imgUrl = "";

		for (UserCard userCard : loginUser.getUserCardList()) {
			int[] cardPayAmountAndBenefitAmount = calculateCardPayAmountAndBenefitAmount(userCard , LocalDate.now());

			// 사용자의 사용금액이 가장 큰 카드의 이미지 찾기
			if (cardMaxPayAmount < cardPayAmountAndBenefitAmount[0]) {
				cardMaxPayAmount = cardPayAmountAndBenefitAmount[0];
				imgUrl = userCard.getUserCardImgUrl();
			}

			payAmount += cardPayAmountAndBenefitAmount[0];
			benefitAmount += cardPayAmountAndBenefitAmount[1];
		}

		return MonthResultResponseDto.createMonthResultResponseDto(payAmount , benefitAmount , imgUrl);
	}

	private int[] calculateCardPayAmountAndBenefitAmount(UserCard userCard , LocalDate now){
		log.info("사용자의 한달동안 특정 카드의 사용금액,받은혜택 계산");
		int cardPayAmount = 0;
		int cardBenefitAmount = 0;

		for (UserPayment userPayment : userPaymentService.getUserPaymentListByUserCardAndDate(userCard.getUserCardSerialNumber(), now.getYear(), now.getMonthValue()) ) {
			cardPayAmount += userPayment.getUserPaymentAmount();
			cardBenefitAmount += userPayment.getUserPaymentReceivedBenefitAmount();
		}

		return new int[]{cardPayAmount,cardBenefitAmount};
	}

	@Override
	//@Cacheable(value = "monthCategoryResult", key = "#request.getHeader('Authorization')")
	public MonthCategoryResultResponseDto getMonthCategoryResult(HttpServletRequest request) {
		log.info("MyDataServiceImpl_getMonthCategoryResult | 사용자 이번달 카테고리별 사용 금액 조회");
		User loginUser = userService.getUserFromRequest(request);

		HashMap<String , Integer> categoryMap = new HashMap<>();
		AtomicInteger amount = new AtomicInteger(0);
		calculateUserCategoryPaymentAmount(loginUser, categoryMap, amount);

		return MonthCategoryResultResponseDto.builder().
			totalAmount(amount.get()).
			categoryResultResponseDtoList(
				getCategoryPayResponseDtoList(categoryMap,amount.get())
					.stream()
					.sorted((o1, o2) -> Integer.compare(o2.getAmount(), o1.getAmount()))
					.collect(Collectors.toList()))
			.build();
	}

	@Override
	//@Cacheable(value = "fourMonthResult", key = "#request.getHeader('Authorization')")
	public List<RecentMonthResponseDto> getRecentFourMonthResult(HttpServletRequest request) {
		log.info("MyDataServiceImpl_getRecentFourMonthResult || 최근 4달의 사용금액,받은혜택 조회");
		User loginUser = userService.getUserFromRequest(request);
		LocalDate now = LocalDate.now();

		return IntStream.range(0, 4)
			.mapToObj(i -> {
				LocalDate currentMonth = now.minusMonths(i);
				int[] totalAmounts = loginUser.getUserCardList().stream()
					.map(userCard -> calculateCardPayAmountAndBenefitAmount(userCard, currentMonth))
					.reduce((a, b) -> new int[]{a[0] + b[0], a[1] + b[1]})
					.orElse(new int[]{0, 0});

				RecentMonthResponseDto dto = RecentMonthResponseDto.builder()
					.year(currentMonth.getYear())
					.month(String.format("%02d", currentMonth.getMonthValue()))
					.payAmount(totalAmounts[0])
					.benefitAmount(totalAmounts[1])
					.benefitRate(Math.round(((double) totalAmounts[1] / totalAmounts[0]) * 100 * 100.0) / 100.0)
					.build();

				return dto;
			})
			.collect(Collectors.toList());
	}

	@Override
	public void linkCard(Long cardCompanyId, String userId) {
		log.info("MyDataServiceImpl_linkCard || 사용자의 카드중 넘겨받은 카드사와 일치하는 카드들 연결");
		List<ApiMyDataCardResponseDto> myDataCardList = apiService.getMyDataCardList(cardCompanyId, userId);

		if(myDataCardList.size() == 0)
			return;

		// 유저 카드, 결제 내역 ,  연결
		userCardService.linkUserCardAndUserPaymentByMyDataCard(myDataCardList);
	}

	@Override
	//@Cacheable(value = "cardInfo",key = "#cardId + '_' + #year + '_' + #month")
	public CardInfoResponseDto getUserCardInfo(Long cardId, int year, int month , HttpServletRequest request) {
		log.info("MyDataServiceImpl_getUserCardInfo || 사용자의 카드 상세 정보 조회");
		User loginUser = userService.getUserFromRequest(request);

		UserCard userCard = loginUser.getUserCardList()
			.stream()
			.filter(u -> u.getUserCardId().equals(cardId))
			.findFirst()
			.orElseGet(null);

		// 이번달 카드 사용 금액
		// 이번달 카드 받은 혜택 금액
		int[] cardPayAmountAndBenefitAmount = calculateCardPayAmountAndBenefitAmount(userCard, LocalDate.of(year,month,1));

		// 거래내역 리스트
		List<DayTransactionResponseDto> dayTransactionResponseDtoList = new ArrayList<>();
		HashMap<LocalDate , List<TransactionInfoResponseDto>> dateMap = new HashMap();

		userPaymentService.getUserPaymentListByUserCardAndDate(userCard.getUserCardSerialNumber() , year , month)
			.stream()
			.forEach(userPayment -> {
				dateMap
					.computeIfAbsent(LocalDate.from(userPayment.getUserPaymentDateTime()), k -> new ArrayList<>())
					.add(userPayment.toTransactionInfoResponseDto());
			});

		for (LocalDate localDate : dateMap.keySet()) {
			dayTransactionResponseDtoList.add(
				DayTransactionResponseDto.createDayTransactionResponseDto(localDate , dateMap.get(localDate)));
		}

		return CardInfoResponseDto.createCardInfoResponseDto(userCard,cardPayAmountAndBenefitAmount,dayTransactionResponseDtoList);
	}

	@Override
	@Transactional
	public void updateUserMyData(HttpServletRequest request) {
		log.info("MyDataServiceImpl_updateUserMyData | 사용자의 마이데이터 거래내역 갱신");
		// card benefit에 받은 혜택계산해주기
		User loginUser = userService.getUserFromRequest(request);
		List<UserCardCompany> userCardCompanyList = loginUser.getUserCardCompanyList();

		userCardCompanyList
			.stream()
			.forEach(userCardCompany -> {
				apiService.getTransactionDataAfterLastRenewalTime(
					userCardCompany.getUserCardCompanyId(),
					loginUser.getUserId(),
					loginUser.getUserLastRenewalTime()).
					stream()
					.forEach(apiMyDataCardResponseDto -> {
						UserCard userCard = userCardRepository.findByUserCardCode(
							apiMyDataCardResponseDto.getApiCardResponseDto().getCardCode());

						int monthPerformance = 0;

						//
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
		loginUser.updateLastRenewalTime();
	}

	private List<CategoryPayResponseDto> getCategoryPayResponseDtoList(HashMap<String, Integer> categoryMap , int totalAmount) {
		log.info("MyDataServiceImpl_getCategoryPayResponseDtoList || 사용자의 카테고리별 이름,사용금액,이미지를 Grouping");
		return categoryMap.entrySet()
			.stream()
			.map(entry -> CategoryPayResponseDto.builder()
				.categoryName(entry.getKey())
				.amount(entry.getValue())
				.amountRate(Math.round(((double) entry.getValue() / totalAmount) * 100 * 10.0) / 10.0)
				.build())
			.collect(Collectors.toList());
	}

	private void calculateUserCategoryPaymentAmount(User user, HashMap<String, Integer> categoryMap, AtomicInteger amount) {
		log.info("MyDataServiceImpl_calculateUserCategoryPaymentAmount || 사용자의 카테고리별 사용금액 계산");
		user.getUserCardList().stream()
			.flatMap(userCard -> userPaymentRepository.findByUserCardIdAndMonth(userCard.getUserCardSerialNumber(),
				LocalDate.now().getYear(),
				LocalDate.now().getMonthValue())
				.stream())
			.forEach(userPayment -> {
				categoryMap.put(userPayment.getUserPaymentCategory1(), categoryMap.getOrDefault(userPayment.getUserPaymentCategory1(), 0) + userPayment.getUserPaymentAmount());
				amount.addAndGet(userPayment.getUserPaymentAmount());
			});
	}
}
