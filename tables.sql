create table regLocation(
	id serial not null primary key,
    location text not null,
    char_location text not null
);

create table regNumber(
	id serial not null primary key,
    number_plate text not null,
	regLocation_id int,
	foreign key (regLocation_id) references regLocation(id)
);

insert into regLocation (location, char_location) values('Paarl', 'CJ');
insert into store_products (product_id, description, price, units_sold, store_id) values('B','Brightening Serum', 50.0,0,1);
insert into store_products (product_id, description, price, units_sold, store_id) values('B','Brightening Serum', 50.0,0,1);