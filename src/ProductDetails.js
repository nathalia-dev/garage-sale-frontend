import React, { useState, useEffect, useContext } from "react";
import { useParams, Redirect } from "react-router-dom"
import GarageSaleApi from "./api";
import CurrentUserContext from "./CurrentUserContext";
import EditProductForm from "./EditProductForm";
import AddProductPhotoForm from "./AddProductPhotoForm";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


function ProductDetails() {
    const { productId } = useParams();
    const currentUser = useContext(CurrentUserContext).currentUser
    const [product, setProduct] = useState([])
    const [toggleEditButton, setToggleEditButton] = useState(false) 
    const [toggleAddPhotoButton, setToggleAddPhotoButton] = useState(false) 
    const [isLoading, setIsLoading] = useState(true)


    function handleEditProduct() {
        setToggleEditButton(!toggleEditButton)
    }

    function handleAddProductPhoto() {
      setToggleAddPhotoButton(!toggleAddPhotoButton)
    }

    function createImages(productPhotos) {
      return productPhotos.map((photo) => 
      <div>
        <img src={`${BASE_URL}/images/${photo.path}`}></img>
        {currentUser.id === product.userId? <button className="btn btn-outline-danger mx-1" onClick={() => handleDeletePhoto(photo)}>DELETE</button> : null}
      </div>)
    }

    async function handleDeletePhoto(photo) {
      const res = await GarageSaleApi.deleteProductPhoto(photo)
      setProduct((product) => {
        product.photos = product.photos.filter(img => img.id !== photo.id)
        return product
      })
      fetchData()
    }
    async function fetchData() {
      setProduct(await GarageSaleApi.getProduct(productId))
      setIsLoading(false)
    }

    useEffect (() => {
        fetchData()
      }, [])

      if (isLoading) {
        return (<div>IS LOADING...</div>)
      }

      function userIsLoggedIn() {
        return (
          <div>
              <h1> {product.productName} </h1>
              <p> <em>{product.description}</em> </p>
              <p> Price: {product.price} </p>
              <p> Quantity: {product.quantity} </p>

              {product.photos? createImages(product.photos) : null}

              {currentUser.id === product.userId ?  
                <div>
                    <button onClick={handleEditProduct} className="btn btn-outline-primary mx-1"> EDIT </button>
                    <button onClick={handleAddProductPhoto} className="btn btn-outline-primary mx-1"> ADD PHOTO </button>
                {toggleEditButton? <EditProductForm product={product} changeToggleEditButton={setToggleEditButton} setProduct={setProduct} /> : null}
                {toggleAddPhotoButton? <AddProductPhotoForm product={product} changeToggleAddPhotoButton={setToggleAddPhotoButton} setProduct={setProduct} /> : null}
                </div>  
                :
                null
            }
             
          </div>
        );
      }



      return (
        <div>
              {currentUser ? userIsLoggedIn() : <Redirect to="/"/> }
        </div>
    
      )
}

export default ProductDetails