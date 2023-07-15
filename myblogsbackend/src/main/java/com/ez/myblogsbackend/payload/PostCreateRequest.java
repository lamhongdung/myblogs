package com.ez.myblogsbackend.payload;

import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class PostCreateRequest {

    @Min(value = 1, message = "Value of creator id must be greater than or equal to 1")
    private long creatorid;

    @Size(min = 1, message = "Please input a title")
    private String title;

    @Min(value = 1, message = "Value of category id must be greater than or equal to 1")
    private long categoryid;

    @Size(min = 1, message = "Please input a content")
    private String content;

}
