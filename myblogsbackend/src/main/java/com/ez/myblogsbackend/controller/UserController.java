package com.ez.myblogsbackend.controller;

import com.ez.myblogsbackend.entity.User;
import com.ez.myblogsbackend.entity.UserPrincipal;
import com.ez.myblogsbackend.exception.BadDataException;
import com.ez.myblogsbackend.exception.ExceptionHandling;
import com.ez.myblogsbackend.payload.EditProfile;
import com.ez.myblogsbackend.payload.HttpResponse;
import com.ez.myblogsbackend.payload.LoginUser;
import com.ez.myblogsbackend.service.UserService;
import com.ez.myblogsbackend.utility.JWTTokenProvider;
import com.sun.xml.internal.messaging.saaj.packaging.mime.MessagingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;

import static com.ez.myblogsbackend.constant.Constant.*;
import static org.springframework.http.HttpStatus.OK;

@RestController
public class UserController extends ExceptionHandling {

    private Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JWTTokenProvider jwtTokenProvider;

    // user logins to the myblogs system.
    // all users can access this end point "/login"
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody @Valid LoginUser loginUser,
                                      BindingResult bindingResult)
            throws BindException, BadDataException {

        LOGGER.info("validate data");

        // if loginUser data is invalid then throw exception
        if (bindingResult.hasErrors()) {

            LOGGER.info("LoginUser data is invalid");

            throw new BindException(bindingResult);
        }

        // if user is inactive then show error to user
        if (userService.isInactiveUser(loginUser.getEmail()) != null) {

            LOGGER.info("User is inactive");

            throw new BadDataException(USER_IS_INACTIVE);
        }

        // if username or password is invalid then throw an exception.
        // if there are no exception was thrown then authenticate successful.
        authenticate(loginUser.getEmail(), loginUser.getPassword());

        // get user by user email
        User user = userService.findUserByEmail(loginUser.getEmail());

        // get the generated JWT and send back to client
        UserPrincipal userPrincipal = new UserPrincipal(user);
        HttpHeaders jwtHeader = getJwtHeader(userPrincipal);

        // return user(body), jwt token(header) and status
        return new ResponseEntity<>(user, jwtHeader, OK);

    } // end of login()

    // create new user(user signs up account).
    // all users can access this end point "/user-create"
    @PostMapping("/user-create")
    public ResponseEntity<User> createUser(@RequestBody @Valid User user, BindingResult bindingResult)
            throws BadDataException, MessagingException, BindException {

        LOGGER.info("validate data");

        // if user data is invalid then throw exception
        if (bindingResult.hasErrors()) {

            LOGGER.info("User data is invalid");

            throw new BindException(bindingResult);
        }

        // create new user
        User newUser = userService.createUser(user);

        return new ResponseEntity<>(newUser, OK);

    } // end of createUser()

    // find user by id.
    // this method is used for Edit Profile.
    @GetMapping("/user-list/{id}")
    // only authenticated users can access this end point "/user-list/{id}"
    // (it means this function findById())
    @PreAuthorize("hasAnyRole('ROLE_CUSTOMER')")
    public ResponseEntity<User> findById(@PathVariable Long id) throws EntityNotFoundException {

        LOGGER.info("find user by id: " + id);

        // get user by user id
        User user = userService.findById(id);

        return new ResponseEntity<>(user, OK);

    } // end of findById()

    // update user profile.
    @PutMapping("/edit-profile")
    // only authenticated users can access this end point "/edit-profile"
    // (it means this function updateProfile())
    @PreAuthorize("hasAnyRole('ROLE_CUSTOMER')")
    public ResponseEntity<User> updateProfile(@RequestBody @Valid EditProfile editProfile,
                                              BindingResult bindingResult)
            throws MessagingException, EntityNotFoundException, BindException {

        LOGGER.info("validate data");

        // if user data is invalid then throw exception
        if (bindingResult.hasErrors()) {

            LOGGER.info("User data is invalid");

            throw new BindException(bindingResult);
        }

        // update user profile
        User currentUser = userService.updateProfile(editProfile);

        return new ResponseEntity<>(currentUser, OK);

    } // end of updateProfile()

    // create new instance HttpResponse
    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {

        return new ResponseEntity<>(new HttpResponse(httpStatus.value(), message), httpStatus);
    }

    // get header with JWT token.
    // use this header to send back client
    private HttpHeaders getJwtHeader(UserPrincipal user) {

        HttpHeaders headers = new HttpHeaders();
        headers.add(JWT_TOKEN_HEADER, jwtTokenProvider.generateJwtToken(user));

        return headers;

    } // end of getJwtHeader()

    // authenticate email and password sent from client is valid or not
    private void authenticate(String email, String password) {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

    } // end of authenticate()

}
