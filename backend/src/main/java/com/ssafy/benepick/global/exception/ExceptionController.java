package com.ssafy.benepick.global.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.ssafy.benepick.global.response.ResponseResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice(basePackages = "com.ssafy.benepick")
public class ExceptionController {

	// @ExceptionHandler(IncorrectLanguageCodeException.class)
	// public ResponseResult incorrectLanguageCodeException(IncorrectLanguageCodeException err) {
	// 	log.info("Error : {}", err.getClass());
	// 	log.info("Error Message : {}", err.getMessage());
	// 	return ResponseResult.exceptionResponse(ExceptionCode.INCORRECT_LANGUAGE_CODE_EXCEPTION);
	// }
}
