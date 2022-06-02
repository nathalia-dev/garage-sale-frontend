import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import CurrentUserContext from "./CurrentUserContext";

function NavBar({ logout }) {
	const { currentUser } = useContext(CurrentUserContext);

	function navbarLoginUser() {
		return (
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav ml-auto">
					<Link to="/profile" className="nav-link ">
						Profile
					</Link>
					<Link to="/products" className="nav-link">
						{" "}
						Products{" "}
					</Link>

					<Link to="/orders" className="nav-link">
						{" "}
						Orders{" "}
					</Link>
					<Link to="/cart" className="nav-link">
						{" "}
						<i className="fas fa-shopping-cart"></i>{" "}
					</Link>
					<Link to="/" onClick={logout} className="nav-link ">
						{" "}
						Logout{" "}
					</Link>
				</ul>
			</div>
		);
	}

	function navbarLogoutUser() {
		return (
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav ml-auto">
					<NavLink to="/login" className="nav-link">
						Login
					</NavLink>
					<NavLink to="/signup" className="nav-link">
						Sign In
					</NavLink>
				</ul>
			</div>
		);
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<NavLink exact to="/" className="navbar-brand p-1">
					Garage Sale
				</NavLink>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				{currentUser ? navbarLoginUser() : navbarLogoutUser()}
			</div>
		</nav>
	);
}

export default NavBar;
