package com.ssafy.benepick.domain.user.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "사용자 카드 조회 결과 DTO")
public class UserCardResponseDto {

    @Schema(description = "카드 ID", example = "64")
    private Long cardId;

    @Schema(description = "카드 종류 번호", example = "133")
    private Long cardCode;

    @Schema(description = "카드 이름", example = "신한 카드 구독 좋아요")
    private String cardName;

    @Schema(description = "카드 만기일", example = "2022-09-01")
    private LocalDate expirationDate;

    @Schema(description = "카드사 명", example = "신한 카드")
    private String cardCompanyName;

    @Schema(description = "카드 이미지 url", example = "www...")
    private String cardImgUrl;

    @Schema(description = "카드 시리얼 넘버", example = "1111-1111-1111")
    private String serialNumber;

    @Schema(description = "카드 현월 실적", example = "7555142")
    private int currentPerformance;

    @Schema(description = "카드 실적 구간", example = "[0, 300, 6000, 10000]")
    private List<Integer> performanceLevels;

    @Schema(description = "카드 현월 실적 단계", example = "2")
    private int currentLevel;

    @Schema(description = "카드 실적 다음 단계 액수", example = "33333")
    private int nextLevelAmount;
}
