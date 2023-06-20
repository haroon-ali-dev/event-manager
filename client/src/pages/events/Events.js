import React, { useState, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import moment from "moment";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import { PencilSquare } from "react-bootstrap-icons";
import styles from "./Events.module.css";
import CreateEvent from "./components/CreateEvent";

const Events = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [events, setEvents] = useState([]);
  const [singleEvent, setSingleEvent] = useState({});
  const [formAction, setFormAction] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [reqInProcess, setReqInProcess] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

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

  const create = () => {
    setFormAction("create");
    setReqInProcess(false);
    setErrorAlert(false);
    setShowFormModal(true);
  };

  const update = (id) => {
    setFormAction("update");
    const event = events.find((event) => event.id === id);
    const updatedEvent = {
      ...event,
      date: moment(event.date).format("YYYY-MM-DD"),
    };
    setSingleEvent(updatedEvent);
    setReqInProcess(false);
    setErrorAlert(false);
    setShowFormModal(true);
  };

  const createEvent = (event) => {
    setEvents([...events, event]);
  };

  const updateEvent = (event) => {
    setEvents(events.map((ev) => (ev.id === event.id ? event : ev)));
  };

  return (
    <>
      <Modal
        size="lg"
        show={showFormModal}
        onHide={() => setShowFormModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {formAction === "create" ? "Create Event" : "Edit Event"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateEvent
            formAction={formAction}
            createEvent={createEvent}
            updateEvent={updateEvent}
            singleEvent={singleEvent}
            setShowFormModal={setShowFormModal}
            reqInProcess={reqInProcess}
            setReqInProcess={setReqInProcess}
            errorAlert={errorAlert}
            setErrorAlert={setErrorAlert}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <h1 className={styles.heading}>Events</h1>

      <div className="text-center">
        <Button variant="success" onClick={create} className="mb-4">
          Add New
        </Button>
      </div>

      <Table
        striped
        bordered
        hover
        style={{ tableLayout: "fixed", wordWrap: "break-word" }}
      >
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
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>
                {moment(event.date).utcOffset("+0100").format("DD-MM-YYYY")}
              </td>
              <td>{event.information}</td>
              <td>{event.created_by}</td>
              <td>
                <Stack direction="horizontal" gap={3}>
                  <PencilSquare
                    className={styles.icon}
                    onClick={() => update(event.id)}
                  />
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default withAuthenticationRequired(Events);
