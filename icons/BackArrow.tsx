'use client';

import { useRouter } from 'next/navigation';
import { SVGProps } from 'react';
// import { systemTheme } from '../data/utils';

function BackArrow(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  const router = useRouter();
  // const theme = systemTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={36}
      height={36}
      // fill={theme === 'light' ? 'currentColor' : 'white'}
      fill="currentColor"
      viewBox="0 0 16 16"
      {...props}
      onClick={() => router.back()}
    >
      <path
        fillRule="evenodd"
        d="M12 8a.5.5 0 01-.5.5H5.707l2.147 2.146a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 11.708.708L5.707 7.5H11.5a.5.5 0 01.5.5z"
      />
    </svg>
  );
}

export default BackArrow;
