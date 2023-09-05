package com.ssafy.benepick.domain.mydata.service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ssafy.benepick.domain.mydata.dto.response.CategoryPayResponseDto;
import com.ssafy.benepick.domain.mydata.dto.response.MonthCategoryResultResponseDto;
import com.ssafy.benepick.domain.mydata.dto.response.MonthResultResponseDto;
import com.ssafy.benepick.domain.mydata.entity.MyDataCard;
import com.ssafy.benepick.domain.mydata.entity.MyDataPayment;
import com.ssafy.benepick.domain.mydata.entity.MyDataUser;
import com.ssafy.benepick.domain.mydata.entity.PaymentCategory;
import com.ssafy.benepick.domain.mydata.repository.MyDataPaymentRepository;
import com.ssafy.benepick.domain.mydata.repository.MyDataUserRepository;
import com.ssafy.benepick.domain.user.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class MyDataServiceImpl implements MyDataService {

	private final UserService userService;
	private final MyDataUserRepository myDataUserRepository;
	private final MyDataPaymentRepository myDataPaymentRepository;

	@Override
	public MonthResultResponseDto getMonthResult(HttpServletRequest request) {
		log.info("MyDataServiceImpl_getMonthResult | 사용자 이번달 소비내역 , 받은 혜택 조회");
		// MyDataUser myDataUser = myDataUserRepository.findById(userService.getUserFromRequest(request).getUserId()).get();
		MyDataUser myDataUser = myDataUserRepository.findById("ex1").get();

		int payAmount = 0;
		int benefitAmount = 0;
		int cardMaxPayAmount = 0;
		String imgUrl = "";
		
		for (MyDataCard myDataCard : myDataUser.getMyDataCardList()) {
			int[] cardPayAmountAndBenefitAmount = calculateCardPayAmountAndBenefitAmount(myDataCard);

			// 사용자의 사용금액이 가장 큰 카드의 이미지 찾기
			if (cardMaxPayAmount < cardPayAmountAndBenefitAmount[0]) {
				cardMaxPayAmount = cardPayAmountAndBenefitAmount[0];
				imgUrl = myDataCard.getCard().getCardImgUrl();
			}

			payAmount += cardPayAmountAndBenefitAmount[0];
			benefitAmount += cardPayAmountAndBenefitAmount[1];
		}

		return MonthResultResponseDto.createMonthResultResponseDto(payAmount , benefitAmount , imgUrl);
	}

	private int[] calculateCardPayAmountAndBenefitAmount(MyDataCard myDataCard){
		log.info("사용자의 한달동안 특정 카드의 사용금액,받은혜택 계산");
		int cardPayAmount = 0;
		int cardBenefitAmount = 0;
		for (MyDataPayment myDataPayment : myDataPaymentRepository.findByMyDataCardAndMonth(myDataCard.getMyDataCardId(), LocalDate.now().getMonthValue(), LocalDate.now().getYear())) {
			cardPayAmount += myDataPayment.getMyDataPaymentAmount();
			cardBenefitAmount += myDataPayment.getMyDataPaymentBenefit();
		}
		return new int[]{cardPayAmount,cardBenefitAmount};
	}

	@Override
	public MonthCategoryResultResponseDto getMonthCategoryResult(HttpServletRequest request) {
		log.info("MyDataServiceImpl_getMonthCategoryResult | 사용자 이번달 카테고리별 사용 금액 조회");
		// MyDataUser myDataUser = myDataUserRepository.findById(userService.getUserFromRequest(request).getUserId()).get();
		MyDataUser myDataUser = myDataUserRepository.findById("ex1").get();

		HashMap<String , Integer> categoryMap = new HashMap<>();
		AtomicInteger amount = new AtomicInteger(0);
		calculateUserCategoryPaymentAmount(myDataUser, categoryMap, amount);

		return MonthCategoryResultResponseDto.builder().
			totalAmount(amount.get()).
			categoryResultResponseDtoList(getCategoryPayResponseDtoList(categoryMap))
			.build();
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
