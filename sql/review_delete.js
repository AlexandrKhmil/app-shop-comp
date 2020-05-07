module.exports = `
  DELETE FROM review
    WHERE account_id = $<accountid> 
      AND product_id IN (SELECT id FROM product WHERE link = $<link>);
`;