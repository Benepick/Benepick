package com.ssafy.benepick.domain.card.service;


import java.net.http.HttpRequest;
import java.util.List;

import com.ssafy.benepick.domain.card.dto.response.RecommendCardResponseDto;
import com.ssafy.benepick.domain.user.dto.response.UserCardResponseDto;
import com.ssafy.benepick.domain.user.entity.UserCardCategory1;
import com.ssafy.benepick.global.api.dto.response.ApiMerchantResponseDto;
import jakarta.servlet.http.HttpServletRequest;

public interface CardService {
	List<UserCardCategory1> findCategory1ListByCardCode(Long cardCode);
	RecommendCardResponseDto recommendCard(ApiMerchantResponseDto apiMerchantResponseDto, HttpServletRequest request);
    // List<Category1> getCardCategory1(Card card);
    // List<Category1> findCategory1ListByCardCode(Long cardCode);
    // List<Category2> getCardCategory2(Category1 category1);
    // List<CardBenefit> getCardBenefits(Category1 category1);
    // List<Integer> getCardBenefitsLevels(Category1 category1);

}
