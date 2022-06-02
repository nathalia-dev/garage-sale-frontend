import React, { useState, useEffect, useContext } from "react";
import { useParams, Redirect, useHistory } from "react-router-dom";
import GarageSaleApi from "./api";
import CurrentUserContext from "./CurrentUserContext";
import EditProductForm from "./EditProductForm";
import AddProductPhotoForm from "./AddProductPhotoForm";
import AddItemToCart from "./AddItemToCartForm";
import AlertMessages from "./AlertMessages";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

function ProductDetails() {
	const { productId } = useParams();
	const history = useHistory();
	const currentUser = useContext(CurrentUserContext).currentUser;
	const [product, setProduct] = useState([]);
	const [toggleEditButton, setToggleEditButton] = useState(false);
	const [toggleAddPhotoButton, setToggleAddPhotoButton] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [mainPhoto, setMainPhoto] = useState(null);
	console.log(product, currentUser);
	function handleEditProduct() {
		setToggleEditButton(!toggleEditButton);
	}

	function handleAddProductPhoto() {
		setToggleAddPhotoButton(!toggleAddPhotoButton);
	}

	async function handleDeletePhoto(photo) {
		const res = await GarageSaleApi.deleteProductPhoto(photo);
		setProduct((product) => {
			product.photos = product.photos.filter((img) => img.id !== photo.id);
			return product;
		});
		fetchData();
	}

	async function handleDeleteProduct() {
		const res = await GarageSaleApi.deleteProduct(product.id);
		console.log("delete product res", res);
		if (Array.isArray(res)) {
			alert(res);
		} else {
			history.push(`/products/`);
		}
	}

	function changeMainPhoto(path) {
		setMainPhoto(path);
	}

	async function fetchData() {
		const res = await GarageSaleApi.getProduct(Number(productId));
		if (Array.isArray(res)) {
			history.push(`/products/`);
		} else {
			setProduct(res);
			if (res.photos.length > 0) {
				setMainPhoto(res.photos[0].path);
			}
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	function userIsLoggedIn() {
		if (isLoading) {
			return <div>IS LOADING...</div>;
		}

		if (product.quantity === 0 && product.userId !== currentUser.id) {
			return (
				<div>
					<Redirect to="/" />
				</div>
			);
		}

		return (
			<div>
				<AlertMessages />
				<section className="py-5">
					<div className="container px-4 px-lg-5 my-5">
						<div className="row gx-4 gx-lg-5 align-items-center">
							<div className="col-md-6">{mainPhoto !== null ? <img className="card-img-top mb-5 mb-md-0" src={`${BASE_URL}/images/${mainPhoto}`} alt="..." /> : <img className="card-img-top mb-5 mb-md-0" src={`${BASE_URL}/images/noImage.jpeg`} alt="..." />}</div>
							<div className="col-md-6">
								<h1 className="display-5 fw-bolder">{product.productName.toUpperCase()}</h1>
								<div className="fs-5 mb-5">
									<p className="lead">{product.description}</p>
									<span className="text-decoration-line-through">
										${product.price} - Qty Available: {product.quantity}
									</span>
								</div>

								<div className="small text-info mb-1">
									{" "}
									{product.city} - {product.state} {product.zipcode}
								</div>
								{currentUser.id === product.userId ? (
									<div className="d-block mt-3 justify-content-center">
										<button onClick={handleEditProduct} className="btn btn-primary mx-1">
											<i className="fas fa-edit"></i> EDIT
										</button>
										<button onClick={handleAddProductPhoto} className="btn btn-primary mx-1">
											<i className="fas fa-plus"></i> PHOTO
										</button>
										<button className="btn btn-danger" onClick={handleDeleteProduct}>
											<i className="fas fa-trash-alt"></i>
										</button>
										<div className="d-flex mt-3 justify-content-center">{toggleEditButton ? <EditProductForm product={product} changeToggleEditButton={setToggleEditButton} setProduct={setProduct} /> : null}</div>
										<div className="d-flex mt-3 justify-content-center">{toggleAddPhotoButton ? <AddProductPhotoForm product={product} changeToggleAddPhotoButton={setToggleAddPhotoButton} setProduct={setProduct} setMainPhoto={setMainPhoto} /> : null}</div>
									</div>
								) : (
									<div className="d-flex mt-3 justify-content-center">
										<AddItemToCart product={product} />
									</div>
								)}
							</div>
						</div>
					</div>
				</section>
				{mainPhoto !== null ? (
					<section className="py-5 bg-light">
						<div className="container px-4 px-lg-5 mt-5">
							<h2 className="fw-bolder mb-3">All Product Photos</h2>
							<div className="small mb-2"> Click in another photo</div>
							<div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
								{product.photos.map((photo) => (
									<div className="col mb-5">
										<div className="card h-100">
											<a href={"#"}>
												<img className="card-img-top" id="cardImage" onClick={() => changeMainPhoto(photo.path)} src={`${BASE_URL}/images/${photo.path}`} alt="..." />
											</a>
											{product.userId === currentUser.id ? (
												<div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
													<button onClick={() => handleDeletePhoto(photo)} className="btn btn-outline-danger mt-auto">
														DELETE
													</button>
												</div>
											) : null}
										</div>
									</div>
								))}
							</div>
						</div>
					</section>
				) : null}
			</div>
		);
	}

	return <div>{currentUser ? userIsLoggedIn() : <Redirect to="/" />}</div>;
}

export default ProductDetails;
