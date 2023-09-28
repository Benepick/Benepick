package com.ssafy.benepick.domain.card.service;


import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import com.ssafy.benepick.domain.card.dto.response.BenefitSearchResponseDto;
import com.ssafy.benepick.domain.card.dto.response.CardBenefitDiscountResponseDto;
import com.ssafy.benepick.domain.card.dto.response.CardBenefitResponseDto;
import com.ssafy.benepick.domain.card.dto.response.RecommendCardResponseDto;
import com.ssafy.benepick.domain.user.dto.response.UserCardResponseDto;
import com.ssafy.benepick.domain.user.entity.*;
import com.ssafy.benepick.domain.user.repository.*;
import com.ssafy.benepick.domain.user.service.UserCardService;
import com.ssafy.benepick.domain.user.service.UserService;
import com.ssafy.benepick.global.api.dto.response.ApiMerchantResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.cache.annotation.Cacheable;
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
	private final UserPaymentRepository userPaymentRepository;

	@Override
	public List<UserCardCategory1> findCategory1ListByCardCode(Long cardCode) {
		log.info("CardServiceImpl_findCategory1ByCardCode || 카드 코드 바탕 으로 혜택 정보 찾기");
		return userCardRepository.findByUserCardCode(cardCode).getUserCardCategory1List();
	}


	@Override
	@Cacheable(value = "cardBenefit" , key = "#cardId")
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
						.filter(userCardCategory3 -> userCardCategory3.getUserCardCategory3Name().toLowerCase().contains(keyword.toLowerCase()))
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
		return benefitSearchResponseDtoList.stream()
			.sorted(Comparator.comparingInt(BenefitSearchResponseDto::getDiscountPercent).reversed())
			.limit(3)
			.collect(Collectors.toList());
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
					userCard.getUserCardCompanyName(),
					userCard.getUserCardName(),
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

		List<UserCard> userCardList = userCardRepository.findByUser(user);
		for (UserCard card : userCardList) {
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
			return recommendCard.recommendCardResponseDto(true, merchantName, target, discountPercent, remainLimitBenefit);
		}

		Object[][] cardPaymentCnt = new Object[userCardList.size()][2];
		for (int i = 0; i < userCardList.size(); i++) {
			UserCard userCard = userCardList.get(i);
			int paymentCount = userPaymentRepository.findByUserCardIdAndMonth(userCard.getUserCardSerialNumber(), LocalDate.now().getYear(), LocalDate.now().getMonthValue()).size();
			cardPaymentCnt[i][0] = userCard;
			cardPaymentCnt[i][1] = paymentCount;
		}

		// 배열을 paymentCount를 기준으로 내림차순으로 정렬합니다.
		Arrays.sort(cardPaymentCnt, (o1, o2) -> ((Integer) o2[1]).compareTo((Integer) o1[1]));

		for (Object[] cards : cardPaymentCnt) {
			UserCard userCard = (UserCard) cards[0];
			int currentPerformance = userCard.getUserCardCurrentPerformance();
			UserCardCategory1 category1 = userCardCategory1Repository.findByUserCard(userCard).get(0);
			List<UserCardBenefit> userCardBenefits = userCardBenefitRepository.findByUserCardCategory1(category1);
			int remainPerformance = userCardBenefits.get(0).getUserCardBenefitPerformanceStart() - currentPerformance;
			if (remainPerformance > 0) {
				return userCard.recommendCardResponseDto(false, merchantName, target, discountPercent, remainLimitBenefit);
			}
		}
		return null;
	}

	private boolean isPerformanceInRange(int prevAmount, UserCardBenefit userCardBenefit) {
		return prevAmount >= userCardBenefit.getUserCardBenefitPerformanceStart() &&
				prevAmount < userCardBenefit.getUserCardBenefitPerformanceEnd();
	}
}
