module.exports = `
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
    (SELECT COUNT(1) FROM rate WHERE product_id = p.id) AS votes,
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
             (SELECT COUNT(1) FROM review_vote WHERE vote = true) AS likes,
             (SELECT COUNT(1) FROM review_vote WHERE vote = false) AS dislikes,
             rev.create_time,
             rev.update_time
           FROM review AS rev
             INNER JOIN account AS a ON a.id = rev.account_id
           WHERE rev.product_id = p.id
           GROUP BY rev.id, a.email) AS t) as review_list
  FROM product AS p
    LEFT JOIN rate AS r ON r.product_id = p.id
    LEFT JOIN review AS rev ON rev.product_id = p.id
  WHERE status = 'default'
    AND p.link = $1
  GROUP BY p.id;
`;