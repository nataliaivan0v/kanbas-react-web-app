import { FaSearch, FaPlus } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { LuClipboardPenLine } from "react-icons/lu";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import * as db from "../../Database"; 

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;

  const courseAssignments = assignments.filter(
    (assignment) => assignment.course === cid
  );

  return (
    <div id="wd-assignments" className="align-items-center mb-3">
      <div className="d-flex align-items-center mb-3">
        <div className="input-group flex-grow-1 w-50">
          <span className="input-group-text bg-white border-end-0">
            <FaSearch className="text-secondary" />
          </span>
          <input
            id="wd-search-assignment"
            type="text"
            className="form-control border-start-0"
            placeholder="Search..."
          />
        </div>
        <br></br>

        <Button id="wd-add-assignment-group" variant="secondary">
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Group
        </Button>
        <Button variant="danger" id="wd-add-assignment">
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Assignment
        </Button>
      </div>

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className=" fs-3" />
            <IoMdArrowDropdown style={{ marginRight: "5px" }} />
            <b>ASSIGNMENTS</b>{" "}
            <div className="float-end">
              <span className="badge rounded-pill border border-dark text-dark me-2">
                40% of total
              </span>
              <BsPlus className="fs-4 me-2" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {courseAssignments.map((assignment) => (
              <Link
                to={`/Kambaz/Courses/${assignment.course}/Assignments/${assignment._id}`}
                key={assignment._id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListGroup.Item className="wd-lesson p-3 d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <LuClipboardPenLine
                    style={{ color: "green" }}
                    className="me-2 fs-4"
                  />
                  <div id="wd-assignment-text" className="flex-grow-1">
                    <b>{assignment._id}</b> <br />
                    <span id="wd-module-text">
                      <span style={{ color: "red" }}>Multiple Modules</span> |{" "}
                      <b>Not available until </b>May 6 at 12:00am |
                    </span>
                    <br />
                    <span id="wd-module-text">
                      <b>Due </b> May 13 11:59pm | 100 points
                    </span>
                  </div>
                  <LessonControlButtons />
                </ListGroup.Item>
              </Link>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}