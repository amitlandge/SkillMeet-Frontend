import { Route, Routes } from "react-router";
import "./App.css";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Home/Login";
import useUser from "./Hooks/useUser.js";
import { useEffect } from "react";

function App() {
  const [loadUser] = useUser();
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
