package com.ssafy.benepick.global.api.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "전체 카드 혜택 검색 결과 DTO")
public class ApiSearchCardBenefitResponseDto implements Serializable {

	@Schema(description = "카드사 이름", example = "삼성")
	private String cardCompanyName;

	@Schema(description = "카드 이름", example = "taptap DIGITAL")
	private String cardName;

	@Schema(description = "카드 이미지", example = "1")
	private String cardImgUrl;

	@Schema(description = "예상 혜택 카테고리", example = "스타벅스")
	private String category;

	@Schema(description = "예상 혜택 할인율", example = "3")
	private int discountPercent;

	@Schema(description = "할인 대상", example = "카페(스타벅스,메가커피,바나프레소 등)")
	private String discountTarget;

	@Schema(description = "한도 혜택", example = "1500")
	private int benefitLimit;
}
