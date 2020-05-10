module.exports = `
  SELECT AVG(rate.value) AS rate
  FROM rate
    INNER JOIN product AS p ON p.id = rate.product_id
  WHERE p.link = $1;
`;