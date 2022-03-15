import React, { useContext } from "react";
import CurrentUserContext from "./CurrentUserContext";


function Home() {
  const {currentUser } = useContext(CurrentUserContext)
  return (
    <div>
        {currentUser? <h1 className="display-3 my-5"> Welcome {currentUser.firstName.toUpperCase()} </h1>:<h1 className="display-1 my-5"> Welcome to Garage Sale </h1>}
    </div>
  );
}

export default Home;