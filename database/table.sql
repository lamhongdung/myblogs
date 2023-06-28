-- -----------
-- database --
-- -----------
drop database if exists myblogs;

create database myblogs;

use myblogs;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------

set foreign_key_checks = 0;

drop table if exists `user`;

create table `user` (

	`id` int not null auto_increment,
	`email` varchar(255) not null,
	`password` varchar(255) not null,
	`firstName` varchar(255) not null,
	`lastName` varchar(255) not null,
	`phone` varchar(255) not null,
	`address` varchar(255) not null,

	-- "ROLE_USER"
	`role` varchar(255) not null,
	-- "Active", "Inactive"
	`status` varchar(255) not null,

	primary key (`id`),
	unique (`email`)
    
) engine=InnoDB auto_increment=2001 default charset=utf8mb4 collate=utf8mb4_0900_ai_ci;

insert into `user`(id, email, password, firstName, lastName, phone, address, role, status) values
(11,'dunglh+customer1@gmail.com','$2a$12$CR0useg0GQlwrYMvylhHROZg0Vq5nr7jRILz14lc.ArB9iuw1wsEC','Quân','Châu', '0986009999','','ROLE_USER','Active'),
(21,'dunglh+admin1@gmail.com','$2a$12$CR0useg0GQlwrYMvylhHROZg0Vq5nr7jRILz14lc.ArB9iuw1wsEC','Công Phượng','Nguyễn', '0986009991','','ROLE_ADMIN','Active');


set foreign_key_checks = 1;

-- -----------------------------------------------------
-- Table `category`
-- -----------------------------------------------------

set foreign_key_checks = 0;

drop table if exists `category`;

create table `category` (

	`id` int not null auto_increment,
	`name` varchar(255) not null,
	`status`varchar(255) not null,

	primary key (`id`)
    
) engine=InnoDB auto_increment=2001 default charset=utf8mb4 collate=utf8mb4_0900_ai_ci;

insert into `category`(id, name, status) values 
(1, 'Truyện cười', 'Active'),
(2, 'Thể thao', 'Active'),
(3, 'Công nghệ', 'Active'),
(4, 'Linh tinh', 'Active');

set foreign_key_checks = 1;

-- -----------------------------------------------------
-- Table `postStatus`
-- -----------------------------------------------------

set foreign_key_checks = 0;

drop table if exists `postStatus`;

create table `postStatus` (

	`statusid` int not null,
	`name` varchar(255) not null,
    
	primary key (`statusid`)
  
) engine=InnoDB auto_increment=2001 default charset=utf8mb4 collate=utf8mb4_0900_ai_ci;

insert into `postStatus`(statusid, name) values 
(1,'Draft'),
(2,'Published');

set foreign_key_checks = 1;

-- -----------------------------------------------------
-- Table `post`
-- -----------------------------------------------------

set foreign_key_checks = 0;

drop table if exists `post`;

create table `post` (

	`postid` int not null auto_increment,
	`title` varchar(2000) not null,
	`categoryid` int not null,
	`creatorid` int not null,
	`postStatusid` int not null,
	`content` text not null,
    -- 
	`createDatetime` datetime not null,
	`lastUpdateDatetime` datetime not null,
    
	primary key (`postid`),
    
	key `fk_categoryid_post` (`categoryid`),
	key `fk_creatorid_post` (`creatorid`),
	key `fk_postStatusid_post` (`postStatusid`),
    
	constraint `fk_categoryid_post` foreign key (`categoryid`) references `category` (`id`),
	constraint `fk_creatorid_post` foreign key (`creatorid`) references `user` (`id`),
	constraint `fk_postStatusid_post` foreign key (`postStatusid`) references `postStatus` (`statusid`)
  
) engine=InnoDB auto_increment=2001 default charset=utf8mb4 collate=utf8mb4_0900_ai_ci;

INSERT INTO `post` VALUES (1,'Ông nội và cháu',1,11,2,'<p><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">Ông nội và người cháu đích tôn 3 tuổi đang ngồi chơi trò bán hàng.</span></span></p><p style="text-align:start"><strong><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">- Cháu:</span></span></strong><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);"> Đây tôi đưa bác 5.000 đồng, nhưng với một điều kiện.<br></span></span><strong><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">- Ông:</span></span></strong><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);"> Điều kiện gì cũng được.<br></span></span><strong><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">- Cháu:</span></span></strong><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);"> Thật không?<br></span></span><strong><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">- Ông:</span></span></strong><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);"> Thật. Bác cứ nói đi.<br></span></span><strong><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">- Cháu:</span></span></strong><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);"> Bác phải về dạy lại con bác đi nhé, con bác hay đánh tôi lắm đấy.</span></span></p>','2023-04-22 14:54:40','2023-04-22 15:08:56');

set foreign_key_checks = 1;

-- -----------------------------------------------------
-- Table `comment`
-- -----------------------------------------------------

set foreign_key_checks = 0;

drop table if exists `comment`;

create table `comment` (

	`postid` int not null,
	`commentid` int not null auto_increment,
	`commentDescription` text not null,
	`commenterid` int not null,
	`commentDatetime` datetime not null,
    
	PRIMARY key (`commentid`),
    
	key `fk_postid_comment` (`postid`),
	constraint `fk_postid_comment` foreign key (`postid`) references `post` (`postid`)
  
) engine=InnoDB auto_increment=2001 default charset=utf8mb4 collate=utf8mb4_0900_ai_ci;

INSERT INTO `comment` VALUES (1,1,'Hay quá!',0,'2023-04-22 14:56:29');

set foreign_key_checks = 1;

