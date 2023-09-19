package com.ssafy.benepick.mydata.domain.card.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "카드 혜택 DTO")
public class ApiCardBenefitResponseDto {

    private Long cardBenefitPerformanceLevel;
    private int cardBenefitDiscountPercent;
    private int cardBenefitPerformanceStart;
    private int cardBenefitPerformanceEnd;

}
