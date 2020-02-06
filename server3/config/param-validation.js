const Joi = require('joi');

module.exports = {
  // POST /api/posts
  createPost: {
    data: {
      title: Joi.string().required(),
      content: Joi.string().required()
    }
  },

  // UPDATE /api/posts/:postId
  updatePost: {
    data: {
      title: Joi.string().required(),
      content: Joi.string().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
