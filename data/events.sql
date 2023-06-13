create table events (
	id SERIAL PRIMARY KEY,
	name VARCHAR(300) NOT NULL,
	date DATE NOT NULL,
	information TEXT NOT NULL,
	created_by VARCHAR(100) NOT NULL
);

insert into events (id, name, date, information, created_by) values (1, 'sem', '2023-04-29', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', '01H2QQW92E62S7WH3JA44MTPDR');
insert into events (id, name, date, information, created_by) values (2, 'metus aenean', '2022-06-20', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', '01H2QQW92F08Z69S13PFQ23K6P');
insert into events (id, name, date, information, created_by) values (3, 'praesent blandit lacinia erat', '2022-10-07', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', '01H2QQW92GNXN0FGDGV726Y1SJ');
insert into events (id, name, date, information, created_by) values (4, 'consequat morbi', '2022-10-29', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', '01H2QQW92H5CKM8GDVWANM1Q3C');
insert into events (id, name, date, information, created_by) values (5, 'parturient montes nascetur', '2022-08-09', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', '01H2QQW92KYSAAS3TXEMA3NZMJ');
