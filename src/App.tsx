import Labs from "./Labs";
import Kambaz from "./Kambaz";
import { HashRouter, Route, Routes, Link } from "react-router-dom";

function LandingPage() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Landing Page</h1>
      <Link to="/Kambaz">Kambaz</Link>
      <br></br>
      <Link to="/Labs">Labs</Link>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kambaz/*" element={<Kambaz />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
