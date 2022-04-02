import React, { useState, useContext} from "react";
import GarageSaleApi from "./api";
import { NavLink } from "react-router-dom";
import CurrentUserContext from "./CurrentUserContext";

function ProductCard({product, setProducts}) {
    const currentUser = useContext(CurrentUserContext).currentUser


    function deleteAddress (productId) {
        setProducts((products) => products.filter((prod) => prod.id !== productId))
    }


    async function handleDeleteAddress() {
        const res = await GarageSaleApi.deleteProduct(product.id);
        if (Array.isArray(res)) {
			alert(res)
		} else {
            deleteAddress(product.id)
        }
    }

    return (
        <div className="d-flex justify-content-center">
        <div className="card m-3" style={{ width: "35rem" }}>
            <div className="card-body">
                <NavLink  to={`products/${product.id}`}>
                    <div>
                            <p>{product.productName}</p>
                            <p>Price: {product.price}</p>
                            <p>Quantity: {product.quantity}</p>
                    </div>
                </NavLink>
                {product.userId === currentUser.id? 
                            <div>
                                <button className="btn btn-outline-danger" onClick={handleDeleteAddress}> DELETE </button>
                            </div> 
                            : null}

            </div>
        </div>
    </div>
    )
}

export default ProductCard