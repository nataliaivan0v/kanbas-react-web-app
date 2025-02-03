import { FiSlash } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";

export default function NoCircle() {
  return (
    <span className="me-1 position-relative">
      <FiSlash
        style={{ top: "2px" }}
        className="me-1 position-absolute fs-5"
      />
        <FaCircle className="text-white me-1 fs-6" />
    </span>
  );
}
