const express = require('express');
const router = express.Router();
const blogControler = require('../controllers/blog');
const authService = require('../services/auth');

// GET BLOG BY ID
router.get('/:id', blogControler.getBlogById);

// POST CREATED PORTFOLIO
router.post(
  '',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  blogControler.createBlog
);

module.exports = router;
