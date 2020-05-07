const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json({ extended: true }));
app.use('/api/account', require('./routes/account.routes'));
app.use('/api/product', require('./routes/product.routes'));
app.use('/api/order', require('./routes/order.routes'));

app.listen(port, () => {
  console.log(`App listening`);
});