package com.ssafy.benepick.mydata.domain.card.dto.response;

import com.ssafy.benepick.mydata.domain.mydata.dto.response.ApiMyDataCardResponseDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Schema(description = "카드 정보 DTO")
public class ApiCardResponseDto {

    private Long cardCode;
    private String cardName;
    private String cardImgUrl;
//    private List<ApiMyDataCardResponseDto> myDataCardList;
    private ApiCardCompanyResponseDto apiCardCompanyResponseDto;
    private List<ApiCategory1ResponseDto> category1List;
}
