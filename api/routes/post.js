const express = require('express');
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  likePost,
  clonePost,
  getAllPostLikes,
} = require('../controllers/post');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getAllPosts).post(protect, createPost);
router.route('/:postID').get(protect, getPostById).delete(protect, deletePost);
router.route('/:postID/clone').post(protect, clonePost);
router
  .route('/:postID/like')
  .put(protect, likePost)
  .get(protect, getAllPostLikes);

module.exports = router;
