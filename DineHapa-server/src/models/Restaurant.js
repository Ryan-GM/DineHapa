const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
     
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,  // Updated to ObjectId
      ref: "User",                  // Assuming you have a User model
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],            // 'Point' is required for GeoJSON
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    menuItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "MenuItem",           // Assuming you have a MenuItem model
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Adding a geospatial index for location
RestaurantSchema.index({ location: "2dsphere" });

// Creating the model for restaurants
const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;
