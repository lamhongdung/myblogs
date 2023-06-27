package com.ez.myblogsbackend.payload;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class LoginUser {

    @Email(message = "Email is incorrect format")
    private String email;

    @NotBlank(message = "Password must have value")
    private String password;

}
