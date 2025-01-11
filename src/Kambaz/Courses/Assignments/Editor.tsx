export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <h3 id="wd-Name">Assignment Name</h3>
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description" style={{ width: "380px", height: "150px" }}>
        The assignment is available online Submit a link to the landing page of
        your Web application running on Netlify. The landing wpage should
        include the following: Your full name and section Links to each of the
        lab assignemnts Link to the Kanbas application Links to all relevant
        source code repositories The Kanbas application should include a link to
        navigate back to the landing page.
      </textarea>
      <br />
      <br />
      <table style={{ borderBottom: "1px solid grey" }}>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option value="Percentage">Percentage</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option value="Online">Online</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td></td>
          <td align="left" valign="top">
            <label htmlFor="wd-points">Online Entry Options</label>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <input type="checkbox" id="wd-text-entry" />
            <label htmlFor="wd-text-entry">Text Entry</label>
            <br />

            <input type="checkbox" id="wd-website-url" />
            <label htmlFor="wd-text-entry">Website URL</label>
            <br />

            <input type="checkbox" id="wd-media-recordings" />
            <label htmlFor="wd-text-entry">Media Recordings</label>
            <br />

            <input type="checkbox" id="wd-student-annotation" />
            <label htmlFor="wd-text-entry">Student Annotation</label>
            <br />

            <input type="checkbox" id="wd-file-upload" />
            <label htmlFor="wd-text-entry">File Uploads</label>
            <br />
          </td>
        </tr>
        <br />
        <tr>
          <td align="right">
            <label htmlFor="wd-assign">Assign</label>
          </td>
          <td align="left" valign="top">
            <label htmlFor="wd-assign-to">Assign to</label>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <input id="wd-assign-to" value="Everyone" />
          </td>
        </tr>
        <br></br>
        <tr>
          <td></td>
          <td align="left" valign="top">
            <label htmlFor="wd-due-date">Due</label>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <input defaultValue="2025-05-03" type="date" id="wd-due-date" />
          </td>
        </tr>
        <br></br>
        <tr>
          <td></td>
          <td align="left" valign="top">
            <label htmlFor="wd-available-from">Available from</label>
          </td>
          <td align="left" valign="top">
            <label htmlFor="wd-available-until">Until</label>
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
            />
          </td>
          <td>
            <input
              defaultValue="2025-05-20"
              type="date"
              id="wd-available-until"
            />
          </td>
          <br />
        </tr>
        <br></br>
      </table>
      <div style={{ paddingLeft: "297px", paddingTop: "10px" }}>
        <button id="wd-cancel-button" style={{ marginRight: "5px" }}>
          Cancel
        </button>
        <button id="wd-save-button">Save</button>
      </div>
    </div>
  );
}
