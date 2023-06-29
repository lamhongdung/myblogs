package com.ez.myblogsbackend.repository;

import com.ez.myblogsbackend.entity.Post;
import com.ez.myblogsbackend.payload.NumOfPostsPerCategory;
import com.ez.myblogsbackend.payload.PostSearchResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface PostRepository extends JpaRepository<Post, Long> {

    // get all active categories and number of posts of each category
    @Query(value = "" +
            " {call sp_post_numOfPostsPerCategory()} "
            , nativeQuery = true)
    public List<NumOfPostsPerCategory> getAllActiveCategories();

    // get posts based on category id
    @Query(value = "" +
            " {call sp_post_searchPosts( " +
            "                           :pageNumber, " +
            "                           :pageSize, " +
            "                           :categoryid " +
            "                           )} "
            , nativeQuery = true)
    public List<PostSearchResponse> searchPosts(@Param("pageNumber") long pageNumber,
                                                @Param("pageSize") long pageSize,
                                                @Param("categoryid") long categoryid
    );
//
//    // calculate total of tickets based on search criteria for pagination
//    @Query(value = "" +
//            " {call sp_getTotalOfTickets( " +
//            "                             :userid, " +
//            "                             :searchTerm, " +
//            "                             :fromDate, " +
//            "                             :toDate, " +
//            "                             :categoryid, " +
//            "                             :priorityid, " +
//            "                             :creatorid, " +
//            "                             :teamid, " +
//            "                             :assigneeid, " +
//            "                             :sla, " +
//            "                             :ticketStatusid " +
//            "                             )} "
//            , nativeQuery = true)
//    public long getTotalOfTickets(@Param("userid") long userid,
//                                  @Param("searchTerm") String searchTerm,
//                                  @Param("fromDate") String fromDate,
//                                  @Param("toDate") String toDate,
//                                  @Param("categoryid") String categoryid,
//                                  @Param("priorityid") String priorityid,
//                                  @Param("creatorid") String creatorid,
//                                  @Param("teamid") String teamid,
//                                  @Param("assigneeid") String assigneeid,
//                                  @Param("sla") String sla,
//                                  @Param("ticketStatusid") String ticketStatusid);
//
//    // save ticket into the 'ticket' table
//    @Modifying
//    @Query(value = "" +
//            " {call sp_saveTicket( " +
//            "                             :creatorid, " +
//            "                             :subject, " +
//            "                             :content, " +
//            "                             :teamid, " +
//            "                             :categoryid, " +
//            "                             :priorityid, " +
//            "                             :customFilename " +
//            "                             )} "
//            , nativeQuery = true)
//    public void saveTicket(@Param("creatorid") long creatorid,
//                           @Param("subject") String subject,
//                           @Param("content") String content,
//                           @Param("teamid") long teamid,
//                           @Param("categoryid") long categoryid,
//                           @Param("priorityid") long priorityid,
//                           @Param("customFilename") String customFilename);
//
//    // get ticket by ticketid.
//    @Query(value = "" +
//            " {call sp_getTicketById(:ticketid)} "
//            , nativeQuery = true)
//    public TicketEditViewResponse getTicketById(@Param("ticketid") long ticketid);
//
////    // update ticket
////    @Modifying
////    @Query(value = "" +
////            " update ticket a set   a.categoryid = :categoryid, " +
////            "                       a.priorityid = :priorityid, " +
////            "                       a.assigneeid = :assigneeid, " +
////            "                       a.ticketStatusid = :ticketStatusid, " +
////            "                       a.lastUpdateByUserid = :toBeUpdatedByUserid, " +
////            "                       a.lastUpdateDatetime = now() " +
////            " where a.ticketid = :ticketid "
////            , nativeQuery = true)
////    void updateTicket(@Param("ticketid") long ticketid,
////                      @Param("categoryid") long categoryid,
////                      @Param("priorityid") long priorityid,
////                      @Param("assigneeid") long assigneeid,
////                      @Param("ticketStatusid") long ticketStatusid,
////                      @Param("toBeUpdatedByUserid") long toBeUpdatedByUserid);

}