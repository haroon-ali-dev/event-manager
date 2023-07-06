import React, { useEffect, useState } from "react";
import moment from "moment";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import { Button, Card, Container } from "react-bootstrap";

import AddMemberToEventModal from "../pages/events/components/AddMemberToEventModal";

const Dashboard = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [showPersonAddModal, setShowPersonAddModal] = useState([false, 0]);
  const [reqInProcess, setReqInProcess] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  useEffect(() => {
    async function getEvents() {
      try {
        const accessToken = await getAccessTokenSilently({
          audience:
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000/api/"
              : "",
        });

        const res = await fetch("/api/events/upcoming", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const events = await res.json();
        setUpcomingEvents(events);
      } catch (error) {
        console.log(error.message);
      }
    }

    getEvents();
  }, []);

  // Function to update the checked-in count for an event
  const updateCheckedInCount = (eventId, checkedInCount) => {
    setUpcomingEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, checkedInCount } : event
      )
    );
  };

  return (
    <>
      <h1 className="heading">Upcoming Events</h1>
      <Container>
        <AddMemberToEventModal
          showPersonAddModal={showPersonAddModal}
          setShowPersonAddModal={setShowPersonAddModal}
          reqInProcess={reqInProcess}
          setReqInProcess={setReqInProcess}
          errorAlert={errorAlert}
          setErrorAlert={setErrorAlert}
          updateCheckedInCount={updateCheckedInCount} // Pass the updateCheckedInCount function
        />
        {upcomingEvents &&
          upcomingEvents.map((event) => (
            <Card key={event.id} className="mb-4">
              <Card.Header style={{ fontSize: "20px" }}>{event.name}</Card.Header>
              <Card.Body>
                <Card.Title>{moment(event.date).format("YYYY-MM-DD")}</Card.Title>
                <Card.Text>
                  {event.information ? event.information : "No information available."}
                </Card.Text>
                <p>Checked-in: {event.checkedInCount ? event.checkedInCount : "0"}</p>
                <Button
                  variant="success"
                  onClick={() => setShowPersonAddModal([true, event.id])}
                >
                  Check-in
                </Button>
              </Card.Body>
            </Card>
          ))}
      </Container>
    </>
  );
};

export default withAuthenticationRequired(Dashboard);
