import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { LetterCreate } from "../components/letters/LetterCreate";
import { ContactPage } from "../components/contacts/ContactPage";
import { LetterLibrary } from "../components/letters/LetterLibrary";

export const ApplicationViews = () => {
  return (

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Authorized />}>
          <Route path="/letter" element={<LetterCreate />} />
          <Route path="/library" element={<LetterLibrary />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>

  );
};
