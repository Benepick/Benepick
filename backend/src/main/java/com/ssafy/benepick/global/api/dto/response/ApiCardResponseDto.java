package com.ssafy.benepick.global.api.dto.response;

import com.ssafy.benepick.domain.card.entity.CardCompany;
import com.ssafy.benepick.domain.card.entity.Category1;
import com.ssafy.benepick.domain.mydata.entity.MyDataCard;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "카드 정보 DTO")
public class ApiCardResponseDto {

    private Long cardCode;
    private String cardName;
    private String cardImgUrl;
    private ApiCardCompanyResponseDto apiCardCompanyResponseDto;
//    private List<ApiMyDataCardResponseDto> myDataCardList;
    private List<ApiCategory1ResponseDto> category1List;
}
