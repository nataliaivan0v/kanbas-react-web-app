import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import ProtectedRoute from "./Account/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { addCourse, deleteCourse, updateCourse } from "./Courses/reducer";
import { enrollInCourse, unenrollFromCourse } from "./reducer";
import { RootState } from "/Users/nataliaivanov/kanbas-react-web-app/src/Kambaz/store.ts";
import { useState } from "react";

export default function Kambaz() {
  const courses = useSelector(
    (state: RootState) => state.coursesReducer.courses
  );
  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({ // eslint-disable-line @typescript-eslint/no-explicit-any
    name: "New course",
    description: "New course description",
  });

  return (
    <div id="wd-kambaz">
      <KambazNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Account" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addCourse={(course) => dispatch(addCourse(course))}
                  deleteCourse={(courseId) => dispatch(deleteCourse(courseId))}
                  updateCourse={(course) => dispatch(updateCourse(course))}
                  enrollInCourse={(userId, courseId) => dispatch(enrollInCourse({ userId, courseId }))}
                  unenrollFromCourse={(userId, courseId) => dispatch(unenrollFromCourse({ userId, courseId }))}              
                />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/Courses/:cid/*"
            element={
              <ProtectedRoute>
                <Courses courses={courses} />
              </ProtectedRoute>
            }
          />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
  );
}
