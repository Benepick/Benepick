package com.ssafy.benepick.domain.mydata.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "이번달 소비금액 , 받은혜택 반환 DTO")
public class MonthResultResponseDto {

	@Schema(description = "이번달 소비금액", example = "200000")
	private int payAmount;

	@Schema(description = "이번달 받은 혜택", example = "4500")
	private int benefitAmount;

	@Schema(description = "사용금액이 가장 큰 카드 이미지", example = "https://aws~~")
	private String imgUrl;

	@Schema(description = "받은 혜택", example = "1.23")
	private double benefitRate;

	public static MonthResultResponseDto createMonthResultResponseDto(int payAmount , int benefitAmount , String imgUrl){
		return MonthResultResponseDto.builder()
			.payAmount(payAmount)
			.benefitAmount(benefitAmount)
			.imgUrl(imgUrl)
			.benefitRate(Math.round(((double) benefitAmount / payAmount) * 100 * 100.0) / 100.0)
			.build();
	}
}
