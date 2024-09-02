const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
