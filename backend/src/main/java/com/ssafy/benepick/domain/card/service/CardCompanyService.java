package com.ssafy.benepick.domain.card.service;

import java.util.List;

import com.ssafy.benepick.domain.card.dto.response.CardCompanyResponseDto;

public interface CardCompanyService {
	List<CardCompanyResponseDto> getAllCardCompany();
}
