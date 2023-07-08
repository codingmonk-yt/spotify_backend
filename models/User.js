const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  display_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  explicit_content: {
    filter_enabled: {
      type: Boolean,
      default: false,
    },
    filter_locked: {
      type: Boolean,
      default: false,
    },
  },
  external_urls: {
    spotify: {
      type: String,
      required: true,
    },
  },
  followers: {
    href: String,
    total: {
      type: Number,
      default: 0,
    },
  },
  href: {
    type: String,
    required: true,
  },
  spotify_id: {
    // Renamed field
    type: String,
    required: true,
  },
  images: [String],
  product: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  uri: {
    type: String,
    required: true,
  },
  access_token: {
    type: String,
    required: true,
  },
  token_type: {
    type: String,
    required: true,
  },
  expires_in: {
    type: Number,
    required: true,
  },
  refresh_token: {
    type: String,
    required: true,
  },
  scope: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
