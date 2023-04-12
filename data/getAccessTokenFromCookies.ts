import Cookies from 'js-cookie';

// https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript

// TODO: Modify the below code to get only accessToken or token instead of user object
export default function getAccessTokenFromCookies() {
  const accessToken = Cookies.get('token') ?? '';
  if (!accessToken) {
    return undefined;
  }
  return accessToken;
}
