package com.ssafy.benepick.domain.card.service;

import java.util.List;

import com.ssafy.benepick.domain.card.dto.response.CardCompanyResponseDto;

import jakarta.servlet.http.HttpServletRequest;

public interface CardCompanyService {
	List<CardCompanyResponseDto> getAllCardCompany();
	void linkAndRenewCardCompany(List<Long> cardCompanyIdList , HttpServletRequest request);
}
