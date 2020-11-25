import express from 'express';
import path from 'path';

const router = express.Router(); // eslint-disable-line new-cap

// Serve UI dist
const distDir = path.join(__dirname, '../../../ui/dist/angularnode/');
console.log(':: distDir :: ', distDir);

router.use(express.static(distDir));

router.get('/', (req, res) => {
  res.sendFile(distDir);
});

router.get('/login', (req, res) => {
  res.sendFile(distDir);
});

router.get('/register', (req, res) => {
  res.sendFile(distDir);
});

router.get('/profile', (req, res) => {
  res.sendFile(distDir);
});

router.get('/share', (req, res) => {
  res.sendFile(distDir);
});

router.get('/contacts/*', (req, res) => {
  res.sendFile(distDir);
});

router.get('/public/*', (req, res) => {
  res.sendFile(distDir);
});

export default router;
