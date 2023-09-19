package com.ssafy.benepick.domain.user.controller;

import com.ssafy.benepick.domain.user.dto.response.UserCardResponseDto;
import com.ssafy.benepick.domain.user.service.UserCardService;
import com.ssafy.benepick.global.response.ResponseResult;
import com.ssafy.benepick.global.response.SingleResponseResult;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@ApiResponses({
        @ApiResponse(responseCode = "200", description = "응답이 성공적으로 반환되었습니다."),
        @ApiResponse(responseCode = "400", description = "응답이 실패하였습니다.",
                content = @Content(schema = @Schema(implementation = ResponseResult.class)))})
@Tag(name = "UserCard Controller", description = "유저 카드 컨트롤러")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/user/card")
public class UserCardController {
    private final UserCardService userCardService;
    // @GetMapping()
    // public ResponseResult getUserCards(HttpServletRequest request) {
    //     log.info("UserController_getUserCards -> 사용자 보유 카드 목록 조회");
    //     return new SingleResponseResult<List<UserCardResponseDto>>(userCardService.getUserCards(request));
    // }
}
