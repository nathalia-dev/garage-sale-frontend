import React, { useContext, useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import GarageSaleApi from "./api";
import CurrentUserContext from "./CurrentUserContext";
import useFetch from "./hooks/useFetch";
import "./Checkout.css";

function Checkout() {
	const currentUser = useContext(CurrentUserContext).currentUser;
	const { response, error, isLoading } = useFetch(GarageSaleApi.getCartItems);
	const [cartItems, setCartItems] = useState([]);
	const history = useHistory();

	useEffect(() => {
		setCartItems(response);
	}, [response]);

	function sumCartTotal(cartItems) {
		let total = 0;
		for (let item of cartItems) {
			let value = Number(item.price);
			let qty = Number(item.quantityRequested);
			total += value * qty;
		}
		return total.toFixed(2);
	}

	async function doCheckout() {
		const resCheckout = await GarageSaleApi.checkout(cartItems);
		if (Array.isArray(resCheckout)) {
			alert(resCheckout);
		} else {
			history.push("/orders");
		}
	}

	function userIsLoggedIn() {
		if (isLoading) {
			return <div> Loading ...</div>;
		}

		if (error) {
			return <div> Sorry, something went wrong. </div>;
		}

		return (
			<div className="page payment-page text-left">
				<section className="payment-form dark">
					<div className="container">
						<div className="block-heading">
							<h2>Checkout</h2>
						</div>
						<form>
							<div className="products">
								<h3 className="title">Checkout</h3>
								{cartItems.map((item) => (
									<div className="item">
										<span className="price">${(item.price * item.quantityRequested).toFixed(2)}</span>
										<p className="item-name">{item.productName}</p>
										<p className="item-description">Qty: {item.quantityRequested}</p>
										<p className="item-description">
											{item.city} - {item.state} {item.zipcode}
										</p>
									</div>
								))}
								<div className="total">
									Total<span className="price">${sumCartTotal(cartItems)}</span>
								</div>
							</div>
							<div className="form-group col-sm-12">
								<button type="button" className="btn btn-primary btn-block" onClick={doCheckout}>
									Buy
								</button>
							</div>
						</form>
					</div>
				</section>
			</div>
		);
	}

	return <div>{currentUser ? userIsLoggedIn() : <Redirect to="/" />}</div>;
}

export default Checkout;
