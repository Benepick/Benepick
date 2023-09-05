package com.ssafy.benepick.domain.mydata.dto.response;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "특정 년,월의 소비금액,받은혜택 정보 DTO")
public class RecentMonthResponseDto {

	@Schema(description = "특정 년", example = "2023")
	private int year;

	@Schema(description = "특정 월", example = "8")
	private int month;

	@Schema(description = "특정 년,월 소비금액", example = "200000")
	private int payAmount;

	@Schema(description = "특정 년,월 받은 혜택", example = "4500")
	private int benefitAmount;

}
