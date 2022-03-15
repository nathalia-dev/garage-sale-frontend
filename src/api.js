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
      let res = await this.request(`auth/token`, loginFormData, "post")
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

      let resPhoto = await this.request( `images`, formData, "post")

      signUpFormData.photo = resPhoto.photoId

      let res = await this.request(`auth/register`, signUpFormData, "post")
      return res.token
    } catch (e) {
      return e
    }

  }

  static async getUser(userId) {
    let res = await this.request(`users/${userId}`)
    // let imgProfile = await this.request(`images/${res.user.photo}`)
    // res.user.photo = imgProfile

    return res.user
  }
}

export default GarageSaleApi