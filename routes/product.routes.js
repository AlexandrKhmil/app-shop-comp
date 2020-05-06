const { Router } = require('express');
const router = Router();
const db = require('../connection');
const { body, validationResult } = require('express-validator');
const account = require('../middleware/account.middleware');
const error = require('../middleware/error.middleware');

router.get(
  '/list',
  async (req, res) => {
    try {
      const { limit, offset } = req.headers;
      const query = require('../sql/product_get_list')(req.headers);
      const result = await db.any(query, { limit, offset })
        .then((data) => data)
        .catch((error) => ({ error }));
      if (result.error) {
        return res.status(500).json({ msg: 'Error1', error: result.error });
      }
      return res.status(200).json(result);
    } catch(error) {
      return res.status(500).json({ msg: 'Error' });
    }
  }
);

router.get(
  '/:link/info',
  async (req, res) => {
    try {
      const { link } = req.params;
      const query = require('../sql/product_get_item');
      const result = await db.one(query, link)
        .then((data) => data)
        .catch((error) => ({ error }));
      console.log(result)
      if (result.error) {
        return res.status(500).json({ msg: 'Error', error: result.error });
      }
      return res.status(200).json(result);
    } catch(error) {
      return res.status(500).json({ msg: 'Error1', error });
    }
  }
);

router.post(
  '/:link/rate',
  account, 
  [ body('value', 'Error').isInt({ min: 1, max: 5}) ],
  error,
  async (req, res) => {
    try {
      const { link } = req.params;
      const { value } = req.body;
      const accountid = req.token.id;

      db.func('product_rate_func', [accountid, link, value])
        .then(() => res.status(200).json({ msg: 'Ok' }))
        .catch((error) => res.status(500).json({ msg: 'Error', error }));
    } catch(error) {
      return res.status(500).json({ msg: 'Error', error });
    }
  }
);

router.delete(
  '/:link/rate', 
  account,
  async (req, res) => {
    try {
      const { link } = req.params;
      const accountid = req.token.id;
      const query = require('../sql/rate_delete');
      db.none(query, { accountid, link })
        .then(() => res.status(200).json({ msg: 'Ok' }))
        .catch((error) => res.status(500).json({ msg: 'Error', error }));
    } catch(error) {
      return res.status(500).json({ msg: 'Error', error });
    }
  }
);

router.post(
  '/:link/review', 
  account, 
  [],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(500).json({ 
          msg: 'Error', 
          errorList: errors.array(), 
        });
      }

      const query = `
        INSERT INTO public.review
        (product_id, account_id, title, "text", create_time, update_time)
        VALUES(0, 0, '', '', now(), now());`;
      
    } catch(error) {
      return res.status(500).json({ msg: 'Error', error });
    }
  }
);

module.exports = router;