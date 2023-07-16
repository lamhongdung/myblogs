package com.ez.myblogsbackend.payload;

import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class PostEditRequest {

    @Min(value = 1, message = "Value of post id must be greater than or equal to 1")
    private long postid;

    @Size(min = 1, max = 100, message = "Length of title must be between 1 and 100 characters")
    private String title;

    @Min(value = 1, message = "Value of category id must be greater than or equal to 1")
    private long categoryid;

    @Size(min = 1, message = "Please input a content")
    private String content;

}
