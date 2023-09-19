package com.ssafy.benepick.mydata.global.exception;

import com.ssafy.benepick.mydata.global.response.ResponseResult;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice(basePackages = "com.ssafy.benepick.mydata")
public class ExceptionController {

	@ExceptionHandler(Exception.class)
	public ResponseResult ExistUserException(Exception err) {
		log.info("Error : {}", err.getClass());
		log.info("Error Message : {}", err.getMessage());
		return ResponseResult.exceptionResponse(ExceptionCode.EXIST_USER_EXCEPTION);
	}


}
