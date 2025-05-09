const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/:ticker', async (req, res) => {
  const { ticker } = req.params;
  const { minutes, aggregation } = req.query;

  try {

    const response = await axios.get(`http://20.244.56.144/evaluation-service/stocks/${ticker}?minutes=${minutes}`, {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    const priceHistory = response.data.priceHistory;
    
  
    const sum = priceHistory.reduce((acc, curr) => acc + curr.price, 0);
    const averageStockPrice = sum / priceHistory.length;

    res.json({
      averageStockPrice,
      priceHistory
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
