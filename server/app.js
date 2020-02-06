const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var methodOverride = require('method-override');
const mongoose = require('mongoose');

const Post = require('./models/post')

const app = express();

// mongoose.connect("mongodb://localhost:27017/nodelist",{
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
app.use(methodOverride());

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

function logErrors(err, req, res, next) {
  console.log('ClientErrorHandler:::ERR ', err);
  console.log('ClientErrorHandler:::ERR.STACK ', err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  console.log('ClientErrorHandler::: ', err);
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  console.log('errorHandler::: ', err);
  res.status(500);
  res.render('error', { error: err });
}


// Get All Posts
app.get('/api/posts', (req, res, next) => {
  Post.find().then(data => {
    res.json({
      message: 'Post fetched succesfully!',
      data: data
    });
  });

});

// Get Single Posts
app.get('/api/post/:id', (req, res, next) => {
  Post.findById(req.params.id, (err, data) => {
    console.log('ERROR:: ', err);

    if (err) {
      return next(err);
    }

    res.json({
      mesage: 'Sigle post returned',
      data: data
    })
  })


  // .then(data => {
  //   res.json({
  //     message: 'Post fetched succesfully!',
  //     data: data
  //   });
  // });

});

// Add Single Post
app.post('/api/post', (req, res, next) => {
  const post = new Post({
    title: req.body.data.title,
    content: req.body.data.content
  });

  post.save().then(postAdded);
  function postAdded(newPostData) {
      res.json({
      message: 'Post added successfully',
      data: newPostData
    });
  };

});

// Delete Single Post
app.delete('/api/post/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id},
    (err, data) => {
      if (err) {
        next(err);
      }

      res.json({
        message: 'Post deleted',
      });
  })
});

// Update Single Post
app.put('/api/post/:id', (req, res, next) => {
  Post.findOneAndUpdate({_id: req.params.id},
    req.body.data, {
    useFindAndModify: false,
    new: true
  }, (err, data) => {
    if (err) {
      next(err);
    }

    res.json({
      message: 'Post updated',
      data: data
    });

  });

});

// function handleError(err) {
//   console.log('ERR::: ', err);
//   return next('Error fetching single post', err);
// }

module.exports = app;