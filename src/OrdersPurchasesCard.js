import React from "react";
import "./Orders.css";

function OrdersPurchasesCard({ purchase }) {
	return (
		<div className="row d-flex justify-content-center mt-3">
			<div className="col-sm-10 col-lg-8">
				<div className="card">
					<div className="card-header pb-0">
						<table className="table table-sm table-borderless text-left">
							<thead>
								<tr className="light-font">
									<th scope="col">ORDER ID </th>
									<th scope="col">ORDER DATE</th>
									<th scope="col">ORDER TOTAL</th>
									<th scope="col" className="text-right">
										TRANSACTION ID
									</th>
								</tr>
							</thead>

							<tbody>
								<tr className="light-font">
									<td>{purchase.id}</td>
									<td>{purchase.date.slice(0, 10)}</td>
									<td>$ {purchase.total}</td>
									<td className="text-right">{purchase.transactionId}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="card-body">
						<div className="card-text">
							<div>
								<div className="list-group">
									{purchase.products.map((prod, index) => {
										return (
											<div className="media flex-column flex-lg-row p-3">
												<div className="media-body order-2 order-lg-1">
													<h5 className="mt-0 font-weight-bold mb-2 text-left">{prod.name}</h5>
													<p className="order-info">
														SELLER: <span>{`${prod.sellerFirstName} ${prod.sellerLastName} - ${prod.sellerEmail}`}</span>
													</p>
													<p className="order-info">
														ADDRESS FOR PICKUP: <span>{`${prod.productAddress} - ${prod.productCity} - ${prod.productState} ${prod.productZipcode} `}</span>
													</p>
													<p className="order-info">
														QTY: <span>{`${prod.quantity}`}</span>
													</p>
													<p className="order-info">
														PRODUCT TOTAL: <span>$ {prod.total}</span>
													</p>
													<div className="d-flex align-items-center justify-content-between mt-1"></div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OrdersPurchasesCard;
