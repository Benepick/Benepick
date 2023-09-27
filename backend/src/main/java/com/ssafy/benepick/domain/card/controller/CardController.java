package com.ssafy.benepick.domain.card.controller;

import com.ssafy.benepick.domain.card.dto.response.RecommendCardResponseDto;
import com.ssafy.benepick.domain.user.dto.response.UserCardResponseDto;
import com.ssafy.benepick.global.api.dto.response.ApiMerchantResponseDto;
import com.ssafy.benepick.global.api.service.ApiService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.benepick.domain.card.service.CardService;
import com.ssafy.benepick.global.response.ListResponseResult;
import com.ssafy.benepick.global.response.ResponseResult;

import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@ApiResponses({
	@ApiResponse(responseCode = "200", description = "응답이 성공적으로 반환되었습니다."),
	@ApiResponse(responseCode = "400", description = "응답이 실패하였습니다.",
		content = @Content(schema = @Schema(implementation = ResponseResult.class)))})
@Tag(name = "Card Controller", description = "카드 컨트롤러")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/card")
public class CardController {

	private final CardService cardService;
	private final ApiService apiService;
	@GetMapping("/place")
	public RecommendCardResponseDto getCardPlace(@RequestParam("x") double x, @RequestParam("y") double y, HttpServletRequest request) {
		return cardService.recommendCard(apiService.getNearestMerchant(x, y), request);
	}

	@Operation(summary = "카드 혜택 조회", description = "카드 혜택 조회")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "카드 혜택 조회 성공"),
		@ApiResponse(responseCode = "400", description = "카드 혜택 조회 실패"),
	})
	@GetMapping("/benefit/{cardId}")
	public ResponseResult getCardBenefit(@PathVariable(value = "cardId") Long cardId) {
		log.info("CardController_getCardBenefit");
		return new ListResponseResult<>(cardService.findCardBenefitListByCardId(cardId));
	}

	@Operation(summary = "가맹점 기반 내 카드 혜택 검색", description = "가맹점 기반 내 카드 혜택 검색")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "가맹점 기반 내 카드 혜택 검색 성공"),
		@ApiResponse(responseCode = "400", description = "가맹점 기반 내 카드 혜택 검색 실패"),
	})
	@GetMapping("/benefit/user/{keyword}")
	public ResponseResult searchCardBenefitByKeyword(@PathVariable(value = "keyword") String keyword , HttpServletRequest request) {
		log.info("CardController_searchCardBenefitByKeyword");
		return new ListResponseResult<>(cardService.findCardBenefitBySearch(keyword,request));
	}

	@Operation(summary = "가맹점 기반 전체 카드 혜택 검색", description = "가맹점 기반 전체 카드 혜택 검색")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "가맹점 기반 전체 카드 혜택 검색 성공"),
		@ApiResponse(responseCode = "400", description = "가맹점 기반 전체 카드 혜택 검색 실패"),
	})
	@GetMapping("/benefit/all/{keyword}")
	public ResponseResult searchAllCardBenefitByKeyword(@PathVariable(value = "keyword") String keyword , HttpServletRequest request) {
		log.info("CardController_searchAllCardBenefitByKeyword");
		return new ListResponseResult<>(apiService.searchCardBenefitByKeyword(keyword));
	}
}
