package com.ssafy.benepick.mydata.domain.card.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "카드 카테고리1 정보 DTO")
public class ApiCategory1ResponseDto {
    private Long category1Id;
    private String category1Name;
    private List<ApiCategory2ResponseDto> category2List;
    private List<ApiCardBenefitResponseDto> cardBenefitList;
}
