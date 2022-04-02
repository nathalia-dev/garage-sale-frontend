import React from "react";
import { NavLink } from "react-router-dom";

function UserCard({user}) {
    console.log(user)
    return (
        <div className="d-flex justify-content-center">
        <div className="card m-3" style={{ width: "35rem" }}>
            <div className="card-body">
                <NavLink to={`companies/${user.id}`}>
                    <div>
                        <h3 className="card-title">{user.firstName} {user.lastName}</h3>
                        {user.address? <p>{user.address}</p> : null}
                    </div>
                </NavLink>
            </div>
        </div>
    </div>
    )
}

export default UserCard;