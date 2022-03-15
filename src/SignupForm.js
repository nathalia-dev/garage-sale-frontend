import React, {  useState } from "react";
import useFields from "./hooks/useFields"
import { useHistory } from "react-router-dom";


function SignupForm({signUp}) {
  const INITIAL_STATE = {email: "", password: "", firstName: "", lastName: ""}
  const [formData, handleChange, resetFormData] = useFields(INITIAL_STATE)
  const [selectedFile, setSelectedFile] = useState(null);
  const history = useHistory()

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
}

  async function handleSubmit(e) {
    e.preventDefault()
    formData.photo = selectedFile
    if (!formData.photo) {
      return alert("Please, select a image for your profile.")
    }
    const resApi = await signUp(formData)
    if (resApi !== undefined) {
      alert(resApi.error)
    } else {
      resetFormData()
      history.push("/")
    }
  }


  return (
    <div className="container mt-3">
        <h1 className="display-5 my-3"> Sign In </h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="text" name="email" value={formData.email} placeholder="Email" onChange={handleChange} className="form-control my-1"></input>
          <input type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange} className="form-control my-1"></input>
          <input type="text" name="firstName" value={formData.firstName} placeholder="First Name" onChange={handleChange} className="form-control my-1"></input>
          <input type="text" name="lastName" value={formData.lastName} placeholder="Last Name" onChange={handleChange} className="form-control my-1"></input>
          <input type="file" name="photo" accept="image/png, image/jpeg, image/jpg" onChange={handleFileInput} className="form-control my-1"></input>
          <button className="btn btn-primary my-3">Sign Up</button>
        </form>
    </div>

  );
}

export default SignupForm;