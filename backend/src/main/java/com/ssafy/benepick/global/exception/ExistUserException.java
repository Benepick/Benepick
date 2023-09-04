package com.ssafy.benepick.global.exception;

public class ExistUserException extends RuntimeException {
	public ExistUserException() {
		super(ExceptionCode.EXIST_USER_EXCEPTION.getErrorMessage());
	}

	public ExistUserException(String message) {
		super(message);
	}
}
