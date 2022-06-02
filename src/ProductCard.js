import React, { useContext } from "react";
import GarageSaleApi from "./api";
import { NavLink } from "react-router-dom";
import CurrentUserContext from "./CurrentUserContext";
import AddItemToCartForm from "./AddItemToCartForm";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

function ProductCard({ product, setProducts }) {
	const currentUser = useContext(CurrentUserContext).currentUser;

	function deleteProduct(productId) {
		setProducts((products) => products.filter((prod) => prod.id !== productId));
	}

	async function handleDeleteProduct() {
		const res = await GarageSaleApi.deleteProduct(product.id);
		if (Array.isArray(res)) {
			alert(res);
		} else {
			deleteProduct(product.id);
		}
	}

	return (
		<div className="col mb-5">
			<div className="card h-100">
				<a href={`/products/${product.id}`}>{product.photos.length > 0 ? <img className="card-img-top" id="cardImage" src={`${BASE_URL}/images/${product.photos[0].path}`} /> : <img className="card-img-top" id="cardImage" src={`${BASE_URL}/images/noImage.jpeg`} />}</a>
				<NavLink to={`products/${product.id}`}>
					<div className="card-body p-4">
						<div className="text-center">
							<h5 className="fw-bolder">{product.productName.toUpperCase()}</h5>
							<div className="d-flex justify-content-center small text-info mb-2">
								{product.city} - {product.state} {product.zipcode}
							</div>
							{`$${product.price}`}
						</div>
					</div>
				</NavLink>

				<div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
					{product.userId === currentUser.id ? (
						<div className="text-center">
							<button className="btn btn-danger" onClick={handleDeleteProduct}>
								<i className="fas fa-trash-alt"></i>
							</button>
						</div>
					) : (
						<div className="text-center">
							<AddItemToCartForm product={product} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default ProductCard;
