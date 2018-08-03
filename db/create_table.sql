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

-- Cart is product_id, user_id, and quantity

create table purchases(
purchases_id serial primary key,
user_id integer references users(id),
date text,
total decimal
)

create table purchases_product(
purchases_id integer references purchases(purchases_id),
product_id integer references products(products_id),
product_amount integer
)