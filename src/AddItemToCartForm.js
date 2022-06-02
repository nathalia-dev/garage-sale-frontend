import React, { useContext } from "react";
import useFields from "./hooks/useFields";
import CurrentUserContext from "./CurrentUserContext";
import GarageSaleApi from "./api";
import AlertMessagesContext from "./AlertMessagesContext";
import { v4 as uuidv4 } from "uuid";

function AddItemToCart({ product }) {
	const INITIAL_STATE = { quantity: 1 };
	const [formData, handleChange, resetFormData] = useFields(INITIAL_STATE);
	const currentUser = useContext(CurrentUserContext).currentUser;
	const { alertMessages, setAlertMessages } = useContext(AlertMessagesContext);

	async function handleSubmit(e) {
		e.preventDefault();
		formData.userId = currentUser.id;
		formData.productId = product.id;
		formData.quantity = parseInt(formData.quantity);
		const res = await GarageSaleApi.addItemIntoCart(formData);
		if (Array.isArray(res)) {
			alert(res);
		} else {
			setAlertMessages((messages) => [{ msg: "Item added to your cart.", type: "warning", id: uuidv4() }, ...messages]);
			resetFormData();
		}
	}

	return (
		<form onSubmit={handleSubmit} encType="multipart/form-data">
			<div className="d-flex justify-content-center">
				<input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="form-control text-center me-3" id="inputQuantity" style={{ maxWidth: "5rem" }} />
				<button className="btn btn-warning flex-shrink-0">
					<i className="fas fa-cart-plus"></i>
				</button>
			</div>
		</form>
	);
}

export default AddItemToCart;
