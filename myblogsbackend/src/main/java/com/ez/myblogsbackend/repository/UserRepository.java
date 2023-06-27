package com.ez.myblogsbackend.repository;

import com.ez.myblogsbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, Long> {

    // get user by email
    public User findUserByEmail(String email);

    // check whether a user is inactive or not?
    // return:
    //  - not null: inactive user
    //  - null: not inactive user
    @Query(value =  "" +
            " select a.* " +
            " from user a " +
            " where a.email = :email and a.status = 'Inactive' "
            ,nativeQuery = true)
    public User isInactiveUser(@Param("email") String email);

}
