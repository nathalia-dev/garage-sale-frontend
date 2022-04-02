import React, {useContext, useState } from "react";
import { Redirect } from "react-router-dom"
import GarageSaleApi from "./api";
import CurrentUserContext from "./CurrentUserContext";
import ProductCard from "./ProductCard"
import AddNewProductForm from "./AddNewProductForm"
import useFields from "./hooks/useFields";

function ProductList() {
    const currentUser = useContext(CurrentUserContext).currentUser
    const [formData, handleChange, resetFormData] = useFields({productName: "", userId: ""})
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null)
    const [toggleNewProductForm, SetToggleNewProductForm]= useState(false)

    const fetchData = async () => {
        try {
            const res = await GarageSaleApi.getAllProducts(formData)
            setProducts(res)
        } catch (error) {
            setError(error)
        }
    };

    function handleClickAddProductForm() {
      SetToggleNewProductForm(!toggleNewProductForm)
    }

    async function handleClickSearchForm() {
        formData.userId = currentUser.id
        fetchData(formData)
        formData.userId = ""
    }

    async function handleSubmit (e) {
        e.preventDefault();
        resetFormData()
        fetchData(formData)
      }

    function isUserLoggedIn() {

        if (error) {
            return <div> Sorry, something went wrong. </div>
        }
        return (
        
          <div>
            <div className="container mt-3">
              <form onSubmit = {handleSubmit}>
                <input type="text" name="productName" placeholder="Search a product" value={formData.productName} onChange={handleChange} className="form-control"></input>
                <button className="btn btn-primary m-3">Search</button>
              </form>
             
              <hr/>
              <button className="btn btn-primary m-3" onClick={handleClickSearchForm}>My Products</button>
              <button className="btn btn-primary m-3" onClick={handleClickAddProductForm}> New Product</button>
              {toggleNewProductForm? <div><AddNewProductForm setProducts={setProducts} SetToggleNewProductForm={SetToggleNewProductForm}/><hr/></div> : null}
            </div>
              {products.map((prod) => (
                <ProductCard product={prod} setProducts={setProducts}/>
              ))}
          </div>
        );
      }
    
      return (
        
        <div>
          {currentUser? isUserLoggedIn(): <Redirect to="/"/>}
        </div>
      );



   

} 

export default ProductList
