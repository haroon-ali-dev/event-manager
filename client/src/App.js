import React from "react";
// import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Admin from "./components/Admin";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      {!isAuthenticated ? (
        <div>
          <LoginButton />
        </div>
      ) : (
        <div>
          <Admin />
        </div>
      )}
    </div>
  );
};

export default App;
