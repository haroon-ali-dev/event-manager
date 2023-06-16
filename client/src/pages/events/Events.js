import React from "react";
import { useState, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Events = () => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    const [events, setEvents] = useState([]);

    const create = () => {

    };

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
          setEvents(events);

        } catch (e) {
          console.log(e.message);
        }
      }

      getEvents();
    }, []);
  return (
    <>
          <h1>Events</h1>

<div className="text-center">
  <Button variant="success" onClick={create} className="mb-4">
    Add New
  </Button>
</div>

<Table striped bordered hover style={{ tableLayout: "fixed", wordWrap: "break-word" }}>
  <thead>
    <tr>
      <th>Events</th>
      <th>Date</th>
      <th>Information</th>
      <th>Created By</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {events.map((events, i) => (
      <tr key={i}>
        <td>{events["name"]}</td>
        <td>{events["date"]}</td>
        <td>{events["information"]}</td>
        <td></td>
      </tr>
    ))}
  </tbody>
</Table>

    </>
  );
};

export default withAuthenticationRequired(Events);