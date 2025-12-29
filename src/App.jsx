import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import WorkforceSuite from "./pages/WorkforceSuite";
import OperationsSuite from "./pages/OperationsSuite";
import QualitySuite from "./pages/QualitySuite";

import "./styles/global.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState(null);

  // TEMP PAGE COMPONENT (for old pages)
  const ComingSoonPage = ({ title }) => (
    <div
      style={{
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        color: "#00ffff",
      }}
    >
      {title} - Coming Soon
    </div>
  );

  // Add logout function
  const onLogout = () => {
    setUser(null);
    alert("Logged out successfully!");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("sessionToken");
    const savedEmail = localStorage.getItem("userEmail");
    const savedName = localStorage.getItem("userName");

    if (savedToken && savedEmail) {
      setUser({
        token: savedToken,
        email: savedEmail,
        name: savedName || savedEmail.split("@")[0],
      });

      const lastPage = localStorage.getItem("currentPage") || "home";
      setCurrentPage(lastPage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("sessionToken", userData.token);
    localStorage.setItem("userEmail", userData.email);
    localStorage.setItem("userName", userData.name);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    setCurrentPage("home");
  };

  return (
    <div className="app">
      {/* Header (unchanged) */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
        onLogout={handleLogout}
      />

      {/* NEW: Router Pages */}
      <Routes>
        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <Home setCurrentPage={setCurrentPage} user={user} onLogout={onLogout} />
          }
        />

        {/* NEW AUTOMATION SUITE PAGES */}
        <Route path="/workforce" element={<WorkforceSuite />} />
        <Route path="/operations" element={<OperationsSuite />} />
        <Route path="/quality" element={<QualitySuite />} />

        {/* OLD PAGES (TEMP UNTIL YOU BUILD THEM) */}
        <Route path="/about" element={<ComingSoonPage title="About Page" />} />
        <Route path="/tutorial" element={<ComingSoonPage title="Tutorial Page" />} />
        <Route path="/contact" element={<ComingSoonPage title="Contact Page" />} />
      </Routes>
    </div>
  );
}

export default App;
