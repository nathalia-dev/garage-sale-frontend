import React, { useContext } from "react";
import useFields from "./hooks/useFields";
import CurrentUserContext from "./CurrentUserContext";
import GarageSaleApi from "./api";
import { Redirect, useHistory } from "react-router";

function EditProductForm({ product, changeToggleEditButton, setProduct }) {
	const currentUser = useContext(CurrentUserContext).currentUser;
	const [formData, handleChange, resetFormData] = useFields({ productName: product.productName, price: product.price, quantity: product.quantity, description: product.description });
	const history = useHistory();

	const updateProduct = (editedProduct) => {
		setProduct((product) => {
			for (let prop in editedProduct) {
				product[prop] = editedProduct[prop];
			}
			return product;
		});
	};

	async function handleSubmit(e) {
		e.preventDefault();
		formData.quantity = parseInt(formData.quantity);
		formData.price = Number(formData.price);
		const resUpdate = await GarageSaleApi.updateProduct(formData, product.id);
		if (Array.isArray(resUpdate)) {
			resetFormData();
			changeToggleEditButton(false);
			alert(resUpdate);
		} else {
			resetFormData();
			updateProduct(resUpdate);
			changeToggleEditButton(false);
			history.push(`/products/${product.id}`);
		}
	}

	function userIsLoggedIn() {
		return (
			<div className="container">
				<hr />
				<h5 className="display-6 my-3"> EDIT </h5>
				<form onSubmit={handleSubmit}>
					<div className="row mb-3">
						<label htmlFor="productName" className="col-sm-3 col-form-label ">
							Product's Name
						</label>
						<div className="col-sm-9">
							<input type="text" id="productName" name="productName" value={formData.productName} onChange={handleChange} className="form-control"></input>
						</div>
					</div>

					<div className="row mb-3">
						<label htmlFor="price" className="col-sm-3 col-form-label">
							Price
						</label>
						<div className="col-sm-9">
							<input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="form-control"></input>
						</div>
					</div>

					<div className="row mb-3">
						<label htmlFor="quantity" className="col-sm-3 col-form-label">
							Quantity
						</label>
						<div className="col-sm-9">
							<input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} className="form-control"></input>
						</div>
					</div>

					<div className="row mb-3">
						<label htmlFor="description" className="col-sm-3 col-form-label">
							Description
						</label>
						<div className="col-sm-9">
							<input type="text" id="description" name="description" value={formData.description} onChange={handleChange} className="form-control"></input>
						</div>
					</div>

					<button className="btn btn-primary my-3"> SAVE </button>
				</form>
			</div>
		);
	}

	return <div>{currentUser.id === product.userId ? userIsLoggedIn() : <Redirect to={`products/${product.id}`} />}</div>;
}

export default EditProductForm;
