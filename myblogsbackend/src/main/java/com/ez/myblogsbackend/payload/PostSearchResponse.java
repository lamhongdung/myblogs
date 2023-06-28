package com.ez.myblogsbackend.payload;

import java.util.Date;

public interface PostSearchResponse {

    // "postid" column
    public Long getPostid();

    // "title" column
    public String getTitle();

    // "creatorName" column
    public String getCreatorName();

    // "createDatetime" column
    public Date getCreateDatetime();

    // "postStatusName" column
    public String getPostStatusName();

    // "lastUpdateDatetime" column
    public Date getLastUpdateDatetime();

    // "creatorEmail" column
    public String getCreatorEmail();

    // "categoryName" column
    public String getCategoryName();

    // "content" column
    public String getContent();

    // "postStatusid" column
    public long getPostStatusid();

}
