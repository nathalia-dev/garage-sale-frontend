import React, { useContext } from "react";
import CurrentUserContext from "./CurrentUserContext";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


function Profile() {

    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    console.log(currentUser)
    return (
        <div>
            <h3>{currentUser.firstName} {currentUser.lastName}</h3>
            <p> {currentUser.email}</p>
            <img src={`${BASE_URL}/images/${currentUser.photo}`}></img>
        </div>
    )

}



export default Profile;