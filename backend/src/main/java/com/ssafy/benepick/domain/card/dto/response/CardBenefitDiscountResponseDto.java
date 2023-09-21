package com.ssafy.benepick.domain.card.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "카드 혜택 실적별 할인율 DTO")
public class CardBenefitDiscountResponseDto {

	@Schema(description = "실적 구간", example = "1")
	private int performanceLevel;

	@Schema(description = "할인율", example = "3")
	private int discountPercent;

	@Schema(description = "실적 시작 구간", example = "0")
	private int performanceStart;

	@Schema(description = "실적 끝 구간", example = "100000")
	private int performanceEnd;
}
