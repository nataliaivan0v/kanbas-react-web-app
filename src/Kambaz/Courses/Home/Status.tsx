import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { Button } from "react-bootstrap";
import { FaHouseChimney } from "react-icons/fa6";
import { IoIosStats } from "react-icons/io";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { IoIosNotifications } from "react-icons/io";
import { useSelector } from "react-redux";

export default function CourseStatus() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-course-status" style={{ maxWidth: "320px" }}>
      {currentUser.role === "FACULTY" && (
        <>
          <h2>Course Status</h2>
          <div className="d-flex">
            <div className="w-50 pe-1">
              <Button
                variant="secondary"
                size="lg"
                className="w-100 text-nowrap"
              >
                <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish
              </Button>
            </div>
            <div className="w-50">
              <Button variant="success" size="lg" className="w-100">
                <FaCheckCircle className="me-2 fs-5" /> Publish
              </Button>
            </div>
          </div>
          <br />
          <Button
            variant="secondary"
            size="lg"
            className="w-100 mt-1 text-start"
          >
            <BiImport className="me-2 fs-5" /> Import Existing Content
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-100 mt-1 text-start"
          >
            <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-100 mt-1 text-start"
          >
            <FaHouseChimney className="me-2 fs-5" /> Choose Home Page
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-100 mt-1 text-start"
          >
            <HiOutlineSpeakerphone className="me-2 fs-5" /> New Announcement
          </Button>
        </>
      )}
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <IoIosStats className="me-2 fs-5" /> View Course Stream
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <IoIosStats className="me-2 fs-5" /> New Analytics
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <IoIosNotifications className="me-2 fs-5" /> View Course Notifications
      </Button>
    </div>
  );
}
