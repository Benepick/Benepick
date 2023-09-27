package com.ssafy.benepick.mydata.domain.card.service;

import java.util.List;

import com.ssafy.benepick.mydata.domain.card.dto.response.ApiSearchCardBenefitResponseDto;

import jakarta.servlet.http.HttpServletRequest;

public interface CardService {

	List<ApiSearchCardBenefitResponseDto> findCardBenefitBySearch(String keyword);
}
