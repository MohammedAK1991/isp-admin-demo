'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="flex flex-col items-start p-4 m-auto space-y-4 bg-white rounded-lg">
      <p>Something went wrong!</p>
      <p className="p-2 rounded-md bg-slate-200">{(error.message)}</p>
      <button type="button" className="w-full p-2 mt-4 font-medium text-white uppercase rounded-lg shrink-0 bg-buttonHover hover:bg-opacity-90 md:p-4" onClick={() => reset()}>Reset Error boundary</button>
      <button type="button" className="w-full p-2 mt-4 font-medium text-white uppercase rounded-lg shrink-0 bg-buttonHover hover:bg-opacity-90 md:p-4" onClick={() => router.replace('/login')}>Back to Login page</button>
    </div>
  );
}
