package com.ssafy.benepick.domain.mydata.service;

import java.util.List;

import com.ssafy.benepick.domain.mydata.dto.response.MonthCategoryResultResponseDto;
import com.ssafy.benepick.domain.mydata.dto.response.MonthResultResponseDto;
import com.ssafy.benepick.domain.mydata.dto.response.RecentMonthResponseDto;

import jakarta.servlet.http.HttpServletRequest;

public interface MyDataService {
	MonthResultResponseDto getMonthResult(HttpServletRequest request);
	MonthCategoryResultResponseDto getMonthCategoryResult(HttpServletRequest request);
	List<RecentMonthResponseDto> getRecentFourMonthResult(HttpServletRequest request);
	void linkCard(Long cardCompanyId , String userId);
}
