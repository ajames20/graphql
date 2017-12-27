const app = require('./server/server');
const path = require('path');
const express = require('express');

app.use(express.static(path.join(__dirname, '/')));

app.listen(process.env.PORT || 4000, () => {
  console.log('Listening');
});
