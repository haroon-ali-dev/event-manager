import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Users = () => {
  const { user, error, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Users;