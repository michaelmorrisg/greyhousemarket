insert into products (product_name,price,image,description,measurements)
values (${product_name},${price},${image},${description},${measurement})
returning *