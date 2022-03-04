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
      required: true,
    },
    postLocation: {
      type: String,
    },
    postImgURL: {
      type: String,
    },
    postLikes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    postComments: [],
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
