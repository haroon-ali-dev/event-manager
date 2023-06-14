create table events (
	id SERIAL PRIMARY KEY,
	name VARCHAR(300) NOT NULL,
	date DATE NOT NULL,
	information TEXT NOT NULL,
	created_by VARCHAR(300) NOT NULL
);

insert into events (name, date, information, created_by) values ('ultrices posuere cubilia', '2022-12-23', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.

Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'Katha Tyrwhitt');

insert into events (name, date, information, created_by) values ('bibendum felis sed interdum', '2023-04-06', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'Lebbie Champion');

insert into events (name, date, information, created_by) values ('erat', '2022-12-03', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.

Sed ante. Vivamus tortor. Duis mattis egestas metus.', 'Niki Yglesia');

insert into events (name, date, information, created_by) values ('nulla facilisi cras', '2023-05-19', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.

Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 'Melisse Ivanisov');

insert into events (name, date, information, created_by) values ('pede venenatis non sodales', '2023-03-17', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'Bobbie Venton');