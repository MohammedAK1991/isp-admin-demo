'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { TOUCHSTREAM_API_URL } from '../../../data/constants';
import getAccessTokenFromCookies from '../../../data/getAccessTokenFromCookies';
import DynamicForm from './DynamicForm';

export default function App() {
  const router = useRouter();
  const accessToken = getAccessTokenFromCookies() as string;

  useEffect(() => {
    if (!accessToken) {
      // if no token then redirect to login page
      // TODO: replace this with the login url of core product
      router.push('/login');
    }
  }, [accessToken, router]);

  const {
    data: userData,
    error: userError,
    isLoading: isUserLoading,
  } = useQuery(['user'], () => fetch(`${TOUCHSTREAM_API_URL}user/?token=${accessToken}`).then((response) => response.json()));

  console.log('userData', userData);

  if (isUserLoading) {
    return <div className="p-4 m-auto">Loading...</div>;
  }

  if (userError) {
    return <div className="p-4 m-auto">Error</div>;
  }

  return (
    <div className="p-4 mx-auto overflow-scroll ">
      <div className="p-4 align-items-center flex-column rounded-1 flex-grow-1 d-flex justify-content-center w-100 bg-backgroundLight">
        <div className="p-3 d-flex flex-column align-items-center justify-content-end">
          <h2 className="text-primary left">Admin form</h2>
          <h3 className="my-1 fs-6">
            Set / Edit your ISP insights configuration here
          </h3>
        </div>

        <div className="p-2">
          <DynamicForm
            access={userData?.access}
            customerName={userData?.customer}
          />
        </div>
      </div>
    </div>
  );
}
