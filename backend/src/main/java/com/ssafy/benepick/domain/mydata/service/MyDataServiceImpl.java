package com.ssafy.benepick.domain.mydata.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.benepick.domain.mydata.dto.response.MonthResultResponseDto;
import com.ssafy.benepick.domain.mydata.entity.MyDataCard;
import com.ssafy.benepick.domain.mydata.entity.MyDataPayment;
import com.ssafy.benepick.domain.mydata.entity.MyDataUser;
import com.ssafy.benepick.domain.mydata.repository.MyDataPaymentRepository;
import com.ssafy.benepick.domain.mydata.repository.MyDataUserRepository;
import com.ssafy.benepick.domain.user.entity.User;
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
			int cardPayAmount = 0;
			int cardBenefitAmount = 0;
			for (MyDataPayment myDataPayment : myDataPaymentRepository.findByMyDataCardAndMonth(myDataCard.getMyDataCardId(), LocalDate.now().getMonthValue(), LocalDate.now().getYear())) {
				cardPayAmount += myDataPayment.getMyDataPaymentAmount();
				cardBenefitAmount += myDataPayment.getMyDataPaymentBenefit();
			}
			if(cardMaxPayAmount < cardPayAmount)
				imgUrl = myDataCard.getCard().getCardImgUrl();
			payAmount += cardPayAmount;
			benefitAmount += cardBenefitAmount;
		}

		return MonthResultResponseDto.createMonthResultResponseDto(payAmount , benefitAmount , imgUrl);
	}
}
