const axios = require('axios');

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNTc0MzQ0LCJpYXQiOjE3NDM1NzQwNDQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImQ5Y2JiNjk5LTZhMjctNDRhNS04ZDU5LThiMWJlZmE4MTZkYSIsInN1YiI6InJhbWtyaXNobmFAYWJjLmVkdSJ9LCJlbWFpbCI6InJhbWtyaXNobmFAYWJjLmVkdSIsIm5hbWUiOiJyYW0ga3Jpc2huYSIsInJvbGxObyI6ImFhMWJiIiwiYWNjZXNzQ29kZSI6InhnQXNOQyIsImNsaWVudElEIjoiZDljYmI2OTktNmEyNy00NGE1LThkNTktOGIxYmVmYTgxNmRhIiwiY2xpZW50U2VjcmV0IjoidFZKYWFhUkJTZVhjUlhlTSJ9.YApD98gq0IN_OWw7JMfmuUfK1m4hLTm7AIcLDcLAzVg'

const urls = {
  p: 'http://20.244.56.144/evaluation-service/primes',
  f: 'http://20.244.56.144/evaluation-service/fibo',
  e: 'http://20.244.56.144/evaluation-service/even',
  r: 'http://20.244.56.144/evaluation-service/rand'
};

async function fetchNumbers(type) {
  if (!urls[type]) return [];

  try {
    const source = axios.CancelToken.source();
    const timeout = setTimeout(() => source.cancel(), 500);

    const response = await axios.get(urls[type], {
      cancelToken: source.token,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    clearTimeout(timeout);
    return response.data.numbers || [];
  } catch (err) {
    console.error(` Error or Timeout fetching ${type}: ${err.message}`);
    return [];
  }
}

module.exports = { fetchNumbers };
