import React, {useState} from "react";
import GarageSaleApi from "./api";
import EditAddressForm from "./EditAddressForm";


function AddressCard({address, setAddresses }) {
    const [toggleEditButton, setToggleEditButton] = useState(false)

    const deleteAddress = addressId => {
        setAddresses((addresses) => addresses.filter(ad => ad.id !== addressId) )
    }

    function handleEditAddress() {
        setToggleEditButton(!toggleEditButton)
    }
    
    async function handleDeleteAddress() {
        const res = await GarageSaleApi.deleteAddress(address.id)
        if (Array.isArray(res)) {
			alert(res)
		} else {
            deleteAddress(address.id)
        }
    }

    return (
        <div className="d-flex justify-content-center">
        <div className="card m-3" style={{ width: "35rem" }}>
            <div className="card-body">
                    <div>
                        <p>{address.address}, {address.city}-{address.state}</p>
                        <p>Zipcode: {address.zipcode}</p>
                        {address.isDefault? <p><b> Default Address ✅ </b></p> : null}
                        <button onClick={handleEditAddress} className="btn btn-outline-primary mx-1"> EDIT </button>
                        <button className="btn btn-outline-danger" onClick={handleDeleteAddress}> DELETE </button>
                        {toggleEditButton? <EditAddressForm address={address} changeToggleEditButton={setToggleEditButton} setAddresses={setAddresses} /> : null}
                    </div>
            </div>
        </div>
    </div>
    )
}

export default AddressCard;