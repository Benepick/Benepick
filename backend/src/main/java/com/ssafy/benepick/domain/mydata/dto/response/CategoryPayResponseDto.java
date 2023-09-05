package com.ssafy.benepick.domain.mydata.dto.response;

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
public class CategoryPayResponseDto {

	@Schema(description = "카테고리 이름", example = "쇼핑")
	private String categoryName;

	@Schema(description = "카테고리 이미지", example = "https://aws~")
	private String categoryImgUrl;

	@Schema(description = "카테고리 소비 금액", example = "54500")
	private int amount;



}
