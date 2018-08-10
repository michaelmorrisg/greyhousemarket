select * from reviews 
where product_id = ${productId}
order by rating desc;