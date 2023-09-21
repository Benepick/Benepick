package com.ssafy.benepick.domain.card.service;


import java.util.List;

import com.ssafy.benepick.domain.card.dto.response.BenefitSearchResponseDto;
import com.ssafy.benepick.domain.card.dto.response.CardBenefitResponseDto;
import com.ssafy.benepick.domain.user.entity.UserCardCategory1;

import jakarta.servlet.http.HttpServletRequest;

public interface CardService {
	List<UserCardCategory1> findCategory1ListByCardCode(Long cardCode);
	List<CardBenefitResponseDto> findCardBenefitListByCardId(Long cardId);
	List<BenefitSearchResponseDto>  findCardBenefitBySearch(String keyword , HttpServletRequest request);
    // List<Category1> getCardCategory1(Card card);
    // List<Category1> findCategory1ListByCardCode(Long cardCode);
    // List<Category2> getCardCategory2(Category1 category1);
    // List<CardBenefit> getCardBenefits(Category1 category1);
    // List<Integer> getCardBenefitsLevels(Category1 category1);

}
