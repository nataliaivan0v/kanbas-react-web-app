import Labs from "./Labs";
import { HashRouter, Navigate, Route, Routes } from "react-router";
function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/Labs" />} />
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kambaz" element={<h1>Kambaz</h1>} />
          <Route path="/Project" element={<h1>Project</h1>} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;

