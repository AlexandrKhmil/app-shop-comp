const pgp = require('pg-promise')();
const db = pgp(require('config').get('db'));

module.exports = db;