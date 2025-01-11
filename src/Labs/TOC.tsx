import { Link } from "react-router";
export default function TOC() {
  return (
    <div>
      <h2>Table of Contents</h2>
      <ul>
        <li>
          <Link to="/Labs">Labs</Link>
        </li>
        <li>
          <Link to="/Labs/Lab1">Lab 1</Link>
        </li>
        <li>
          <Link to="/Labs/Lab2">Lab 2</Link>
        </li>
        <li>
          <Link to="/Labs/Lab3">Lab 3</Link>
        </li>
        <li>
          <Link to="/Kambaz">Kambaz</Link>
        </li>
        <li>
          <Link to="/" id="wd-landing-page-link">
            Landing Page
          </Link>
        </li>
        <li>
          No relevant source code repositories, only used given code from
          textbook
        </li>
      </ul>
    </div>
  );
}
