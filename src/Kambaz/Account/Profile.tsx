import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      <Form.Control id="wd-username" placeholder="alice" className="mb-2" />
      <Form.Control id="wd-password" placeholder="123" className="mb-2" />
      <Form.Control id="wd-first-name" placeholder="Alice" className="mb-2" />
      <Form.Control id="wd-last-name" placeholder="Wonderland" className="mb-2" />
      <Form.Control id="wd-email" placeholder="alice@wonderland.com" className="mb-2" />
      <Form.Control id="wd-email" type="date" className="mb-2" />
      <Form.Control id="wd-user" placeholder="User" className="mb-2" />

      <Link to="/Kambaz/Account/Signin" className="btn btn-danger w-100 mb-2">Sign out</Link>
    </div>
  );
}
