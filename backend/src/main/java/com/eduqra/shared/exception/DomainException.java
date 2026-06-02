package com.eduqra.shared.exception;

public class DomainException extends RuntimeException {
    private final String errorCode;

    public DomainException(String message) {
        super(message);
        this.errorCode = "BAD_REQUEST";
    }

    public DomainException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}
