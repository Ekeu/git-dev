const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    bio: {
      type: String,
      required: false,
    },
    social: {
      youtube: {
        type: String,
      },
      twitch: {
        type: String,
      },
      twitter: {
        type: String,
      },
      discord: {
        type: String,
      },
    },
    projects: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Profile', ProfileSchema);
