package com.ez.myblogsbackend.service;

import com.ez.myblogsbackend.entity.Contact;
import com.ez.myblogsbackend.payload.*;
import com.ez.myblogsbackend.repository.ContactRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static org.springframework.http.HttpStatus.OK;

@Service
public class ContactService {
    private Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private ContactRepository contactRepository;

    // create a new contact.
    public HttpResponse saveContact(Contact contact) {

        LOGGER.info("send new contact");
        LOGGER.info("Contact is sent from client: " + contact.toString());

        Contact newContact = new Contact();
        newContact.setName(contact.getName());
        newContact.setEmail(contact.getEmail());
        newContact.setPhone(contact.getPhone());
        newContact.setCompany(contact.getCompany());
        newContact.setMessage(contact.getMessage());

        // save new contact into the "contact" table in database.
        contactRepository.save(newContact);

        return new HttpResponse(OK.value(), "Contact is created successful!");

    }


}
