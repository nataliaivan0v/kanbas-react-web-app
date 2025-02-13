import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import * as db from "../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignments = db.assignments;

  const assignment = assignments.find((assignment) => assignment._id === aid);

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  return (
    <div id="wd-assignments-editor">
      <text>Assignment Name</text>
      <br></br>
      <input id="wd-name" value={assignment.title} />
      <br />
      <br />
      <div
        id="wd-description"
        style={{
          width: "550px",
          height: "330px",
          border: "1px solid",
          borderRadius: "2px",
          padding: "10px",
        }}
      >
        The assignment is <span style={{ color: "red" }}>available online</span>
        <br />
        <br />
        Submit a link to the landing page of your Web application running on
        Netlify.
        <br />
        <br />
        The landing page should include the following:
        <ul>
          <li>Your full name and section</li>
          <li>Links to each of the lab assignments</li>
          <li>Link to the Kanbas application</li>
          <li>Links to all relevant source code repositories</li>
        </ul>
        The Kanbas application should include a link to navigate back to the
        landing page.
      </div>
      <br />
      <table style={{ borderBottom: "1px solid grey" }}>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points" style={{ paddingRight: "7px" }}>
              Points
            </label>
          </td>
          <td>
            <input id="wd-points" value={100} style={{ width: "410px" }} />
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
                <div style={{
                    display: "inline-flex",
                    padding: "5px 5px",
                    borderRadius: "2px",
                    fontSize: "14px",
                    color: "#555",
                    border: "1px solid",
                    width: "390px"
                  }}>
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
                />
              </td>
              <td>
                <input
                  defaultValue="2025-05-20"
                  type="date"
                  id="wd-available-until"
                  style={{ width: "194px" }}
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
          <Button id="wd-save-button" variant="danger">
            Save
          </Button>
        </Link>
      </div>
    </div>
  );
}
