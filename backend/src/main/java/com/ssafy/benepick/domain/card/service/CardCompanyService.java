package com.ssafy.benepick.domain.card.service;

import java.util.List;

import com.ssafy.benepick.domain.card.dto.request.LinkAndRenewCardCompanyRequestDto;
import com.ssafy.benepick.domain.card.dto.response.CardCompanyResponseDto;

import jakarta.servlet.http.HttpServletRequest;

public interface CardCompanyService {
	List<CardCompanyResponseDto> getAllCardCompany(int isSignUp,HttpServletRequest request);
	void linkAndRenewCardCompany(LinkAndRenewCardCompanyRequestDto linkAndRenewCardCompanyRequestDto , HttpServletRequest request);
	void cancelLinkCardCompany(Long cardCompanyId , HttpServletRequest request);
}
