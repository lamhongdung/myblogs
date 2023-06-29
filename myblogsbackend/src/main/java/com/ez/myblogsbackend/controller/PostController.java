package com.ez.myblogsbackend.controller;

import com.ez.myblogsbackend.payload.CategorySidebar;
import com.ez.myblogsbackend.payload.PostSearchResponse;
import com.ez.myblogsbackend.service.PostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
public class PostController {

    private Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private PostService postService;

    // get all active categories.
    // for loading categories in the "Category" dropdown control
    // in the "Create post", "Edit post" screens.
    //
    // all authenticated users can access this resource.
    @GetMapping("/category-sidebar")
    public ResponseEntity<List<CategorySidebar>> getAllActiveCategories() {

        // get all active categories
        List<CategorySidebar> categoriesResponses = postService.getAllActiveCategories();

        return new ResponseEntity<>(categoriesResponses, OK);
    }

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
    }
//
//    //
//    // calculate total of tickets based on the search criteria.
//    // use this total of tickets value to calculate total pages for pagination.
//    //
//    // url: ex: /total-of-tickets?userid=20&searchTerm=&fromDate=2023-01-01&toDate=2023-03-28&categoryid=0&priorityid=0&creatorid=0&teamid=0&assigneeid=0&sla=&ticketStatusid=0
//    //
//    // all authenticated users can access this resource
//    @GetMapping("/total-of-tickets")
//    public ResponseEntity<Long> getTotalOfTickets(@RequestParam long userid,
//                                                  @RequestParam String searchTerm,
//                                                  @RequestParam String fromDate,
//                                                  @RequestParam String toDate,
//                                                  @RequestParam String categoryid,
//                                                  @RequestParam String priorityid,
//                                                  @RequestParam String creatorid,
//                                                  @RequestParam String teamid,
//                                                  @RequestParam String assigneeid,
//                                                  @RequestParam String sla,
//                                                  @RequestParam String ticketStatusid) {
//
//        // calculate total of tickets based on the search criteria
//        long totalOfTickets = ticketService.getTotalOfTickets(userid,
//                searchTerm, fromDate, toDate,
//                categoryid, priorityid, creatorid,
//                teamid, assigneeid, sla,
//                ticketStatusid);
//
//        return new ResponseEntity<>(totalOfTickets, HttpStatus.OK);
//    }
//
//    //
//    // create a new ticket.
//    //
//    // all authenticated users can access this resource.
//    @PostMapping("/ticket-create")
//    public ResponseEntity<HttpResponse> createTicket(
//            @RequestBody @Valid TicketCreateRequest ticketCreateRequest,
//            BindingResult bindingResult) throws BindException {
//
//        LOGGER.info("validate data");
//
//        // if ticketRequest data is invalid then throw exception
//        if (bindingResult.hasErrors()) {
//
//            LOGGER.info("TicketRequest data is invalid");
//
//            throw new BindException(bindingResult);
//        }
//
//        // save ticket
//        HttpResponse httpResponse = ticketService.createTicket(ticketCreateRequest);
//
//        return new ResponseEntity<>(httpResponse, OK);
//    }
//
//    // find ticket by id.
//    // this method is used for "Edit ticket" and "View ticket".
//    @GetMapping("/ticket-list/{id}")
//    public ResponseEntity<TicketEditViewResponse> getTicketById(@PathVariable Long id)
//            throws EntityNotFoundException {
//
//        LOGGER.info("find ticket by id: " + id);
//
//        TicketEditViewResponse ticketEditViewResponse = ticketService.getTicketById(id);
//
//        return new ResponseEntity<>(ticketEditViewResponse, OK);
//    }
//
//    // edit existing ticket.
//    //
//    @PutMapping("/ticket-edit")
//    // only the ROLE_SUPPORTER or ROLE_ADMIN can access this address
//    @PreAuthorize("hasAnyRole('ROLE_SUPPORTER','ROLE_ADMIN')")
//    public ResponseEntity<HttpResponse> editTicket(
//            @RequestBody @Valid TicketEditRequest ticketEditRequest, BindingResult bindingResult)
//            throws EntityNotFoundException, BindException, BadDataException {
//
//        LOGGER.info("validate data");
//
//        // if ticketEditRequest data is invalid then throw exception
//        if (bindingResult.hasErrors()) {
//
//            LOGGER.info("TicketEditRequest data is invalid");
//
//            throw new BindException(bindingResult);
//        }
//
//        // update ticket with new values
//        HttpResponse httpResponse = ticketService.updateTicket(ticketEditRequest);
//
//        return new ResponseEntity<>(httpResponse, OK);
//    }

}