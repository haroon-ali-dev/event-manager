import React from "react";
import LoginButton from "../components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
const Home = () => {
  const { isAuthenticated } = useAuth0();


  return (
    !isAuthenticated && (
    <LoginButton  />
    )
  );
};

export default Home;