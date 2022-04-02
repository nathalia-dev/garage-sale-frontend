import React, { useContext, useEffect } from "react";
import CurrentUserContext from "./CurrentUserContext";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


function Profile() {

    const currentUser = useContext(CurrentUserContext).currentUser

    return (
        <div>
            <h3>{currentUser.firstName} {currentUser.lastName}</h3>
            <p> {currentUser.email}</p>
            <img src={`${BASE_URL}/images/${currentUser.photo}`}></img>

            <div>
                <a href="/address" className="btn btn-outline-primary"> Address </a>
                <a href="/profile/edit" className="btn btn-outline-primary" > Edit Profile</a>
            </div>

        </div>
    )

}



export default Profile;