package com.ssafy.benepick.mydata.domain.card.controller;

import com.ssafy.benepick.mydata.domain.card.service.CardService;
import com.ssafy.benepick.mydata.domain.merchant.dto.response.ApiMerchantResponseDto;
import com.ssafy.benepick.mydata.domain.merchant.entity.Merchant;
import com.ssafy.benepick.mydata.domain.merchant.service.MerchantService;
import com.ssafy.benepick.mydata.global.response.ListResponseResult;
import com.ssafy.benepick.mydata.global.response.ResponseResult;
import com.ssafy.benepick.mydata.global.response.SingleResponseResult;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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
@RequestMapping(value = "/card")
public class CardController {

	private final MerchantService merchantService;
	private final CardService cardService;

	@GetMapping("/place")
	public ApiMerchantResponseDto getCardPlace(@RequestParam("x") double x, @RequestParam("y") double y) {
		return merchantService.findNearestMerchant(x, y);
	}

	@Operation(summary = "카드 혜택 검색", description = "카드 혜택 검색")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "카드 혜택 검색 성공"),
		@ApiResponse(responseCode = "400", description = "카드 혜택 검색 실패"),
	})
	@GetMapping("/benefit/{keyword}")
	public ResponseResult searchCardBenefitByKeyword(@PathVariable(value = "keyword") String keyword) {
		log.info("CardController_searchCardBenefitByKeyword");
		return new ListResponseResult<>(cardService.findCardBenefitBySearch(keyword));
	}
}
