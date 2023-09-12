package com.ssafy.benepick.domain.mydata.service;

import java.nio.file.LinkOption;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ssafy.benepick.domain.mydata.dto.response.CategoryPayResponseDto;
import com.ssafy.benepick.domain.mydata.dto.response.MonthCategoryResultResponseDto;
import com.ssafy.benepick.domain.mydata.dto.response.MonthResultResponseDto;
import com.ssafy.benepick.domain.mydata.dto.response.RecentMonthResponseDto;
import com.ssafy.benepick.domain.mydata.entity.MyDataCard;
import com.ssafy.benepick.domain.mydata.entity.MyDataPayment;
import com.ssafy.benepick.domain.mydata.entity.MyDataUser;
import com.ssafy.benepick.domain.mydata.entity.PaymentCategory;
import com.ssafy.benepick.domain.mydata.repository.MyDataCardRepository;
import com.ssafy.benepick.domain.mydata.repository.MyDataPaymentRepository;
import com.ssafy.benepick.domain.mydata.repository.MyDataUserRepository;
import com.ssafy.benepick.domain.user.entity.User;
import com.ssafy.benepick.domain.user.entity.UserCard;
import com.ssafy.benepick.domain.user.entity.UserPayment;
import com.ssafy.benepick.domain.user.repository.UserPaymentRepository;
import com.ssafy.benepick.domain.user.service.UserCardService;
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
	private final UserPaymentRepository userPaymentRepository;
	private final MyDataCardRepository myDataCardRepository;
	private final MyDataUserRepository myDataUserRepository;
	private final MyDataPaymentRepository myDataPaymentRepository;

	@Override
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

		for (UserPayment userPayment : userPaymentRepository.findByUserCardIdAndMonth(userCard.getUserCardId(), now.getMonthValue(), now.getYear())) {
			cardPayAmount += userPayment.getUserPaymentAmount();
			cardBenefitAmount += userPayment.getUserPaymentReceivedBenefitAmount();
		}

		return new int[]{cardPayAmount,cardBenefitAmount};
	}

	@Override
	public MonthCategoryResultResponseDto getMonthCategoryResult(HttpServletRequest request) {
		log.info("MyDataServiceImpl_getMonthCategoryResult | 사용자 이번달 카테고리별 사용 금액 조회");
		MyDataUser myDataUser = myDataUserRepository.findById(userService.getUserFromRequest(request).getUserId()).get();
		// MyDataUser myDataUser = myDataUserRepository.findById("ex1").get();

		HashMap<String , Integer> categoryMap = new HashMap<>();
		AtomicInteger amount = new AtomicInteger(0);
		calculateUserCategoryPaymentAmount(myDataUser, categoryMap, amount);

		return MonthCategoryResultResponseDto.builder().
			totalAmount(amount.get()).
			categoryResultResponseDtoList(getCategoryPayResponseDtoList(categoryMap))
			.build();
	}

	@Override
	public List<RecentMonthResponseDto> getRecentFourMonthResult(HttpServletRequest request) {
		log.info("MyDataServiceImpl_getRecentFourMonthResult || 최근 4달의 사용금액,받은혜택 조회");
		MyDataUser myDataUser = myDataUserRepository.findById(userService.getUserFromRequest(request).getUserId()).get();
		// MyDataUser myDataUser = myDataUserRepository.findById("ex1").get();
		LocalDate now = LocalDate.now();
		List<RecentMonthResponseDto> result = new ArrayList<>();

		// for (int i = 0; i < 4; i++) {
		// 	int payAmount = 0;
		// 	int benefitAmount = 0;
		//
		// 	// 특정 달의 특정 사용자의 여러개의 카드에 대해 사용금액 받은혜택 조회
		// 	for (MyDataCard myDataCard : myDataUser.getMyDataCardList()) {
		// 		int[] cardPayAmountAndBenefitAmount = calculateCardPayAmountAndBenefitAmount(myDataCard , now);
		//
		// 		payAmount += cardPayAmountAndBenefitAmount[0];
		// 		benefitAmount += cardPayAmountAndBenefitAmount[1];
		// 	}
		//
		// 	result.add(RecentMonthResponseDto.builder().year(now.getYear()).month(now.getMonthValue()).payAmount(payAmount).benefitAmount(benefitAmount).build());
		// 	now = now.minusMonths(1);  // 이전 달로 이동
		// }

		return result;
	}

	@Override
	public void linkCard(Long cardCompanyId, String userId) {
		log.info("MyDataServiceImpl_linkCard || 사용자의 카드중 넘겨받은 카드사와 일치하는 카드들 연결");
		List<MyDataCard> myDataCardList = myDataCardRepository.findByUserIdAndCompanyId(userId, cardCompanyId);

		if(myDataCardList.size() == 0)
			return;

		// 유저 카드, 결제 내역 연결
		userCardService.linkUserCardAndUserPaymentByMyDataCard(myDataCardList);
	}

	private List<CategoryPayResponseDto> getCategoryPayResponseDtoList(HashMap<String, Integer> categoryMap) {
		log.info("사용자의 카테고리별 이름,사용금액,이미지를 Grouping");
		return categoryMap.entrySet()
			.stream()
			.map(entry -> CategoryPayResponseDto.builder()
				.categoryName(entry.getKey())
				.amount(entry.getValue())
				.categoryImgUrl(PaymentCategory.getCategoryImgUrl(entry.getKey())).build())
			.collect(Collectors.toList());
	}

	private void calculateUserCategoryPaymentAmount(MyDataUser myDataUser, HashMap<String, Integer> categoryMap, AtomicInteger amount) {
		log.info("사용자의 카테고리별 사용금액 계산");
		myDataUser.getMyDataCardList().stream()
			.flatMap(myDataCard -> myDataPaymentRepository.findByMyDataCardAndMonth(
				myDataCard.getMyDataCardId(),
				LocalDate.now().getMonthValue(),
				LocalDate.now().getYear()).stream())
			.forEach(myDataPayment -> {
					categoryMap.put(myDataPayment.getMyDataPaymentCategory(), categoryMap.getOrDefault(myDataPayment.getMyDataPaymentCategory(), 0) + myDataPayment.getMyDataPaymentAmount());
					amount.addAndGet(myDataPayment.getMyDataPaymentAmount());
				}
			);
	}
}
