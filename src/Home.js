import React, { useContext } from "react";
import { NavLink, Redirect } from "react-router-dom";
import CurrentUserContext from "./CurrentUserContext";
import "./Home.css";

function Home() {
	const currentUser = useContext(CurrentUserContext).currentUser;

	function notLogginUser() {
		return (
			<div>
				<div className="lading-page-head">
					<h1> GARAGE SALE </h1>
					<NavLink to="/signup">
						<button className="btn btn-primary m-3 mb-5">SIGN UP</button>
					</NavLink>
					<NavLink to="/login">
						<button className="btn btn-primary m-3 mb-5">LOGIN</button>
					</NavLink>
				</div>
				<section className="features-icons bg-light text-center">
					<div className="container showcase-text">
						<p className="lead">
							{" "}
							<span className="contrast">Garage Sale</span> is a full stack e-commerce application where the user can buy and sell products. The project were built to consolidate the knowledge about the Tech Stak below.{" "}
						</p>
					</div>
				</section>
				<section className="features-icons bg-light text-center">
					<div className="container">
						<div className="row">
							<div className="col-lg-4 mb-3">
								<div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
									<div className="features-icons-icon d-flex justify-content-center mb-2">
										<img src={process.env.PUBLIC_URL + "/logo192.png"}></img>
									</div>
									<h3>React</h3>
									<p className="lead mb-0">Project's frontend</p>
								</div>
							</div>
							<div className="col-lg-4 mb-3">
								<div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
									<div className="features-icons-icon d-flex justify-content-center mb-2">
										<img src={process.env.PUBLIC_URL + "/nodejs.png"}></img>
									</div>
									<h3>NodeJS</h3>
									<p className="lead mb-0">Project's backend</p>
								</div>
							</div>
							<div className="col-lg-4 mb-3">
								<div className="features-icons-item mx-auto mb-0 mb-lg-3">
									<div className="features-icons-icon d-flex justify-content-center mb-2">
										<img src={process.env.PUBLIC_URL + "/postgresql.png"}></img>
									</div>
									<h3>PostgreSQL</h3>
									<p className="lead mb-0">Project's database</p>
								</div>
							</div>
							<div className="col-lg-4 mb-3">
								<div className="features-icons-item mx-auto mb-0 mb-lg-3">
									<div className="features-icons-icon d-flex justify-content-center mb-2">
										<img src={process.env.PUBLIC_URL + "/javascript.png"}></img>
									</div>
									<h3>JavaScript</h3>
									<p className="lead mb-0">Project's programming language</p>
								</div>
							</div>
							<div className="col-lg-4 mb-3">
								<div className="features-icons-item mx-auto mb-0 mb-lg-3">
									<div className="features-icons-icon d-flex justify-content-center mb-2">
										<img src={process.env.PUBLIC_URL + "/aws.png"}></img>
									</div>
									<h3>Amazon Web Services</h3>
									<p className="lead mb-0">All project's photos are stored at S3 bucket from AWS.</p>
								</div>
							</div>
							<div className="col-lg-4 mb-3">
								<div className="features-icons-item mx-auto mb-0 mb-lg-3">
									<div className="features-icons-icon d-flex justify-content-center mb-2">
										<img src={process.env.PUBLIC_URL + "/bootstrap.png"}></img>
									</div>
									<h3>Bootstrap</h3>
									<p className="lead mb-0">Project's styles and design</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
	return <div>{currentUser ? <Redirect to="/products" /> : notLogginUser()}</div>;
}

export default Home;
