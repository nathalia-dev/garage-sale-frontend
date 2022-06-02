import React, { useState, useContext, useEffect } from "react";
import GarageSaleApi from "./api";
import EditCartItemForm from "./EditCartItemForm";
import AlertMessagesContext from "./AlertMessagesContext";
import { v4 as uuidv4 } from "uuid";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

function ItemCartCard({ item, setCartItems }) {
	const [toggleEditButton, setToggleEditButton] = useState(false);
	const { alertMessages, setAlertMessages } = useContext(AlertMessagesContext);
	const [productImage, setProductImage] = useState(null);

	const deleteCartItem = (cartItemId) => {
		setCartItems((items) => items.filter((it) => it.id !== cartItemId));
		setAlertMessages((messages) => [{ msg: "Item deleted from your cart.", type: "warning", id: uuidv4() }, ...messages]);
	};

	function handleEditCartItem() {
		setToggleEditButton(!toggleEditButton);
	}

	async function handleDeleteCartItem() {
		const res = await GarageSaleApi.deleteCartItem(item.id);
		if (Array.isArray(res)) {
			alert(res);
		} else {
			deleteCartItem(item.id);
		}
	}

	useEffect(() => {
		async function fetchData() {
			const product = await GarageSaleApi.getProduct(item.productId);
			if (product.photos.length > 0) {
				setProductImage(product.photos[0].path);
			}
		}

		fetchData();
	}, []);

	return (
		<div>
			<div className="row border-top border-bottom">
				<div className="row main align-items-center">
					<div className="col-2">{productImage ? <img className="img-fluid" src={`${BASE_URL}/images/${productImage}`} /> : <img className="img-fluid" src={`${BASE_URL}/images/noImage.jpeg`} />}</div>
					<div className="col">
						<div className="row text-muted">Product</div>
						<div className="row">{item.productName} </div>
					</div>
					<div className="col">
						<div className="d-flex justify-content-start">
							<a href="#" className="w-25">
								{item.quantityRequested}
							</a>
							<a href="#">
								<i className="fas fa-edit" onClick={handleEditCartItem}></i>
							</a>
						</div>
					</div>
					<div className="col">
						<div className="row">
							{item.city} - {item.state}
						</div>
					</div>
					<div className="col" onClick={handleDeleteCartItem}>
						$ {item.price} <span className="close">&#10005;</span>
					</div>
				</div>
			</div>
			{toggleEditButton ? <EditCartItemForm item={item} changeToggleEditButton={setToggleEditButton} setCartItems={setCartItems} /> : null}
		</div>
	);
}

export default ItemCartCard;
