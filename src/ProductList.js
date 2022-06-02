import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import GarageSaleApi from "./api";
import CurrentUserContext from "./CurrentUserContext";
import ProductCard from "./ProductCard";
import AddNewProductForm from "./AddNewProductForm";
import useFields from "./hooks/useFields";
import AlertMessages from "./AlertMessages";

function ProductList() {
	const currentUser = useContext(CurrentUserContext).currentUser;
	const [formData, handleChange, resetFormData] = useFields({ productName: "", userId: "" });
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);
	const [toggleNewProductForm, SetToggleNewProductForm] = useState(false);

	const fetchData = async () => {
		try {
			const res = await GarageSaleApi.getAllProducts(formData);
			setProducts(res);
		} catch (error) {
			setError(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	function handleClickAddProductForm() {
		SetToggleNewProductForm(!toggleNewProductForm);
	}

	async function handleClickSearchForm() {
		formData.userId = currentUser.id;
		fetchData(formData);
		formData.userId = "";
	}

	async function handleSubmit(e) {
		e.preventDefault();
		resetFormData();
		fetchData(formData);
	}

	function isUserLoggedIn() {
		if (error) {
			return <div> Sorry, something went wrong. </div>;
		}
		return (
			<div>
				<div className="garage-sale-head">
					<h1> GARAGE SALE </h1>
					<form className="form-inline justify-content-center" onSubmit={handleSubmit}>
						<input type="text" name="productName" placeholder="Search a product" value={formData.productName} onChange={handleChange} className="form-control w-50"></input>
						<button className="btn btn-primary m-3">
							<i className="fas fa-search"></i>
						</button>
					</form>
					<button className="btn btn-primary m-3" onClick={handleClickSearchForm}>
						MY PRODUCTS
					</button>
					<button className="btn btn-primary m-3" onClick={handleClickAddProductForm}>
						<i className="fas fa-plus"></i> PRODUCT
					</button>
				</div>
				<div>
					<AlertMessages />
				</div>
				<div>
					{toggleNewProductForm ? (
						<div>
							<AddNewProductForm setProducts={setProducts} SetToggleNewProductForm={SetToggleNewProductForm} />
							<hr />
						</div>
					) : null}
				</div>
				<section className="py-5">
					<div className="container px-4 px-lg-5 mt-5">
						<div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">{products.map((prod) => (prod.quantity > 0 || prod.userId === currentUser.id ? <ProductCard product={prod} setProducts={setProducts} /> : null))}</div>
					</div>
				</section>
			</div>
		);
	}

	return <div>{currentUser ? isUserLoggedIn() : <Redirect to="/" />}</div>;
}

export default ProductList;
