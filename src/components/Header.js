import headerLogo from "../images/header-logo.svg";
import React from "react";

function Header() {
 return (
  <header className="header">
   <img alt="Лого" className="header__logo" src={headerLogo} />
  </header>
 );
}
export default Header;