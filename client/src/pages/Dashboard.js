import React, { useEffect, useState } from "react";
import moment from "moment";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import { Button, Card, Container, Modal, Alert, Spinner } from "react-bootstrap";

import AddMemberToEventModal from "../pages/events/components/AddMemberToEventModal";
import EventAttendance from "./events/components/EventAttendance.js";

const Dashboard = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [showPersonAddModal, setShowPersonAddModal] = useState([false, 0]);
  const [showAttendanceModal, setShowAttendanceModal] = useState([false, 0]);
  const [reqInProcess, setReqInProcess] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    color: "",
    "message": "",
    data: ""
  });
  const [outerNot, setOuterNot] = useState({
    show: false,
    color: "",
    "message": ""
  });

  useEffect(() => {
    async function getEvents() {
      setLoading(true);

      try {
        const accessToken = await getAccessTokenSilently({
          audience:
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000/api/"
              : "https://d3n27sahgwxchw.cloudfront.net/",
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
      } finally {
        setLoading(false);
      }
    }

    getEvents();
  }, []);

  if (notification.message === "Member added to event.") {
    setUpcomingEvents(upcomingEvents.map((event) =>
      event.id === notification.data ? { ...event, checkedInCount: +event.checkedInCount + 1 } : event
    ));

    setNotification({ show: false, color: "", message: "", data: "" });
  }

  return (
    <>
      <Modal show={showAttendanceModal[0]} onHide={() => setShowAttendanceModal([false, 0])}>
        <Modal.Header closeButton>
          <Modal.Title>Attendance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EventAttendance eventID={showAttendanceModal[1]} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      {outerNot.show && (
        <Alert className="text-center" variant={outerNot.color} onClose={() => setOuterNot(false)} dismissible>
          {outerNot.message}
        </Alert>
      )}
      <h1 className="heading">Upcoming Events</h1>

      {loading && (
        <Spinner className="spinner-main" animation="border" role="status" size="lg">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!loading && (
        <Container>
          <AddMemberToEventModal
            showPersonAddModal={showPersonAddModal}
            setShowPersonAddModal={setShowPersonAddModal}
            reqInProcess={reqInProcess}
            setReqInProcess={setReqInProcess}
            notification={notification}
            setNotification={setNotification}
            setOuterNot={setOuterNot}
          />
          {upcomingEvents &&
            upcomingEvents.map((event) => (
              <Card key={event.id} className="mb-4">
                <Card.Header style={{ fontSize: "20px" }}>{event.name}</Card.Header>
                <Card.Body>
                  <Card.Title>{moment(event.date).format("DD-MM-YYYY")}</Card.Title>
                  <Card.Text>
                    {event.information ? event.information : "No information available."}
                  </Card.Text>
                  <p>Checked-in: {event.checkedInCount ? event.checkedInCount : "0"}</p>
                  <Button
                    variant="success"
                    onClick={() => setShowPersonAddModal([true, event.id])}
                    style={{ marginRight: "10px" }}
                  >
                    Check-in
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => setShowAttendanceModal([true, event.id])}
                  >
                    Attended List
                  </Button>
                </Card.Body>
              </Card>
            ))}
        </Container>
      )}
    </>
  );
};

export default withAuthenticationRequired(Dashboard);