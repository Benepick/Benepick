package com.ssafy.benepick.global.exception;

public class NotExistUserCiException extends RuntimeException {
	public NotExistUserCiException() {
		super(ExceptionCode.NOT_EXIST_USER_CI_EXCEPTION.getErrorMessage());
	}

	public NotExistUserCiException(String message) {
		super(message);
	}
}
