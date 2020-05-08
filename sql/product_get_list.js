const touple = require('../functions/touple');

module.exports = ({
  category,
  tag,
  title,
  pricemin,
  pricemax,
  sort,
  sortway,
}) => { 
  const tagTouple = tag && touple(tag);
  const titleSample = title && `'%${title}%'`;
  let sortSQL = sort === 'price' ? 'p.price' : 'p.create_time';
  sortSQL += sortway === 'desc' ? ' DESC' : ' ASC';
  return `
    SELECT DISTINCT 
      p.id, 
      p.title, 
      p.img_url, 
      p.category, 
      p.link, 
      p.price, 
      p.description, 
      p.create_time,
      AVG(rate.value) AS rate,
      COUNT(rate.*) AS vote_count,
      COUNT(rev.*) AS review_count,
      array(SELECT tag
            FROM tag
            WHERE product_id = p.id) AS tag_list
    FROM product AS p
      LEFT JOIN rate ON rate.product_id = p.id
      LEFT JOIN review AS rev ON rev.product_id = p.id
      ${tagTouple ? 'LEFT JOIN tag ON tag.product_id = p.id' : ''}
    WHERE status = 'default'
      ${category ? `AND category = '${category}'` : ''}
      ${tagTouple ? `AND tag IN ${tagTouple}` : ''}
      ${titleSample ? `AND title LIKE ${titleSample}` : ''}
      ${pricemin ? `AND price >= ${pricemin}` : ''}
      ${pricemax ? `AND price <= ${pricemax}` : ''}
    GROUP BY p.id
    ORDER BY ${sortSQL} LIMIT $<limit> OFFSET $<offset>;
  `;
}