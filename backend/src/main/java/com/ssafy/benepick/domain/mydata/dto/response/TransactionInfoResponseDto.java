package com.ssafy.benepick.domain.mydata.dto.response;

import java.io.Serializable;
import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "상세 거래 내역 정보 DTO")
public class TransactionInfoResponseDto implements Serializable {

	@Schema(description = "거래 카테고리", example = "쇼핑")
	private String category;

	@Schema(description = "상호명", example = "롯데카드")
	private String merchantName;

	@Schema(description = "사용한 금액", example = "15000")
	private int payAmount;

	@Schema(description = "받은 혜택", example = "1500")
	private int benefitAmount;

	@Schema(description = "결제 시간", example = "")
	private LocalDateTime transactionTime;
}
