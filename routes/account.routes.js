const { Router } = require('express');
const router = Router();
const jwtSecret = require('config').get('jwtSecret');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { head, body, validationResult } = require('express-validator')
const db = require('../connection');
const account = require('../middleware/account.middleware');

// GET `api/account/auth`
router.get('/auth', account,
  async (req, res) => {
    try {
      const query = `
        SELECT email
        FROM account
        WHERE id = $1`;
      const result = await db.one(query, req.token.id)
        .then((data) => data)
        .catch((error) => ({ error }));
      if (result.error) {
        return res.status(500).json({ error: result.error });
      }
      return res.status(200).json(result);
    } catch (e) { 
      return res.status(500).json({ message: e });
    }
  }
);

// POST `api/account/login`
router.post('/login', [ 
    body('email', 'Error').normalizeEmail().isEmail(),
    body('password', 'Error').isLength({ min: 5 })
  ],
  (req, res) => {
    try {

    } catch (error) {

    }
  }
);

// POST `api/account/register`
router.post('/register', [
    body('email', 'Error').normalizeEmail().isEmail(),
    body('password', 'Error').isLength({ min: 5 })
  ], 
  (req, res) => {
    try {

    } catch (error) {

    }
  }
);

module.exports = router;