import axios from 'axios';

const fetchUserFromServer = async (u_token) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/profile`,
    {
      headers: {
        Authorization: `Bearer ${u_token}`,
      },
    }
  );

  return res.data;
};

export const userService = {
  fetchUserFromServer,
};
