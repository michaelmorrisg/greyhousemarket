create table users (
id serial primary key,
first_name VARCHAR(35) NOT NULL,
last_name VARCHAR(35) NOT NULL,
email VARCHAR(50) NOT NULL
);

create table products (
products_id serial Primary Key,
product_name text,
price decimal,
image text,
description text
);

create table category (
category_id serial primary key,
name text
);

create table category_product (
product_id integer references products(products_id),
category_id integer references category(category_id)
);

create table cart (
item_id integer references products(products_id),
name text,
price integer,
image text
);