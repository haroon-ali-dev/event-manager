import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Event Manager';

    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  return (
    !isAuthenticated && (
      <LoginButton />
    )
  );
};

export default Home;