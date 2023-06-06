import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { LetterCreate } from "../components/letters/LetterCreate";

export const ApplicationViews = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/letter" element={<LetterCreate />} />
        </Route>
      </Routes>
    </Router>
  );
};
