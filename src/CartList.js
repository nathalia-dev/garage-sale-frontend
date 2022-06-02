import "./CartList.css";
import React, { useContext, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import GarageSaleApi from "./api";
import CurrentUserContext from "./CurrentUserContext";
import ItemCartCard from "./ItemCartCard";
import useFetch from "./hooks/useFetch";
import AlertMessages from "./AlertMessages";

function CartList() {
	const currentUser = useContext(CurrentUserContext).currentUser;
	const { response, error, isLoading } = useFetch(GarageSaleApi.getCartItems);
	const [cartItems, setCartItems] = useState([]);

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

	function sumCartItems(cartItems) {
		let items = 0;
		for (let item of cartItems) {
			items += item.quantityRequested;
		}
		return items;
	}

	function userIsLoggedIn() {
		if (isLoading) {
			return <div> Loading ...</div>;
		}

		if (error) {
			return <div> Sorry, something went wrong. </div>;
		}
		return (
			<div className="cart-list">
				<AlertMessages />
				<div className="card mt-5">
					<div className="row">
						<div className="col-md-8 cart">
							<div className="title">
								<div className="row">
									<div className="col">
										<h4>
											<b>Shopping Cart</b>
										</h4>
									</div>
									<div className="col align-self-center text-right text-muted">{sumCartItems(cartItems)} ITEMS </div>
								</div>
							</div>
							{cartItems.map((item) => (
								<ItemCartCard item={item} setCartItems={setCartItems} />
							))}
						</div>
						<div className="col-md-4 summary">
							<div>
								<h5>
									<b>Summary</b>
								</h5>
							</div>
							<hr />
							<div className="row">
								<div className="col" style={{ paddingLeft: "0" }}>
									{sumCartItems(cartItems)} ITEMS
								</div>
								<div className="col text-right">$ {sumCartTotal(cartItems)}</div>
							</div>

							<div className="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
								<div className="col">TOTAL PRICE</div>
								<div className="col text-right">$ {sumCartTotal(cartItems)}</div>
							</div>
							{cartItems.length === 0 ? null : (
								<Link className="btn btn-primary" to="/checkout">
									{" "}
									CHECKOUT{" "}
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}

	return <div>{currentUser ? userIsLoggedIn() : <Redirect to="/" />}</div>;
}

export default CartList;
