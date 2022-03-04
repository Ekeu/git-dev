const express = require('express');
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  likeOrUnlikePost,
  getAllPostLikes,
} = require('../controllers/post');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getAllPosts).post(protect, createPost);
router.route('/:id').get(protect, getPostById).delete(protect, deletePost);
router
  .route('/like/:postID')
  .put(protect, likeOrUnlikePost)
  .get(protect, getAllPostLikes);

module.exports = router;
