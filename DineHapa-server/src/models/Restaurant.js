const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    logo: {
      type: String, // URL or path to the logo image
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5, // Assuming rating is out of 5
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String, // Phone number as a string
      required: true,
    },
    operatingHours: {
      type: String, // Operating hours as a string (e.g., "9 AM - 9 PM")
      required: true,
    },
    cuisine: {
      type: String, // Type of cuisine (e.g., "Italian", "Chinese")
      required: true,
    },
    tags: [String], // Tags related to the restaurant (e.g., ["Family-Friendly", "Vegan"])
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    menuItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "MenuItem",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create the model for restaurants
const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;
