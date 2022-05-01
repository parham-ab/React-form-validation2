import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// icons
import { MdDarkMode, MdLightMode } from "react-icons/md";
// components
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Wave from "./components/Wave";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode && "dark"}>
      <div>
        <span onClick={() => setDarkMode(!darkMode)}>
          {!darkMode ? (
            <MdDarkMode className="darkMode" />
          ) : (
            <MdLightMode className="lightMode" />
          )}
        </span>
      </div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      <Wave />
    </div>
  );
};

export default App;
