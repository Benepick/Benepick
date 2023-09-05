package com.ssafy.benepick.domain.mydata.service;

import com.ssafy.benepick.domain.mydata.dto.response.MonthResultResponseDto;

import jakarta.servlet.http.HttpServletRequest;

public interface MyDataService {
	MonthResultResponseDto getMonthResult(HttpServletRequest request);
}
