import Labs from "./Labs";
import Kambaz from "./Kambaz";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import AddPathParameters from "./Labs/Lab3/AddPathParameters";
import store from "./Kambaz/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Kambaz" />} />
            <Route path="/Kambaz/*" element={<Kambaz />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route
              path="/Labs/Lab3/add/:a/:b"
              element={<AddPathParameters />}
            />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}
