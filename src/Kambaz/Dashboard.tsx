import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/react.png" width={200} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
          <br></br>
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/class2.jpg" width={200} />
            <div>
              <h5> CS 2500 </h5>
              <p className="wd-dashboard-course-title">
                Fundamentals of Computer Science 1{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
          <br></br>
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/class3.jpeg" width={200} />
            <div>
              <h5> CS 2510 </h5>
              <p className="wd-dashboard-course-title">
                Fundamentals of Computer Science 2{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
          <br></br>
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/class5.png" width={200} />
            <div>
              <h5> CS 3500 </h5>
              <p className="wd-dashboard-course-title">
                Object-Oriented Design{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
          <br></br>
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/class6.jpg" width={200} />
            <div>
              <h5> CS 300 </h5>
              <p className="wd-dashboard-course-title">
                Algorithms and Data{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
          <br></br>
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/class4.webp" width={200} />
            <div>
              <h5> CS 3650 </h5>
              <p className="wd-dashboard-course-title">
                Computer Systems{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
          <br></br>
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/class7.jpeg" width={200} />
            <div>
              <h5> CS 3800 </h5>
              <p className="wd-dashboard-course-title">
                Theory of Computation{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
