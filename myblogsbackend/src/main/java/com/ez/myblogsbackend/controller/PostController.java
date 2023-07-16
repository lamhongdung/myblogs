package com.ez.myblogsbackend.controller;

import com.ez.myblogsbackend.exception.BadDataException;
import com.ez.myblogsbackend.payload.*;
import com.ez.myblogsbackend.service.PostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
public class PostController {

    private Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private PostService postService;

    // get categories sidebar(categories and their number of posts).
    //
    // all authenticated users can access this resource.
    @GetMapping("/category-sidebar")
    public ResponseEntity<List<CategorySidebar>> getCategorySidebar() {

        // get all active categories
        List<CategorySidebar> categorySidebars = postService.getCategorySidebar();

        return new ResponseEntity<>(categorySidebars, OK);

    } // end of getCategorySidebar()

    // get all active categories.
    // for loading categories in the "Category" dropdown control
    // in the "Create post", "Edit post" screens.
    //
    // all authenticated users can access this resource.
    @GetMapping("/category-active")
    public ResponseEntity<List<DropdownResponse>> getAllActiveCategories() {

        // get all active categories
        List<DropdownResponse> activeCategories = postService.getAllActiveCategories();

        return new ResponseEntity<>(activeCategories, OK);

    } // end of getAllActiveCategories()

    // search post based on category id
    // for loading posts in the "Post list" screen.
    // categoryid = 0: search all categories.
    // all users(include Guest user) can access this resource.
    @GetMapping("/post-search")
    public ResponseEntity<List<PostSearchResponse>> searchPosts(@RequestParam long pageNumber,
                                                                @RequestParam long pageSize,
                                                                @RequestParam long categoryid
    ) {

        // get posts based on category id.
        List<PostSearchResponse> postResponses =
                postService.searchPosts(pageNumber, pageSize, categoryid);

        return new ResponseEntity<>(postResponses, OK);

    } // end of searchPosts()

    //
    // create a new post.
    //
    // all authenticated users can access this resource.
    @PostMapping("/post-create")
    public ResponseEntity<HttpResponse> createPost(
            @RequestBody @Valid PostCreateRequest postCreateRequest,
            BindingResult bindingResult) throws BindException {

        LOGGER.info("validate data");

        // if postCreateRequest data is invalid then throw exception
        if (bindingResult.hasErrors()) {

            LOGGER.info("PostCreateRequest data is invalid");

            throw new BindException(bindingResult);
        }

        // save post
        HttpResponse httpResponse = postService.createPost(postCreateRequest);

        return new ResponseEntity<>(httpResponse, OK);

    } // end of createPost()

    // find post by id.
    // this method is used for "Edit post" and "View post".
    @GetMapping("/post-list/{id}")
    public ResponseEntity<PostEditViewResponse> getPostById(@PathVariable Long id)
            throws EntityNotFoundException {

        LOGGER.info("find post by id: " + id);

        PostEditViewResponse postEditViewResponse = postService.getPostById(id);

        return new ResponseEntity<>(postEditViewResponse, OK);
    } // end of getPostById()


    // edit existing post.
    //
    @PutMapping("/post-edit")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<HttpResponse> editPost(
            @RequestBody @Valid PostEditRequest postEditRequest, BindingResult bindingResult)
            throws EntityNotFoundException, BindException, BadDataException {

        LOGGER.info("validate data");

        // if postEditRequest data is invalid then throw exception
        if (bindingResult.hasErrors()) {

            LOGGER.info("PostEditRequest data is invalid");

            throw new BindException(bindingResult);
        }

        // update post with new values
        HttpResponse httpResponse = postService.updatePost(postEditRequest);

        return new ResponseEntity<>(httpResponse, OK);

    } // end of editPost()

    // delete a post
    @DeleteMapping("/post-delete/{id}")
    public ResponseEntity<HttpResponse> deletePost(@PathVariable Long id)
            throws EntityNotFoundException {

        HttpResponse httpResponse = postService.deletePost(id);

        return new ResponseEntity<>(httpResponse, OK);

    } // end of deletePostById()

}