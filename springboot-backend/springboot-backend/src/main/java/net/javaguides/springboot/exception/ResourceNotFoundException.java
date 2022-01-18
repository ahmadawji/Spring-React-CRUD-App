package net.javaguides.springboot.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

//@ResponseStatus marks a method or exception class with the status code and reason message that should be returned. The status code is applied to the HTTP response when the handler method is invoked
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    //Exceptions Classes or any classes which implements Serializable would need to have SerialUID, so that class that has do be serialized at the time of compiling, and de-serialized at the time of recompiling
    private static final long serialVersionUID = 1L;

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
