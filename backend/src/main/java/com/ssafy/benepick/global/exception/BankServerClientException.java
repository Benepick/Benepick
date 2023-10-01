package com.ssafy.benepick.global.exception;

public class BankServerClientException extends RuntimeException {
    public BankServerClientException() {
        super(ExceptionCode.BANK_SERVER_CLIENT_EXCEPTION.getErrorMessage());
    }

    public BankServerClientException(String message) {
        super(message);
    }
}
