insert into users (first_name,last_name,email,password)
values (${firstName},${lastName},${email},${password})
returning *;