use myblogs;

-- drop procedure "sp_post_searchPosts" if it exists
drop procedure if exists sp_post_searchPosts;

delimiter $$

-- -----------------------------------------------------
-- Get posts based on category id.
--
-- This store procedure is used for listing posts in the "Post list" screen.
--
-- Input parameters:
--
-- 	- in_pageNumber: page number(0,1,2,...)
-- 	- in_pageSize: page size(default = 5)
-- 	- in_categoryid: category id
-- -----------------------------------------------------

-- call sp_post_searchPosts(0,5,0)

create procedure sp_post_searchPosts(	in_pageNumber int, 
										in_pageSize int,
										in_categoryid int
									)
begin

-- drop the temporary "_post" table if exists
drop temporary table if exists _post;

-- create new temporary table "_post"
create temporary table _post(

	`postid` int not null,
	`title` varchar(2000) not null,
	`categoryid` int not null,
	`creatorid` int not null,
	`postStatusid` int not null,
	`content` text not null,
    -- 
	`createDatetime` datetime not null,
	`lastUpdateDatetime` datetime not null
    
);

-- in_categoryid = 0: all categories
if in_categoryid = 0 then
	
    -- get all categories
	insert into _post
    select a.*
    from post a;

else

	-- get posts by category id
	insert into _post
    select a.*
    from post a
    where a.categoryid = in_categoryid;
    
end if;

select 	a.postid,
		a.categoryid,
        coalesce(b.name, '') as categoryName,
        a.title,
        a.content,
        a.createDatetime,
        a.creatorid,
        coalesce(c.email,'') as creatorEmail,
        a.postStatusid,
        coalesce(d.name,'') as postStatusName
from _post a
	left join category b on a.categoryid = b.id
    left join user c on a.creatorid = c.id
    left join postStatus d on a.postStatusid = d.statusid
-- only 1 page with 5 elements
limit in_pageNumber, in_pageSize;

end $$


delimiter ;

