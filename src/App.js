import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// components
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Wave from "./components/Wave";

const App = () => {
  return (
    <div>
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
