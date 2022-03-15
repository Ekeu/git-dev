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

export const postService = {
  fetchPostsFromServer,
  createNewPost,
  deletePost,
  likePost,
  clonePost,
};
