const express = require('express');
const axios = require('axios');
const router = express.Router();

const calculateCorrelation = (pricesX, pricesY) => {
  const meanX = pricesX.reduce((sum, price) => sum + price, 0) / pricesX.length;
  const meanY = pricesY.reduce((sum, price) => sum + price, 0) / pricesY.length;

  let covariance = 0;
  let varianceX = 0;
  let varianceY = 0;

  for (let i = 0; i < pricesX.length; i++) {
    covariance += (pricesX[i] - meanX) * (pricesY[i] - meanY);
    varianceX += Math.pow(pricesX[i] - meanX, 2);
    varianceY += Math.pow(pricesY[i] - meanY, 2);
  }

  const correlation = covariance / (Math.sqrt(varianceX) * Math.sqrt(varianceY));
  return correlation;
};

router.get('/', async (req, res) => {
  const { minutes, ticker: ticker1 } = req.query;
  const { ticker: ticker2 } = req.query;

  try {
    const [stock1Data, stock2Data] = await Promise.all([
      axios.get(`http://20.244.56.144/evaluation-service/stocks/${ticker1}?minutes=${minutes}`, {
        headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` }
      }),
      axios.get(`http://20.244.56.144/evaluation-service/stocks/${ticker2}?minutes=${minutes}`, {
        headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` }
      })
    ]);

    const prices1 = stock1Data.data.priceHistory.map(p => p.price);
    const prices2 = stock2Data.data.priceHistory.map(p => p.price);

    const correlation = calculateCorrelation(prices1, prices2);

    res.json({
      correlation,
      stocks: {
        [ticker1]: stock1Data.data,
        [ticker2]: stock2Data.data
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
