import { Route, Routes } from "react-router";
import "./App.css";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Home/Login";
import useUser from "./Hooks/useUser.js";
import { useEffect } from "react";
import Profile from "./Pages/Profile.jsx";
import UserPrivateRoutes from "./PrivateRoutes/UserPrivateRoutes.jsx";
import SideMenu from "./Components/Navbar/SideMenu.jsx";
import Email from "./Pages/Email.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import LearnerDashboard from "./Pages/Learner/LearnerDashboard.jsx";
import LearnerPrivateRoutes from "./PrivateRoutes/LearnerPrivateRoutes.jsx";
import TutorPrivateRoutes from "./PrivateRoutes/TutorPrivateRoutes.jsx";
import TutorDashborad from "./Pages/Tutor/TutorDashborad.jsx";

function App() {
  const [loadUser] = useUser();
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <>
      <nav>
        <SideMenu />
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sendtoemail" element={<Email />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route element={<UserPrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<LearnerPrivateRoutes />}>
            <Route path="/learner/dashboard" element={<LearnerDashboard />} />
          </Route>
           <Route element={<TutorPrivateRoutes />}>
            <Route path="/tutor/dashboard" element={<TutorDashborad />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
