const { Router } = require('express');
const router = Router();
const db = require('../connection');
const { body } = require('express-validator');
const account = require('../middleware/account.middleware');
const error = require('../middleware/error.middleware');

// POST '/api/order/' [ {"product_id" : 2, "quantity" : 99} ]
router.post(
  '/',
  account,
  [ body('cart', 'Cart').isArray() ],
  error,
  async (req, res) => {
    try {
      const accountid = req.token.id;
      const code = require('shortid').generate();
      const { cart } = req.body;

      db.func('order_add_func', [accountid, JSON.stringify(cart), code])
        .then(() => res.status(200).json({ msg: 'Ok', code }))
        .catch((error) => res.status(500).json({ msg: 'Error', error }));
    } catch(error) {
      return res.status(500).json({ msg: 'Error' });
    }
  }
);

// GET '/api/order/list'
router.get(
  '/list',
  account,
  async (req, res) => {
    try {
      const accountid = req.token.id;
      const query = require('../sql/order_get_list');
      
      const result = await db.any(query, accountid)
        .then((data) => data)
        .catch((error) => ({ error }));
      if (result.error) {
        return res.status(500).json({ msg: 'Error', error });
      }

      return res.status(200).json(result);
    } catch(error) {
      return res.status(500).json({ msg: 'Error' });
    }
  }
);

module.exports = router;