import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// components
import LogIn from "./components/LogIn";
import SignIn from "./components/SignIn";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
