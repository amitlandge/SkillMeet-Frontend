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
        </Routes>
      </main>
    </>
  );
}

export default App;
