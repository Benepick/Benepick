package com.ssafy.benepick.domain.card.dto.request;

import java.util.List;

import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "카드사 연동 및 갱신 리스트 DTO")
public class LinkAndRenewCardCompanyRequestDto {

	@ArraySchema(schema = @Schema(example ="[\"1\", \"3\"]"))
	private List<Long> cardCompanyIdList;
}
