import React, { useState } from "react";
import Hamburger from "./Hamburger";
import { Link } from "react-router-dom";

import "../styles/Navbar.css"; 

export default function Nav() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
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
            <div class="vl"></div>
            <li><Link to="/calendar">Calendar📅</Link></li>
            <li><Link to="/programare">Programare📅</Link></li>
            <li><Link to="/despre-noi">Despre Noi📄</Link></li>
            <div class="vl"></div>
            <li><Link to="/">Logare (temp)</Link></li>
          </ul>
        </div>
        <div className="search-lang">
          {/* <input type="text" placeholder="Search..." />
          <button className="search-btn">🔍</button> */}
          <select className="lang-dropdown">
            <option value="ro">RO</option>
            {/* <option value="en">EN</option> */}
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
            <li><Link to="/calendar">Calendar📅</Link></li>
            <li><Link to="/exam">Programare📅</Link></li>
            <li><Link to="/despre-noi">Despre Noi📄</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
}
