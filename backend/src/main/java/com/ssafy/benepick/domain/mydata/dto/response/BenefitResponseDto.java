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
@Schema(description = "카드 혜택 정보 DTO")
public class BenefitResponseDto {

	@Schema(description = "혜택 카테고리", example = "쇼핑")
	private String category;

	@Schema(description = "혜택 할인 %", example = "3.12")
	private double discountPercent;

	public static BenefitResponseDto createBenefitResponseDto(String category , double discountPercent) {
		return BenefitResponseDto.builder()
			.category(category)
			.discountPercent(discountPercent)
			.build();
	}
}
