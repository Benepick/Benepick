package com.ssafy.benepick.domain.card.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "카드사 정보 DTO")
public class CardCompanyResponseDto {

	@Schema(description = "카드사 ID", example = "2435")
	private Long cardCompanyId;

	@Schema(description = "카드사 이름", example = "신한")
	private String cardCompanyName;

	@Schema(description = "카드사 이미지", example = "https://aws~")
	private String cardCompanyImgUrl;
}
