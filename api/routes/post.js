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
  commentPost,
  getPostByUsername,
  getPostComments,
  addReply,
  getUpdatedComment,
  deleteComment,
  deleteReply,
  likeComment,
  likeReply,
} = require('../controllers/post');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getAllPosts).post(protect, createPost);
router.route('/comment/:commentID/reply/:replyID').delete(protect, deleteReply);
router.route('/comment/:commentID/like').put(protect, likeComment);
router.route('/comment/:commentID/reply/:replyID/like').put(protect, likeReply);
router
  .route('/comment/:commentID')
  .get(protect, getUpdatedComment)
  .delete(protect, deleteComment);
router.route('/:postID/reply').post(protect, addReply);
router.route('/:postID/comment').post(protect, commentPost);
router.route('/:postID/clone').post(protect, clonePost);
router.route('/:postID/comments').post(protect, getPostComments);
router.route('/:username/:postID').post(protect, getPostByUsername);
router.route('/:postID').get(protect, getPostById).delete(protect, deletePost);
router
  .route('/:postID/like')
  .put(protect, likePost)
  .get(protect, getAllPostLikes);

module.exports = router;
