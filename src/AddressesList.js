import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import GarageSaleApi from "./api";
import CurrentUserContext from "./CurrentUserContext";
import AddressCard from "./AddressCard";
import AddNewAddressForm from "./AddNewAddressForm";
import useFetch from "./hooks/useFetch";
import AlertMessages from "./AlertMessages";

function AddressesList() {
	const currentUser = useContext(CurrentUserContext).currentUser;
	const userId = currentUser ? currentUser.id : null;

	const { response, error, isLoading } = useFetch(GarageSaleApi.getAllUserAddresess, userId);
	const [addresses, setAddresses] = useState([]);
	const [toggleAddAddressBtn, setToggleAddAddressBtn] = useState(false);

	useEffect(() => {
		setAddresses(response);
	}, [response]);

	function toggleBtn() {
		setToggleAddAddressBtn(!toggleAddAddressBtn);
	}

	function userIsLoggedIn() {
		if (isLoading) {
			return <div> Loading ...</div>;
		}

		if (error) {
			return <div> Sorry, something went wrong. </div>;
		}

		return (
			<div>
				<div className="pb-5">
					<div className="garage-sale-head">
						<h1> ADDRESS </h1>
						<button className="btn btn-primary m-3" onClick={toggleBtn}>
							<i className="fas fa-plus"></i> ADDRESS
						</button>
					</div>
				</div>
				<div>
					<AlertMessages />
				</div>
				{toggleAddAddressBtn ? <AddNewAddressForm setAddresses={setAddresses} /> : null}
				{addresses.length === 0 && !toggleAddAddressBtn ? (
					<div>
						<p className="lead"> You haven't added an address yet. Please, click at the button above to do it. </p>
					</div>
				) : null}
				{addresses.map((ad) => (
					<AddressCard address={ad} setAddresses={setAddresses} />
				))}
			</div>
		);
	}

	return <div>{currentUser ? userIsLoggedIn() : <Redirect to="/" />}</div>;
}

export default AddressesList;
