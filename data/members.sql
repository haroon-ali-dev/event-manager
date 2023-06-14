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
	created_by VARCHAR(300) NOT NULL
);

insert into members (first_name, last_name, gender, date_of_birth, address, post_code, email, mobile, additional_info, member_since, created_by) values ('Leigh', 'Shambrook', 'Male', '2022-08-03', 'Apt 1147', 'PO Box 29622', 'lshambrook0@sitemeter.com', 99999999999, 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.

Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', '2022-08-24', 'Leigh Shambrook');

insert into members (first_name, last_name, gender, date_of_birth, address, post_code, email, mobile, additional_info, member_since, created_by) values ('Jard', 'Hairesnape', 'Male', '2022-12-22', 'Apt 1215', 'Room 171', 'jhairesnape1@yellowbook.com', 99999999999, 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.

In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', '2023-02-16', 'Jard Hairesnape');

insert into members (first_name, last_name, gender, date_of_birth, address, post_code, email, mobile, additional_info, member_since, created_by) values ('Vevay', 'Beckmann', 'Female', '2023-03-15', '18th Floor', 'Apt 1153', 'vbeckmann2@prweb.com', 99999999999, 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', '2022-07-26', 'Vevay Beckmann');

insert into members (first_name, last_name, gender, date_of_birth, address, post_code, email, mobile, additional_info, member_since, created_by) values ('Naomi', 'Donisi', 'Female', '2022-10-03', 'Suite 90', 'Suite 99', 'ndonisi3@marketwatch.com', 99999999999, 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', '2022-07-28', 'Naomi Donisi');

insert into members (first_name, last_name, gender, date_of_birth, address, post_code, email, mobile, additional_info, member_since, created_by) values ('Glenn', 'Gilder', 'Female', '2023-04-12', '13th Floor', '20th Floor', 'ggilder4@gmpg.org', 99999999999, 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', '2023-01-26', 'Glenn Gilder');