import React, { useContext } from "react";
import CurrentUserContext from "./CurrentUserContext";
import { Redirect } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

function Profile() {
	const currentUser = useContext(CurrentUserContext).currentUser;

	function userIsLoggedIn() {
		return (
			<section className="py-5">
				<div className="container px-4 px-lg-5 my-5">
					<div className="row gx-4 gx-lg-5 align-items-center">
						<div className="col-md-6">
							<img className="card-img-top mb-5 mb-md-0" src={`${BASE_URL}/images/${currentUser.photo}`} alt="..." />
						</div>
						<div className="col-md-6">
							<h1 className="display-5 fw-bolder">
								{currentUser.firstName.toUpperCase()} {currentUser.lastName.toUpperCase()}
							</h1>
							<div className="fs-5 mb-5">
								<p className="lead">{currentUser.email}</p>
							</div>
							<div className="d-block mt-3 justify-content-center">
								<a href="/address" className="btn btn-primary mx-2">
									{" "}
									ADDRESS{" "}
								</a>
								<a href="/profile/edit" className="btn btn-primary">
									{" "}
									<i className="fas fa-edit"></i> PROFILE
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}

	return <div>{currentUser ? userIsLoggedIn() : <Redirect to="/" />}</div>;
}

export default Profile;
