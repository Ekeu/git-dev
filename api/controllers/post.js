const User = require('../../mongo/models/User');
const Post = require('../../mongo/models/Post');
const Comment = require('../../mongo/models/Comment');
const APIError = require('../errors/apiError');
const HttpStatusCodes = require('../errors/httpStatusCodes');
const mongoose = require('mongoose');

// @desc Create Post
// @route POST /api/v1/posts
// @access Private
const createPost = async (req, res, next) => {
  const { postTitle, postBody, postLocation, postImgURL } = req.body;

  try {
    if (!postBody)
      throw new APIError(
        'BAD REQUEST',
        HttpStatusCodes.BAD_REQUEST,
        true,
        "You can't create an empty post."
      );

    const postInstaance = new Post({
      user: req.userID,
      postTitle: postTitle || '',
      postBody,
      postLocation: postLocation || '',
      postImgURL: postImgURL || '',
    });

    const postDocument = await postInstaance.save();
    const createdPost = await postDocument.populate('user');

    res.json(createdPost);
  } catch (error) {
    next(error);
  }
};

// @desc Fetch all Posts
// @route GET /api/v1/posts
// @access Private
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('user')
      .populate({
        path: 'cloneData',
        populate: {
          path: 'user',
          model: 'User',
        },
      });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

// @desc Get Single Post
// @route GET /api/v1/post/:postID
// @access Private
const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postID)
      .populate('user')
      .populate('cloneData')
      .populate({
        path: 'postComments',
        populate: {
          path: 'user',
          model: 'User',
        },
      });

    if (post) {
      res.json(post);
    } else {
      throw new APIError(
        'NOT FOUND',
        HttpStatusCodes.NOT_FOUND,
        true,
        'Post not found.'
      );
    }
  } catch (error) {
    next(error);
  }
};

// @desc Get Post by Username
// @route GET /api/v1/post/:username/:postID
// @access Private
const getPostByUsername = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      throw new APIError(
        'NOT FOUND',
        HttpStatusCodes.NOT_FOUND,
        true,
        'User not found.'
      );
    }

    const post = await Post.findById(req.params.postID)
      .where('user')
      .equals(user._id)
      .populate('user');

    if (post) {
      const comments = await Comment.find({ post: post._id })
        .sort({ createdAt: -1 })
        .limit(req.body.limit || 5)
        .populate('user')
        .populate('commentReplies.user');
      res.json({ post, comments });
    } else {
      throw new APIError(
        'NOT FOUND',
        HttpStatusCodes.NOT_FOUND,
        true,
        'Post not found.'
      );
    }
  } catch (error) {
    next(error);
  }
};

// @desc Get Post comments
// @route GET /api/v1/post/:postID/comments
// @access Private
const getPostComments = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postID).populate('user');

    if (post) {
      const comments = await Comment.find({ post: post._id })
        .sort({ createdAt: -1 })
        .skip(req.body.limit)
        .limit(5)
        .populate('user');
      res.json({ comments });
    } else {
      throw new APIError(
        'NOT FOUND',
        HttpStatusCodes.NOT_FOUND,
        true,
        'Post not found.'
      );
    }
  } catch (error) {
    next(error);
  }
};

// @desc Delete Post
// @route DELETE /api/v1/posts/:postID
// @access Private
const deletePost = async (req, res, next) => {
  try {
    const { userID } = req;

    const post = await Post.findById(req.params.postID);
    if (post) {
      const user = await User.findById(userID);

      if (post.user.toString() !== userID) {
        if (user.role === 'root') {
          await post.remove();
          res.status(201).send('Post deleted successfully!');
        } else {
          throw new APIError(
            'UNAUTHORIZED',
            HttpStatusCodes.UNAUTHORIZED,
            true,
            'Unauthorized action!'
          );
        }
      }

      await post.remove();
      res.status(201).send('Post deleted successfully!');
    } else {
      throw new APIError(
        'NOT FOUND',
        HttpStatusCodes.NOT_FOUND,
        true,
        'Post not found.'
      );
    }
  } catch (error) {
    next(error);
  }
};

// @desc Delete Comment
// @route DELETE /api/v1/posts/comment/:commentID
// @access Private
const deleteComment = async (req, res, next) => {
  try {
    const { userID } = req;

    const comment = await Comment.findById(req.params.commentID);

    if (comment) {
      const user = await User.findById(userID);

      if (comment.user.toString() !== userID) {
        if (user.role === 'root') {
          await comment.remove();
          res.status(201).send('Comment deleted successfully!');
        } else {
          throw new APIError(
            'UNAUTHORIZED',
            HttpStatusCodes.UNAUTHORIZED,
            true,
            'Unauthorized action!'
          );
        }
      }

      await comment.remove();
      res.status(201).send('Comment deleted successfully!');
    } else {
      throw new APIError(
        'NOT FOUND',
        HttpStatusCodes.NOT_FOUND,
        true,
        'Comment not found.'
      );
    }
  } catch (error) {
    next(error);
  }
};

