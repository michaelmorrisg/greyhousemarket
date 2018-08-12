select * from cart
join color on cart.color = color.color_name
join products on products.products_id = cart.product_id
join product_color_quantity on product_color_quantity.color_id = color.color_id
where user_id = ${id}
ORDER by products.products_id asc;