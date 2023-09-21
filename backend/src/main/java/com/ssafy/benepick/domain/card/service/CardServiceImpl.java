package com.ssafy.benepick.domain.card.service;


import java.util.List;

import com.ssafy.benepick.domain.card.dto.response.RecommendCardResponseDto;
import com.ssafy.benepick.domain.user.dto.response.UserCardResponseDto;
import com.ssafy.benepick.domain.user.entity.*;
import com.ssafy.benepick.domain.user.repository.*;
import com.ssafy.benepick.domain.user.service.UserCardService;
import com.ssafy.benepick.domain.user.service.UserService;
import com.ssafy.benepick.global.api.dto.response.ApiMerchantResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class CardServiceImpl implements CardService{

	private final UserService userService;
	private final UserCardRepository userCardRepository;
	private final UserCardService userCardService;
	private final UserCardBenefitRepository userCardBenefitRepository;
	private final UserCardCategory1Repository userCardCategory1Repository;
	private final UserCardCategory2Repository userCardCategory2Repository;
	private final UserCardCategory3Repository userCardCategory3Repository;

	@Override
	public List<UserCardCategory1> findCategory1ListByCardCode(Long cardCode) {
		log.info("CardServiceImpl_findCategory1ByCardCode || 카드 코드 바탕 으로 혜택 정보 찾기");
		return userCardRepository.findByUserCardCode(cardCode).getUserCardCategory1List();
	}


	@Override
	public RecommendCardResponseDto recommendCard(ApiMerchantResponseDto apiMerchantResponseDto, HttpServletRequest request) {
		User user = userService.getUserFromRequest(request);
		String merchantName = apiMerchantResponseDto.getMerchantName();
		String cate1 = apiMerchantResponseDto.getMerchantCategory1();
		String cate2 = apiMerchantResponseDto.getMerchantCategory2();
		String cate3 = apiMerchantResponseDto.getMerchantCategory3();

		String target = "";
		int remainLimitBenefit = 0;
		UserCard recommendCard = null;
		int discountPercent = 0;

		for (UserCard card : userCardRepository.findByUser(user)) {
			for (UserCardCategory1 category1 : userCardCategory1Repository.findByUserCard(card)) {
				if (!category1.getUserCardCategory1Name().equals(cate1)) {
					continue;
				}

				for (UserCardCategory2 category2 : userCardCategory2Repository.findByUserCardCategory1(category1)) {
					if (!category2.getUserCardCategory2Name().equals(cate2)) {
						continue;
					}

					if (cate3.isEmpty()) {
						target = cate2 + " 모든 가맹점";
					} else {
						for (UserCardCategory3 category3 : userCardCategory3Repository.findByUserCardCategory2(category2)) {
							if (category3.getUserCardCategory3Name().equals(cate3)) {
								target = cate3;
								break;
							}
						}
					}

					int prevAmount = card.getUserCardPrevPerformance();
					List<UserCardBenefit> userCardBenefits = userCardBenefitRepository.findByUserCardCategory1(category1);

					for (UserCardBenefit benefit : userCardBenefits) {
						if (isPerformanceInRange(prevAmount, benefit)) {
							if (discountPercent < benefit.getUserCardBenefitDiscountPercent()) {
								discountPercent = benefit.getUserCardBenefitDiscountPercent();
								recommendCard = card;
								remainLimitBenefit = benefit.getUserCardBenefitLimit() - benefit.getUserCardBenefitReceivedAmount();
							}
						}
					}
				}
			}
		}

		if (recommendCard != null) {
			System.out.println(recommendCard.getUserCardName());
			return recommendCard.recommendCardResponseDto(merchantName, target, remainLimitBenefit);
		}

		return null;
	}

	private boolean isPerformanceInRange(int prevAmount, UserCardBenefit userCardBenefit) {
		return prevAmount >= userCardBenefit.getUserCardBenefitPerformanceStart() &&
				prevAmount < userCardBenefit.getUserCardBenefitPerformanceEnd();
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
