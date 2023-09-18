package com.ssafy.benepick.domain.card.service;


import com.ssafy.benepick.domain.card.entity.Card;
import com.ssafy.benepick.domain.card.entity.CardBenefit;
import com.ssafy.benepick.domain.card.entity.Category1;
import com.ssafy.benepick.domain.card.entity.Category2;
import com.ssafy.benepick.domain.card.repository.CardBenefitRepository;
import com.ssafy.benepick.domain.card.repository.Category1Repository;
import com.ssafy.benepick.domain.card.repository.Category2Repository;
import java.util.List;
import org.springframework.stereotype.Service;
import com.ssafy.benepick.domain.card.repository.CardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class CardServiceImpl implements CardService{
    private final Category1Repository category1Repository;
    private final Category2Repository category2Repository;
    private final CardBenefitRepository cardBenefitRepository;
    private final CardRepository cardRepository;
    @Override
    public List<Category1> getCardCategory1(Card card) {
        List<Category1> category1s = category1Repository.findByCard(card);
        for (Category1 cate1 : category1s) {
            System.out.println(cate1.getCategory1Name());
        }
        return category1s;
    }

    @Override
    public List<Category2> getCardCategory2(Category1 category1) {
        List<Category2> category2s = category2Repository.findByCategory1(category1);
        for (Category2 cate2 : category2s) {
            System.out.println(cate2.getCategory2Name());
        }
        return category2s;
    }


    @Override
    public List<CardBenefit> getCardBenefits(Category1 category1) {
        List<CardBenefit> cardBenefitList = cardBenefitRepository.findByCategory1(category1);
        log.info("CardServiceImpl_getCardBenefits| 해당 카드 카테고리 별 혜택 정보를 받아옴");
        for (CardBenefit cardBenefit : cardBenefitList) {
            System.out.println(cardBenefit.getCareBenefitPerformanceStart() + " ~ " + cardBenefit.getCareBenefitPerformanceEnd());
            System.out.println(cardBenefit.getCareBenefitDiscountPercent());
        }
        return cardBenefitList;
    }

    @Override
    public List<Integer> getCardBenefitsLevels(Category1 category1) {
        List<CardBenefit> cardBenefitList = cardBenefitRepository.findByCategory1(category1);
        log.info("CardServiceImpl_getCardBenefits| 카드 혜택 실적 구간 정보를 받아옴");
        Set<Integer> performLevelSet = new HashSet<>();
        performLevelSet.add(0);
        for (CardBenefit cardBenefit : cardBenefitList) {
            performLevelSet.add(cardBenefit.getCareBenefitPerformanceStart());
            performLevelSet.add(cardBenefit.getCareBenefitPerformanceEnd());
        }
        List<Integer> performLevelList = new ArrayList<>(performLevelSet);
        Collections.sort(performLevelList);
        return performLevelList;
    }

	@Override
	public List<Category1> findCategory1ListByCardCode(Long cardCode) {
		log.info("CardServiceImpl_findCategory1ByCardCode || 카드 코드 바탕 으로 혜택 정보 찾기");
		return cardRepository.findByCardCode(cardCode).getCategory1List();
	}
}
