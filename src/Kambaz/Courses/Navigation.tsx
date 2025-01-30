import { Link, useLocation } from "react-router-dom";

export default function CourseNavigation() {
  const location = useLocation();

  const getLinkClass = (path: string) =>
    location.pathname === path
      ? "list-group-item active border-0"
      : "list-group-item text-danger border border-0";

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0 bg-white d-none d-md-block">
      <Link to="/Kambaz/Courses/1234/Home" id="wd-course-home-link" className={getLinkClass("/Kambaz/Courses/1234/Home")}>
        Home
      </Link>
      <Link to="/Kambaz/Courses/1234/Modules" id="wd-course-modules-link" className={getLinkClass("/Kambaz/Courses/1234/Modules")}>
        Modules
      </Link>
      <Link to="/Kambaz/Courses/1234/Piazza" id="wd-course-piazza-link" className={getLinkClass("/Kambaz/Courses/1234/Piazza")}>
        Piazza
      </Link>
      <Link to="/Kambaz/Courses/1234/Zoom" id="wd-course-zoom-link" className={getLinkClass("/Kambaz/Courses/1234/Zoom")}>
        Zoom
      </Link>
      <Link to="/Kambaz/Courses/1234/Assignments" id="wd-course-assignments-link" className={getLinkClass("/Kambaz/Courses/1234/Assignments")}>
        Assignments
      </Link>
      <Link to="/Kambaz/Courses/1234/Quizzes" id="wd-course-quizzes-link" className={getLinkClass("/Kambaz/Courses/1234/Quizzes")}>
        Quizzes
      </Link>
      <Link to="/Kambaz/Courses/1234/Grades" id="wd-course-grades-link" className={getLinkClass("/Kambaz/Courses/1234/Grades")}>
        Grades
      </Link>
      <Link to="/Kambaz/Courses/1234/People" id="wd-course-people-link" className={getLinkClass("/Kambaz/Courses/1234/People")}>
        People
      </Link>
    </div>
  );
}