// @desc Delete Reply
// @route DELETE /api/v1/posts/comment/:commentID/reply/:replyID
// @access Private
const deleteReply = async (req, res, next) => {
  try {
    const { userID } = req;

    const { commentID, replyID } = req.params;

    const comment = await Comment.findById(commentID);

    if (comment) {
      const user = await User.findById(userID);

      const reply = comment.commentReplies.find(
        (reply) => reply._id.toString() === replyID
      );

      if (reply.user.toString() !== userID) {
        if (user.role === 'root') {
          await Comment.updateOne(
            {
              _id: commentID,
            },
            {
              $pull: {
                commentReplies: {
                  _id: replyID,
                },
              },
            }
          );
          res.status(201).send('Reply deleted successfully!');
        } else {
          throw new APIError(
            'UNAUTHORIZED',
            HttpStatusCodes.UNAUTHORIZED,
            true,
            'Unauthorized action!'
          );
        }
      }

      await Comment.updateOne(
        {
          _id: commentID,
        },
        {
          $pull: {
            commentReplies: {
              _id: replyID,
            },
          },
        }
      );
      res.status(201).send('Reply deleted successfully!');
    } else {
      throw new APIError(
        'NOT FOUND',
        HttpStatusCodes.NOT_FOUND,
        true,
        'Comment not found.'
      );
    }
  } catch (error) {
    next(error);
  }
};

