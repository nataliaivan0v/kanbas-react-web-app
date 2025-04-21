import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizPreview from "./Quizzes/QuizzesPreview/QuizPreview";
import QuizAnswerPage from "./Quizzes/QuizzesPreview/QuizAnswerPage";

export default function Courses({ courses }: { courses: any[]; }) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>{" "}
      <hr />
      <div className="d-flex">
          <CourseNavigation />
          <div className="wd-course-content-offset p-3">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<Home />} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Assignments" element={<Assignments />} />
              <Route path="Assignments/:aid" element={<AssignmentEditor />} />
              <Route path="Quizzes" element={<Quizzes />} />
              <Route path="Quizzes/:qid" element={<QuizDetails />} />
              <Route path="Quizzes/:qid/Edit" element={<QuizEditor />} />
              <Route path="Quizzes/:qid/Preview" element={<QuizPreview />} />
              <Route path="Quizzes/:qid/Answers" element={<QuizAnswerPage />} />
              <Route path="People" element={<PeopleTable />} />
              </Routes>
          </div>
        </div>
    </div>
  );
}
