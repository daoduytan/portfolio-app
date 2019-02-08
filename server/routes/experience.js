const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experience');
const authService = require('../services/auth');

// GET ALL Experience
router.get('', experienceController.getExperience);

// POST CREATED experience
router.post(
  '',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  experienceController.postExperience
);

// GET Experience BY ID
router.get('/:id', experienceController.getExperienceById);

// UPDATE Experience
router.patch(
  '/:id',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  experienceController.updateExperience
);

// DELETE Experience
router.delete(
  '/:id',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  experienceController.deleteExperience
);

module.exports = router;
