package com.ssafy.benepick.global.exception;

public class NotExistAccessTokenException extends RuntimeException {
	public NotExistAccessTokenException() {
		super(ExceptionCode.NOT_EXIST_ACCESS_TOKEN_EXCEPTION.getErrorMessage());
	}

	public NotExistAccessTokenException(String message) {
		super(message);
	}
}
