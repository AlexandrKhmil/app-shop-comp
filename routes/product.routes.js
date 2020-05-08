const { Router } = require('express');
const router = Router();
const db = require('../connection');
const { body } = require('express-validator');
const account = require('../middleware/account.middleware');
const error = require('../middleware/error.middleware');

// GET 'api/product/list'
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

// GET 'api/product/categories/'
router.get(
  '/categories',
  async (req, res) => {
    try {
      const query = require('../sql/product_get_categories');
      
      const result = await db.any(query)
        .then((data) => data)
        .catch((error) => ({ error }));
      if (result.error) {
        return res.status(500).json({ msg: 'Error1', error: result.error });
      }

      return res.status(200).json(result.map((category) => category.category));
    } catch(error) {
      return res.status(500).json({ msg: 'Error' });
    }
  }
);

// GET 'api/product/tags/'
router.get(
  '/tags',
  async (req, res) => {
    try {
      const query = require('../sql/product_get_tags');
      
      const result = await db.any(query)
        .then((data) => data)
        .catch((error) => ({ error }));
      if (result.error) {
        return res.status(500).json({ msg: 'Error1', error: result.error });
      }

      return res.status(200).json(result.map((tag) => tag.tag));
    } catch(error) {
      return res.status(500).json({ msg: 'Error' });
    }
  }
);

// GET 'api/product/{link}/info'
router.get(
  '/:link/info',
  async (req, res) => {
    try {
      const { link } = req.params;
      const query = require('../sql/product_get_item');

      const result = await db.one(query, link)
        .then((data) => data)
        .catch((error) => ({ error }));
      if (result.error) {
        return res.status(500).json({ msg: 'Error', error: result.error });
      }

      return res.status(200).json(result);
    } catch(error) {
      return res.status(500).json({ msg: 'Error1' });
    }
  }
);

// POST 'api/product/{link}/rate'
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
      return res.status(500).json({ msg: 'Error' });
    }
  }
);

// DELETE 'api/product/{link}/rate'
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
      return res.status(500).json({ msg: 'Error' });
    }
  }
);

// POST 'api/product/{link}/review'
router.post(
  '/:link/review', 
  account, 
  [
    body('title', 'Title').isLength({ min: 5, max: 255 }),
    body('text', 'Text').isLength({ min: 5 })
  ],
  error,
  async (req, res) => {
    try {
      const { link } = req.params;
      const accountid = req.token.id;
      const { title, text } = req.body;

      db.func('review_add_func', [link, accountid, title, text])
        .then(() => res.status(200).json({ msg: 'OK' }))
        .catch((error) => res.status(500).json({ msg: 'Error', error }));
    } catch(error) {
      return res.status(500).json({ msg: 'Error' });
    }
  }
);

// DELETE 'api/product/{link}/review'
router.delete(
  '/:link/review',
  account,
  async (req, res) => {
    try {
      const { link } = req.params;
      const accountid = req.token.id;
      const query = require('../sql/review_delete');

      db.none(query, { accountid, link })
        .then(() => res.status(200).json({ msg: 'Ok' }))
        .catch((error) => res.status(500).json({ msg: 'Error', error }));
    } catch(error) {
      return res.status(500).json({ msg: 'Error' });
    }
  }
);

// POST 'api/product/{link}/info/{id}'
router.post(
  '/:link/review/:id',
  account,
  [ body('vote', 'Vote').isBoolean() ],
  error,
  async(req, res) => {
    try {
      const { id } = req.params;
      const accountid = req.token.id;
      const { vote } = req.body;

      db.func('review_vote_func', [ id, accountid, vote ])
        .then(() => res.status(200).json({ msg: 'Ok' }))
        .catch((error) => res.status(500).json({ msg: 'Error', error }));
    } catch(error) {
      return res.status(500).json({ msg: 'Error' });
    }
  }
);

// DELETE 'api/product/{link}/info/{id}'
router.delete(
  '/:link/review/:id',
  account,
  async (req, res) => {
    try {
      const { id } = req.params;
      const accountid = req.token.id;
      const query = require('../sql/review_vote_delete');

      db.none(query, { reviewid: id, accountid })
        .then(() => res.status(200).json({ msg: 'Ok' }))
        .catch((error) => res.status(500).json({ msg: 'Error', error }));
    } catch(error) {
      return res.status(500).json({ msg: 'Error' });
    }
  }
);

module.exports = router;