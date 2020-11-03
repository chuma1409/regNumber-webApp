create table regLocation(
   id serial not null primary key,
    locations text,
    char_location text 
);

create table regNumber(
	id serial not null primary key,
	number_plate text,
	reg_key int, 
	foreign key (reg_key) references regLocation(id)
);





create table regNumber(
	id serial not null primary key,
	number_plate varchar not null,
	reg_location varchar not null,
	foreign key (reg_location) references regLocation(char_location)
);
insert into regLocation (locations, char_location) values('Paarl', 'CJ');
insert into regLocation (locations, char_location) values('Bellville', 'CY');
insert into regLocation (locations, char_location) values('Cape Town', 'CA');
insert into store_products (product_id, description, price, units_sold, store_id) values('B','Brightening Serum', 50.0,0,1);
insert into store_products (product_id, description, price, units_sold, store_id) values('B','Brightening Serum', 50.0,0,1);