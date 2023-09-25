package com.ssafy.benepick.mydata.domain.merchant.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "상권 정보 DTO")
public class ApiMerchantResponseDto {
    private Long merchantId;

    private String merchantName;

    private String merchantCategory1;

    private String merchantCategory2;

    private String merchantCategory3;

    private String merchantX;

    private String merchantY;
}
