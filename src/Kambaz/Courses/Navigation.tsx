import { Link, useLocation } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

export default function CourseNavigation() {
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/");
  const courseIdIndex = pathSegments.indexOf("Courses") + 1;
  const courseId = pathSegments[courseIdIndex] || "default";

  const links = [
    { label: "Home", path: `/Kambaz/Courses/${courseId}/Home` },
    { label: "Modules", path: `/Kambaz/Courses/${courseId}/Modules` },
    { label: "Piazza", path: `/Kambaz/Courses/${courseId}/Piazza` },
    { label: "Zoom", path: `/Kambaz/Courses/${courseId}/Zoom` },
    { label: "Assignments", path: `/Kambaz/Courses/${courseId}/Assignments` },
    { label: "Quizzes", path: `/Kambaz/Courses/${courseId}/Quizzes` },
    { label: "Grades", path: `/Kambaz/Courses/${courseId}/Grades` },
    { label: "People", path: `/Kambaz/Courses/${courseId}/People` },
  ];

  return (
    <ListGroup id="wd-courses-navigation" className="wd list-group fs-5 rounded-0 bg-white d-none d-md-block">
      {links.map((link) => (
        <ListGroup.Item
          key={link.path}
          as={Link}
          to={link.path}
          className={`list-group-item text-start border-0 ${pathname.startsWith(link.path) ? "text-black border-start border-3 border-black" : "text-danger bg-white"}`}
        >
          {link.label}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
