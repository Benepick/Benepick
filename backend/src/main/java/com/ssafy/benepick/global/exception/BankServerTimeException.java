package com.ssafy.benepick.global.exception;

public class BankServerTimeException extends RuntimeException {
    public BankServerTimeException() {
        super(ExceptionCode.BANK_SERVER_TIME_EXCEPTION.getErrorMessage());
    }

    public BankServerTimeException(String message) {
        super(message);
    }
}
