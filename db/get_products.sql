select * from category_product
join products on products.products_id = category_product.product_id
where category_id = ${category}