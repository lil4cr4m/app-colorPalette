// Navigation. Renders the navbar and the links to the routes.

import React from "react";
import { Link } from "react-router-dom";
import Home from "./Home";
import PaletteGenerator from "./PaletteGenerator";

const Header = () => {
  return (
    <div>
      <nav>
        <Link to={Home}>Home</Link>
        <Link to={PaletteGenerator}>Generator</Link>
      </nav>
    </div>
  );
};

export default Header;
