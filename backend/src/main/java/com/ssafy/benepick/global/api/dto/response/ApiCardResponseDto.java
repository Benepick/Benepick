package com.ssafy.benepick.global.api.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "카드 정보 DTO")
public class ApiCardResponseDto implements Serializable {

    private Long cardCode;
    private String cardName;
    private String cardImgUrl;
    private ApiCardCompanyResponseDto apiCardCompanyResponseDto;
//    private List<ApiMyDataCardResponseDto> myDataCardList;
    private List<ApiCategory1ResponseDto> category1List;
}
