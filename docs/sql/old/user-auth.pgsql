-- Select user by specified ID

SELECT
	u_email,
	u_password,
	u_create_time
FROM "user"
WHERE u_id = 1;