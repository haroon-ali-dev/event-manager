import React from "react";
import { useState, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./Events.module.css";


const Events = () => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    const [events, setEvents] = useState([]);
    const [formAction, setFormAction] = useState("");
    const [showFormModal, setShowFormModal] = useState(false);
    const [reqInProcess, setReqInProcess] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);

    const create = () => {
        setFormAction("create");
        setReqInProcess(false);
        setErrorAlert(false);
        setShowFormModal(true);
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
        <Modal size="lg" show={showFormModal} onHide={() => setShowFormModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{formAction === "create" ? "Create Event" : "Edit Event"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
          <h1 className={styles.heading}>Events</h1>

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