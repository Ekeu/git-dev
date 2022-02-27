import axios from 'axios';
import { parseCookies, destroyCookie } from 'nookies';

const fetchUserFromServer = async (ctx) => {
  const { u_token } = parseCookies(ctx);

  if (!u_token) {
    destroyCookie(ctx, 'u_token');
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${u_token}`,
        },
      }
    );

    const { user, followers } = res.data;

    return {
      props: {
        user,
        followers,
      },
    };
  } catch (error) {
    destroyCookie(ctx, 'u_token');
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
};

export const userService = {
  fetchUserFromServer,
};
