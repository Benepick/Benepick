package com.ssafy.benepick.domain.card.controller;

import java.util.List;

import com.ssafy.benepick.global.api.service.ApiService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.benepick.domain.card.dto.request.LinkAndRenewCardCompanyRequestDto;
import com.ssafy.benepick.domain.card.service.CardCompanyService;
import com.ssafy.benepick.global.response.ListResponseResult;
import com.ssafy.benepick.global.response.ResponseResult;
import com.ssafy.benepick.global.response.SingleResponseResult;

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
@RequestMapping(value = "/api/card-company")
public class CardCompanyController {

	private final CardCompanyService cardCompanyService;
	private final ApiService apiService;

	@Operation(summary = "전체 카드사 조회", description = "전체 카드사 조회 기능")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "전체 카드사 조회 성공"),
		@ApiResponse(responseCode = "400", description = "전체 카드사 조회 실패"),
	})
	@GetMapping
	public ResponseResult getAllCardCompany(@RequestParam(value = "isSignUp") int isSignUp,HttpServletRequest request) {
		log.info("CardCompanyController_getAllCardCompany");
		return new ListResponseResult<>(cardCompanyService.getAllCardCompany(isSignUp , request));
	}


	@Operation(summary = "카드사 연동", description = "사용자가 카드사 연동 및 갱신")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "카드사 연동 및 갱신 성공"),
		@ApiResponse(responseCode = "400", description = "카드사 연동 및 갱신 실패"),
		@ApiResponse(responseCode = "450", description = "입력받은 카드사 ID와 일치하는 카드사가 존재하지 않음")
	})
	@PostMapping
	public ResponseResult linkAndRenewCardCompany(@RequestBody LinkAndRenewCardCompanyRequestDto linkAndRenewCardCompanyRequestDto , HttpServletRequest request) {
		log.info("CardCompanyController_linkAndRenewCardCompany");
		cardCompanyService.linkAndRenewCardCompany(linkAndRenewCardCompanyRequestDto , request);
		return ResponseResult.successResponse;
	}

	@Operation(summary = "카드사 연동 해제", description = "카드사 연동 해제")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "카드사 연동 해제 성공"),
		@ApiResponse(responseCode = "400", description = "카드사 연동 해제 실패"),
		@ApiResponse(responseCode = "451", description = "연동 해제하려는 카드사가 연동되어있지 않음")
	})
	@DeleteMapping("/{cardCompanyId}")
	public ResponseResult cancelCardCompanyLink(@PathVariable(value = "cardCompanyId") Long cardCompanyId, HttpServletRequest request) {
		log.info("CardCompanyController_cancelCardCompanyLink");
		cardCompanyService.cancelLinkCardCompany(cardCompanyId, request);
		return ResponseResult.successResponse;
	}
}
