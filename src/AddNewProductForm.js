import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import CurrentUserContext from "./CurrentUserContext";
import GarageSaleApi from "./api";
import useFields from "./hooks/useFields";

function AddNewProductForm({ setProducts, SetToggleNewProductForm }) {
	const INITIAL_STATE = { productName: "", price: "", quantity: "", description: "" };
	const [formData, handleChange, resetFormData] = useFields(INITIAL_STATE);
	const history = useHistory();
	const currentUser = useContext(CurrentUserContext).currentUser;

	const updateProducts = (newProduct) => {
		setProducts((products) => [newProduct, ...products]);
	};

	async function handleSubmit(e) {
		e.preventDefault();
		formData.userId = currentUser.id;
		formData.quantity = parseInt(formData.quantity);
		formData.price = Number(formData.price);
		const res = await GarageSaleApi.createProduct(formData);

		if (Array.isArray(res)) {
			alert(res);
		} else {
			updateProducts(res);
			console.log(res);
			SetToggleNewProductForm((val) => !val);
			resetFormData();
			history.push(`/products/${res.id}`);
		}
	}

	return (
		<div className="container mt-3">
			<h1 className="display-5 my-3"> Add New Product </h1>
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<input type="text" name="productName" value={formData.productName} placeholder="Product's Name" onChange={handleChange} className="form-control my-1"></input>
				<input type="number" name="price" value={formData.price} placeholder="Price" onChange={handleChange} className="form-control my-1" step="0.01" min="0"></input>
				<input type="number" name="quantity" value={formData.quantity} placeholder="Quantity" onChange={handleChange} className="form-control my-1"></input>
				<input type="text" name="description" value={formData.description} placeholder="Description" onChange={handleChange} className="form-control my-1"></input>
				<button className="btn btn-primary my-3">SAVE</button>
			</form>
		</div>
	);
}

export default AddNewProductForm;
