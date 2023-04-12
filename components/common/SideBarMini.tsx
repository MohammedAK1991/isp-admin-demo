/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import touchstreamLogoIcon from '../../public/favicon.ico';
import touchstreamLogo from '../../public/logo.png';

export default function SideBar() {
  const controls = useAnimation();
  const controlText = useAnimation();

  const [active, setActive] = useState<boolean>(true);

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
    showLess();
  }, [showLess]);

  return (
    <motion.div
      animate={controls}
      className="bg-backgroundDark justify-content-between position-relative d-flex min-vh-100 flex-column"
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
          <div className="my-2 border-gray-600 border-top" />

        </div>
      </div>

    </motion.div>

  );
}
