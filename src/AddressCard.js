import React, { useState, useContext } from "react";
import GarageSaleApi from "./api";
import EditAddressForm from "./EditAddressForm";
import AlertMessagesContext from "./AlertMessagesContext";
import { v4 as uuidv4 } from "uuid";

function AddressCard({ address, setAddresses }) {
	const { alertMessages, setAlertMessages } = useContext(AlertMessagesContext);
	const [toggleEditButton, setToggleEditButton] = useState(false);

	const deleteAddress = (addressId) => {
		setAddresses((addresses) => addresses.filter((ad) => ad.id !== addressId));
		setAlertMessages((messages) => [{ msg: "Address succesfully deleted.", type: "warning", id: uuidv4() }, ...messages]);
	};

	function handleEditAddress() {
		setToggleEditButton(!toggleEditButton);
	}

	async function handleDeleteAddress() {
		const res = await GarageSaleApi.deleteAddress(address.id);
		if (Array.isArray(res)) {
			alert(res);
		} else {
			deleteAddress(address.id);
		}
	}

	return (
		<div className="d-flex justify-content-center">
			<div className="card m-3" style={{ width: "35rem" }}>
				<div className="card-body">
					<div>
						<p>
							{address.address}, {address.city}-{address.state}
						</p>
						<p>Zipcode: {address.zipcode}</p>
						{address.isDefault ? (
							<p>
								<b> Default Address ✅ </b>
							</p>
						) : null}
						<button onClick={handleEditAddress} className="btn btn-primary mx-1">
							{" "}
							<i className="fas fa-edit"></i>{" "}
						</button>
						<button className="btn btn-danger" onClick={handleDeleteAddress}>
							{" "}
							<i className="fas fa-trash-alt"></i>{" "}
						</button>
						{toggleEditButton ? <EditAddressForm address={address} changeToggleEditButton={setToggleEditButton} setAddresses={setAddresses} /> : null}
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddressCard;
