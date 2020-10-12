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
      content: Joi.string().required(),
      image: Joi.any().optional()
    }
  },


  // UPDATE /api/users/:userId
  updateUser: {
    data: {
      title: Joi.string().required(),
      content: Joi.string().required(),
      image: Joi.any().optional()
    }
  },

  // SAVECONTACT /api/users/:userId
  updateUser: {
    data: Joi.string().required()
  },

  // POST /api/auth/login
  login: {
    data: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // POST /api/auth/login
  register: {
    data: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }
  },

  // POST /api/auth/me
  me: {
    data: {
      email: Joi.string().required()
    }
  },

  // POST /api/auth/upload
  upload: {
    data: {
      file: Joi.any().required()
    }
  }
};
