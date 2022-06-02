import React, { useContext } from "react";
import useFields from "./hooks/useFields";
import CurrentUserContext from "./CurrentUserContext";
import GarageSaleApi from "./api";
import { Redirect, useHistory } from "react-router";

function EditCartItemForm({ item, changeToggleEditButton, setCartItems }) {
	const currentUser = useContext(CurrentUserContext).currentUser;
	const [formData, handleChange, resetFormData] = useFields({ quantity: item.quantity });
	const history = useHistory();

	function userIsLoggedIn() {
		const updateCartItems = (updatedCartItem) => {
			setCartItems((items) => {
				return items.map((item) => {
					if (item.id === updatedCartItem.id) {
						for (let prop in items) {
							item[prop] = updatedCartItem[prop];
						}
					}
					return items;
				});
			});
		};

		async function handleSubmit(e) {
			e.preventDefault();
			//validation for quantity = 0
			if (formData.quantity < 1) {
				return alert("Quantity cannot be 0.");
			}
			//validation for quantity > quantityAvailable
			if (formData.quantity > item.quantityAvailable) {
				return alert(`There is only ${item.quantityAvailable} items available. Plase, change your item's quantity.`);
			}
			const resUpdate = await GarageSaleApi.updateCartItemQuantity(item.id, parseInt(formData.quantity));
			if (Array.isArray(resUpdate)) {
				resetFormData();
				changeToggleEditButton(false);
				alert(resUpdate);
			} else {
				resetFormData();
				updateCartItems(resUpdate);
				changeToggleEditButton(false);
				history.push("/cart");
			}
		}

		return (
			<div className="container">
				<form onSubmit={handleSubmit}>
					<div className="row align-items-center">
						<label htmlFor="quantity" className="col-xs-3 col-form-label">
							Quantity
						</label>
						<div className="col-3 w-25">
							<input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} className="form-control mb-0"></input>
						</div>
						<div className="col-1">
							<button className="close">
								{" "}
								<i className="fas fa-sync refresh"></i>{" "}
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}

	return <div>{currentUser.id === item.userId ? userIsLoggedIn() : <Redirect to="/" />}</div>;
}

export default EditCartItemForm;
