package com.ssafy.benepick.domain.card.dto.response;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "카드 혜택 정보 DTO")
public class CardBenefitResponseDto {

	@Schema(description = "카드 혜택 카테고리", example = "편의점")
	private String category1Name;

	@Schema(description = "카드 혜택 실적구간별 할인율", example = "")
	private List<CardBenefitDiscountResponseDto> cardBenefitDiscountResponseDtoList;

	@Schema(description = "카테고리 중분류 이름 리스트")
	private List<String> category2List;

	@Schema(description = "카테고리 소분류 이름 리스트")
	private List<String> category3List;

	public static CardBenefitResponseDto createCardBenefitResponseDto(
			String category1Name ,
			List<CardBenefitDiscountResponseDto> cardBenefitDiscountResponseDtoList,
			List<String> category2List,
			List<String> category3List){
		return CardBenefitResponseDto.builder()
			.category1Name(category1Name)
			.cardBenefitDiscountResponseDtoList(cardBenefitDiscountResponseDtoList)
			.category2List(category2List)
			.category3List(category3List)
			.build();
	}

	public void updateCardBenefitDiscountResponseDtoList(List<CardBenefitDiscountResponseDto> cardBenefitDiscountResponseDtoList){
		this.cardBenefitDiscountResponseDtoList = cardBenefitDiscountResponseDtoList;
	}

}
