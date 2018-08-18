insert into purchases (total_amount,purchase_date,status,ts)
values(${amount},${date},'pending',now())
returning *;