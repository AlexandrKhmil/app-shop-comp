module.exports = `
  DELETE FROM review_vote
  WHERE account_id = $<accountid> AND review_id = $<reviewid>;
`;