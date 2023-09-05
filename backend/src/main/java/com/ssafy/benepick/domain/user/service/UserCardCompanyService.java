package com.ssafy.benepick.domain.user.service;

import java.util.List;

import com.ssafy.benepick.domain.card.dto.response.CardCompanyResponseDto;
import jakarta.servlet.http.HttpServletRequest;

public interface UserCardCompanyService {

	List<CardCompanyResponseDto> getUserCardCompany(HttpServletRequest request);
}
