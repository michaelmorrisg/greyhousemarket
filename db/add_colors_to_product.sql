insert into product_color_quantity (color_id,products_id,product_quantity)
values (${colorId},${productId},${productQuantity})
returning *