package com.ssafy.benepick.mydata.domain.mydata.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "마이 데이터 카드 거래 내역 DTO")
public class ApiMyDataPaymentResponseDto {
    private String myDataPaymentId;
    private LocalDateTime myDataPaymentDate;
    private String myDataPaymentCategory1;
    private int myDataPaymentAmount;
    private String myDataPaymentMerchantName;
    private String myDataPaymentCategory2;
    private int myDataPaymentCardCode;
    private int myDataPaymentReceivedBenefitAmount;
}
