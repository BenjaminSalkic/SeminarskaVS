const express = require('express');
const _ = require('lodash');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from seminar demo');
});

app.get('/vulnerable', (req, res) => {
  // Intentionally using a simple example that could be flagged by scanners
  const obj = { user: '<script>alert("x")</script>' };
  const safe = _.escape(obj.user);
  res.send(`escaped user: ${safe}`);
});

app.listen(port, () => console.log(`App listening on ${port}`));
