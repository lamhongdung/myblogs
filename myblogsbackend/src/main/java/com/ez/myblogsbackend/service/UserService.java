package com.ez.myblogsbackend.service;

import com.ez.myblogsbackend.entity.User;
import com.ez.myblogsbackend.exception.BadDataException;
import com.ez.myblogsbackend.payload.EditProfile;

import javax.persistence.EntityNotFoundException;

public interface UserService {

    // find user by user id
    public User findById(Long id) throws EntityNotFoundException;

    // find user by email
    public User findUserByEmail(String email);

    // check whether user is inactive or not?
    // return:
    //  - not null: inactive user
    //  - null: not inactive user
    public User isInactiveUser(String email) throws BadDataException;

    // create new user(user signs up account)
    public User createUser(User user) throws BadDataException;

    // update user profile
    public User updateProfile(EditProfile editProfile) throws EntityNotFoundException;

}
