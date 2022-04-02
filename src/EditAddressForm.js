import React, { useContext, useState } from "react";
import useFields from "./hooks/useFields";
import CurrentUserContext from "./CurrentUserContext";
import GarageSaleApi from "./api";
import { Redirect, useHistory } from "react-router";

function EditAddressForm({ address, changeToggleEditButton, setAddresses }) {
	const currentUser = useContext(CurrentUserContext).currentUser;
	const [formData, handleChange, resetFormData] = useFields({ address: address.address, city: address.city, zipcode: String(address.zipcode), state: address.state, isDefault: address.isDefault });
	const [selectedFile, setSelectedFile] = useState(address.isDefault);
	const history = useHistory();

	const updateAddresses = (updatedAddress) => {
		setAddresses((addresses) => {
			return addresses.map((address) => {
				if (updatedAddress.isDefault && address.id !== updatedAddress.id) {
				address.isDefault = false;

				}
				if(address.id === updatedAddress.id) {
				for (let prop in address) {
					address[prop] = updatedAddress[prop]

				}
				}
				return address
			})
		})
	}

	const handleRadioInput = (e) => {
		setSelectedFile(e.target.value === "true");
	};


	async function handleSubmit(e) {
		e.preventDefault();
		formData.isDefault = selectedFile;
		const resUpdate = await GarageSaleApi.updateAddress(formData, address.id);
		if (Array.isArray(resUpdate)) {
			resetFormData();
			changeToggleEditButton(false)
			alert(resUpdate);
		} else {
			resetFormData();
			updateAddresses(resUpdate)
			changeToggleEditButton(false)
			history.push("/address");
		}
	}

	function userIsLoggedIn() {
		return (
			<div className="container">
				<hr />
				<h5 className="display-6 my-3"> EDIT </h5>
				<form onSubmit={handleSubmit}>
					<div className="row mb-3">
						<label htmlFor="address" className="col-sm-2 col-form-label">
							Address
						</label>
						<div className="col-sm-10">
							<input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="form-control"></input>
						</div>
					</div>

					<div className="row mb-3">
						<label htmlFor="city" className="col-sm-2 col-form-label">
							City
						</label>
						<div className="col-sm-10">
							<input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="form-control"></input>
						</div>
					</div>

					<div className="row mb-3">
						<label htmlFor="state" className="col-sm-2 col-form-label">
							State
						</label>
						<div className="col-sm-10">
							<input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="form-control"></input>
						</div>
					</div>

					<div className="row mb-3">
						<label htmlFor="zipcode" className="col-sm-2 col-form-label">
							Zipcode
						</label>
						<div className="col-sm-10">
							<input type="text" id="zipcode" name="zipcode" value={formData.zipcode} onChange={handleChange} className="form-control"></input>
						</div>
					</div>

					<div className="col">
						<p className="d-inline">Default address? </p>
						<input className="px-2" type="radio" id="true" name="isDefault" value={true} checked={selectedFile === true} onChange={handleRadioInput}></input>
						<label className="px-2" for="true">
							yes
						</label>
						<input className="px-2" type="radio" id="false" name="isDefault" value={false} checked={selectedFile === false} onChange={handleRadioInput}></input>
						<label className="px-2" for="false">
							no
						</label>
					</div>

					<button className="btn btn-primary my-3"> SAVE </button>
				</form>
			</div>
		);
	}

	return <div>{currentUser.id === address.userId ? userIsLoggedIn() : <Redirect to="/address" />}</div>;
}

export default EditAddressForm;
