import React from "react";
import { useState, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const Members = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function getMembers() {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "",
          },
        });

        const res = await fetch("/api/members", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const members = await res.json();
        console.log(members);
        setMembers(members);

      } catch (e) {
        console.log(e.message);
      }
    }

    getMembers();
  }, []);

  return (
    <div>Members</div>
  );
};

export default withAuthenticationRequired(Members);