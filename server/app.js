const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());

app.use(bodyParser.json());

// app.use((req, res, next) => {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', '*');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   // res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();

// });

app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log('req.body:', post);
  console.log('post: ', post);

  res.status(201).json({
    message: 'Post added successfully'
  });
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
      title: 'Second server-side post',
      content: 'This is the content'
    }
  ];

  res.status(200).json({
    message: 'Post fetched succesfully!',
    data: posts
  });
});

module.exports = app;