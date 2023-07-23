package com.ez.myblogsbackend.repository;

import com.ez.myblogsbackend.entity.Post;
import com.ez.myblogsbackend.payload.CategorySidebar;
import com.ez.myblogsbackend.payload.DropdownResponse;
import com.ez.myblogsbackend.payload.PostEditViewResponse;
import com.ez.myblogsbackend.payload.PostSearchResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface PostRepository extends JpaRepository<Post, Long> {

    // get category sidebar(categories and their number of posts)
    @Query(value = "" +
            " {call sp_post_categorySidebar()} "
            , nativeQuery = true)
    public List<CategorySidebar> getCategorySidebar();

    // get all active categories.
    // notes:
    // interface DropdownResponse contains 2 fields:
    //  - id: getId()
    //  - description: getDescription()
    @Query(value = "" +
            " select a.id as id, " + // category id
            "        concat(a.id, ' - ', a.name) as description " +
            " from category a " +
            " where a.status = 'Active' "
            , nativeQuery = true)
    public List<DropdownResponse> getAllActiveCategories();

    // get posts based on category id
    @Query(value = "" +
            " {call sp_post_searchPosts( " +
            "                           :pageNumber, " +
            "                           :pageSize, " +
            "                           :categoryid " +
            "                           )} "
            , nativeQuery = true)
    public List<PostSearchResponse> searchPosts(@Param("pageNumber") long pageNumber,
                                                @Param("pageSize") long pageSize,
                                                @Param("categoryid") long categoryid
    );

    // get post by postid.
    @Query(value = "" +
            " {call sp_post_getPostById(:postid)} "
            , nativeQuery = true)
    public PostEditViewResponse getPostById(@Param("postid") long postid);

}