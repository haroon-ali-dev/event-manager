create table members (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(150) NOT NULL,
	last_name VARCHAR(150) NOT NULL,
	date_of_birth DATE NOT NULL,
	member_since DATE NOT NULL,
	address VARCHAR(300) NOT NULL,
	gender VARCHAR(50) NOT NULL,
	mobile VARCHAR(11) NOT NULL,
	email VARCHAR(256) NOT NULL,
	additional_info TEXT,
	created_by VARCHAR(100) NOT NULL
);

insert into members (id, first_name, last_name, date_of_birth, member_since, address, gender, mobile, email, additional_info, created_by) values (1, 'Jelene', 'Emsden', '2023-05-08', '2022-12-17', '5th Floor', 'Female', 99999999999, 'jemsden0@altervista.org', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', '01H2QQFTG2N6NY09S795Q0QZZ9');
insert into members (id, first_name, last_name, date_of_birth, member_since, address, gender, mobile, email, additional_info, created_by) values (2, 'Billie', 'Noury', '2022-09-30', '2022-07-22', 'Room 1063', 'Female', 99999999999, 'bnoury1@bizjournals.com', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.', '01H2QQFTG3N4XTKBN9EXVACSED');
insert into members (id, first_name, last_name, date_of_birth, member_since, address, gender, mobile, email, additional_info, created_by) values (3, 'Gaylor', 'Gahagan', '2022-06-24', '2022-09-29', 'Apt 18', 'Male', 99999999999, 'ggahagan2@paginegialle.it', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', '01H2QQFTG5QED9E4ERPR9TJS1R');
insert into members (id, first_name, last_name, date_of_birth, member_since, address, gender, mobile, email, additional_info, created_by) values (4, 'Sarajane', 'Tenney', '2022-10-31', '2022-06-13', '16th Floor', 'Female', 99999999999, 'stenney3@yahoo.co.jp', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.

Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', '01H2QQFTG6N6ESZQ6RWWFXKGJ0');
insert into members (id, first_name, last_name, date_of_birth, member_since, address, gender, mobile, email, additional_info, created_by) values (5, 'Husein', 'Asman', '2022-09-27', '2023-04-06', 'Suite 12', 'Male', 99999999999, 'hasman4@arstechnica.com', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', '01H2QQFTG7WVQKKFM6F88G6WKY');