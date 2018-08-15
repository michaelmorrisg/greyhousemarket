select * from products
where product_name like ${search}
or product_name like INITCAP(${search})