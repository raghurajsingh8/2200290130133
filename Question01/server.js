const express = require('express');
const cors = require('cors');
const { fetchNumbers } = require('./utils/fetchNumbers'); 

const app = express();
const port = 9876;

app.use(cors());

let window = [];
const windowSize = 10;

app.get('/numbers/:type', async (req, res) => {
  const type = req.params.type;

  const newNumbers = await fetchNumbers(type);

  if (!newNumbers || newNumbers.length === 0) {
    return res.status(500).json({
      message: 'No numbers received from API or error occurred.',
    });
  }

  const windowPrevState = [...window];


  const newSet = new Set([...window, ...newNumbers]);
  const uniqueNumbers = [...newSet];

  const trimmed = uniqueNumbers.slice(-windowSize);


  const avg = trimmed.reduce((a, b) => a + b, 0) / trimmed.length;

 
  window = trimmed;

  res.json({
    windowPrevState,
    windowCurrState: trimmed,
    numbers: newNumbers,
    avg: avg.toFixed(2),
  });
});

app.listen(port, () => {
  console.log(` Server running at http://localhost:${port}`);
});
