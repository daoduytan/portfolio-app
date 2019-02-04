const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolio');
const authService = require('../services/auth');

// GET ALL Portfolios
router.get('', portfolioController.getPortfolios);

// POST CREATED PORTFOLIO
router.post(
  '',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  portfolioController.postPortfolio
);

// GET PORTFOLIO BY ID
router.get('/:id', portfolioController.getPortfolioById);

// UPDATE PORTFOLIO
router.patch(
  '/:id',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  portfolioController.updatePortfolio
);

// DELETE PORTFOLIO
router.delete(
  '/:id',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  portfolioController.deletePortfolio
);

module.exports = router;
