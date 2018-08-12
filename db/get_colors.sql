select * from product_color_quantity
join products on products.products_id = product_color_quantity.products_id
join color on color.color_id = product_color_quantity.color_id
where product_color_quantity.products_id = ${id}