package com.ssafy.benepick.domain.user.service;

import java.util.List;

import com.ssafy.benepick.domain.user.dto.response.UserCardResponseDto;
import com.ssafy.benepick.domain.user.entity.User;
import com.ssafy.benepick.domain.user.entity.UserCard;
import com.ssafy.benepick.domain.user.entity.UserCardCategory1;
import com.ssafy.benepick.domain.user.entity.UserPayment;
import com.ssafy.benepick.global.api.dto.response.ApiMyDataCardResponseDto;
import com.ssafy.benepick.global.api.dto.response.ApiMyDataPaymentResponseDto;

import jakarta.servlet.http.HttpServletRequest;

public interface UserCardService {

	void linkUserCardAndUserPaymentByMyDataCard(List<ApiMyDataCardResponseDto> myDataCardList);
	List<UserCardResponseDto> getUserCards(HttpServletRequest request);
	List<Integer> getCardBenefitsLevels(UserCardCategory1 userCardCategory1);

	List<UserCardCategory1> getUserCardCategory1(UserCard userCard);
}
