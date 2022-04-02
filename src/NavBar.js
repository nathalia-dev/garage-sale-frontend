import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import CurrentUserContext from "./CurrentUserContext";


function NavBar({logout}) {

  const {currentUser} = useContext(CurrentUserContext)

  function navbarLoginUser() {
		return (
			<nav className="navbar mr-auto navbar-dark bg-dark">
        <Link to="/profile" className="nav-link ">Profile</Link>
        <Link to="/products" className="nav-link"> Products </Link>
        <Link to="/users" className="nav-link "> Users </Link>
        <Link to="/" onClick={logout} className="nav-link "> Logout </Link>
			</nav>
		);
	}


  function navbarLogoutUser() {
    return (
      <nav className="navbar mr-auto navbar-dark bg-dark">
        <NavLink to="/login" className="nav-link"> Login </NavLink>
        <NavLink to="/signup" className="nav-link"> Sign In </NavLink>
      </nav>
    )
  }

  return (
    <nav className="navbar mr-auto navbar-dark bg-dark">
        <NavLink exact to="/" className="navbar-brand p-1">  Garage Sale </NavLink>
        {currentUser ? navbarLoginUser() : navbarLogoutUser()}
    </nav>
  );
}

export default NavBar;