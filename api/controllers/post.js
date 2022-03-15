const User = require('../../mongo/models/User');
const Post = require('../../mongo/models/Post');
const APIError = require('../errors/apiError');
const HttpStatusCodes = require('../errors/httpStatusCodes');

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
      .populate('cloneData')
      .populate('postComments.user');
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

// @desc Fetch single food
// @route GET /api/v1/post/:postID
// @access Private
const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postID)
      .populate('user')
      .populate('cloneData')
      .populate('postComments.user');

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

// @desc Like Post
// @route PUT /api/v1/posts/:postID/like
// @access Private
const likePost = async (req, res, next) => {
  try {
    const { postID } = req.params;
    const { userID } = req;

    const post = await Post.findById(postID);
    const user = await User.findById(userID);

    if (!post)
      throw new APIError(
        'NOT FOUND',
        HttpStatusCodes.NOT_FOUND,
        true,
        'Post not found.'
      );

    const userLikedPost = user.postsLiked && user.postsLiked.includes(postID);

    const option = userLikedPost ? '$pull' : '$addToSet';

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {
        [option]: {
          postsLiked: postID,
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
      }).populate('cloneData');
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

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  likePost,
  clonePost,
  getAllPostLikes,
};
