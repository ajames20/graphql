const app = require('./server/server');
const express = require('express');
const path = require('path');

app.use(express.static(__dirname));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 4000, () => {
  console.log('Listening');
});
