import React, {useContext} from "react";
import { Redirect } from "react-router-dom"
import GarageSaleApi from "./api";
import CurrentUserContext from "./CurrentUserContext";
import UserCard from "./UserCard";
import useFetch from "./hooks/useFetch";


function UsersList() {
    const currentUser = useContext(CurrentUserContext).currentUser
    const {response, error, isLoading} = useFetch(GarageSaleApi.getAllUsers)

    function userIsLoggedIn() {

        if (isLoading) {
            return <div> Loading ...</div>
        }
    
        if (error) {
            return <div> Sorry, something went wrong. </div>
        }
        const users = response

        return (
            <div>
                {users.map((user) => (
                    <UserCard user={user}/>
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

export default UsersList