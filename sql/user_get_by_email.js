module.exports =  `
SELECT id, password
FROM account
WHERE email = $1;
`;