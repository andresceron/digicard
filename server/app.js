const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post')

const app = express();

mongoose.connect("mongodb+srv://dbReadWrite:t0Xy7b4FePw573BD@cluster0-fdnhd.mongodb.net/node-angular?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to mongodb database!');
  }).catch((err) => {
    console.error('Unable to connect to mongodb database: ', err.message);
  });

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/api/posts', (req, res, next) => {

  Post.find().then(data => {
    res.status(200).json({
      message: 'Post fetched succesfully!',
      data: data
    });
  });

});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.data.title,
    content: req.body.data.content
  });

  post.save().then(postAdded);
  function postAdded(newPostData) {
      res.status(201).json({
      message: 'Post added successfully',
      data: newPostData
    });
  };

});

app.delete('/api/posts/:id', (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({_id: req.params.id})
    .then(data => {
      res.status(200).json( {
        message: 'Post deleted'
      });
    })
    .catch(e => {
      console.error('error deleting post: ', e);
    });
});

module.exports = app;