import React, { useContext, useState, useEffect } from "react";
import { Redirect, NavLink } from "react-router-dom";
import GarageSaleApi from "./api";
import CurrentUserContext from "./CurrentUserContext";
import OrdersPurchasesCard from "./OrdersPurchasesCard";
import OrdersSalesCard from "./OrdersSalesCard";

function Orders() {
	const currentUser = useContext(CurrentUserContext).currentUser;
	const [purchases, setPurchases] = useState([]);
	const [sales, setSales] = useState([]);
	const [isLoading, setIsloading] = useState(true);
	const [error, setError] = useState(null);
	const [orderSold, setOrderSold] = useState(false);
	const [orderBought, setOrderBought] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const resPurchases = await GarageSaleApi.getPurchases();
				const resSales = await GarageSaleApi.getSales();
				setPurchases(resPurchases);
				setSales(resSales);
			} catch (error) {
				setError(error);
			}
			setIsloading(false);
		}
		fetchData();
	}, []);

	function toggleBtnOrderSold() {
		setOrderSold(!orderSold);
		if (orderBought) {
			setOrderBought(false);
		}
	}

	function toggleBtnOrderBought() {
		setOrderBought(!orderBought);
		if (orderSold) {
			setOrderSold(false);
		}
	}

	if (isLoading) {
		return <div>Is loading...</div>;
	}

	if (error) {
		return <div>Sorry, something went wrong. Please, try again later.</div>;
	}

	function userIsLoggedIn() {
		return (
			<div className="pb-5">
				<div className="garage-sale-head">
					<h1> ORDERS </h1>

					<button className="btn btn-primary m-3" onClick={toggleBtnOrderBought}>
						PURCHASES
					</button>
					<button className="btn btn-primary m-3" onClick={toggleBtnOrderSold}>
						SALES
					</button>
				</div>
				<div className="mt-5">
					{purchases.length > 0 && orderBought ? (
						<div>
							<h1 className="my-5">PURCHASES</h1>
							{purchases.map((e) => (
								<OrdersPurchasesCard purchase={e} />
							))}{" "}
						</div>
					) : null}
					{sales.length > 0 && orderSold ? (
						<div>
							<h1 className="my-5">SALES</h1>{" "}
							{sales.map((e) => (
								<OrdersSalesCard sale={e} />
							))}{" "}
						</div>
					) : null}
					{purchases.length < 1 && sales.length < 1 ? (
						<div className="lead">
							<p>You haven't shopping or sold yet. Click below to start your experience.</p>
							<NavLink to="/products">
								<button className="btn btn-primary mt-3">PRODUCTS</button>
							</NavLink>
						</div>
					) : null}
				</div>
			</div>
		);
	}

	return <div>{currentUser ? userIsLoggedIn() : <Redirect to="/" />}</div>;
}

export default Orders;
