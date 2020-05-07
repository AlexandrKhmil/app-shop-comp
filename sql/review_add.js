module.exports = `
  INSERT INTO review
    (product_id, account_id, title, text)
  VALUES($<productid>, $<accountid>, $<title>, $<text>);
`;