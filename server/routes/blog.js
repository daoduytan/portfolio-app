const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');
const authService = require('../services/auth');

// GET BLOG BY ID
router.get('/:id', blogController.getBlogById);

// POST CREATED PORTFOLIO
router.post(
  '',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  blogController.createBlog
);

// UPDATE POST
router.patch(
  '/:id',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  blogController.updateBlog
);

module.exports = router;
