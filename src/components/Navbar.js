import React, { useState, useEffect } from "react";
import Hamburger from "./Ham";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Nav() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // Stare pentru rol
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // Toggle Hamburger menu
  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const payloadBase64 = token.split(".")[1]; // Partea de payload
      const payload = JSON.parse(atob(payloadBase64)); // Decodare Base64
      console.log(payload);

      // Setare rol utilizator pe baza payload
      if (payload.user_id <= 1843) 
        setUserRole("profesor");
      if (payload.user_id > 1843) 
        setUserRole("student");
      if (payload.user_id === 1845)
        setUserRole("all");
    }
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    const access_token = localStorage.getItem("access_token");
    const token = localStorage.getItem("refresh_token");

    if (token) {
      try {
        const response = await fetch("http://localhost:8000/auth/logout/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`,
          },
          body: JSON.stringify({
            token,
          }),
        });

        if (response.ok) {
          // Clear the tokens from localStorage and redirect
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("role");
          setIsLoggedIn(false);
          navigate("/"); // Redirect to login page after logout
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    } else {
      console.error("No token found for logout");
    }
  };

  return (
    <div className="nav-container">
      {/* Top Navigation Section */}
      <div className="top-nav">
        <div className="logo">
          <a href="https://usv.ro/">
            <img src="/assets/usv-standard-centrat.png" alt="USV Logo" />
          </a>
        </div>
        <div className="nav-items">
          <ul>
            <li><a href="https://usv.ro/facultati">Facultati🔗</a></li>
            <li><a href="https://usv.ro/international">International🔗</a></li>
            <li><a href="https://usv.ro/studenti">Studenti🔗</a></li>

            <div className="vl"></div>

            {isLoggedIn ? (
              <>
                <li><Link to="/calendar">Calendar📅</Link></li>
                {(userRole === "profesor" || userRole === "all") && <li><Link to="/cereri">Cereri</Link></li>}
                {/* {(userRole === "student" || userRole === "all")&& <li><Link to="/programare">Programare📅</Link></li>} */}
                {(role === "Professor" || role == "Secretary" || role === "HeadOfDepartment" || role === "StudentRepresentative") && <li><Link to="/programare">Programare📅</Link></li>}
                <li><Link to="/despre-noi">Despre Noi📄</Link></li>

                <div className="vl"></div>
                <li>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li><Link to="/">Login</Link></li>
            )}
          </ul>
        </div>
        <div className="search-lang">
          <select className="lang-dropdown">
            <option value="ro">RO</option>
          </select>
        </div>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="hamburger-menu" onClick={toggleHamburger}>
        <Hamburger isOpen={hamburgerOpen} />
      </div>
      {hamburgerOpen && (
        <div className="mobile-nav">
          <ul>
            <li><a href="https://usv.ro/facultati">Facultati🔗</a></li>
            <li><a href="https://usv.ro/international">International🔗</a></li>
            <li><a href="https://usv.ro/studenti">Studenti🔗</a></li>
            {isLoggedIn && (
              <>
                <li><Link to="/calendar">Calendar📅</Link></li>
                {userRole !== "profesor" && <li><Link to="/cereri">Cereri</Link></li>}
                {userRole === "student" && <li><Link to="/programare">Programare📅</Link></li>}
                <li><Link to="/despre-noi">Despre Noi📄</Link></li>
                <li>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
