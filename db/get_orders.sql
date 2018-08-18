select * from purchases_cart
join purchases on purchases.purchase_id = purchases_cart.purchase_id
join products on purchases_cart.products_id = products.products_id
where users_id = ${id}
order by purchases.ts desc