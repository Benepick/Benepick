package com.ssafy.benepick.domain.card.service;


import java.util.List;
import org.springframework.stereotype.Service;
import com.ssafy.benepick.domain.user.entity.UserCardCategory1;
import com.ssafy.benepick.domain.user.repository.UserCardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class CardServiceImpl implements CardService{


	private final UserCardRepository userCardRepository;

	@Override
	public List<UserCardCategory1> findCategory1ListByCardCode(Long cardCode) {
		log.info("CardServiceImpl_findCategory1ByCardCode || 카드 코드 바탕 으로 혜택 정보 찾기");
		return userCardRepository.findByUserCardCode(cardCode).getUserCardCategory1List();
	}

    // @Override
    // public List<Category1> findCategory1ListByCardCode(Long cardCode) {
    //     log.info("CardServiceImpl_findCategory1ByCardCode || 카드 코드 바탕 으로 혜택 정보 찾기");
    //     return cardRepository.findByCardCode(cardCode).getCategory1List();
    // }
    // @Override
    // public List<Category1> getCardCategory1(Card card) {
    //     List<Category1> category1s = category1Repository.findByCard(card);
    //     for (Category1 cate1 : category1s) {
    //         System.out.println(cate1.getCategory1Name());
    //     }
    //     return category1s;
    // }
    //
    // @Override
    // public List<Category2> getCardCategory2(Category1 category1) {
    //     List<Category2> category2s = category2Repository.findByCategory1(category1);
    //     for (Category2 cate2 : category2s) {
    //         System.out.println(cate2.getCategory2Name());
    //     }
    //     return category2s;
    // }
    //
    //
    // @Override
    // public List<CardBenefit> getCardBenefits(Category1 category1) {
    //     List<CardBenefit> cardBenefitList = cardBenefitRepository.findByCategory1(category1);
    //     log.info("CardServiceImpl_getCardBenefits| 해당 카드 카테고리 별 혜택 정보를 받아옴");
    //     return cardBenefitList;
    // }
    //
    // @Override
    // public List<Integer> getCardBenefitsLevels(Category1 category1) {
    //     List<CardBenefit> cardBenefitList = cardBenefitRepository.findByCategory1(category1);
    //     log.info("CardServiceImpl_getCardBenefits| 카드 혜택 실적 구간 정보를 받아옴");
    //     Set<Integer> performLevelSet = new HashSet<>();
    //     performLevelSet.add(0);
    //     for (CardBenefit cardBenefit : cardBenefitList) {
    //         performLevelSet.add(cardBenefit.getCardBenefitPerformanceStart());
    //         performLevelSet.add(cardBenefit.getCardBenefitPerformanceEnd());
    //     }
}
