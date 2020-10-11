import React from "react";
import logo from "../../images/seg-logo.svg";
import { Link } from "react-router-dom";
import Search from "../Search/Search";

const Navbar = () => {
  return (
    <div
      className="
      py-3 bg-gray-700
      bg-opacity-50
      h-10
      sm:h-12
      flex
      justify-around
      relative
      z-50"
    >
      <Search />
      <div>
        <Link to="/">
          <img
            src={logo}
            alt="seg-logo"
            className="sm:w-full h-full object-contain"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
