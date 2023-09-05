package com.ssafy.benepick.domain.mydata.dto.response;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "이번달 카테고리 소비 금액 DTO")
public class MonthCategoryResultResponseDto {

	@Schema(description = "이번달 총 소비 금액", example = "150000")
	private int totalAmount;

	@Schema(description = "카테고리 이름,소비금액")
	private List<CategoryPayResponseDto> categoryResultResponseDtoList;
}
