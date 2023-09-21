package com.ssafy.benepick.domain.card.service;


import java.util.List;
import org.springframework.stereotype.Service;

import com.ssafy.benepick.domain.card.dto.response.BenefitSearchResponseDto;
import com.ssafy.benepick.domain.card.dto.response.CardBenefitDiscountResponseDto;
import com.ssafy.benepick.domain.card.dto.response.CardBenefitResponseDto;
import com.ssafy.benepick.domain.user.entity.User;
import com.ssafy.benepick.domain.user.entity.UserCard;
import com.ssafy.benepick.domain.user.entity.UserCardBenefit;
import com.ssafy.benepick.domain.user.entity.UserCardCategory1;
import com.ssafy.benepick.domain.user.entity.UserCardCategory2;
import com.ssafy.benepick.domain.user.entity.UserCardCategory3;
import com.ssafy.benepick.domain.user.repository.UserCardRepository;
import com.ssafy.benepick.domain.user.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class CardServiceImpl implements CardService {

	private final UserCardRepository userCardRepository;
	private final UserService userService;

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
				for (int idx = 0; idx < userCardBenefitList.size(); idx++) {
					cardBenefitDiscountResponseDtoList.add(
						userCardBenefitList.get(idx).toCardBenefitDiscountResponseDto(idx + 1));
				}

				result.add(CardBenefitResponseDto.createCardBenefitResponseDto(
					userCardCategory1.getUserCardCategory1Name(),
					cardBenefitDiscountResponseDtoList,
					category2List,
					category3List));
			});

		return result;
	}

	@Override
	public List<BenefitSearchResponseDto> findCardBenefitBySearch(String keyword, HttpServletRequest request) {
		log.info("CardServiceImpl_findCardBenefitBySearch || 키워드로 내 카드 혜택 검색");
		User loginUser = userService.getUserFromRequest(request);
		List<BenefitSearchResponseDto> benefitSearchResponseDtoList = new ArrayList<>();

		// 내가 가진 카드들의 혜택중에서
		// keyword에 일치하는 카테고리 3을 찾아준다.
		// 현재 내 실적구간에 맞는 할인율 + 잔여혜택 제공
		for (UserCard userCard : loginUser.getUserCardList()) {
			boolean isMatch = false;

			for (UserCardCategory1 userCardCategory1 : userCard.getUserCardCategory1List()) {
				for (UserCardCategory2 userCardCategory2 : userCardCategory1.getUserCardCategory2List()) {
					Optional<UserCardCategory3> category3 = userCardCategory2.getUserCardCategory3List()
						.stream()
						.filter(userCardCategory3 -> userCardCategory3.getUserCardCategory3Name().equals(keyword))
						.findFirst();

					if (category3.isEmpty()) continue;
					isMatch = true;

					BenefitSearchResponseDto benefitSearchResponseDto = createBenefitSearchResponseDto(userCard,
						category3.get());
					if(benefitSearchResponseDto == null) break;
					benefitSearchResponseDtoList.add(createBenefitSearchResponseDto(userCard,category3.get()));
					break;
				}
				if(isMatch) break;
			}
		}
		return benefitSearchResponseDtoList;
	}

	private BenefitSearchResponseDto createBenefitSearchResponseDto(UserCard userCard ,UserCardCategory3 category3){
		// 할인 대상 string 만들기
		String discountTarget = buildDiscountTargetString(category3.getUserCardCategory2().getUserCardCategory2Name(),category3.getUserCardCategory2().getUserCardCategory3List());

		//전월 실적을 토대로 알맞은 혜택 구간 할인율,잔여 혜택 찾기
		int userCardPrevPerformance = userCard.getUserCardPrevPerformance();
		for (UserCardBenefit userCardBenefit : category3.getUserCardCategory2()
			.getUserCardCategory1()
			.getUserCardBenefitList()) {

			if(userCardBenefit.getUserCardBenefitPerformanceStart() <= userCardPrevPerformance &&
				userCardPrevPerformance <= userCardBenefit.getUserCardBenefitPerformanceEnd()){

				return BenefitSearchResponseDto.createBenefitSearchResponseDto(
					userCard.getUserCardName(),
					userCard.getUserCardCompanyName(),
					userCard.getUserCardImgUrl(),
					category3.getUserCardCategory3Name(),
					userCardBenefit.getUserCardBenefitDiscountPercent(),
					discountTarget,
					userCardBenefit.getUserCardBenefitLimit() - userCardBenefit.getUserCardBenefitReceivedAmount()
				);
			}
		}
		return null;
	}

	private String buildDiscountTargetString(String category2Name , List<UserCardCategory3> userCardCategory3List){
		List<String> category3List = userCardCategory3List
			.stream()
			.map(userCardCategory3 -> userCardCategory3.getUserCardCategory3Name())
			.collect(Collectors.toList());

		String joinedNames = String.join(",", category3List);
		return category2Name + "(" + joinedNames + " 등)";
	}
}
