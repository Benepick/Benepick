package com.ssafy.benepick.global.api.dto.response;

import com.ssafy.benepick.domain.user.entity.UserCardBenefit;
import com.ssafy.benepick.domain.user.entity.UserCardCategory1;
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
    private int cardBenefitLimit;
    public UserCardBenefit toUserCardBenefit(UserCardCategory1 userCardCategory1){
        return UserCardBenefit.builder()
                .userCardBenefitPerformanceLevel(cardBenefitPerformanceLevel)
                .userCardBenefitDiscountPercent(cardBenefitDiscountPercent)
                .userCardBenefitPerformanceStart(cardBenefitPerformanceStart)
                .userCardBenefitPerformanceEnd(cardBenefitPerformanceEnd)
                .userCardBenefitLimit(cardBenefitLimit)
                .userCardCategory1(userCardCategory1)
                .build();
    }
}
