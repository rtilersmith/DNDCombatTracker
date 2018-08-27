INSERT INTO users ( auth_id, name, email, picture)
VALUES (${sub}, ${name}, ${email}, ${picture})
RETURNING *
-- ;
-- IF RETURNING DOESN'T WORK, USE THE FOLLOWING:
-- SELECT * FROM users
-- WHERE auth_id=${sub};