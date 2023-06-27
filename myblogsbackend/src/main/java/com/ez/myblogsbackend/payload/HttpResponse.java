package com.ez.myblogsbackend.payload;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class HttpResponse {

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy hh:mm:ss", timezone = "UTC")
    private Date timeStamp;

    private int statusCode; // ex: 200, 201, 400, 500, ...

    private String message; // ex:" Your request was successful"

    public HttpResponse(int statusCode, String message) {

        this.timeStamp = new Date();
        this.statusCode = statusCode;
        this.message = message;
    }

}
