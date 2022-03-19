const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    commentLikes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    commentUnLikes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
    commentReplies: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        reply: {
          type: String,
          required: true,
          trim: true,
        },
        commentLikes: [
          {
            type: Schema.Types.ObjectId,
            ref: 'User',
          },
        ],
        commentUnLikes: [
          {
            type: Schema.Types.ObjectId,
            ref: 'User',
          },
        ],
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
