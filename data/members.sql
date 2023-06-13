create table members (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(150) NOT NULL,
	last_name VARCHAR(150) NOT NULL,
	gender VARCHAR(50) NOT NULL,
	date_of_birth DATE NOT NULL,
	address VARCHAR(300) NOT NULL,
	post_code VARCHAR(20) NOT NULL,
	email VARCHAR(256) NOT NULL,
	mobile VARCHAR(11) NOT NULL,
	additional_info TEXT,
	member_since DATE NOT NULL,
	created_by VARCHAR(100) NOT NULL
);

insert into members (id, first_name, last_name, gender, date_of_birth, address, post_code, email, mobile, additional_info, member_since, created_by) values (1, 'Terence', 'Berens', 'Male', '2022-11-04', 'PO Box 59247', 'Suite 87', 'tberens0@feedburner.com', 99999999999, 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.', '2022-07-16', '01H2T9G2QH8QH11G2ERM5BS8D5');
insert into members (id, first_name, last_name, gender, date_of_birth, address, post_code, email, mobile, additional_info, member_since, created_by) values (2, 'Marlowe', 'Greensted', 'Male', '2022-12-12', 'Apt 397', 'Suite 81', 'mgreensted1@networkadvertising.org', 99999999999, 'Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', '2022-10-08', '01H2T9G2QJ6NCVHD9XGB1EXSJY');
insert into members (id, first_name, last_name, gender, date_of_birth, address, post_code, email, mobile, additional_info, member_since, created_by) values (3, 'Shawn', 'Burchnall', 'Male', '2022-12-26', 'Room 937', 'Suite 64', 'sburchnall2@creativecommons.org', 99999999999, 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.

Sed ante. Vivamus tortor. Duis mattis egestas metus.', '2022-07-28', '01H2T9G2QMYZV6RSAAADKJG5YH');
insert into members (id, first_name, last_name, gender, date_of_birth, address, post_code, email, mobile, additional_info, member_since, created_by) values (4, 'Marven', 'Hitchens', 'Male', '2022-07-04', 'Suite 8', 'PO Box 66745', 'mhitchens3@4shared.com', 99999999999, 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.

Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', '2023-01-17', '01H2T9G2QPZN6Q2ME7F6MEGJXF');
insert into members (id, first_name, last_name, gender, date_of_birth, address, post_code, email, mobile, additional_info, member_since, created_by) values (5, 'Federico', 'Thickett', 'Male', '2022-11-24', 'PO Box 92204', 'Apt 997', 'fthickett4@hugedomains.com', 99999999999, 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', '2022-12-19', '01H2T9G2QQWZ3F5ASJS9G952JD');