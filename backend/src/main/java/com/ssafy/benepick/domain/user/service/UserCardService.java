package com.ssafy.benepick.domain.user.service;

import java.util.List;

import com.ssafy.benepick.domain.mydata.entity.MyDataCard;
import com.ssafy.benepick.domain.mydata.entity.MyDataPayment;
import com.ssafy.benepick.domain.user.entity.User;
import com.ssafy.benepick.domain.user.entity.UserCard;
import com.ssafy.benepick.domain.user.entity.UserPayment;
import com.ssafy.benepick.global.api.dto.response.ApiMyDataCardResponseDto;
import com.ssafy.benepick.global.api.dto.response.ApiMyDataPaymentResponseDto;

public interface UserCardService {

	void linkUserCardAndUserPaymentByMyDataCard(List<ApiMyDataCardResponseDto> myDataCardList);
	UserCard myDataCardToUserCard(ApiMyDataCardResponseDto myDataCard, User user);
	UserPayment myDataPaymentToUserPayment(ApiMyDataPaymentResponseDto myDataPayment , UserCard userCard);
}
