import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import CreateMeter from "./views/CreateMeter";
import MeterDetails from "./views/MeterDetails";
import UpdateMeter from "./views/UpdateMeter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-meter" element={<CreateMeter />} />
        <Route path="/meter-details" element={<MeterDetails />} />
        <Route path="/update-meter" element={<UpdateMeter />} />
      </Routes>
    </Router>
  );
}

export default App;
