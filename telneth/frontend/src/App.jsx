import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // <-- add this line
import Navbar from "./components/Navbar";
import Homepage from "./pages/homepage.jsx";// other imports...

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* other routes */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}