update users
set password = ${newPass}
where email = ${email}
returning *