package com.ssafy.benepick.domain.mydata.dto.response;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "일별 카드 거래 내역 정보 DTO")
public class DayTransactionResponseDto implements Serializable {

	@Schema(description = "거래 일자", example = "2023-09-15")
	private LocalDate transactionDate;

	@Schema(description = "상세 거래 내역 리스트", example = "")
	private List<TransactionInfoResponseDto> transcationInfoResponseDtoList;

	public static DayTransactionResponseDto createDayTransactionResponseDto(
		LocalDate transactionDate,
		List<TransactionInfoResponseDto> transcationInfoResponseDtoList) {

		return DayTransactionResponseDto.builder()
			.transactionDate(transactionDate)
			.transcationInfoResponseDtoList(transcationInfoResponseDtoList.stream()
				.sorted(Comparator.comparing(TransactionInfoResponseDto::getTransactionTime).reversed())
				.collect(Collectors.toList()))
			.build();
	}
}
