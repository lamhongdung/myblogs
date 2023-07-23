package com.ez.myblogsbackend.service;

import com.ez.myblogsbackend.entity.Post;
import com.ez.myblogsbackend.exception.BadDataException;
import com.ez.myblogsbackend.payload.*;
import com.ez.myblogsbackend.repository.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

import static com.ez.myblogsbackend.constant.Constant.NO_POST_FOUND_BY_ID;
import static org.springframework.http.HttpStatus.OK;

@Service
public class PostService {
    private Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private PostRepository postRepository;

    //
    // sidebar menu.
    //
    // get category sidebar(categories and their number of posts)
    public List<CategorySidebar> getCategorySidebar() {

        LOGGER.info("Get category sidebar)");

        return postRepository.getCategorySidebar();

    } // end of getCategorySidebar()

    // get all active categories
    public List<DropdownResponse> getAllActiveCategories() {

        LOGGER.info("Get all active categories)");

        return postRepository.getAllActiveCategories();

    } // end of getAllActiveCategories()

    // search posts by category id.
    public List<PostSearchResponse> searchPosts(long pageNumber, long pageSize, long categoryid) {

        LOGGER.info("Get posts based on category id");

        return postRepository.searchPosts(pageNumber, pageSize, categoryid);

    } // end of searchPosts()

    // create a new post.
    public HttpResponse createPost(PostCreateRequest postCreateRequest) {

        LOGGER.info("create a new post");
        LOGGER.info("Post is sent from client: " + postCreateRequest.toString());

        Post post = new Post();
        post.setCreatorid(postCreateRequest.getCreatorid());
        post.setTitle(postCreateRequest.getTitle());
        post.setCategoryid(postCreateRequest.getCategoryid());
        post.setContent(postCreateRequest.getContent());

        // 'Publish' status
        post.setPostStatusid(1);

        // save new post into the "post" table in database.
        postRepository.save(post);

        return new HttpResponse(OK.value(), "Post is created successful!");

    }

    // get post by post id.
    public PostEditViewResponse getPostById(Long id) {

        return postRepository.getPostById(id);

    } // end of getPostById()

    // update existing post.
    public HttpResponse updatePost(PostEditRequest postEditRequest)
            throws EntityNotFoundException, BadDataException {

        LOGGER.info("Update post");
        LOGGER.info("Post is sent from client: " + postEditRequest.toString());
        LOGGER.info("Post id: " + postEditRequest.getPostid());

        // get existing post
        Post existingPost = postRepository.findById(postEditRequest.getPostid())
                .orElseThrow(() -> new EntityNotFoundException(NO_POST_FOUND_BY_ID + postEditRequest.getPostid()));

        LOGGER.info("Existing post:" + existingPost.toString());

        // set new values to existing post
        existingPost.setTitle(postEditRequest.getTitle());
        existingPost.setCategoryid(postEditRequest.getCategoryid());
        existingPost.setContent(postEditRequest.getContent());

        postRepository.save(existingPost);

        return new HttpResponse(OK.value(),
                "Post '" + postEditRequest.getPostid() + "' was updated successful.");

    } // end of updatePost()

    // delete a post by its id
    public HttpResponse deletePost(Long id)
            throws EntityNotFoundException {

        // delete post by its id
        postRepository.deleteById(id);

        return new HttpResponse(OK.value(),
                "Post with id = " + id + "' was deleted successful.");

    } // end of deletePost()

}
