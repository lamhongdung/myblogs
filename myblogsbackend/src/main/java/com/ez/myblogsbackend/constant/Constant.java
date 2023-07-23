package com.ez.myblogsbackend.constant;

public class Constant {

    //
    // security constants
    //
    public static final long EXPIRATION_TIME = 86_400_000; // 1 day expressed in milliseconds
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String JWT_TOKEN_HEADER = "Jwt-Token";
    public static final String TOKEN_CANNOT_BE_VERIFIED = "Token cannot be verified";
    public static final String AUTHORITIES = "authorities";
    public static final String FORBIDDEN_MESSAGE = "You need to log in to access this page";
    public static final String ACCESS_DENIED_MESSAGE = "You do not have permission to access this page";
    public static final String OPTIONS_HTTP_METHOD = "OPTIONS";

    // these "end points" do not authenticate
    //    public static final String[] PUBLIC_URLS = { "**" };
    public static final String[] PUBLIC_URLS = {
            "/login",
            "/signup", "/user-create",
            "/post-search", "/category-sidebar", "/post-list/*",
            "/contact-send"
    };

    //
    // user constants
    //
    public static final String EMAIL_ALREADY_EXISTS = "Email already exists. Please choose another email.";

    public static final String USER_IS_INACTIVE = "User is inactive. Please contact administrator for help.";
    public static final String FOUND_USER_BY_EMAIL = "Found user by email: ";
    public static final String NO_USER_FOUND_BY_EMAIL = "No user found for email: ";
    public static final String NO_USER_FOUND_BY_ID = "No user found for id: ";

    //
    // Post constants
    //
    public static final String NO_POST_FOUND_BY_ID = "No post found for id: ";


}
