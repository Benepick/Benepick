package com.ssafy.benepick.domain.mydata.dto.response;

import java.io.Serializable;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.benepick.domain.user.entity.UserCard;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "카드 상세 정보 DTO")
public class CardInfoResponseDto implements Serializable {

	@Schema(description = "카드사 이름", example = "롯데카드")
	private String cardCompanyName;

	@Schema(description = "카드 이름", example = "LOCA 365 카드")
	private String cardName;

	@Schema(description = "카드 이미지 URL", example = "https://~")
	private String cardImgUrl;

	@Schema(description = "이번달 총 카드 사용 금액", example = "150000")
	private int totalAmount;

	@Schema(description = "이번달 총 받은 혜택 금액", example = "2000")
	private int totalBenefit;

	@Schema(description = "카드 거래 내역 리스트", example = "")
	private List<DayTransactionResponseDto> dayTransactionResponseDtoList;

	public static CardInfoResponseDto createCardInfoResponseDto(
		UserCard userCard ,int[] monthResult , List<DayTransactionResponseDto> dayTransactionResponseDtoList){

		return CardInfoResponseDto.builder()
			.cardCompanyName(userCard.getUserCardCompanyName())
			.cardName(userCard.getUserCardName())
			.cardImgUrl(userCard.getUserCardImgUrl())
			.totalAmount(monthResult[0])
			.totalBenefit(monthResult[1])
			.dayTransactionResponseDtoList(dayTransactionResponseDtoList.stream()
				.sorted(Comparator.comparing(DayTransactionResponseDto::getTransactionDate).reversed())
				.collect(Collectors.toList()))
			.build();
	}
}
