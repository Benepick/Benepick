package com.ssafy.benepick.global.exception;

public class NotExistLinkCardCompanyException extends RuntimeException {
	public NotExistLinkCardCompanyException() {
		super(ExceptionCode.NOT_EXIST_LINK_CARD_COMPANY_EXCEPTION.getErrorMessage());
	}

	public NotExistLinkCardCompanyException(String message) {
		super(message);
	}
}
