import axios from 'axios';

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

export const postService = {
  fetchPostsFromServer,
};
