package com.ez.myblogsbackend.payload;

import lombok.*;

import javax.validation.constraints.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class EditProfile {

    @Min(value = 1, message = "Value of id must be greater than or equal to 1")
    private Long id;

    @NotBlank(message = "Email must have value")
    @Email(message = "Email is incorrect format")
    private String email;

    @Size(min = 1, max = 50, message = "Length of the first name must be between 1 and 50 characters")
    private String firstName;

    @Size(min = 1, max = 50, message = "Length of last name must be between 1 and 50 characters")
    private String lastName;

    // allow to use @Pattern because datatype of phone is String.
    // we cannot use @Pattern if datatype is number(ex: Integer).
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits length")
    private String phone;

    @Size(max = 100, message = "Length of address is no longer than 100 characters")
    private String address;

}
