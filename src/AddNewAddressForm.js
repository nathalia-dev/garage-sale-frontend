import React, { useState, useContext } from "react";
import useFields from "./hooks/useFields";
import { useHistory } from "react-router-dom";
import CurrentUserContext from "./CurrentUserContext";
import GarageSaleApi from "./api";

function AddNewAddressForm({ setAddresses }) {
	const INITIAL_STATE = { address: "", city: "", state: "", zipcode: "", isDefault: false };
	const [formData, handleChange, resetFormData] = useFields(INITIAL_STATE);
	const history = useHistory();
	const currentUser = useContext(CurrentUserContext).currentUser;
	const [selectedFile, setSelectedFile] = useState(null);

	const handleRadioInput = (e) => {
		setSelectedFile(e.target.value === "true");
	};

	const updateAddresses = (newAddress) => {
		setAddresses((addresses) => {
			const listOfAddresses = addresses.map((address) => {
				if (newAddress.isDefault) {
					address.isDefault = false;
				}
				return address;
			});

			return [newAddress, ...listOfAddresses];
		});
	};

	async function handleSubmit(e) {
		e.preventDefault();
		formData.userId = currentUser.id;
		formData.isDefault = selectedFile;

		const res = await GarageSaleApi.createAddress(formData);

		if (Array.isArray(res)) {
			alert(res);
		} else {
			updateAddresses(res);
			resetFormData();
			history.push("/address");
		}
	}

	return (
		<div className="container mt-3">
			<h1 className="display-5 my-3"> Add New Address </h1>
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<input type="text" name="address" value={formData.address} placeholder="Address" onChange={handleChange} className="form-control my-1"></input>
				<input type="text" name="city" value={formData.city} placeholder="City" onChange={handleChange} className="form-control my-1"></input>
				<input type="text" name="state" value={formData.state} placeholder="State" onChange={handleChange} className="form-control my-1"></input>
				<input type="text" name="zipcode" value={formData.zipcode} placeholder="Zipcode" onChange={handleChange} className="form-control my-1"></input>
				<div className="row">
					<div className="col">
						<p className="d-inline">Default address? </p>
						<input className="px-2" type="radio" id="true" name="isDefault" value={true} checked={selectedFile === true} onChange={handleRadioInput}></input>
						<label className="px-2" htmlFor="true">
							yes
						</label>
						<input className="px-2" type="radio" id="false" name="isDefault" value={false} checked={selectedFile === false} onChange={handleRadioInput}></input>
						<label className="px-2" htmlFor="false">
							no
						</label>
					</div>
				</div>
				<button className="btn btn-primary my-3">SAVE</button>
			</form>
		</div>
	);
}

export default AddNewAddressForm;
