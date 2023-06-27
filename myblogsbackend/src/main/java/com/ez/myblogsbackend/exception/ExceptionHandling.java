package com.ez.myblogsbackend.exception;

import com.ez.myblogsbackend.payload.HttpResponse;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.auth0.jwt.exceptions.TokenExpiredException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.persistence.EntityNotFoundException;
import javax.persistence.NoResultException;
import java.util.Objects;

import static org.springframework.http.HttpStatus.*;

// handle all exceptions.
@RestControllerAdvice
public class ExceptionHandling implements ErrorController {
    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    // ex: proper request method is "POST" but user sends "GET" method
    private static final String METHOD_IS_NOT_ALLOWED = "This request method is not allowed on this endpoint. Please send a '%s' request";
    private static final String INTERNAL_SERVER_ERROR_MSG = "An error occurred while processing the request";
    private static final String EMAIL_OR_PASSWORD_IS_NOT_CORRECT = "Email or password is not correct. Please try again";
    private static final String NOT_ENOUGH_PERMISSION = "You do not have enough permission";

    // handle error of "Whitelabel error page".
    public static final String ERROR_PATH = "/error";

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<HttpResponse> badCredentialsException() {
        return createHttpResponse(BAD_REQUEST, EMAIL_OR_PASSWORD_IS_NOT_CORRECT);
    }

    // handle errors of invalid data.
    // these errors are caught by "spring-boot-starter-validation".
    @ExceptionHandler(BindException.class)
    public ResponseEntity<HttpResponse> handleBindException(BindException e) {

        String errorMessage = "Data is invalid";

        // if there are many errors then get the first error
        if (e.getBindingResult().hasErrors())
            errorMessage = e.getBindingResult().getAllErrors().get(0).getDefaultMessage();

        return createHttpResponse(BAD_REQUEST, errorMessage);
    }

    //
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<HttpResponse> accessDeniedException() {
        return createHttpResponse(FORBIDDEN, NOT_ENOUGH_PERMISSION);
    }

    @ExceptionHandler(TokenExpiredException.class)
    public ResponseEntity<HttpResponse> tokenExpiredException(TokenExpiredException exception) {
        return createHttpResponse(UNAUTHORIZED, exception.getMessage());
    }

    // handle errors of invalid data.
    // these errors are caught own developer.
    @ExceptionHandler(BadDataException.class)
    public ResponseEntity<HttpResponse> badDataException(BadDataException exception) {
        return createHttpResponse(BAD_REQUEST, exception.getMessage());
    }

    // Error of "Entity not found"
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<HttpResponse> entityNotFoundException(EntityNotFoundException exception) {
        return createHttpResponse(BAD_REQUEST, exception.getMessage());
    }

    // wrong request method.
    // ex: proper request method is "POST" but user sends "GET" method
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<HttpResponse> methodNotSupportedException(HttpRequestMethodNotSupportedException exception) {
        HttpMethod supportedMethod = Objects.requireNonNull(exception.getSupportedHttpMethods()).iterator().next();

        // "This request method is not allowed on this endpoint. Please send a '%s' request"
        // Pass supportedMethod(POST, GET,...) into param %s
        return createHttpResponse(METHOD_NOT_ALLOWED, String.format(METHOD_IS_NOT_ALLOWED, supportedMethod));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<HttpResponse> internalServerErrorException(Exception exception) {
        LOGGER.info(exception.getMessage());
        return createHttpResponse(INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR_MSG);
    }

    @ExceptionHandler(NoResultException.class)
    public ResponseEntity<HttpResponse> notFoundException(NoResultException exception) {
        LOGGER.info(exception.getMessage());
        return createHttpResponse(NOT_FOUND, exception.getMessage());
    }

    private ResponseEntity<HttpResponse> createHttpResponse(HttpStatus httpStatus, String message) {

        return new ResponseEntity<>(new HttpResponse(httpStatus.value(), message), httpStatus);

    }

    // handle for bad URL(error of "Whitelabel error page")
    @RequestMapping(ERROR_PATH)
    public ResponseEntity<HttpResponse> notFound404() {
        return createHttpResponse(NOT_FOUND, "There is no mapping for this URL");
    }

    //
    // handle error of "Whitelabel error page".
    //
    // this getErrorPath() method belongs to interface ErrorController.
    // when user access wrong URL then redirect to ERROR_PATH(value = "/error")
    @Override
    public String getErrorPath() {
        return ERROR_PATH;
    }

}
