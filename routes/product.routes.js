const { Router } = require('express');
const router = Router();
const db = require('../connection');
const { body, validationResult } = require('express-validator');
const touple = require('../functions/touple');
const account = require('../middleware/account.middleware');

router.get('/list',
  async (req, res) => {
    try {
      const { 
        limit, 
        offset, 
        category,
        tag,
        title,
        pricemin,
        pricemax,
        sort,
        sortway,
      } = req.headers;
      const categoryList = category && touple(category),
            tagList = tag && touple(tag),
            titleLike = title && `'%${title}%'`,
            parameters = { limit, offset, };

      let sortSQL = sort === 'price' ? 'p.price' : 'p.create_time';
      sortSQL += sortway === 'desc' ? ' DESC' : ' ASC';

      const query = `
        SELECT DISTINCT 
          p.id, p.title, p.img_url, p.category, 
          p.link, p.price, p.description, p.create_time,
          AVG(rate.value) AS rate,
          COUNT(rate.*) AS vote_count,
          COUNT(rev.*) AS review_count,
          array(SELECT tag
                FROM tag
                WHERE product_id = p.id) AS tag_list
        FROM product AS p
          LEFT JOIN rate ON rate.product_id = p.id
          LEFT JOIN review AS rev ON rev.product_id = p.id
          ${tag ? 'LEFT JOIN tag ON tag.product_id = p.id' : ''}
        WHERE status = 'default'
          ${categoryList ? `AND category IN ${categoryList}` : ''}
          ${tag ? `AND tag IN ${tagList}` : ''}
          ${titleLike ? `AND title LIKE ${titleLike}` : ''}
          ${pricemin ? `AND price >= ${pricemin}` : ''}
          ${pricemax ? `AND price <= ${pricemax}` : ''}
        GROUP BY p.id
        ORDER BY ${sortSQL} LIMIT $<limit> OFFSET $<offset>;`;

      const result = await db.any(query, parameters)
        .then((data) => data)
        .catch((error) => ({ error }));
      if (result.error) {
        return res.status(500).json({ 
          msg: 'Error1',
          error: result.error
        });
      }

      return res.status(200).json(result);
    } catch(error) {
      console.log(error)
      return res.status(500).json({ msg: 'Error', error});
    }
  }
);

router.get('/:link/info',
  async (req, res) => {
    try {
      const { link } = req.params;
      const query = `
        SELECT
          p.id,
          p.title,
          p.img_url,
          p.category,
          p.link,
          p.price,
          p.description,
          p.create_time,
          AVG(value) AS rate,
          COUNT(rate.*) AS votes,
          COUNT(rev.*) AS review_count,
          array(SELECT tag
                FROM tag
                WHERE tag.product_id = p.id) AS tag_list,
          (SELECT json_agg(t)
          FROM (SELECT 
                  rev.id,
                  rev.title,
                  rev.text,
                  a.email,
                  (SELECT COUNT(1) 
                  FROM review_vote WHERE vote = true) AS likes,
                  (SELECT COUNT(1) 
                  FROM review_vote WHERE vote = false) AS dislikes,
                  rev.create_time,
                  rev.update_time
                FROM review AS rev
                  INNER JOIN account AS a ON a.id = rev.account_id
                WHERE rev.product_id = p.id
                GROUP BY rev.id, a.email) AS t)
        FROM product AS p
          LEFT JOIN rate ON rate.product_id = p.id
          LEFT JOIN review AS rev ON rev.product_id = p.id
        WHERE status = 'default'
          AND p.link = $1
        GROUP BY p.id`;
      const result = await db.one(query, link)
        .then((data) => data)
        .catch((error) => ({ error }));
      if (result.error) {
        return res.status(500).json({ msg: 'Error', error });
      }
      return res.status(200).json(result);
    } catch(error) {
      return res.status(500).json({ msg: 'Error', error });
    }
  }
);

router.post('/:link/rate', account, [
    body('value', 'Error').isInt({ min: 1, max: 5}),
    body('productid', 'Error').exists(),
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

      const { productid, value } = req.body;
      const accountid = req.token.id;

      db.func('product_rate_func', [accountid, productid, value])
        .then(() => res.status(200).json({ msg: 'Ok' }))
        .catch((error) => res.status(500).json({ msg: 'Error', error }));
    } catch(error) {
      return res.status(500).json({ msg: 'Error', error });
    }
  }
);

router.delete('/:link/rate', account, [
    body('productid', 'Error').exists(),
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

      const { productid } = req.body;
      const accountid = req.token.id;
      const params = { accountid, productid };

      const query = `
        DELETE FROM rate
        WHERE account_id = $<accountid> AND product_id = $<productid>;`;

      db.none(query, params)
        .then(() => res.status(200).json({ msg: 'Ok' }))
        .catch((error) => res.status(500).json({ msg: 'Error', error }));
    } catch(error) {
      return res.status(500).json({ msg: 'Error', error });
    }
  }
);

router.post('/:link/review', account, [
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