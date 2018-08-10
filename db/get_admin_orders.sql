select * from purchases
join purchases_cart on purchases.purchase_id = purchases_cart.purchase_id
join products on products.products_id = purchases_cart.products_id
join users on users.id = purchases_cart.users_id
where status = 'pending'
order by purchase_date desc;