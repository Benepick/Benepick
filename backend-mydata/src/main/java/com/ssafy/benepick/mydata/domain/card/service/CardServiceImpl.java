package com.ssafy.benepick.mydata.domain.card.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.ssafy.benepick.mydata.domain.card.dto.response.ApiSearchCardBenefitResponseDto;
import com.ssafy.benepick.mydata.domain.card.entity.Card;
import com.ssafy.benepick.mydata.domain.card.entity.CardBenefit;
import com.ssafy.benepick.mydata.domain.card.entity.Category1;
import com.ssafy.benepick.mydata.domain.card.entity.Category3;
import com.ssafy.benepick.mydata.domain.card.repository.Category3Repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class CardServiceImpl implements CardService{

	private final Category3Repository category3Repository;

	@Override
	public List<ApiSearchCardBenefitResponseDto> findCardBenefitBySearch(String keyword) {
		log.info("CardServiceImpl_findCardBenefitBySearch");
		List<Category3> category3List = category3Repository.findByCategory3Name(keyword);
		List<ApiSearchCardBenefitResponseDto> apiSearchCardBenefitResponseDtoList = new ArrayList<>();

		// 만약 키워드와 일치하는 혜택 카드가 없을시 랜덤 3개 카드 추천
		if(category3List.size() == 0){
			category3List = category3Repository.findAll(PageRequest.of(0, 3)).getContent();
		}

		for (Category3 category3 : category3List) {
			// 키워드와 일치하는 혜택을 제공해주는 카드
			Card card = category3.getCategory2().getCategory1().getCard();
			apiSearchCardBenefitResponseDtoList.add(createApiSearchCardBenefitResponseDto(card,category3));
		}

		return apiSearchCardBenefitResponseDtoList.stream()
			.sorted(Comparator.comparingInt(ApiSearchCardBenefitResponseDto::getDiscountPercent).reversed())
			.limit(3)
			.collect(Collectors.toList());
	}

	private ApiSearchCardBenefitResponseDto createApiSearchCardBenefitResponseDto(Card card ,Category3 category3){
		// 할인 대상 string 만들기
		String discountTarget = buildDiscountTargetString(category3.getCategory2().getCategory2Name(),category3.getCategory2().getCategory3List());

		for (CardBenefit cardBenefit : category3.getCategory2().getCategory1().getCardBenefitList()) {
			return ApiSearchCardBenefitResponseDto.createApiSearchCardBenefitResponseDto(
				card.getCardCompany().getCardCompanyName(),
				card.getCardName(),
				card.getCardImgUrl(),
				category3.getCategory3Name(),
				cardBenefit.getCardBenefitDiscountPercent(),
				discountTarget,
				cardBenefit.getCardBenefitLimit()
			);
		}
		return null;
	}

	private String buildDiscountTargetString(String category2Name , List<Category3> category3List){
		List<String> category3StringList = category3List
			.stream()
			.map(category3 -> category3.getCategory3Name())
			.collect(Collectors.toList());

		String joinedNames = String.join(",", category3StringList);
		return category2Name + "(" + joinedNames + " 등)";
	}
}
