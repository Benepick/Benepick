package com.ssafy.benepick.domain.mydata.dto.response;

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
public class CardInfoResponseDto {

	@Schema(description = "카드사 이름", example = "롯데카드")
	private String cardCompanyName;

	@Schema(description = "카드 이름", example = "LOCA 365 카드")
	private String cardName;

	@Schema(description = "카드 이미지 URL", example = "https://~")
	private String cardImgUrl;

	@Schema(description = "카테고리 이름", example = "쇼핑")
	private int card;

}
