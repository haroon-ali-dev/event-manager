import React from "react";
import { useState, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const Events = () => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    const [events, setEvents] = useState([]);

    useEffect(() => {
      async function getEvents() {
        try {
          const accessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "",
            },
          });

          const res = await fetch("/api/events", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const events = await res.json();
          console.log(events);
          setEvents(events);

        } catch (e) {
          console.log(e.message);
        }
      }

      getEvents();
    }, []);
  return (
    <div>Events</div>
  );
};

export default withAuthenticationRequired(Events);