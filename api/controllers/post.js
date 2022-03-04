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

    const post = new Post({
      user: req.userID,
      postTitle: postTitle || '',
      postBody,
      postLocation: postLocation || '',
      postImgURL: postImgURL || '',
    });

    const createdPost = await post.save();

    res.json(createdPost._id);
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
      .populate('postComments.user');
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

// @desc Fetch single food
// @route GET /api/v1/post/:id
// @access Private
const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user')
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
// @route DELETE /api/v1/posts/:id
// @access Private
const deletePost = async (req, res, next) => {
  try {
    const { userID } = req;

    const post = await Post.findById(req.params.id);
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

// @desc Update Post Likes
// @route PUT /api/v1/posts/like/:postID
// @access Private
const likeOrUnlikePost = async (req, res, next) => {
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

    const isPostLiked = post.postLikes.filter(
      (pl) => pl.user.toString() === userID
    ).length;

    if (isPostLiked) {
      const userIdx = post.postLikes
        .map((pl) => pl.user.toString())
        .indexOf(userID);
      await post.postLikes.splice(userIdx, 1);
      await post.save();
      res.status(201).send('Post Unliked.');
    } else {
      await post.postLikes.unshift({ user: userID });
      await post.save();
      res.status(201).send('Post Liked.');
    }
  } catch (error) {
    next(error);
  }
};

// @desc Get All Post Likes
// @route GET /api/v1/posts/like/:postID
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
  likeOrUnlikePost,
  getAllPostLikes,
};
