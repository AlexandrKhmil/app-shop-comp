module.exports = {
  get: `SELECT password
        FROM account
        WHERE id = $1;`,
  set: `UPDATE account
        SET password = $1
        WHERE id = $2;`
};