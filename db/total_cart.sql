select Sum(quantity) from cart
where user_id = ${id};