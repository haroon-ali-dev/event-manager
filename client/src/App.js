import React from "react";
// import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import User from "./components/User";


const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      {!isAuthenticated ? (
        <div>
          <p style={{ fontSize: "1.5rem" }}>Please Login.</p>
          <LoginButton />
        </div>
      ) : (
        <div>
          <LogoutButton />
          <User />
        </div>
      )}
    </div>
  );
};

export default App;
