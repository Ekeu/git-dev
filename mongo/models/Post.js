const mongoose = require('mongoose');
const mongooseAlgolia = require('mongoose-algolia');

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    postTitle: {
      type: String,
    },
    postBody: {
      type: String,
      trim: true,
    },
    postLocation: {
      type: String,
    },
    postImgURL: {
      type: String,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    clone: {
      type: Boolean,
      default: false,
    },
    postLikes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    postClones: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    cloneData: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    postComments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  }
);

PostSchema.plugin(mongooseAlgolia, {
  appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_ADMIN_API_KEY,
  indexName: 'posts',
});

const Post = mongoose.model('Post', PostSchema);

Post.SyncToAlgolia();
Post.SetAlgoliaSettings({
  searchableAttributes: ['postText', 'user.username'],
});

module.exports = Post;
