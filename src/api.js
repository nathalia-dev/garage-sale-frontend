import axios from "axios";
const FormData = require('form-data');


const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class GarageSaleApi {
  
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {

    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${GarageSaleApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

 // Individual API routes

 static async login(loginFormData) {
    try {
      let res = await GarageSaleApi.request(`auth/token`, loginFormData, "post")
      return res.token
    } catch (e) {
      return e
    }

  }

  static async signUp(signUpFormData) {
    try {

      const formData = new FormData();
  
      for (let key in signUpFormData) {
        formData.append(key, signUpFormData[key])
      }

      let resPhoto = await GarageSaleApi.request( `images`, formData, "post")

      signUpFormData.photo = resPhoto.photoId

      let res = await GarageSaleApi.request(`auth/register`, signUpFormData, "post")
      return res.token
    } catch (e) {
      return e
    }

  }

  static async getAllUsers() {
    try {
      let res = await GarageSaleApi.request(`users`)
      console.log("api file", res)
      // let res = await axios.get(`${BASE_URL}/users`)
      return res.users
    } catch (e) {
      return e
    }
  }

  static async getUser(userId) {
    try {
      let res = await GarageSaleApi.request(`users/${userId}`)
      return res.user
    } catch (e) {
      return e
    }
  }

  static async updateUser(currentUser, editProfileFormData) {
    try {
      if(!(editProfileFormData.photo === currentUser.photo)) {
        //delete the old profile photo
        let resDeletePhoto = await GarageSaleApi.request( `images/${currentUser.photo}`,{}, "delete")

        const formData = new FormData();
  
        for (let key in editProfileFormData) {
          formData.append(key, editProfileFormData[key])
        }
  
        let resPhoto = await GarageSaleApi.request( `images`, formData, "post")
  
        editProfileFormData.photo = resPhoto.photoId

      }

      let res = await GarageSaleApi.request(`users/${currentUser.id}`, editProfileFormData, "patch")
      return res.user

    } catch (e) {
      return e
    }
    
  }

  static async getAllUserAddresess(userId) {
    try {
      let res = await GarageSaleApi.request(`users/${userId}/address`)
      return res.addresses
    } catch (e) {
      return e
    }
  }

  static async createAddress(formData) {
    try{
      let res = await GarageSaleApi.request(`address`, formData, "post")
      console.log(res)
      return res.address
    } catch(e) {
      return e
    }
  }

  static async updateAddress(formData, addressId) {
    try {
      let res = await GarageSaleApi.request(`address/${addressId}`, formData, "patch")
      return res.updatedAddress
    } catch (e) {
      return e
    }
  }

  static async deleteAddress(addressId) {
    try {
      let res = await GarageSaleApi.request(`address/${addressId}`, {} , "delete")
      return res.deleted
    } catch (e) {
      return e
    }
  }

  static async getAllProducts({productName, userId}) {
    try {
      if(productName.length) {
        let res = await GarageSaleApi.request(`products?productName=${productName}`)
        return res.products
      } else if (userId > 0) {
        let res = await GarageSaleApi.request(`products?userId=${userId}`)
        return res.products
      } else {
        let res = await GarageSaleApi.request(`products`)
        return res.products
      }
    } catch(e) {
      return e
    }
  }

  static async createProduct(formData) {
    try {
     let res = await GarageSaleApi.request(`products`,formData, "post" )
     return res.product 
    } catch(e) {
      return e
    }
  }

  static async getProduct(productId) {
    try {
      let res = await GarageSaleApi.request(`products/${productId}`)
      return res.product
    } catch(e) {
      return e
    }
  }

  static async updateProduct(formData, productId) {
    try {
      let res = await GarageSaleApi.request(`products/${productId}`, formData, "patch")
      return res.updatedProduct
    } catch(e) {
      return e
    }
  }

  static async deleteProduct(productId) {
    try {
      let res = await GarageSaleApi.request(`products/${productId}`, {}, "delete")
      return res.deactivated
    } catch(e) {
      return e
    }
  }

  static async addProductPhoto(productId, formDataPhoto) {
    try {
    // create a new formData
    const formData = new FormData();
  
    for (let key in formDataPhoto) {
      formData.append(key, formDataPhoto[key])
    }
    // upload photo to S3
    let resImage = await GarageSaleApi.request(`images`, formData, "post")

    //then, add productId and the key generated to the database.
    if(resImage.photoId) {
      let res = await GarageSaleApi.request(`products/${productId}/photos`, {productId: productId, path: resImage.photoId}, "post")
      console.log(res)
      return res.productPhoto
    }

    } catch (e) {
      return e 
    }
  }

  static async deleteProductPhoto(photo) {
    try {
      let resImage = await GarageSaleApi.request(`images/${photo.path}`, {}, "delete")
      if (resImage.deleted) {
        let res = await GarageSaleApi.request(`products/${photo.productId}/photos/${photo.id}`, {}, "delete")
        return res.deletedProductPhoto
      }
    } catch(e) {
      return e
    }
  }


}

export default GarageSaleApi