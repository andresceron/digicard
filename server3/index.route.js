const express = require('express');
const postRoutes = require('./server/post/post.route');
const authRoutes = require('./server/auth/auth.route');
const passportConfig = require('./config/passport-config');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount post routes at /posts
router.use('/posts', passportConfig.authenticate, postRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

module.exports = router;
