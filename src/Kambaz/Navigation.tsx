import { Link, useLocation } from "react-router-dom";
import { FaRegCircleUser, FaInbox } from "react-icons/fa6";
import { AiOutlineDashboard } from "react-icons/ai";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { IoCalendarOutline } from "react-icons/io5";

export default function KambazNavigation() {
  const location = useLocation();

  const getLinkClass = (path: string) =>
    location.pathname === path
      ? "list-group-item text-center border-0 bg-white text-danger"
      : "list-group-item text-white bg-black text-center border-0";

  return (
    <div
      id="wd-kambaz-navigation"
      style={{ width: 110 }}
      className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <br />
      <a
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        className="list-group-item bg-black border-0 text-center"
      >
        <img
          src="/images/neu.webp"
          width="75px"
          alt="Northeastern University"
        />
      </a>
      <br />
      <Link
        to="/Kambaz/Account"
        id="wd-account-link"
        className={getLinkClass("/Kambaz/Account")}
      >
        <FaRegCircleUser className="fs-1 text-white" />
        <br />
        Account
      </Link>
      <Link
        to="/Kambaz/Dashboard"
        id="wd-dashboard-link"
        className={getLinkClass("/Kambaz/Dashboard")}
      >
        <AiOutlineDashboard className="fs-1 text-danger" />
        <br />
        Dashboard
      </Link>
      <Link
        to="/Kambaz/Courses"
        id="wd-course-link"
        className={getLinkClass("/Kambaz/Courses")}
      >
        <LiaBookSolid className="fs-1 text-danger" />
        <br />
        Courses
      </Link>
      <Link
        to="/Kambaz/Calendar"
        id="wd-calendar-link"
        className={getLinkClass("/Kambaz/Calendar")}
      >
        <IoCalendarOutline className="fs-1 text-danger" />
        <br />
        Calendar
      </Link>
      <Link
        to="/Kambaz/Inbox"
        id="wd-inbox-link"
        className={getLinkClass("/Kambaz/Inbox")}
      >
        <FaInbox className="fs-1 text-danger" />
        <br />
        Inbox
      </Link>
      <Link to="/Labs" id="wd-labs-link" className={getLinkClass("/Labs")}>
        <LiaCogSolid className="fs-1 text-danger" />
        <br />
        Labs
      </Link>
    </div>
  );
}
