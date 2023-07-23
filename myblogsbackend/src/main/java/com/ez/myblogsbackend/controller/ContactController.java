package com.ez.myblogsbackend.controller;

import com.ez.myblogsbackend.entity.Contact;
import com.ez.myblogsbackend.exception.BadDataException;
import com.ez.myblogsbackend.payload.*;
import com.ez.myblogsbackend.service.ContactService;
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
public class ContactController {

    private Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private ContactService contactService;

    //
    // create a new post.
    //
    // all authenticated users can access this resource.
    @PostMapping("/contact-send")
    public ResponseEntity<HttpResponse> saveContact(
            @RequestBody @Valid Contact contact,
            BindingResult bindingResult) throws BindException {

        LOGGER.info("validate data");

        // if postCreateRequest data is invalid then throw exception
        if (bindingResult.hasErrors()) {

            LOGGER.info("PostCreateRequest data is invalid");

            throw new BindException(bindingResult);
        }

        // save post
        HttpResponse httpResponse = contactService.saveContact(contact);

        return new ResponseEntity<>(httpResponse, OK);

    } // end of createPost()

}
