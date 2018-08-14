select * from purchases_cart
join products on purchases_cart.products_id = products.products_id
join users on users.id = purchases_cart.users_id
where purchase_id = ${id}