insert into purchases (total_amount,purchase_date)
values(${amount},${date})
returning *;