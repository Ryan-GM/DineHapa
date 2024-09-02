const Review = require('../models/Review');

// Controller for adding a review
exports.addReview = async (req, res) => {
  const { restaurantId } = req.params;
  const { user, rating, comment } = req.body;

  try {
    const review = new Review({ user, rating, comment, restaurantId });
    await review.save();
    res.status(201).json({ status: 'success', data: review });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Controller for getting reviews for a restaurant
exports.getReviews = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const reviews = await Review.find({ restaurantId });
    res.status(200).json({ status: 'success', data: reviews });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
