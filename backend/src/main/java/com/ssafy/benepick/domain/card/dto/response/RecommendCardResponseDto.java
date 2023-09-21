package com.ssafy.benepick.domain.card.dto.response;

import com.ssafy.benepick.domain.user.entity.UserCard;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "추천 카드 정보 DTO")
public class RecommendCardResponseDto {
    @Schema(description = "가맹점 명", example = "스타벅스 역삼점")
    private String merchantName;

    @Schema(description = "카드 이름", example = "신한 카드 구독 좋아요")
    private String cardName;

    @Schema(description = "카드사 명", example = "신한 카드")
    private String cardCompanyName;

    @Schema(description = "카드 이미지 url", example = "www...")
    private String cardImgUrl;

    @Schema(description = "카드 시리얼 넘버", example = "1111-1111-1111")
    private String serialNumber;

    @Schema(description = "할인 대상", example = "스타벅스")
    private String discountTarget;

    @Schema(description = "잔여한도", example = "12000")
    private int remainLimitBenefit;
}
