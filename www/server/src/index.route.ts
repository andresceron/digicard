
import express from 'express';
import authRoutes from './routes/auth/auth.route';
import userRoutes from './routes/user/user.route';
import contactRoutes from './routes/contact/contact.route';
// import postRoutes from './routes/post/post.route';
import uploadRoutes from './routes/upload/upload.route';
import * as passportAuth from './config/passport-authcheck';

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/**
 * GET /health - Check service health
 */
router.get('/health', (req, res) =>
  res.send('OK')
);

/**
 * Mount 'auth' routes at /auth
 */
router.use('/auth', authRoutes);

/**
 * Mount 'user' routes at /users
 */
router.use('/users', passportAuth.authenticate, userRoutes);

// /**
//  * Mount 'contacts' routes at /contacts
//  */
router.use('/contacts', contactRoutes);

// /**
//  * Mount 'upload' routes at /upload
//  */
router.use('/upload', passportAuth.authenticate, uploadRoutes);

export default router;
