import React from "react";
import useFields from "./hooks/useFields"
import { useHistory } from "react-router-dom";


function LoginForm({login}) {
  const INITIAL_STATE = {email: "", password: ""}
  const [formData, handleChange, resetFormData] = useFields(INITIAL_STATE)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    const apiRes = await login(formData)
    if (apiRes !== undefined) {
      alert(apiRes.error)
    } else {
      resetFormData()
      history.push("/")
    }
  }


  return (
    <div className="container mt-3">
      <h1 className="display-5 my-3"> Login </h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" value={formData.email} placeholder="email" onChange={handleChange} className="form-control my-1"></input>
        <input type="password" name="password" value={formData.password} placeholder="password" onChange={handleChange} className="form-control my-1"></input>
        <button className="btn btn-primary my-3">Login</button>
      </form>
    </div>

  );
}

export default LoginForm;