import React from "react"
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Profile from "./Profile"

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

        <Route>
            <p> PAGE NOT FOUND </p>
        </Route>
    </Switch>
    )
}

export default Routes;