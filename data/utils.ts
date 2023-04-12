import Cookies from 'js-cookie';

export async function fetcherWithBearerToken(url: string, token: string) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function fetcherWithBearerTokenMpegUrl(url: string, token: string) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-mpegURL',
      'Access-Control-Allow-Origin': '*',
    },
  });

  return response.text();
}

export async function fetcher(url: string) {
  const response = await fetch(url);

  return response.json();
}

// getting data from localStorage syncronously doesnt work as expected
export const asyncLocalStorage = {
  async setItem(key: string, value: string) {
    await Promise.resolve();
    Cookies.set(key, value);
  },
  async getItem(key: string) {
    await Promise.resolve();
    return Cookies.get(key);
  },
};

export async function isUserAuthenticated() {
  return asyncLocalStorage.getItem('user').then((user: any) => {
    const userProfile = JSON.parse(user);
    if (!userProfile) {
      return true;
    }
    const isUserAuthorised = !!userProfile?.access;
    if (isUserAuthorised) {
      return true;
    }
    return false;
  });
}

export function systemTheme() {
  if (window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}
