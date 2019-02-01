const express = require('express');
const router = express.Router();
const portfolioControler = require('../controllers/portfolio');
const authService = require('../services/auth');

// GET ALL Portfolios
router.get('', portfolioControler.getPortfolios);

// POST CREATED PORTFOLIO
router.post(
  '',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  portfolioControler.postPortfolio
);

// GET PORTFOLIO BY ID
router.get('/:id', portfolioControler.getPortfolioById);

// UPDATE PORTFOLIO
router.patch(
  '/:id',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  portfolioControler.updatePortfolio
);

// DELETE PORTFOLIO
router.delete(
  '/:id',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  portfolioControler.deletePortfolio
);

module.exports = router;