import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { LetterCreate } from "../components/letters/LetterCreate";
import { ContactPage } from "../components/contacts/ContactPage";
import { LetterLibrary } from "../components/letters/LetterLibrary";
import { ProfileForm } from "../components/profile/ProfileForm";
import { TagForm } from "../components/tags/TagForm";
import { CampaignForm } from "../components/campaigns/CampaignForm";
import { CampaignLettersCreate } from "../components/letters/CampaignLettersCreate";

export const ApplicationViews = () => {
  const navigate = useNavigate();


  const redirectToLetterCreate = () => {
    navigate("/letter");
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Authorized />}>
        <Route
          path="/"
          element={<LetterCreate />} 
          onClick={redirectToLetterCreate} 
        />
        <Route path="/letter" element={<LetterCreate />} />
        <Route path="/library" element={<LetterLibrary />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/campaign" element={<CampaignForm />} />
        <Route path="/writecampaign" element={<CampaignLettersCreate />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/tag" element={<TagForm />} />
      </Route>
    </Routes>
  );
};
