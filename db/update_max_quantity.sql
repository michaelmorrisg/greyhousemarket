update product_color_quantity
set product_quantity = ${remainder}
where color_id = ${colorId}
and products_id = ${productsId}