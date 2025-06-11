import { getItem } from './storage';

export const isLoggedIn = () => {
  const token = getItem('accessToken');
  return !!token;
};
