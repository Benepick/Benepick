package com.ssafy.benepick.domain.card.service;


import java.util.List;
import org.springframework.stereotype.Service;

import com.ssafy.benepick.domain.card.dto.response.CardBenefitDiscountResponseDto;
import com.ssafy.benepick.domain.card.dto.response.CardBenefitResponseDto;
import com.ssafy.benepick.domain.user.entity.UserCardBenefit;
import com.ssafy.benepick.domain.user.entity.UserCardCategory1;
import com.ssafy.benepick.domain.user.entity.UserCardCategory2;
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

	@Override
	public List<CardBenefitResponseDto> findCardBenefitListByCardId(Long cardId) {
		log.info("CardServiceImpl_findCardBenefitListByCardId || 카드 ID 바탕 으로 혜택 정보 찾기");
		List<CardBenefitResponseDto> result = new ArrayList<>();

		userCardRepository.findById(cardId)
			.get()
			.getUserCardCategory1List()
			.stream()
			.forEach(userCardCategory1 -> {

				List<String> category2List = new ArrayList<>();
				List<String> category3List = new ArrayList<>();
				userCardCategory1.getUserCardCategory2List().stream().forEach(userCardCategory2 -> {
					category2List.add(userCardCategory2.getUserCardCategory2Name());
					userCardCategory2.getUserCardCategory3List().stream().forEach(userCardCategory3 -> {
						category3List.add(userCardCategory3.getUserCardCategory3Name());
					});
				});

				List<CardBenefitDiscountResponseDto> cardBenefitDiscountResponseDtoList = new ArrayList<>();
				// 카드 혜택 리스트
				List<UserCardBenefit> userCardBenefitList = userCardCategory1.getUserCardBenefitList();
				for (int idx = 0; idx < userCardBenefitList.size() ; idx++) {
					cardBenefitDiscountResponseDtoList.add(userCardBenefitList.get(idx).toCardBenefitDiscountResponseDto(idx+1));
				}

				result.add(CardBenefitResponseDto.createCardBenefitResponseDto(
					userCardCategory1.getUserCardCategory1Name(),
					cardBenefitDiscountResponseDtoList,
					category2List,
					category3List));
			});

		return result;
	}

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
