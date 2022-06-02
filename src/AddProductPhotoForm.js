import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import CurrentUserContext from "./CurrentUserContext";
import GarageSaleApi from "./api";

function AddProductPhotoForm({ product, changeToggleAddPhotoButton, setProduct, setMainPhoto }) {
	const history = useHistory();
	const currentUser = useContext(CurrentUserContext).currentUser;
	const [selectedFile, setSelectedFile] = useState(null);

	const handleFileInput = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	const updateProduct = (newPhoto) => {
		setProduct((product) => {
			product["photos"].push(newPhoto);
			return { ...product };
		});
	};

	async function handleSubmit(e) {
		e.preventDefault();
		const res = await GarageSaleApi.addProductPhoto(product.id, { photo: selectedFile });
		if (Array.isArray(res)) {
			alert(res);
		} else {
			if (product.photos.length === 0) {
				setMainPhoto(res.path);
			}
			updateProduct(res);
			changeToggleAddPhotoButton((val) => !val);
			setSelectedFile(null);
			history.push(`/products/${product.id}`);
		}
	}

	return (
		<div className="container mt-3">
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<div className="row mb-3">
					<label htmlFor="photo" className="col-sm-2 col-form-label">
						Photo
					</label>
					<div className="col-sm-10">
						<input type="file" id="photo" name="photo" onChange={handleFileInput} className="form-control-file"></input>
					</div>
				</div>
				<button className="btn btn-primary my-3">Save</button>
			</form>
		</div>
	);
}

export default AddProductPhotoForm;
