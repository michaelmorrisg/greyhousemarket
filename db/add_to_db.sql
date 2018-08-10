insert into products (product_name,price,image,description,color_options)
values (${name},${price},${image},${description},${colors})
returning *;