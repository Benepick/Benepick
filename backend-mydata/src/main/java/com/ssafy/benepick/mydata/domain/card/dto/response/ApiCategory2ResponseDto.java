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
@Schema(description = "카드 카테고리2 정보 DTO")
public class ApiCategory2ResponseDto {
    private Long category2Id;
    private String category2Name;
    private List<ApiCategory3ResponseDto> category3List;
}
