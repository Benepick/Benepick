package com.ssafy.benepick.domain.user.service;

import java.util.List;

import com.ssafy.benepick.domain.card.dto.response.CardCompanyResponseDto;
import com.ssafy.benepick.domain.user.entity.User;
import com.ssafy.benepick.domain.user.entity.UserCardCompany;

import jakarta.servlet.http.HttpServletRequest;

public interface UserCardCompanyService {

	List<CardCompanyResponseDto> getUserCardCompany(HttpServletRequest request);
	void cancelLinkCardCompany(User user,UserCardCompany userCardCompany);
}
