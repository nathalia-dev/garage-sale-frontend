import React from "react"
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Profile from "./Profile"
import EditProfileForm from "./EditProfileForm"
import UsersList from "./UsersList";
import AddressesList from "./AddressesList";
import ProductList from "./ProductList"
import ProductDetails from "./ProductDetails"


function Routes({login, signUp}){
    return (
        <Switch>
        <Route exact path="/">
            <Home />
        </Route>

        <Route exact path="/login">
            <LoginForm login={login} />
        </Route>
        <Route exact path="/signup">
            <SignupForm signUp={signUp}/>
        </Route>

        <Route exact path="/profile">
            <Profile />
        </Route>
        <Route exact path="/profile/edit"> 
            <EditProfileForm />
        </Route>
        <Route exact path="/users">
            <UsersList />
        </Route>

        <Route exact path="/address">
            <AddressesList />
        </Route>
        <Route exact path="/products">
            <ProductList />
        </Route> 
        <Route path="/products/:productId">
            <ProductDetails />
        </Route> 
        <Route>
            <p> PAGE NOT FOUND </p>
        </Route>
    </Switch>
    )
}

export default Routes;