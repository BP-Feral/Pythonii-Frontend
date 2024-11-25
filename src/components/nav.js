import React, { useState } from "react";
import Hamburger from "./hamburger";
import { Link } from "react-router-dom";

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
            <li><a href="https://usv.ro/facultati">Faculties🔗</a></li>
            <li><a href="https://usv.ro/international">International🔗</a></li>
            <li><a href="https://usv.ro/studenti">Students🔗</a></li>
            <div class="vl"></div>
            <li><Link to="/calendar">Calendar📅</Link></li>
            <li><Link to="/exam">Programare📅</Link></li>
            <li><a href="/aboutus">About Us📄</a></li>
          </ul>
        </div>
        <div className="search-lang">
          <input type="text" placeholder="Search..." />
          <button className="search-btn">🔍</button>
          <select className="lang-dropdown">
            <option value="ro">RO</option>
            <option value="en">EN</option>
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
          <li><a href="https://usv.ro/facultati">Faculties</a></li>
            <li><a href="https://usv.ro/international">International</a></li>
            <li><a href="https://usv.ro/studenti">Students</a></li>
            <li><a href="/">About Us</a></li>
          </ul>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        .nav-container {
          background-color: #192041;
          color: white;
          font-family: Arial, sans-serif;
        }
        .top-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        background-color: #192041;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3); /* Add this line for the shadow */
        z-index: 100; /* Ensure the navbar is above other content */
        position: sticky; /* Makes the navbar stick to the top */
        top: 0; /* For sticky effect */
      }

        .logo img {
          height: 50px;
        }

        .nav-items ul {
          list-style: none;
          display: flex;
          margin: 0;
          padding: 0;
        }

        .nav-items ul li {
          margin: 0 15px;
        }

        .nav-items ul li a {
          color: white;
          text-decoration: none;
          font-size: 16px;
        }

        .nav-items ul li a:hover {
          border-bottom: 2px solid #0099ff;
        }

        .search-lang {
          display: flex;
          align-items: center;
        }

        .search-lang input {
          padding: 5px;
          font-size: 14px;
          border: none;
          border-radius: 3px;
          margin-right: 5px;
        }

        .search-lang .search-btn {
          background-color: #0099ff;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 3px;
        }

        .search-lang .lang-dropdown {
          margin-left: 10px;
          padding: 5px;
          font-size: 14px;
          border: none;
          border-radius: 3px;
        }

        .hamburger-menu {
          display: none;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .top-nav {
            flex-direction: column;
            align-items: flex-start;
          }

          .nav-items {
            display: none;
          }

          .hamburger-menu {
            display: block;
            cursor: pointer;
          }

          .mobile-nav ul {
            list-style: none;
            padding: 10px;
            background-color: #192041;
            width: 100%;
          }

          .mobile-nav ul li {
            margin: 10px 0;
          }

          .mobile-nav ul li a {
            color: white;
            text-decoration: none;
            font-size: 16px;
          }

          .mobile-nav ul li a:hover {
            border-bottom: 2px solid #0099ff;
          }
        }
      `}</style>
    </div>
  );
}
