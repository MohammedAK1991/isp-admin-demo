/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from 'react-icons/bs';
import { menuItems } from '../../data/constants';
import useAuth from '../../data/hooks/useAuth';
import { isUserAuthenticated } from '../../data/utils';
import SignOutIcon from '../../icons/SignOut';
import touchstreamLogoIcon from '../../public/favicon.ico';
import touchstreamLogo from '../../public/logo.png';
import ButtonSpinner from './ButtonSpinner';
import useWindowSize from '../../data/hooks/useWindowSize';

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname();

  const { auth, logout } = useAuth();

  const controls = useAnimation();
  const controlText = useAnimation();

  const [isHovered, setIsHovered] = useState(false);

  const [active, setActive] = useState<boolean>(true);
  // const [active, setActive] = useState<boolean>(() => {
  //   // Get the stored value from localStorage or use the default value
  //   const storedValue = localStorage?.getItem('isSidebarExpanded');
  //   return storedValue ? JSON.parse(storedValue) : true;
  // });

  useEffect(() => {
    isUserAuthenticated().then((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        return;
      }
      router.push('/login');
    });
  }, [router]);

  const handleHoverIn = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleHoverOut = useCallback(() => {
    setIsHovered(false);
  }, []);

  const showMore = useCallback(() => {
    controls.start({
      width: '200px',
      transition: { duration: 0.05 },
    });
    controlText.start({
      opacity: 1,
      display: 'block',
      transition: { delay: 0.2 },
    });

    setActive(true);
  }, [controls, controlText]);

  const showLess = useCallback(() => {
    controls.start({
      width: '75px',
      transition: { duration: 0.001 },
    });

    controlText.start({
      opacity: 0,
      display: 'none',
    });

    setActive(false);
  }, [controls, controlText]);

  useEffect(() => {
    if (active) {
      showMore();
    } else {
      showLess();
    }
    localStorage.setItem('isSidebarExpanded', JSON.stringify(active));
  }, [active, showLess, showMore]);

  const { width } = useWindowSize();

  // useEffect hook that calls showLess function if window size is same as mobile screens
  useEffect(() => {
    if (width && width <= 999) {
      showLess();
    }
  }, [width, showLess]);

  return (
    <motion.div
      animate={controls}
      className="bg-backgroundDark justify-content-between position-relative d-flex min-vh-100 flex-column"
      onMouseOver={handleHoverIn}
      onFocus={handleHoverIn}
      onMouseOut={handleHoverOut}
      onBlur={handleHoverOut}
    >

      <div className="d-flex flex-column flex-grow-1">
        <div className="p-2 text-center">
          {active ? (
            <Link href="/">
              <Image
                src={touchstreamLogo}
                alt="Logo"
                priority
                height={40}
                className="w-auto p-2 mt-3"
              />
            </Link>
          ) : (
            <Link href="/">
              <Image
                src={touchstreamLogoIcon}
                alt="Logo"
                className="p-2 mt-2"
              />
            </Link>
          )}
          {active && isHovered && (
            <BsFillArrowLeftSquareFill
              size={25}
              onClick={showLess}
              className="text-white border cursor-pointer position-absolute rounded-circle"
              style={{ right: '1', top: '9%' }}
            />
          )}
          {!active && isHovered && (

            <BsFillArrowRightSquareFill
              size={25}
              onClick={showMore}
              className="text-white border cursor-pointer position-absolute rounded-circle "
              style={{ right: '1', top: '9%' }}
            />
          )}

          <div className="mt-4 mb-6 border-gray-600 border-top" />

          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.route}
              className={`my-3 d-flex cursor-pointer text-decoration-none align-items-center  p-2 text-sm font-normal text-white  ${
                pathname === item.route
              || pathname?.split('/').includes(item.id.toLocaleLowerCase())
                  ? 'bg-backgroundDark font-semibold'
                  : 'bg-transparent'
              }`}
            >
              <div className="p-2 cursor-pointer d-flex align-items-center justify-content-center">
                <item.icon className="text-xl text-white" />
                <motion.p
                  animate={controlText}
                  className="mt-2 mb-2 text-sm font-bold text-white ms-4 "
                >
                  {item.id}
                </motion.p>
              </div>
            </Link>
          ))}

          <div className="my-2 border-gray-600 border-top" />
        </div>
      </div>

      {auth?.user ? (
        <button
          className={`${
            active ? 'm-2' : ''
          } d-flex  cursor-pointer border border-solid rounded-2 border-backgroundDark bg-backgroundDark  justify-items-center    text-white  align-items-center`}
          type="button"
          onClick={() => {
            logout();
            router.push('/login');
          }}
        >
          <div className="p-3 text-button">
            <SignOutIcon fill="currentColor" />
          </div>
          {active ? <p className="mt-3">Logout</p> : ''}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => router.push('/login')}
          className={`${
            active ? 'm-2' : ''
          } d-flex cursor-pointer align-items-center justify-content-center rounded hover:scale-105 duration-200 `}
        >
          <ButtonSpinner />
        </button>
      )}
    </motion.div>

  );
}
