import React, {useContext, useState, useEffect} from "react";
import { Redirect } from "react-router-dom"
import GarageSaleApi from "./api";
import CurrentUserContext from "./CurrentUserContext";
import AddressCard from "./AddressCard";
import AddNewAddressForm from"./AddNewAddressForm";
import useFetch from "./hooks/useFetch";



function AddressesList() {
    const currentUser = useContext(CurrentUserContext).currentUser
    const {response, error, isLoading} = useFetch(GarageSaleApi.getAllUserAddresess,currentUser.id)
    const [addresses, setAddresses] = useState([]);

    useEffect(()=> {
        setAddresses(response)
    }, [response] )


    function userIsLoggedIn() {

        if (isLoading) {
            return <div> Loading ...</div>
        }
    
        if (error) {
            return <div> Sorry, something went wrong. </div>
        }

        return (

            <div>
                <AddNewAddressForm setAddresses={setAddresses}/>
                {addresses.map((ad) => (
                    <AddressCard address={ad} setAddresses={setAddresses}  />
                ))}
            </div>
        )

    }

    return (
        <div>
            {currentUser? userIsLoggedIn() : <Redirect to="/"/>}
        </div>
    )


}

export default AddressesList