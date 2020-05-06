module.exports = `
SELECT email
FROM account
WHERE id = $1;
`;