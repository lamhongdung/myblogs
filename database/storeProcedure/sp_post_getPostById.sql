use myblogs;

-- drop procedure if it exists
drop procedure if exists sp_post_getPostById;

delimiter $$

-- -----------------------------------------------------
-- get post by post id for edit/view post
--
-- Input parameters:
--
-- 	- in_id: post id
-- -----------------------------------------------------

-- call sp_post_getPostById(1)

create procedure sp_post_getPostById(
										in_id int
									)
begin

-- call sp_post_getPostById(1)

--
-- main select
--
select 	a.postid as postid,

		-- creator id + email
		concat(a.creatorid,' - ',coalesce(b.email,'')) as creator, 
        
		a.title as title,
		a.content as content,
        
        -- 2023-03-29 10:40:00
		a.createDatetime as createDatetime,
        -- 2023-03-29 11:00:00
		a.lastUpdateDatetime as lastUpdateDatetime,
	
		a.categoryid as categoryid,
        coalesce(c.name,'') as categoryName
        
from post a
	left join user b on a.creatorid = b.id
    left join category c on a.categoryid = c.id
where a.postid = in_id;

end $$

-- call sp_post_getPostById(1)

delimiter ;

