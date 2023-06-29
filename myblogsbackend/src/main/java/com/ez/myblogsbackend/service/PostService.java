package com.ez.myblogsbackend.service;

import com.ez.myblogsbackend.payload.DropdownResponse;
import com.ez.myblogsbackend.payload.HttpResponse;
import com.ez.myblogsbackend.payload.NumOfPostsPerCategory;
import com.ez.myblogsbackend.payload.PostSearchResponse;
import com.ez.myblogsbackend.repository.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@Service
public class PostService {
    private Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private PostRepository postRepository;

    // get all active categories and number of posts of each category
    public List<NumOfPostsPerCategory> getAllActiveCategories() {

        LOGGER.info("Get all active categories)");

        return postRepository.getAllActiveCategories();

    }

    // search posts by category id.
    public List<PostSearchResponse> searchPosts(long pageNumber, long pageSize, long categoryid) {

        LOGGER.info("Get posts based on category id");

        return postRepository.searchPosts(pageNumber, pageSize, categoryid);

    }
//
//    // calculate total of tickets based on the search criteria
//    public long getTotalOfTickets(long userid,
//                                  String searchTerm, String fromDate, String toDate,
//                                  String categoryid, String priorityid, String creatorid,
//                                  String teamid, String assigneeid, String sla,
//                                  String ticketStatusid) {
//
//        LOGGER.info("get total of tickets");
//
//        return ticketRepository.getTotalOfTickets(userid,
//                searchTerm, fromDate, toDate,
//                categoryid, priorityid, creatorid,
//                teamid, assigneeid, sla,
//                ticketStatusid);
//    }
//
//    // create a new ticket.
//    public HttpResponse createTicket(TicketCreateRequest ticketCreateRequest) {
//
//        LOGGER.info("create a new ticket");
//        LOGGER.info("Ticket is sent from client: " + ticketCreateRequest.toString());
//
//        // save new ticket into the "ticket" table in database.
//        ticketRepository.saveTicket(
//                ticketCreateRequest.getCreatorid(),
//                ticketCreateRequest.getSubject(),
//                ticketCreateRequest.getContent(),
//                ticketCreateRequest.getTeamid(),
//                ticketCreateRequest.getCategoryid(),
//                ticketCreateRequest.getPriorityid(),
//                ticketCreateRequest.getCustomFilename()
//        );
//
//        return new HttpResponse(OK.value(), "Ticket is created successful!");
//    }
//
//    // get ticket by ticket id.
//    public TicketEditViewResponse getTicketById(Long id) {
//
//        return ticketRepository.getTicketById(id);
//    }
//
//    // update existing ticket.
//    public HttpResponse updateTicket(TicketEditRequest ticketEditRequest)
//            throws EntityNotFoundException, BadDataException {
//
//        long nextTicketStatusid;
//
//        LOGGER.info("Update ticket");
//        LOGGER.info("Ticket is sent from client: " + ticketEditRequest.toString());
//        LOGGER.info("Ticket id: " + ticketEditRequest.getTicketid());
//
//        // get existing team(persistent)
//        Ticket existingTicket = ticketRepository.findById(ticketEditRequest.getTicketid())
//                .orElseThrow(() -> new EntityNotFoundException(NO_TICKET_FOUND_BY_ID + ticketEditRequest.getTicketid()));
//
//        LOGGER.info("Existing ticket:" + existingTicket.toString());
//
//        // do not allow user modifies the 'Closed' tickets
//        if (existingTicket.getTicketStatusid() == TICKET_STATUS_CLOSED) {
//            throw new BadDataException("Ticket status is 'Closed', so you cannot modify this ticket.");
//        }
//
//        // do not allow user modifies the 'Cancel' tickets
//        if (existingTicket.getTicketStatusid() == TICKET_STATUS_CANCEL) {
//            throw new BadDataException("Ticket status is 'Cancel', so you cannot modify this ticket.");
//        }
//
//        // set new values to existing ticket
//        existingTicket.setCategoryid(ticketEditRequest.getCategoryid());
//        existingTicket.setPriorityid(ticketEditRequest.getPriorityid());
//        existingTicket.setAssigneeid(ticketEditRequest.getAssigneeid());
//
//        //
//        // next ticket status id
//        //
//
//        // if ticket was alreasy assigned to a certain supporter
//        if (ticketEditRequest.getAssigneeid() >= 1) {
//
//            // next ticket status cannot be 'Open'. next ticket status must be greater than 'Open'
//            nextTicketStatusid = ticketEditRequest.getTicketStatusid() > TICKET_STATUS_ASSIGNED ?
//                    ticketEditRequest.getTicketStatusid() : TICKET_STATUS_ASSIGNED;
//
//        } else { // ticket has not yet assigned to a certain supporter
//            nextTicketStatusid = TICKET_STATUS_OPEN;
//        }
//
////        existingTicket.setTicketStatusid(ticketEditRequest.getTicketStatusid());
//        existingTicket.setTicketStatusid(nextTicketStatusid);
//        existingTicket.setLastUpdateByUserid(ticketEditRequest.getToBeUpdatedByUserid());
//
//        ticketRepository.save(existingTicket);
//
//        LOGGER.info("ticketEditRequest.getAssigneeid():" + ticketEditRequest.getAssigneeid());
//
////        // save changes of ticket
////        ticketRepository.updateTicket(
////                ticketEditRequest.getTicketid(),
////                ticketEditRequest.getCategoryid(),
////                ticketEditRequest.getPriorityid(),
////                ticketEditRequest.getAssigneeid(),
////                ticketEditRequest.getTicketStatusid(),
////                ticketEditRequest.getToBeUpdatedByUserid()
////        );
//
//        return new HttpResponse(OK.value(),
//                "Ticket '" + ticketEditRequest.getTicketid() + "' was updated successful.");
//
//    }

}
