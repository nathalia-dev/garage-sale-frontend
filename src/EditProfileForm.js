import React, { useContext, useState } from "react";
import useFields from "./hooks/useFields";
import CurrentUserContext from "./CurrentUserContext";
import GarageSaleApi from "./api";
import { Redirect, useHistory } from "react-router";

function EditProfileForm() {
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
	const [formData, handleChange, resetFormData] = useFields({ firstName: currentUser ? currentUser.firstName : "", lastName: currentUser ? currentUser.lastName : "" });
	const history = useHistory();
    const [selectedFile, setSelectedFile] = useState(null);

	const handleFileInput = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	async function handleSubmit(e) {
		e.preventDefault();
        formData.photo = selectedFile? selectedFile : currentUser.photo
		const res = await GarageSaleApi.updateUser(currentUser, formData);

		if (Array.isArray(res)) {
			alert(res);
		} else {
			setCurrentUser(await GarageSaleApi.getUser(currentUser.id));
			resetFormData();
			history.push("/profile");
		}
	}

	function userIsLoggedIn() {
		return (
			<div className="container">
				<h1 className="display-5 my-3"> Edit Your Profile </h1>
				<form onSubmit={handleSubmit}>
					<div className="row mb-3">
						<label className="col-sm-2 col-form-label"> Email </label>
						<div className="col-sm-10">
							<p className="form-control" id="profile-email">
								{" "}
								<strong>{currentUser.email}</strong>
							</p>
						</div>
					</div>

					<div className="row mb-3">
						<label htmlFor="firstName" className="col-sm-2 col-form-label">
							{" "}
							First Name{" "}
						</label>
						<div className="col-sm-10">
							<input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="form-control"></input>
						</div>
					</div>

					<div className="row mb-3">
						<label htmlFor="lastName" className="col-sm-2 col-form-label">
							Last Name
						</label>
						<div className="col-sm-10">
							<input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="form-control"></input>
						</div>
					</div>

					<div className="row mb-3">
						<label htmlFor="photo" className="col-sm-2 col-form-label">
							Photo
						</label>
						<div className="col-sm-10">
							<input type="file" id="photo" name="photo" onChange={handleFileInput} className="form-control"></input>
						</div>
					</div>

					<button className="btn btn-primary my-3"> SAVE </button>
				</form>
			</div>
		);
	}

	return <div>{currentUser ? userIsLoggedIn() : <Redirect to="/" />}</div>;
}

export default EditProfileForm;
