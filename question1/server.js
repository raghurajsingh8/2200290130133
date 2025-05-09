const express = require('express');
const app = express();
const port = 9876; 

app.get('/evaluation-service/even', (req, res) => {
    res.json({
        numbers: [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56]
    });
});


app.get('/evaluation-service/primes', (req, res) => {
    res.json({
        numbers: [2, 3, 5, 7, 11]
    });
});

app.get('/evaluation-service/fibo', (req, res) => {
    res.json({
        numbers: [55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765]
    });
});

app.get('/evaluation-service/rand', (req, res) => {
    res.json({
        numbers: [2, 19, 25, 7, 4, 24, 17, 27, 30, 21, 14, 10, 23]
    });
});

app.listen(port, () => {
    console.log(`Test server running on http://localhost:${port}`);
});
