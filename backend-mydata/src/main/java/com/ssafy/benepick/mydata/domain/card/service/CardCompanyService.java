package com.ssafy.benepick.mydata.domain.card.service;

import com.ssafy.benepick.mydata.domain.card.dto.response.ApiCardCompanyResponseDto;

import java.util.List;

public interface CardCompanyService {
	List<ApiCardCompanyResponseDto> getAllCardCompany();
}
