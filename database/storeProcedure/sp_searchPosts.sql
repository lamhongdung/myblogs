use myblogs;

-- drop procedure "sp_searchPosts" if it exists
drop procedure if exists sp_searchPosts;

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

-- call sp_searchPosts(0,5,0)

create procedure sp_searchPosts(	in_pageNumber int, 
									in_pageSize int,
									in_categoryid varchar(255)
								)
begin

select a.*
from post a;

end $$


delimiter ;

