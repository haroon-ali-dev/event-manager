CREATE TABLE IF NOT EXISTS members (
	id SERIAL PRIMARY KEY,
	g_id VARCHAR(100) NOT NULL UNIQUE,
	first_name VARCHAR(150) NOT NULL,
	last_name VARCHAR(150) NOT NULL,
	gender VARCHAR(50) NOT NULL,
	date_of_birth DATE NOT NULL,
	address VARCHAR(300) NOT NULL,
	post_code VARCHAR(20) NOT NULL,
	email VARCHAR(256) NOT NULL UNIQUE,
	mobile VARCHAR(11) NOT NULL,
	additional_info TEXT,
	member_since DATE NOT NULL,
	created_by VARCHAR(300) NOT NULL
);

insert into members (g_id, first_name, last_name, gender, date_of_birth, address, post_code, email, mobile, additional_info, member_since, created_by) values ('01H3HG0917ZE91D5VA7MKWAD2A', 'Sawyere', 'Bache', 'Male', '2023-03-02', '18th Floor', 'PO Box 91067', 'sbache0@huffingtonpost.com', 99999999999, 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.

In congue. Etiam justo. Etiam pretium iaculis justo.', '2022-08-09', 'Sawyere Bache');
insert into members (g_id, first_name, last_name, gender, date_of_birth, address, post_code, email, mobile, additional_info, member_since, created_by) values ('01H3HG091BARNMZNKTZVPYFRJW', 'Elset', 'Farloe', 'Female', '2023-04-07', 'Apt 1712', 'Suite 87', 'efarloe1@discovery.com', 99999999999, 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', '2022-12-18', 'Elset Farloe');
insert into members (g_id, first_name, last_name, gender, date_of_birth, address, post_code, email, mobile, additional_info, member_since, created_by) values ('01H3HG091E37XFPA1VX9M42690', 'Haskell', 'Vivien', 'Male', '2023-04-08', 'Room 736', 'Apt 634', 'hvivien2@jiathis.com', 99999999999, 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', '2022-06-26', 'Haskell Vivien');
insert into members (g_id, first_name, last_name, gender, date_of_birth, address, post_code, email, mobile, additional_info, member_since, created_by) values ('01H3HG091GQPBX8MTE9VNF32F3', 'Leeland', 'MacFadin', 'Male', '2023-02-27', 'PO Box 82658', 'Room 1190', 'lmacfadin3@ihg.com', 99999999999, 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', '2022-11-11', 'Leeland MacFadin');
insert into members (g_id, first_name, last_name, gender, date_of_birth, address, post_code, email, mobile, additional_info, member_since, created_by) values ('01H3HG091K8D2HW0MBGYXK6Y6Y', 'Max', 'Chamberlaine', 'Female', '2023-01-26', 'Apt 1296', 'Apt 1882', 'mchamberlaine4@tuttocitta.it', 99999999999, 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', '2022-12-21', 'Max Chamberlaine');