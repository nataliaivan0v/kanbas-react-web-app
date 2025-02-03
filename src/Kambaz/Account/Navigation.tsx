import { Link, useLocation } from "react-router-dom";

export default function AccountNavigation() {
  const location = useLocation();

  const getLinkClass = (path: string) =>
    location.pathname === path
      ? "list-group-item active border-0"
      : "list-group-item text-danger border border-0";
    
  return (
    <div
      id="wd-account-navigation"
      className="wd list-group fs-5 rounded-0 bg-white d-none d-md-block"
    >
      <Link
        to="/Kambaz/Account/Signin"
        id="wd-account-signin-link"
        className={getLinkClass("/Kambaz/Account/Signin")}
      >
        Signin
      </Link>
      <Link
        to="/Kambaz/Account/Signup"
        id="wd-account-signup-link"
        className={getLinkClass("/Kambaz/Account/Signup")}
      >
        Signup
      </Link>
      <Link
        to="/Kambaz/Account/Profile"
        id="wd-account-profile-link"
        className={getLinkClass("/Kambaz/Account/Profile")}
      >
        Profile
      </Link>
    </div>
  );
}
