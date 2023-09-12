package com.ssafy.benepick.global.exception;

public class NotExistCardCompanyException extends RuntimeException {
	public NotExistCardCompanyException() {
		super(ExceptionCode.NOT_EXIST_CARD_COMPANY_EXCEPTION.getErrorMessage());
	}

	public NotExistCardCompanyException(String message) {
		super(message);
	}
}
