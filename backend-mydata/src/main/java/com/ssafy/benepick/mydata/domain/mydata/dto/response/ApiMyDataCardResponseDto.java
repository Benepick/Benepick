package com.ssafy.benepick.mydata.domain.mydata.dto.response;

import com.ssafy.benepick.mydata.domain.card.dto.response.ApiCardResponseDto;
import com.ssafy.benepick.mydata.domain.card.entity.Card;
import com.ssafy.benepick.mydata.domain.mydata.entity.MyDataPayment;
import com.ssafy.benepick.mydata.domain.mydata.entity.MyDataUser;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "마이 데이터 카드 DTO")
public class ApiMyDataCardResponseDto {
    private String myDataCardId;
    private LocalDate myDataCardExpirationDate;
    private int myDataCardPrevMonthAmount;
    private ApiCardResponseDto apiCardResponseDto;
    private ApiMyDataUserResponseDto apiMyDataUserResponseDto;
    private List<ApiMyDataPaymentResponseDto> apiMyDataPaymentResponseDtoList;
}
