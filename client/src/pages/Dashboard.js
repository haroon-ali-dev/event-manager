import { React, useEffect, useState } from "react";
import moment from "moment";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import { Button, Card } from "react-bootstrap";

const Dashboard = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    async function getEvents() {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience:
              process.env.NODE_ENV === "development"
                ? "http://localhost:3000/api/"
                : "",
          },
        });

        const res = await fetch("/api/events/upcoming", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const events = await res.json();
        setUpcomingEvents(events);
      } catch (e) {
        console.log(e.message);
      }
    }

    getEvents();
  }, []);

  return (
    <>
        <h1 className="heading">Upcoming Events</h1>
      <Card>
        {upcomingEvents && upcomingEvents.map((event) => (
          <>
            <Card.Header>{event.name}</Card.Header>
            <Card.Body>
              <Card.Title>{moment(event.date).format("YYYY-MM-DD")}</Card.Title>
              <Card.Text>
                {event.information}
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </>
        ))}
      </Card>
    </>
  );

};

export default withAuthenticationRequired(Dashboard);