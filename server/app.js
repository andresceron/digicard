const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log('First middleware');
  next();
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  next();
});

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 1,
      title: 'First server-side post',
      content: 'This is the content'
    },
    {
      id: 2,
      title: 'First server-side post',
      content: 'This is the content'
    }
  ];

  res.status(200).json({
    message: 'Post fetched succesfully!',
    posts: posts
  });
});

module.exports = app;