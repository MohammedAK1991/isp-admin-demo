import SideBar from '../../components/common/SideBarMini';
import BackArrow from '../../icons/BackArrow';

export default function LayoutWithSideBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="d-flex vw-100">
      <SideBar />
      <div className="position-relative d-flex flex-grow-1">

        <div className="opacity-100 cursor-pointer position-absolute hover-opacity-25">

          <BackArrow />
        </div>
        {children}
      </div>
    </div>
  );
}
