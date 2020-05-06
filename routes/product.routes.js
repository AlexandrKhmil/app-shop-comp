const { Router } = require('express');
const router = Router();
const db = require('../connection');
const touple = require('../functions/touple');

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

      let sortSQL = sort === 'price' ? 'price' : 'create_time';
      sortSQL += sortway === 'desc' ? ' DESC' : ' ASC';

      const query = `
        SELECT DISTINCT 
          id, title, img_url, category, link, price, description, create_time,
          array(SELECT tag
                FROM tag
                WHERE product_id = id) AS tag_list
        FROM product AS p
          ${tag ? 'LEFT JOIN tag ON tag.product_id = p.id' : ''}
        WHERE status = 'default'
          ${categoryList ? `AND category IN ${categoryList}` : ''}
          ${tag ? `AND tag IN ${tagList}` : ''}
          ${titleLike ? `AND title LIKE ${titleLike}` : ''}
          ${pricemin ? `AND price >= ${pricemin}` : ''}
          ${pricemax ? `AND price <= ${pricemax}` : ''}
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

module.exports = router;