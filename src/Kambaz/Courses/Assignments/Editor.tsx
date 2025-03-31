/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [assignments, setAssignments] = useState<any[]>([]);

  useEffect(() => {
    if (cid) {
      assignmentsClient.findAssignmentsForCourse(cid).then(setAssignments);
    }
  }, [cid]);

  const currAssignment = assignments.find(
    (assignment) => assignment._id === aid
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");
  const [points, setPoints] = useState("100");

  const [titleExisting, setTitleExisting] = useState(
    currAssignment?.title || ""
  );
  const [descriptionExisting, setDescriptionExisting] = useState(
    currAssignment?.description ||
      "The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following:\nYour full name and section\nLinks to each of the lab assignments\nLink to the Kanbas application\nLinks to all relevant source code repositories.\nThe Kanbas application should include a link to navigate back to the landing page."
  );
  const [pointsExisting, setPointsExisting] = useState(
    currAssignment?.points || "100"
  );
  const [dueDateExisting, setDueDateExisting] = useState(
    currAssignment?.dueDate || ""
  );
  const [availableFromExisting, setAvailableFromExisting] = useState(
    currAssignment?.availableFrom || ""
  );
  const [availableUntilExisting, setAvailableUntilExisting] = useState(
    currAssignment?.availableUntil || ""
  );

  const assignment: {
    title: string;
    description: string;
    dueDate: string;
    availableFrom: string;
    availableUntil: string;
    points: string;
    course: string | undefined;
  } = {
    title: title,
    description: description,
    dueDate: dueDate,
    availableFrom: availableFrom,
    availableUntil: availableUntil,
    points: points,
    course: cid,
  };

  const updatedAssignment: {
    title: string;
    description: string;
    dueDate: string;
    availableFrom: string;
    availableUntil: string;
    points: string;
    course: string | undefined;
    _id: string | undefined;
  } = {
    title: titleExisting,
    description: descriptionExisting,
    dueDate: dueDateExisting,
    availableFrom: availableFromExisting,
    availableUntil: availableUntilExisting,
    points: pointsExisting,
    course: cid,
    _id: aid,
  };

  const handleSave = () => {
    assignmentsClient.createAssignmentForCourse(cid as string, assignment);
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const handleSaveExisting = () => {
    assignmentsClient.updateAssignment(updatedAssignment);
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  if (!currAssignment) {
    return (
      <div id="wd-assignments-editor">
        <text>Assignment Name</text>
        <br></br>
        <input
          id="wd-name"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <textarea
          id="wd-description"
          placeholder="Assignment description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "550px",
            height: "330px",
            border: "1px solid",
            borderRadius: "2px",
            padding: "10px",
            textAlign: "start",
            verticalAlign: "top",
          }}
        />
        <br />
        <br />
        <table style={{ borderBottom: "1px solid grey" }}>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points" style={{ paddingRight: "7px" }}>
                Points
              </label>
            </td>
            <td>
              <input
                type="number"
                id="wd-points"
                style={{ width: "410px" }}
                value={points}
                onChange={(e) => setPoints(e.target.value)}
              />
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign" style={{ paddingRight: "7px" }}>
                Assign
              </label>
            </td>
            <div
              style={{
                border: "1px solid",
                borderRadius: "2px",
                padding: "10px",
              }}
            >
              <td align="left" valign="top">
                <label htmlFor="wd-assign-to">
                  <b>Assign to</b>
                </label>
              </td>
              <tr>
                <td>
                  <div
                    style={{
                      display: "inline-flex",
                      padding: "5px 5px",
                      borderRadius: "2px",
                      fontSize: "14px",
                      color: "#555",
                      border: "1px solid",
                      width: "390px",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        backgroundColor: "#f0f0f0",
                        padding: "5px 10px",
                        borderRadius: "2px",
                        fontSize: "14px",
                        color: "#555",
                      }}
                    >
                      <span>Everyone</span>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          color: "#888",
                          fontSize: "13px",
                          marginLeft: "8px",
                          cursor: "pointer",
                        }}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
              <br></br>
              <tr>
                <td></td>
                <td align="left" valign="top">
                  <label htmlFor="wd-due-date">
                    <b>Due</b>
                  </label>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input
                    defaultValue="2025-05-03"
                    type="date"
                    id="wd-due-date"
                    style={{ width: "388px" }}
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </td>
              </tr>
              <br></br>
              <tr>
                <td></td>
                <td align="left" valign="top">
                  <label htmlFor="wd-available-from">
                    <b>Available from</b>
                  </label>
                </td>
                <td align="left" valign="top">
                  <label htmlFor="wd-available-until">
                    <b>Until</b>
                  </label>
                </td>
                <br />
              </tr>
              <tr>
                <td></td>
                <td>
                  <input
                    defaultValue="2025-05-06"
                    type="date"
                    id="wd-available-from"
                    style={{ width: "194px" }}
                    value={availableFrom}
                    onChange={(e) => setAvailableFrom(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    defaultValue="2025-05-20"
                    type="date"
                    id="wd-available-until"
                    style={{ width: "194px" }}
                    value={availableUntil}
                    onChange={(e) => setAvailableUntil(e.target.value)}
                  />
                </td>
                <br />
              </tr>
            </div>
            <br></br>
          </tr>
        </table>
        <div style={{ paddingLeft: "410px", paddingTop: "10px" }}>
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button
              id="wd-cancel-button"
              variant="secondary"
              style={{ marginRight: "5px" }}
            >
              Cancel
            </Button>
          </Link>
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button id="wd-save-button" variant="danger" onClick={handleSave}>
              Save
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div id="wd-assignments-editor">
      <text>Assignment Name</text>
      <br></br>
      <input
        id="wd-name"
        value={titleExisting}
        onChange={(e) => setTitleExisting(e.target.value)}
      />
      <br />
      <br />
      <textarea
        id="wd-description"
        placeholder="Assignment description"
        value={descriptionExisting}
        onChange={(e) => setDescriptionExisting(e.target.value)}
        style={{
          width: "550px",
          height: "330px",
          border: "1px solid",
          borderRadius: "2px",
          padding: "10px",
          textAlign: "start",
          verticalAlign: "top",
        }}
      />
      <br />
      <br />
      <table style={{ borderBottom: "1px solid grey" }}>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points" style={{ paddingRight: "7px" }}>
              Points
            </label>
          </td>
          <td>
            <input
              id="wd-points"
              value={pointsExisting}
              onChange={(e) => setPointsExisting(e.target.value)}
              style={{ width: "410px" }}
            />
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points" style={{ paddingRight: "7px" }}>
              Assignment Group
            </label>
          </td>
          <td>
            <select id="wd-group" style={{ width: "410px", height: "28px" }}>
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points" style={{ paddingRight: "7px" }}>
              Display Grade as
            </label>
          </td>
          <td>
            <select
              id="wd-display-grade-as"
              style={{ width: "410px", height: "28px" }}
            >
              <option value="Percentage">Percentage</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points" style={{ paddingRight: "7px" }}>
              Submission Type
            </label>
          </td>
          <div
            style={{
              border: "1px solid",
              borderRadius: "2px",
              padding: "10px",
            }}
          >
            <td>
              <select
                id="wd-submission-type"
                style={{ width: "388px", height: "28px" }}
              >
                <option value="Online">Online</option>
              </select>
            </td>
            <tr>
              <td align="left" valign="top">
                <label
                  htmlFor="wd-points"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                >
                  <b>Online Entry Options</b>
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="wd-text-entry"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                />
                <label htmlFor="wd-text-entry" style={{ paddingLeft: "10px" }}>
                  Text Entry
                </label>
                <br />

                <input
                  type="checkbox"
                  id="wd-website-url"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                />
                <label htmlFor="wd-text-entry" style={{ paddingLeft: "10px" }}>
                  Website URL
                </label>
                <br />

                <input
                  type="checkbox"
                  id="wd-media-recordings"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                />
                <label htmlFor="wd-text-entry" style={{ paddingLeft: "10px" }}>
                  Media Recordings
                </label>
                <br />

                <input
                  type="checkbox"
                  id="wd-student-annotation"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                />
                <label htmlFor="wd-text-entry" style={{ paddingLeft: "10px" }}>
                  Student Annotation
                </label>
                <br />

                <input
                  type="checkbox"
                  id="wd-file-upload"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                />
                <label htmlFor="wd-text-entry" style={{ paddingLeft: "10px" }}>
                  File Uploads
                </label>
                <br />
              </td>
            </tr>
          </div>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign" style={{ paddingRight: "7px" }}>
              Assign
            </label>
          </td>
          <div
            style={{
              border: "1px solid",
              borderRadius: "2px",
              padding: "10px",
            }}
          >
            <td align="left" valign="top">
              <label htmlFor="wd-assign-to">
                <b>Assign to</b>
              </label>
            </td>
            <tr>
              <td>
                <div
                  style={{
                    display: "inline-flex",
                    padding: "5px 5px",
                    borderRadius: "2px",
                    fontSize: "14px",
                    color: "#555",
                    border: "1px solid",
                    width: "390px",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      backgroundColor: "#f0f0f0",
                      padding: "5px 10px",
                      borderRadius: "2px",
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    <span>Everyone</span>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "#888",
                        fontSize: "13px",
                        marginLeft: "8px",
                        cursor: "pointer",
                      }}
                    >
                      X
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <br></br>
            <tr>
              <td></td>
              <td align="left" valign="top">
                <label htmlFor="wd-due-date">
                  <b>Due</b>
                </label>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <input
                  defaultValue="2025-05-03"
                  type="date"
                  id="wd-due-date"
                  style={{ width: "388px" }}
                  value={dueDateExisting}
                  onChange={(e) => setDueDateExisting(e.target.value)}
                />
              </td>
            </tr>
            <br></br>
            <tr>
              <td></td>
              <td align="left" valign="top">
                <label htmlFor="wd-available-from">
                  <b>Available from</b>
                </label>
              </td>
              <td align="left" valign="top">
                <label htmlFor="wd-available-until">
                  <b>Until</b>
                </label>
              </td>
              <br />
            </tr>
            <tr>
              <td></td>
              <td>
                <input
                  defaultValue="2025-05-06"
                  type="date"
                  id="wd-available-from"
                  style={{ width: "194px" }}
                  value={availableFromExisting}
                  onChange={(e) => setAvailableFromExisting(e.target.value)}
                />
              </td>
              <td>
                <input
                  defaultValue="2025-05-20"
                  type="date"
                  id="wd-available-until"
                  style={{ width: "194px" }}
                  value={availableUntilExisting}
                  onChange={(e) => setAvailableUntilExisting(e.target.value)}
                />
              </td>
              <br />
            </tr>
          </div>
          <br></br>
        </tr>
      </table>
      {currentUser.role === "FACULTY" && (
        <div style={{ paddingLeft: "410px", paddingTop: "10px" }}>
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button
              id="wd-cancel-button"
              variant="secondary"
              style={{ marginRight: "5px" }}
            >
              Cancel
            </Button>
          </Link>
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button
              id="wd-save-button"
              variant="danger"
              onClick={handleSaveExisting}
            >
              Save
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
