package com.ez.myblogsbackend.payload;

import java.util.Date;

public interface PostEditViewResponse {

    // "postid" column
    Long getPostid();

    // "creator id + creator email" column
    String getCreator();

    // "title" column
    String getTitle();

    // "content" column
    String getContent();

    // "createDatetime" column
    Date getCreateDatetime();

    // "lastUpdateDatetime" column
    Date getLastUpdateDatetime();

    // "categoryid" column
    long getCategoryid();

    public String getCategoryName();

}
