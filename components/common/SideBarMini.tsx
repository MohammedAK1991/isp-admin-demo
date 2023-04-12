import Image from 'next/image';
import Link from 'next/link';
import touchstreamLogoIcon from '../../public/favicon.ico';

export default function SideBar() {
  return (

    <div className="d-flex flex-column bg-backgroundDark min-vh-100">
      <div className="p-2 text-center">
        <Link href="/">
          <Image
            src={touchstreamLogoIcon}
            alt="Logo"
            className="p-2 mt-2"
          />
        </Link>
        <div className="my-2 border-gray-600 border-top" />
      </div>
    </div>

  );
}
