insert into purchases (total_amount,purchase_date,status)
values(${amount},${date},'pending')
returning *;