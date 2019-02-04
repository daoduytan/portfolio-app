const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');
const authService = require('../services/auth');

// GET ALL PUBLISHED BLOGS
router.get('', blogController.getPublishedBlogs);

// GET MY BLOG (must be before get by id)
router.get(
  '/me',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  blogController.getUserBlogs
);

// GET BLOG BY ID
router.get('/:id', blogController.getBlogById);

// GET BLOG BY SLUG
router.get('/s/:slug', blogController.getBlogBySlug);

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

// DELETE POST BY ID
router.delete(
  '/:id',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  blogController.deleteBlog
);

module.exports = router;
