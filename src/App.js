import './App.css';
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Routes from "./Routes";
import GarageSaleApi from "./api";
import useLocalStorage from "./hooks/useLocalStorage";
import jwt_decode from "jwt-decode";
import CurrentUserContext from "./CurrentUserContext";

function App() {
  const [token, setToken] = useLocalStorage("token");
	const [currentUser, setCurrentUser] = useState(undefined);

  async function login(loginFormData) {
		const userToken = await GarageSaleApi.login(loginFormData);
		if (Array.isArray(userToken)) {
			return {error: userToken}
		} else {
			setToken(userToken)
		}	
	}

	async function signUp(signUpFormData) {
		const userToken = await GarageSaleApi.signUp(signUpFormData)
		if (Array.isArray(userToken)) {
			return {error: userToken}
		} else {
			setToken(userToken)
		}	
	}

	async function logout() {
		setToken(null)
	}

  async function changeCurrentUserState() {
		if (token) {
			const userId = jwt_decode(token).id;

			GarageSaleApi.token = token;
			let res;
			try {
				res = await GarageSaleApi.getUser(userId) 
			} catch (e) {
				console.log(e)
			}
			setCurrentUser(res);
		} else {
			setCurrentUser(null)
			GarageSaleApi.token = null
		}
	}

  useEffect(() => {
		changeCurrentUserState();
	}, [token]);

	if (currentUser === undefined) {
		return <div> ...Loading </div>
	}

  return (
		<div className="App">
			<CurrentUserContext.Provider value={{currentUser: currentUser, setCurrentUser: setCurrentUser}}>
				<NavBar logout={logout}/>
				<Routes login={login} signUp={signUp}/>
			</CurrentUserContext.Provider>
		</div>
	);

}

export default App;
