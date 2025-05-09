const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());


app.use('/stocks', require('./routes/stocks'));
app.use('/stockcorrelation', require('./routes/stockCorrelation'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