// @desc Like Post
// @route PUT /api/v1/posts/:postID/like
// @access Private
const likePost = async (req, res, next) => {
  try {
    const { postID } = req.params;
    const { userID } = req;

    const post = await Post.findById(postID).populate('cloneData');
    const user = await User.findById(userID);

    const isClone = post.cloneData !== undefined;

    const originalPost = isClone ? post.cloneData : post;

    if (!post)
      throw new APIError(
        'NOT FOUND',
        HttpStatusCodes.NOT_FOUND,
        true,
        'Post not found.'
      );

    const userLikedPost =
      user.postsLiked && user.postsLiked.includes(originalPost._id);

    const option = userLikedPost ? '$pull' : '$addToSet';

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {
        [option]: {
          postsLiked: originalPost._id,
        },
      },
      {
        new: true,
      }
    );

    const updatedPost = await Post.findByIdAndUpdate(
      postID,
      {
        [option]: {
          postLikes: userID,
        },
      },
      {
        new: true,
      }
    );

    res.json({
      postsLiked: updatedUser.postsLiked,
      postLikes: updatedPost.postLikes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Like Reply
// @route PUT /api/v1/posts/comment/:commentID/reply/:replyID/like
// @access Private
const likeReply = async (req, res, next) => {
  try {
    const { commentID, replyID } = req.params;
    const { status } = req.body;
    const { userID } = req;

    const comment = await Comment.findById(commentID);

    if (!comment)
      throw new APIError(
        'NOT FOUND',
        HttpStatusCodes.NOT_FOUND,
        true,
        'Comment not found.'
      );

    if (status === 0) {
      await Comment.updateOne(
        { _id: commentID, 'commentReplies._id': replyID },
        {
          $addToSet: {
            'commentReplies.$.commentUnLikes': userID,
          },

          $pull: {
            'commentReplies.$.commentLikes': userID,
          },
        }
      );
    }

    if (status === 1) {
      await Comment.updateOne(
        { _id: commentID, 'commentReplies._id': replyID },
        {
          $addToSet: {
            'commentReplies.$.commentLikes': userID,
          },

          $pull: {
            'commentReplies.$.commentUnLikes': userID,
          },
        }
      );
    }

    if (status === -1) {
      await Comment.updateOne(
        { _id: commentID, 'commentReplies._id': replyID },
        {
          $pull: {
            'commentReplies.$.commentLikes': userID,
          },

          $pull: {
            'commentReplies.$.commentUnLikes': userID,
          },
        }
      );
    }

    res.status(201).send('');
  } catch (error) {
    next(error);
  }
};

// @desc Like Comment
// @route PUT /api/v1/posts/comment/:commentID/like
// @access Private
const likeComment = async (req, res, next) => {
  try {
    const { commentID } = req.params;
    const { status } = req.body;
    const { userID } = req;

    const comment = await Comment.findById(commentID);

    if (!comment)
      throw new APIError(
        'NOT FOUND',
        HttpStatusCodes.NOT_FOUND,
        true,
        'Comment not found.'
      );

    if (status === 0) {
      await Comment.findByIdAndUpdate(commentID, {
        $addToSet: {
          commentUnLikes: userID,
        },
        $pull: {
          commentLikes: userID,
        },
      });
    }

    if (status === 1) {
      await Comment.findByIdAndUpdate(commentID, {
        $addToSet: {
          commentLikes: userID,
        },
        $pull: {
          commentUnLikes: userID,
        },
      });
    }

    if (status === -1) {
      await Comment.findByIdAndUpdate(commentID, {
        $pull: {
          commentLikes: userID,
        },
      });
      await Comment.findByIdAndUpdate(commentID, {
        $pull: {
          commentUnLikes: userID,
        },
      });
    }

    res.status(201).send('');
  } catch (error) {
    next(error);
  }
};

// @desc Clone Post
// @route PUT /api/v1/posts/:postID/clone
// @access Private
const clonePost = async (req, res, next) => {
  try {
    const { postID } = req.params;
    const { userID } = req;

    const post = await Post.findById(postID);

    if (!post)
      throw new APIError(
        'NOT FOUND',
        HttpStatusCodes.NOT_FOUND,
        true,
        'Post not found.'
      );

    const deletedPost = await Post.findOneAndDelete({
      user: userID,
      cloneData: postID,
    });

    const option = deletedPost !== null ? '$pull' : '$addToSet';

    let clonedPost = deletedPost;

    if (deletedPost === null) {
      clonedPost = await Post.create({
        user: userID,
        cloneData: postID,
        clone: true,
      });
      clonedPost = await clonedPost.populate({
        path: 'cloneData',
        populate: {
          path: 'user',
          model: 'User',
        },
      });

      clonedPost = await clonedPost.populate('user');
    }

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {
        [option]: {
          postsCloned: clonedPost._id,
        },
      },
      {
        new: true,
      }
    );

    const updatedPost = await Post.findByIdAndUpdate(
      postID,
      {
        [option]: {
          postClones: userID,
        },
      },
      {
        new: true,
      }
    );

    if (deletedPost === null) {
      res.json({
        postsCloned: updatedUser.postsCloned,
        postClones: updatedPost.postClones,
        clonedPost,
      });
    } else {
      res.json({
        unclone: true,
        cloneID: deletedPost._id.toString(),
        postsCloned: updatedUser.postsCloned,
        postClones: updatedPost.postClones,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc Get All Post Likes
// @route GET /api/v1/posts/:postID/like
// @access Private
const getAllPostLikes = async (req, res, next) => {
  try {
    const { postID } = req.params;
    const post = await Post.findById(postID).populate('postLikes.user');

    if (!post)
      throw new APIError(
        'NOT FOUND',
        HttpStatusCodes.NOT_FOUND,
        true,
        'Post not found.'
      );

    res.json(post.postLikes);
  } catch (error) {
    next(error);
  }
};

// @desc Comment Post
// @route POST /api/v1/posts/:postID/comment
// @access Private
const commentPost = async (req, res, next) => {
  try {
    const { postID } = req.params;
    const { comment } = req.body;

    if (comment.trim().length < 1)
      throw new APIError(
        'BAD REQUEST',
        HttpStatusCodes.BAD_REQUEST,
        true,
        "Can't create an empty comment."
      );

    const post = await Post.findById(postID);

    if (!post)
      throw new APIError(
        'NOT FOUND',
        HttpStatusCodes.NOT_FOUND,
        true,
        'Post not found.'
      );

    const commentInstance = new Comment({
      user: req.userID,
      comment,
      post: postID,
    });

    const commentDocument = await commentInstance.save();
    post.postComments.push(commentDocument._id);

    await post.save();

    res.status(201).send('Comment added successfully!');
  } catch (error) {
    next(error);
  }
};

// @desc Reply to Comment
// @route GET /api/v1/posts/:postID/reply
// @access Private
const addReply = async (req, res, next) => {
  try {
    const { postID } = req.params;
    const { parentID, reply } = req.body;

    if (reply.trim().length < 1)
      throw new APIError(
        'BAD REQUEST',
        HttpStatusCodes.BAD_REQUEST,
        true,
        "Can't create an empty reply."
      );

    const post = await Post.findById(postID);

    if (!post)
      throw new APIError(
        'NOT FOUND',
        HttpStatusCodes.NOT_FOUND,
        true,
        'Post not found.'
      );

    await Comment.updateOne(
      { _id: parentID, post: postID },
      {
        $push: {
          commentReplies: {
            user: req.userID,
            reply,
            commentLikes: [],
            commentUnLikes: [],
          },
        },
      }
    );

    res.status(201).send('Reply added successfully!');
  } catch (error) {
    next(error);
  }
};

// @desc Get Updated Comment
// @route GET /api/v1/posts/comment/:commentID
// @access Private
const getUpdatedComment = async (req, res, next) => {
  try {
    const { commentID } = req.params;

    const comment = await Comment.findById(commentID)
      .populate('user')
      .populate('post')
      .populate('commentReplies.user');

    if (!comment)
      throw new APIError(
        'NOT FOUND',
        HttpStatusCodes.NOT_FOUND,
        true,
        'Comment not found.'
      );

    res.status(201).json({ comment });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  likePost,
  clonePost,
  getAllPostLikes,
  getPostByUsername,
  commentPost,
  addReply,
  getPostComments,
  getUpdatedComment,
  deleteComment,
  deleteReply,
  likeComment,
  likeReply,
};
