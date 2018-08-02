select * from cart
join products on cart.product_id = products.products_id
where user_id = ${id}
ORDER by products_id asc;