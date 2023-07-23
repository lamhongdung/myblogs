package com.ez.myblogsbackend.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
@Entity
@Table(name = "contact")
public class Contact {

    @Id
    // GenerationType.IDENTITY: id is generated by mySQL
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 1, max = 100, message = "Length of the name name must be between 1 and 100 characters")
    private String name;

    @NotBlank(message = "Please input an email")
    @Email(message = "Email is incorrect format")
    private String email;

    // allow to use @Pattern because datatype of phone is String.
    // we cannot use @Pattern if datatype is number(ex: Integer).
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits length")
    private String phone;

    @Size(min = 1, max = 100, message = "Length of the company name must be between 1 and 100 characters")
    private String company;

    @Size(min = 1, message = "Please input a message")
    private String message;

    // the contact is created on this datetime
    @CreationTimestamp
    private Date createDatetime;

    // last date time the contact is updated
    @UpdateTimestamp
    private Date lastUpdateDatetime;

    public Contact(String name, String email, String phone, String company, String message) {

        this.name = name;
        this.email = email;
        this.phone = phone;
        this.company = company;
        this.message = message;

    }

}
