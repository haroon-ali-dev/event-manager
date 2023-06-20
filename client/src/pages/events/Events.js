import React, { useState, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import moment from "moment";
import { Alert, Table, Button, Modal, Stack, Spinner } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import { Trash } from "react-bootstrap-icons";
import styles from "./Events.module.css";
import CreateEvent from "./components/CreateEvent";

const Events = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [events, setEvents] = useState([]);
  const [singleEvent, setSingleEvent] = useState({});
  const [formAction, setFormAction] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState(null);
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

  const showDeleteConfirmation = (id) => {
    setDeleteEventId(id);
    setShowDeleteModal(true);
    setErrorAlert(false);
  };

  const deleteEvent = async () => {
    setReqInProcess(true);
    setErrorAlert(false);

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience:
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000/api/"
              : "",
        },
      });

      const res = await fetch(`/api/events/${deleteEventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.status === 200) {
        setEvents(events.filter((event) => event.id !== deleteEventId));
        setShowDeleteModal(false);
      } else {
        const data = await res.json();
        console.log(data);
        setErrorAlert(true);
        setReqInProcess(false);
      }
    } catch (e) {
      console.log(e.message);
      setErrorAlert(true);
      setReqInProcess(false);
    }
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
      </Modal>

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this event?
          {errorAlert && (
            <Alert className="mt-3" variant="danger">
              There was a problem. Please try again.
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={deleteEvent}
            disabled={reqInProcess}
          >
            Delete
            {reqInProcess && (
              <Spinner
                className="ms-2"
                animation="border"
                role="status"
                size="sm"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </Button>
        </Modal.Footer>
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
                  <Trash
                  onClick={() => {
                    setReqInProcess(false);
                    setErrorAlert(false);
                    showDeleteConfirmation(event.id);
                  }}
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
