import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        COLORPALETTE
      </Link>
      <div className="links">
        <Link to="/" className="nav-link">
          Generate A Palette
        </Link>
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
