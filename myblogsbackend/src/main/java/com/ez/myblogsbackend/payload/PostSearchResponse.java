package com.ez.myblogsbackend.payload;

import java.util.Date;

public interface PostSearchResponse {

    // "postid" column
    public Long getPostid();

    // "categoryid" column
    public Long getCategoryid();

    // "categoryName" column
    public String getCategoryName();

    // "title" column
    public String getTitle();

    // "content" column
    public String getContent();

    // "createDatetime" column
    public Date getCreateDatetime();

    // "creatorid" column
    public Long getCreatorid();

    // "creatorEmail" column
    public String getCreatorEmail();

    // "postStatusid" column
    public long getPostStatusid();

    // "postStatusName" column
    public String getPostStatusName();

}
