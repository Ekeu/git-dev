import Cookie from 'js-cookie';
import Router from 'next/router';
import axios from 'axios';

const setUserToken = (token) => {
  Cookie.set('u_token', token);
  Router.push('/');
};

const checkUsername = async (username) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${username}`
  );

  return res.data;
};

const register = async (user) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/`,
    {
      user,
    }
  );
  setUserToken(res.data);
};

const login = async (user) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/signin`,
    {
      user,
    }
  );
  setUserToken(res.data);
};

export const userService = {
  checkUsername,
  register,
  login,
};
