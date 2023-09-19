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
@Schema(description = "카드 카테고리3 정보 DTO")
public class ApiCategory3ResponseDto {
    private Long category3Id;
    private String category3Name;
}
