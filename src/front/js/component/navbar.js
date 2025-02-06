import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
					<span className="navbar-brand mb-0 h1">JWT BCrypt</span>
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Ir a Home</span>
				</Link>
			</div>
		</nav>
	);
};
