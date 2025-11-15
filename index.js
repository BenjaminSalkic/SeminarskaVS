const express = require('express');
const _ = require('lodash');
const helmet = require('helmet');
const app = express();
const port = process.env.PORT || 3000;

// Security: disable the X-Powered-By header
app.disable('x-powered-by');

// Use helmet for common security headers
app.use(helmet());

// Set a conservative Content-Security-Policy and ensure anti-clickjacking and nosniff headers
app.use((req, res, next) => {
  // Adjust the CSP directives to match your app's needs; this is a restrictive default.
  res.setHeader('Content-Security-Policy', "default-src 'self'; frame-ancestors 'none';");
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

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
