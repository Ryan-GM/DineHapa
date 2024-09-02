const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Route to add a review
router.post('/:restaurantId', reviewController.addReview);

// Route to get reviews for a restaurant
router.get('/:restaurantId', reviewController.getReviews);

module.exports = router;
