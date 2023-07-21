import { Routes, Route, useLocation } from "react-router-dom";

import Layout from "@components/Layout";
import Home from "@pages/Home";
import Experiences from "@pages/Experiences";
import LayoutAdmin from "@components/LayoutAdmin";
import HomeAdmin from "@pages/Admin/HomeAdmin";
import ExperiencesAdmin from "@pages/Admin/ExperiencesAdmin";
import CreatExperience1 from "@pages/Admin/CreatExperience1";
import ModifyExperience from "@pages/Admin/ModifyExperience";
import Competences from "@pages/Competences";
import Projets from "@pages/Projets";
import Formations from "@pages/Formations";
import ProtectedRoutes from "@components/ProtectedRoutes";

import "./App.css";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return isAdminRoute ? (
    <LayoutAdmin>
      <Routes>
        <Route path="/admin" element={<HomeAdmin />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/admin/experiences" element={<ExperiencesAdmin />} />
          <Route
            path="/admin/createxperience1"
            element={<CreatExperience1 />}
          />
          <Route
            path="/admin/modifyexperience/:id"
            element={<ModifyExperience />}
          />
        </Route>
      </Routes>
    </LayoutAdmin>
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/formations" element={<Formations />} />
        <Route path="/competences" element={<Competences />} />
        <Route path="/projets" element={<Projets />} />
      </Routes>
    </Layout>
  );
}

export default App;
