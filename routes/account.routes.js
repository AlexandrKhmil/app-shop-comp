const { Router } = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator')
const db = require('../connection');
const account = require('../middleware/account.middleware');
const signToken = require('../functions/signToken');

// GET `api/account/auth`
router.get('/auth', account,
  async (req, res) => {
    try {
      const query = `SELECT email
                     FROM account
                     WHERE id = $1;`;
      const result = await db.one(query, req.token.id)
        .then((data) => data)
        .catch((error) => ({ error }));
      if (result.error) {
        return res.status(500).json({ 
          msg: 'Error', 
          error: result.error, 
        });
      }
      return res.status(200).json(result);
    } catch (error) { 
      return res.status(500).json({ message: 'Error', error });
    }
  }
);

// POST `api/account/login`
router.post('/login', [ 
    body('email', 'Error').normalizeEmail().isEmail(),
    body('password', 'Error').isLength({ min: 5 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(500).json({ 
          msg: 'Error', 
          errorList: errors.array(), 
        });
      }

      const { email, password } = req.body;
      const query = `SELECT id, password
                     FROM account
                     WHERE email = $1;`;

      const result = await db.one(query, email)
        .then((data) => data)
        .catch((error) => ({ error }));
      if (result.error) {
        return res.status(500).json({ 
          msg: 'Error', 
          error: result.error, 
        });
      }

      const isMatch = await bcrypt.compare(password, result.password);
      if (!isMatch) {
        return res.status(500).json({ msg: 'Error' });
      }

      const token = signToken(result.id);
      return res.status(200).json({ token, email });
    } catch (error) {
      return res.status(500).json({ msg: 'Error', error })
    }
  }
);

// POST `api/account/register`
router.post('/register', [
    body('email', 'Error').normalizeEmail().isEmail(),
    body('password', 'Error').isLength({ min: 5 })
  ], 
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(500).json({ 
          msg: 'Error', 
          errorList: errors.array(), 
        });
      }

      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await db.func('account_add_func', [email, hashedPassword])
        .then((data) => data[0].account_add_func)
        .catch((error) => ({ error }));
      if (result.error) {
        return res.status(500).json({ 
          msg: 'Error', 
          error: result.error 
        });
      }

      const token = signToken(result);
      return res.status(200).json({ token, email });
    } catch (error) {
      return res.status(500).json({ msg: 'Error', error })
    }
  }
);

module.exports = router;