package com.ssafy.benepick.global.exception;

public class BankServerException extends RuntimeException {
    public BankServerException() {
        super(ExceptionCode.BANK_SERVER_EXCEPTION.getErrorMessage());
    }

    public BankServerException(String message) {
        super(message);
    }
}
