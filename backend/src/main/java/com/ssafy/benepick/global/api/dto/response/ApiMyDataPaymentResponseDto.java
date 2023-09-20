package com.ssafy.benepick.global.api.dto.response;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import com.ssafy.benepick.domain.user.entity.UserCard;
import com.ssafy.benepick.domain.user.entity.UserPayment;

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

    public UserPayment toUserPayment(UserCard userCard) {
        return UserPayment.builder()
            .userCard(userCard)
            .userPaymentCategory1(this.getMyDataPaymentCategory1())
            .userPaymentCategory2(this.getMyDataPaymentCategory2())
            .userPaymentDateTime(this.getMyDataPaymentDate())
            .userPaymentAmount(this.getMyDataPaymentAmount())
            .userPaymentMerchantInfo(this.getMyDataPaymentMerchantName())
            .userPaymentReceivedBenefitAmount(this.getMyDataPaymentReceivedBenefitAmount())
            .userPaymentCardCode(this.getMyDataPaymentCardCode())
            .build();
    }
}
