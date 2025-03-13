import { FaSearch, FaPlus } from "react-icons/fa";
import { Button, ListGroup } from "react-bootstrap";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { LuClipboardPenLine } from "react-icons/lu";
import { IoEllipsisVertical } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { useSelector } from "react-redux";
import { RootState } from "/Users/nataliaivanov/kanbas-react-web-app/src/Kambaz/store.ts";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteAssignment } from "./reducer";
import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const assignments = useSelector(
    (state: RootState) => state.assignmentsReducer.assignments
  );

  const courseAssignments = assignments.filter(
    (assignment) => assignment.course === cid
  );

  const handleClick = () => {
    navigate("./Editor");
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);

  const handleDeleteClick = (assignmentId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setAssignmentToDelete(assignmentId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteAssignment(assignmentToDelete));
    setShowDeleteModal(false);
    setAssignmentToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setAssignmentToDelete(null);
  };

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

        <Button id="wd-add-assignment-group" variant="secondary">
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Group
        </Button>
        {currentUser.role === "FACULTY" && (
          <Button variant="danger" id="wd-add-assignment" onClick={handleClick}>
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Assignment
          </Button>
        )}
      </div>

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="fs-3" />
            <IoMdArrowDropdown style={{ marginRight: "5px" }} />
            <b>ASSIGNMENTS</b>
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
                    <b>{assignment.title}</b> <br />
                    <span id="wd-module-text">
                      <span style={{ color: "red" }}>Multiple Modules</span> |{" "}
                      <b>Not available until </b> {assignment.availableFrom} |
                    </span>
                    <br />
                    <span id="wd-module-text">
                      <b>Due </b> {assignment.dueDate} | {assignment.points}{" "}
                      points
                    </span>
                  </div>
                  <LessonControlButtons />
                  {currentUser.role === "FACULTY" && (
                    <FaRegTrashAlt
                      color="red"
                      onClick={(e) => handleDeleteClick(assignment._id, e)}
                    />
                  )}
                </ListGroup.Item>
              </Link>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>

      <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this assignment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
