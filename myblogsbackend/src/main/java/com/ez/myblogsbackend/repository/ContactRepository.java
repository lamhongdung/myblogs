package com.ez.myblogsbackend.repository;

import com.ez.myblogsbackend.entity.Contact;
import com.ez.myblogsbackend.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface ContactRepository extends JpaRepository<Contact, Long> {


}
