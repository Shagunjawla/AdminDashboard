import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import ManageStudents from "./pages/ManageStudents";
import ManageInstitutes from "./pages/ManageInstitutes";
import ManageRanking from "./pages/ManageRanking";
import ManagePoints from "./pages/ManagePoints";
import ManageBadges from "./pages/ManageBadges";
import ManageEvents from "./pages/ManageEvents";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/students" element={<ManageStudents />} />
        <Route path="/institutes" element={<ManageInstitutes />} />
        <Route path="/ranking" element={<ManageRanking />} />
        <Route path="/points" element={<ManagePoints />} />
        <Route path="/badges" element={<ManageBadges />} />
        <Route path="/events" element={<ManageEvents />} />
      </Routes>
    </Router>
  );
}

export default App;