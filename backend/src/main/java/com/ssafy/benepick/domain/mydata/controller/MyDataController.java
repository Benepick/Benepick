package com.ssafy.benepick.domain.mydata.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.benepick.domain.mydata.service.MyDataService;
import com.ssafy.benepick.domain.user.dto.request.ChangePasswordRequestDto;
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
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@ApiResponses({
	@ApiResponse(responseCode = "200", description = "응답이 성공적으로 반환되었습니다."),
	@ApiResponse(responseCode = "400", description = "응답이 실패하였습니다.",
		content = @Content(schema = @Schema(implementation = ResponseResult.class)))})
@Tag(name = "MyData Controller", description = "마이데이터 컨트롤러")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/mydata")
public class MyDataController {

	private final MyDataService myDataService;

	@Operation(summary = "사용자의 이번달 소비금액 조회", description = "사용자의 이번달 소비금액과 받은 혜택값 조회")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "이번달 소비내역 조회 성공"),
		@ApiResponse(responseCode = "400", description = "이번달 소비내역 조회 실패"),
	})
	@GetMapping("/card/payment")
	public ResponseResult getMonthResult(HttpServletRequest request) {
		log.info("MyDataController_getUserCardInMyData");
		return new SingleResponseResult<>(myDataService.getMonthResult(request));
	}

	@Operation(summary = "사용자의 최근 4달 소비금액,받은혜택 조회", description = "사용자의 최근 4달 소비금액,받은혜택 조회")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "최근 4달 소비금액,받은혜택 조회 성공"),
		@ApiResponse(responseCode = "400", description = "최근 4달 소비금액,받은혜택 조회 실패"),
	})
	@GetMapping("/card/payment/recent")
	public ResponseResult getRecentFourMonthResult(HttpServletRequest request) {
		log.info("MyDataController_getRecentFourMonthResult");
		return new ListResponseResult<>(myDataService.getRecentFourMonthResult(request));
	}

	@Operation(summary = "이번달 카테고리별 전체 소비금액 조회", description = "이번달 사용자의 카테고리별 전체 소비금액 조회")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "카테고리별 전체 소비금액 조회 성공"),
		@ApiResponse(responseCode = "400", description = "카테고리별 전체 소비금액 조회 실패"),
	})
	@GetMapping("/card/payment/category")
	public ResponseResult getMonthCategoryResult(HttpServletRequest request) {
		log.info("MyDataController_getMonthCategoryResult");
		return new SingleResponseResult<>(myDataService.getMonthCategoryResult(request));
	}

	@Operation(summary = "사용자의 카드 상세 조회", description = "사용자의 카드 상세 조회")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "카드 상세 조회 성공"),
		@ApiResponse(responseCode = "400", description = "카드 상세 조회 실패"),
	})
	@GetMapping("/card/payment/{cardId}")
	public ResponseResult getUserCardInfo(
				@PathVariable(name = "cardId") Long cardId,
				@RequestParam(name = "year") int year,
				@RequestParam(name = "month") int month,
				HttpServletRequest request) {
		log.info("MyDataController_getUserCardInfo");
		return new SingleResponseResult<>(myDataService.getMonthCategoryResult(request));
	}
}
