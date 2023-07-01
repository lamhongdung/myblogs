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
(11,'dunglh+customer1@gmail.com','$2a$12$CR0useg0GQlwrYMvylhHROZg0Vq5nr7jRILz14lc.ArB9iuw1wsEC','Quân','Châu', '0986009911','','ROLE_USER','Active'),
(12,'dunglh+customer2@gmail.com','$2a$12$CR0useg0GQlwrYMvylhHROZg0Vq5nr7jRILz14lc.ArB9iuw1wsEC','Mễ','Tiểu', '0986009912','','ROLE_USER','Active'),
(21,'dunglh+admin1@gmail.com','$2a$12$CR0useg0GQlwrYMvylhHROZg0Vq5nr7jRILz14lc.ArB9iuw1wsEC','Công Phượng','Nguyễn', '0986009921','','ROLE_ADMIN','Active');


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
(1,'Published');

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

INSERT INTO `post` VALUES 
(1,'Ông nội và cháu',1,11,1,'<p><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">Ông nội và người cháu đích tôn 3 tuổi đang ngồi chơi trò bán hàng.</span></span></p><p style="text-align:start"><strong><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">- Cháu:</span></span></strong><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);"> Đây tôi đưa bác 5.000 đồng, nhưng với một điều kiện.<br></span></span><strong><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">- Ông:</span></span></strong><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);"> Điều kiện gì cũng được.<br></span></span><strong><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">- Cháu:</span></span></strong><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);"> Thật không?<br></span></span><strong><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">- Ông:</span></span></strong><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);"> Thật. Bác cứ nói đi.<br></span></span><strong><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">- Cháu:</span></span></strong><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);"> Bác phải về dạy lại con bác đi nhé, con bác hay đánh tôi lắm đấy.</span></span></p>','2023-04-22 14:54:40','2023-04-22 15:08:56'),
(2,'Tuyệt chiêu',1,11,1,'<p><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">Cô gái đi học trên Hà Nội, nửa đêm nhận được tin nhắn: “Chào em, mình làm quen được không? Em có người yêu chưa?”. "Em có rồi anh ạ!". "Thế á, cha mày đây, sớm mai bắt xe về quê ngay họp gia đình chuyện này!".</span></span></p><p style="text-align:start"><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">Hôm sau cô gái nhất quyết không về, nửa đêm lại có tin nhắn: "Anh phải làm sao để được làm bạn em? Cho phép anh làm quen nhá! Em có người yêu chưa?". "Em chưa!". "Em làm anh thất vọng quá, một phép thử đơn giản là biết được lòng nhau ngay, mình chia tay thôi!". "Ôi em xin lỗi, em tưởng ông già em, cho em một lời giải thích". "Giải thích gì? Ông già mày đây, mai không về quê thì đừng về nữa! Gọi cả thằng đó về cho tao!".</span></span></p>','2023-06-29 16:44:15','2023-06-29 16:44:15'),
(3,'Samsung chạy đua với TSMC về chip 2 nm',3,11,1,'<p><span style="color:rgb(34, 34, 34);"><span style="background-color:rgb(252, 250, 246);">Samsung đưa ra lộ trình chi tiết cho việc sản xuất chip theo tiến trình 2 nm và mở rộng hoạt động kinh doanh để cạnh tranh với TSMC.</span></span></p><p><span style="color:rgb(34, 34, 34);"><span style="background-color:rgb(252, 250, 246);">Không chỉ dẫn đầu về smartphone, Samsung còn là một trong những công ty sản xuất chất bán dẫn hàng đầu thế giới. Bên cạnh chip nhớ, hãng Hàn Quốc có các xưởng đúc làm theo đơn đặt hàng cho các nhà thiết kế chip như Qualcomm.</span></span></p><p><span style="color:rgb(34, 34, 34);"><span style="background-color:rgb(252, 250, 246);">Hiện xưởng đúc của Samsung vẫn thua kém TSMC của Đài Loan. Trong năm 2023, ước tính TSMC chiếm 59% doanh thu mảng bán dẫn toàn cầu trong khi Samsung chỉ 13%. Do đó, hãng Hàn Quốc đang nỗ lực bắt kịp bằng cách nâng công suất và cải tiến công nghệ.</span></span></p><p><span style="color:rgb(34, 34, 34);"><span style="background-color:rgb(252, 250, 246);">Trong đó, Samsung cho biết sẽ bắt đầu sản xuất hàng loạt các mẫu chip cao cấp trên tiến trình 2 nm cho thiết bị di động trong năm 2025, sau đó mở rộng sang điện toán hiệu năng cao năm 2026 và ôtô năm 2027. Hãng cũng đang tăng năng lực sản xuất chip tại nhà máy ở Pyeongtaek (Hàn Quốc) và Texas (Mỹ) cũng như sẽ bắt đầu quy trình 1,4 nm trong năm 2027.</span></span></p><p></p>','2023-06-29 16:53:53','2023-06-29 16:53:53'),
(4,'Tuyệt chiêu mai mối',1,11,1,'<p><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">Tèo và bà nội đi dạo trong công viên thì có một cô gái xinh xắn đi ngang qua. Thấy Tèo cứ ngẩn ngơ dán mắt vào cô gái, bà Tèo liền cười nói:</span></span></p><p><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">- Thích rồi phải không?</span></span></p><p style="text-align:start"><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">Tèo đỏ mặt gật đầu. Bà bảo:</span></span></p><p style="text-align:start"><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">- Đứng đây chờ bà một chút nhé!</span></span></p><p style="text-align:start"><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">Vừa dứt câu, bà liền tiến về phía cô gái, khoảng vài phút sau điện thoại của Tèo vang lên, đầu dây bên kia là giọng nói dịu dàng của một cô gái:</span></span></p><p style="text-align:start"><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">- Cho em hỏi anh có phải là anh Tèo không ạ? Bà nội anh đi lạc, hiện giờ bà đang đứng cùng em ở công viên X, anh đến đón bà ngay nhé!</span></span></p>','2023-06-29 17:04:25','2023-06-29 17:04:25'),
(5,'Cầu thủ đội tuyển VN dự World Cup 2023 nhận gần 1 tỷ đồng',2,11,1,'<p style="text-align:justify"><span style="color:rgb(0, 0, 0);">FIFA hỗ trợ cho 23 cầu thủ nằm trong danh sách đăng ký chính thức của mỗi đội tuyển tham dự World Cup nữ 2023. Mỗi cầu thủ được nhận 30.000 USD (khoảng 700 triệu đồng) từ FIFA.</span></p><p style="text-align:justify"><span style="color:rgb(0, 0, 0);">Với việc góp mặt ở vòng bảng World Cup nữ 2023, 23 cầu thủ của tuyển nữ Việt Nam cầm chắc trong tay khoảng 700 triệu đồng tiền thưởng từ FIFA.</span></p><p style="text-align:justify"><span style="color:rgb(0, 0, 0);">Thậm chí, số tiền này còn tăng lên một khi đội bóng của HLV Mai Đức Chung vào sâu trong giải. Đối với đội giành chức vô địch World Cup nữ 2023, mỗi cầu thủ nằm trong danh sách chính thức nhận số tiền thưởng lên đến 270.000 USD, tương đương 6,35 tỷ đồng.</span></p>','2023-06-29 17:15:01','2023-06-29 17:15:01'),
(6,'Thật là may mắn',1,11,1,'<p><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">Bob đi ăn uống liên hoan về say khướt. Anh ta về nhà, đập cửa:</span></span></p><p style="text-align:start"><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">- Ồ, Bob! Anh đã về đấy ư?</span></span></p><p style="text-align:start"><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">- Ừ, em yêu ạ, anh gặp bạn cũ.</span></span></p><p style="text-align:start"><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">- Anh nhậu hết lương tháng rồi.</span></span></p><p style="text-align:start"><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">- À, em có thể hiểu.</span></span></p><p style="text-align:start"><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">- Xe lại bị giữ...</span></span></p><p style="text-align:start"><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">- Chuyện đương nhiên mà.</span></span></p><p style="text-align:start"><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">- Ôi, em đúng là người phụ nữ hiền dịu nhất trần đời. Ừm... Ờ... Hình như cái dây chuyền em đưa hôm qua, anh trót tặng một cô gái.</span></span></p><p style="text-align:start"><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">- Lạy Chúa, em thật là may mắn!</span></span></p><p style="text-align:start"><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">- Sao, em định nói là em rất hài lòng ư?</span></span></p><p style="text-align:start"><span style="color:rgba(0, 0, 0, 0.87);"><span style="background-color:rgb(255, 255, 255);">- Vâng, vì em chỉ là... Hàng xóm của anh. Hãy can đảm lên, chỉ còn vài bước chân nữa thôi. Cầu Chúa phù hộ cho anh!</span></span></p>','2023-06-29 17:23:04','2023-06-29 17:23:04'),
(7,'Không phải chuyện nhỏ',1,12,1,'<p>Bạn tù hỏi nhau:</p><p>– Tại sao anh phải vào đây?</p><p>– Tôi bỏ vợ…</p><p>– Thế thôi sao? Chuyện nhỏ mà!</p><p>– … từ trên lầu ba xuống.</p>','2023-06-30 16:26:36','2023-06-30 16:26:36');

set foreign_key_checks = 1;



