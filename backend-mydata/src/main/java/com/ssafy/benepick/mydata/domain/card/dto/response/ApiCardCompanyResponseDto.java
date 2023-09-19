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
@Schema(description = "카드사 정보 DTO")
public class ApiCardCompanyResponseDto {

    private Long cardCompanyId;
    private String cardCompanyImgUrl;
    private String cardCompanyName;
    private List<ApiCardResponseDto> cardList;
}
