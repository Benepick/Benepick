package com.ssafy.benepick.mydata.domain.mydata.controller;

import java.time.LocalDateTime;

import com.ssafy.benepick.mydata.domain.mydata.dto.request.ApiMyDataCardRequestDto;
import com.ssafy.benepick.mydata.domain.mydata.service.MyDataService;
import com.ssafy.benepick.mydata.global.response.ResponseResult;
import com.ssafy.benepick.mydata.global.response.SingleResponseResult;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;
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
@Tag(name = "MyData Controller", description = "마이데이터 컨트롤러")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/bank/mydata")
public class MyDataController {

	private final MyDataService myDataService;

	@Operation(summary = "마이 데이터 카드 조회", description = "마이 데이터 카드 조회 기능")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "마이 데이터 카드 조회 성공"),
			@ApiResponse(responseCode = "400", description = "마이 데이터 카드 조회 실패"),
	})
	@GetMapping
	public ResponseResult getMyDataCardList(@RequestParam Long cardCompanyId , @RequestParam String userId) {
		log.info("MyDataController_getMyDataCardList");
		return new SingleResponseResult<>(myDataService.getMyDataCard(cardCompanyId , userId));
	}

	@Operation(summary = "마이 데이터 거래 내역 데이터 갱신", description = "마이 데이터 거래 내역 데이터 갱신 기능")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "마이 데이터 거래 내역 데이터 갱신 성공"),
		@ApiResponse(responseCode = "400", description = "마이 데이터 거래 내역 데이터 갱신 실패"),
	})
	@GetMapping("/renewal")
	public ResponseResult getTransactionDataAfterLastRenewalTime(@RequestParam Long cardCompanyId , @RequestParam String userId , @RequestParam LocalDateTime lastRenewalTime) {
		log.info("MyDataController_getTransactionDataAfterLastRenewalTime");
		return new SingleResponseResult<>(myDataService.getTransactionDataAfterLastRenewalTime(cardCompanyId,userId,lastRenewalTime));
	}
}
