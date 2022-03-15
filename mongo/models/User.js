const mongoose = require('mongoose');
const mongooseAlgolia = require('mongoose-algolia');
const bycrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    profileImageURL: {
      type: String,
    },
    newMessagePopup: {
      type: Boolean,
      default: true,
    },
    postsLiked: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    postsCloned: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    unReadMessage: {
      type: Boolean,
      default: false,
    },
    unReadNotification: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'root'],
    },
    resetToken: {
      type: String,
    },
    expireToken: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bycrypt.compare(enteredPassword, this.password);
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
});

UserSchema.plugin(mongooseAlgolia, {
  appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_ADMIN_API_KEY,
  indexName: 'users',
  selector: '-password, -resetToken, -role',
});

const User = mongoose.model('User', UserSchema);

User.SyncToAlgolia();
User.SetAlgoliaSettings({
  searchableAttributes: ['name', 'username', 'email'],
});

module.exports = User;
