package com.ssafy.benepick.global.api.dto.request;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "마이 데이터 카드 요청 DTO")
public class ApiMyDataCardRequestDto {

    private Long cardCompanyId;
    private String userId;
}
