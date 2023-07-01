use myblogs;

-- drop procedure "sp_post_categorySidebar" if it exists
drop procedure if exists sp_post_categorySidebar;

delimiter $$

-- -----------------------------------------------------
-- Get all active categories and number of posts of each category.
--
-- This store procedure is used for display list of categories at the sidebar.
-- -----------------------------------------------------

-- call sp_post_categorySidebar()

create procedure sp_post_categorySidebar()
begin

-- get number of posts of each category
with _categorySidebar as
(
	select 	a.id, a.name, count(b.postid) as numOfPosts
	from category a
		left join post b on a.id = b.categoryid and 
							b.postStatusid = 1 -- published status
	where 	a.status = 'Active'
	group by a.id, a.name
)

--
-- main select
-- 
select t.id, t.name, t.numOfPosts
from(
	-- number of posts of all categories
	select 	0 as id, 'All categories' as name, sum(a.numOfPosts) as numOfPosts
	from _categorySidebar a

	union all

	-- number of posts of each category
	select 	a.id, a.name, a.numOfPosts
	from _categorySidebar a
    
) t
order by t.numOfPosts desc, t.id asc;

end $$

-- call sp_post_categorySidebar()

delimiter ;


