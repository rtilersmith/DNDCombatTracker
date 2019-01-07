INSERT INTO users ( name, email, password)
VALUES (${name}, ${email}, ${password})
RETURNING *
-- ;
-- IF RETURNING DOESN'T WORK, USE THE FOLLOWING:
-- SELECT * FROM users
-- WHERE auth_id=${sub};