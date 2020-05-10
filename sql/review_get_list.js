module.exports = `
  SELECT 
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
    INNER JOIN product as p ON rev.product_id = p.id
  WHERE p.link = $1
  GROUP BY rev.id, a.email;
`;