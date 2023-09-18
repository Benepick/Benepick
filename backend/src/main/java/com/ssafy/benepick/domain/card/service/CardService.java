package com.ssafy.benepick.domain.card.service;

import com.ssafy.benepick.domain.card.entity.Card;
import com.ssafy.benepick.domain.card.entity.CardBenefit;
import com.ssafy.benepick.domain.card.entity.Category1;
import com.ssafy.benepick.domain.card.entity.Category2;

import java.util.List;

public interface CardService {
    List<Category1> getCardCategory1(Card card);

    List<Category2> getCardCategory2(Category1 category1);

    List<CardBenefit> getCardBenefits(Category1 category1);
    List<Integer> getCardBenefitsLevels(Category1 category1);
    List<Category1> findCategory1ListByCardCode(Long cardCode);

}
