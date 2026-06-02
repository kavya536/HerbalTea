package com.eduqra.shared.exception;

public class ResourceNotFoundException extends DomainException {
    
    public ResourceNotFoundException(String message) {
        super(message, "NOT_FOUND");
    }
}
