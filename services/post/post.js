import axios from 'axios';
import Cookie from 'js-cookie';

const fetchPostsFromServer = async (u_token) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts`,
    {
      headers: {
        Authorization: `Bearer ${u_token}`,
      },
    }
  );

  return res.data;
};

const createNewPost = async (postTitle, postBody, postLocation, postImgURL) => {
  const u_token = Cookie.get('u_token');
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts`,
    {
      postTitle,
      postBody,
      postLocation,
      postImgURL,
    },
    {
      headers: {
        Authorization: `Bearer ${u_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return res.data;
};

const deletePost = async (postID) => {
  const u_token = Cookie.get('u_token');
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/${postID}`,
    {
      headers: {
        Authorization: `Bearer ${u_token}`,
      },
    }
  );

  return res.data;
};

const likePost = async (postID) => {
  const u_token = Cookie.get('u_token');
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/${postID}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${u_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return res.data;
};

const clonePost = async (postID) => {
  const u_token = Cookie.get('u_token');
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/${postID}/clone`,
    {},
    {
      headers: {
        Authorization: `Bearer ${u_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return res.data;
};

const addComment = async (postID, comment) => {
  const u_token = Cookie.get('u_token');
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/${postID}/comment`,
    { comment },
    {
      headers: {
        Authorization: `Bearer ${u_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return res.data;
};

const getPostByUser = async (postID, username, u_token, commentsLimit) => {
  const token = Cookie.get('u_token');
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/${username}/${postID}`,
    { limit: commentsLimit },
    {
      headers: {
        Authorization: `Bearer ${u_token || token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return res.data;
};

const getPostComments = async (postID, commentsLimit) => {
  const u_token = Cookie.get('u_token');
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/${postID}/comments`,
    { limit: commentsLimit },
    {
      headers: {
        Authorization: `Bearer ${u_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return res.data;
};

const addReply = async (postID, parentID, reply) => {
  const u_token = Cookie.get('u_token');
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/${postID}/reply`,
    { parentID, reply },
    {
      headers: {
        Authorization: `Bearer ${u_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return res.data;
};

const getUpdatedComment = async (commentID) => {
  const u_token = Cookie.get('u_token');
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/comment/${commentID}`,
    {
      headers: {
        Authorization: `Bearer ${u_token}`,
      },
    }
  );

  return res.data;
};

const deleteComment = async (commentID) => {
  const u_token = Cookie.get('u_token');
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/comment/${commentID}`,
    {
      headers: {
        Authorization: `Bearer ${u_token}`,
      },
    }
  );

  return res.data;
};

const deleteReply = async (commentID, replyID) => {
  const u_token = Cookie.get('u_token');
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/comment/${commentID}/reply/${replyID}`,
    {
      headers: {
        Authorization: `Bearer ${u_token}`,
      },
    }
  );

  return res.data;
};

const updateCommentLikes = async (commentID, status) => {
  const u_token = Cookie.get('u_token');
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/comment/${commentID}/like`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${u_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return res.data;
};

const updateReplyLikes = async (commentID, replyID, status) => {
  const u_token = Cookie.get('u_token');
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/comment/${commentID}/reply/${replyID}/like`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${u_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return res.data;
};

export const postService = {
  fetchPostsFromServer,
  createNewPost,
  deletePost,
  likePost,
  clonePost,
  addComment,
  getPostByUser,
  getPostComments,
  addReply,
  getUpdatedComment,
  deleteComment,
  deleteReply,
  updateCommentLikes,
  updateReplyLikes,
};
