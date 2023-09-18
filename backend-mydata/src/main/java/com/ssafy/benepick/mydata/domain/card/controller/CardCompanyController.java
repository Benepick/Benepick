package com.ssafy.benepick.mydata.domain.card.controller;

import com.ssafy.benepick.mydata.domain.card.service.CardCompanyService;
import com.ssafy.benepick.mydata.global.response.ListResponseResult;
import com.ssafy.benepick.mydata.global.response.ResponseResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@ApiResponses({
	@ApiResponse(responseCode = "200", description = "응답이 성공적으로 반환되었습니다."),
	@ApiResponse(responseCode = "400", description = "응답이 실패하였습니다.",
		content = @Content(schema = @Schema(implementation = ResponseResult.class)))})
@Tag(name = "Card Company Controller", description = "카드사 컨트롤러")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/mydata/card-company")
public class CardCompanyController {

	private final CardCompanyService cardCompanyService;

	@Operation(summary = "전체 카드사 조회", description = "전체 카드사 조회 기능")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "전체 카드사 조회 성공"),
		@ApiResponse(responseCode = "400", description = "전체 카드사 조회 실패"),
	})
	@GetMapping
	public ResponseResult getAllCardCompany() {
		log.info("CardCompanyController_getAllCardCompany");
		return new ListResponseResult<>(cardCompanyService.getAllCardCompany());
	}

}
