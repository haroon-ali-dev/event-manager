import React, { useState, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import moment from "moment";
import { Alert, Table, Button, Modal, Stack, Spinner, Tooltip, OverlayTrigger } from "react-bootstrap";
import { PencilSquare, Trash, PersonAdd, ListCheck } from "react-bootstrap-icons";

import CreateEvent from "./components/CreateEvent";
import AddMemberToEventModal from "./components/AddMemberToEventModal";
import EventAttendance from "./components/EventAttendance";

import styles from "./Events.module.css";
import Search from "./components/Search";

const Events = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [singleEvent, setSingleEvent] = useState({});
  const [formAction, setFormAction] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState([false, 0]);
  const [deleteEventId, setDeleteEventId] = useState(null);
  const [showPersonAddModal, setShowPersonAddModal] = useState([false, 0]);
  const [reqInProcess, setReqInProcess] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    color: "",
    "message": "",
    data: "",
  });
  const [outerNot, setOuterNot] = useState({
    show: false,
    color: "",
    "message": "",
  });

  async function getEvents() {
    setLoading(true);

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience:
            process.env.NODE_ENV === "development" ?
              "http://localhost:3000/api/" : "https://d3n27sahgwxchw.cloudfront.net/",
        },
      });

      const res = await fetch("/api/events", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const events = await res.json();
      setEvents(events);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    document.title = 'Events - Event Manager';

    getEvents();
  }, []);

  const create = () => {
    setFormAction("create");
    setReqInProcess(false);
    setNotification({ show: false, color: "", message: "" });
    setShowFormModal(true);
  };
  const createEvent = (event) => {
    setEvents([...events, event]);
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
    setNotification({ show: false, color: "", message: "" });
    setShowFormModal(true);
  };


  const updateEvent = (event) => {
    setEvents(events.map((ev) => (ev.id === event.id ? event : ev)));
  };

  const showDeleteConfirmation = (id) => {
    setDeleteEventId(id);
    setShowDeleteModal(true);
    setNotification({ show: false, color: "", message: "" });
  };

  const deleteEvent = async () => {
    setReqInProcess(true);
    setNotification({ show: false, color: "", message: "" });

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience:
            process.env.NODE_ENV === "development" ?
              "http://localhost:3000/api/" : "https://d3n27sahgwxchw.cloudfront.net/",
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
        setReqInProcess(false);

        setOuterNot({ show: true, color: "danger", message: "Event deleted." });
        window.scrollTo(0, 0);
      } else {
        const data = await res.json();
        setNotification({ show: true, color: "danger", message: "There was a problem." });
        setReqInProcess(false);
      }
    } catch (e) {
      console.log(e.message);
      setNotification({ show: true, color: "danger", message: "There was a problem." });
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
            notification={notification}
            setNotification={setNotification}
            setOuterNot={setOuterNot}
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
          <br />
          If you delete this event, all the attendance records will be deleted.
          {notification.show && (
            <Alert className="mt-3" variant={notification.color}>
              {notification.message}
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

      <AddMemberToEventModal
        showPersonAddModal={showPersonAddModal}
        setShowPersonAddModal={setShowPersonAddModal}
        reqInProcess={reqInProcess}
        setReqInProcess={setReqInProcess}
        notification={notification}
        setNotification={setNotification}
        setOuterNot={setOuterNot}
      />
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
        <Alert className="text-center position-absolute top-5 end-1 m-2" variant={outerNot.color} onClose={() => setOuterNot(false)} dismissible>
          {outerNot.message}
        </Alert>
      )}
       <div className={styles.eventsHeading}>
        <h1 className={styles.heading}>Events</h1>
        <p>Here you can see all the events.</p>
      </div>
      <div>
      <Search
        setEvents={setEvents}
        getEvents={getEvents}
        reqInProcess={reqInProcess}
        setReqInProcess={setReqInProcess}
      />
        <Button variant="success" onClick={create} className="mb-4">
          Add New
        </Button>
      </div>

      {loading && (
        <Spinner className="spinner-main" variant="success" animation="border" role="status" size="lg">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!loading && (
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
            {events.map((event, index) => (
              <tr key={index}>
                <td>{event["name"]}</td>
                <td>
                  {moment(event["date"]).utcOffset("+0100").format("DD-MM-YYYY")}
                </td>
                <td>{event["information"]}</td>
                <td>{event["created_by"]}</td>
                <td>
                  <Stack direction="horizontal" gap={3}>
                    <OverlayTrigger overlay={<Tooltip id="Edit">Edit</Tooltip>}>
                    <PencilSquare
                      className={`${styles.icon} editEvent`}
                        onClick={() => update(event.id)}
                        style={{ color: "blue" }}
                    />
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip id="Delete">Delete</Tooltip>}>
                    <Trash
                        className={`${styles.icon} deleteEvent`}
                        style={{ color: "red" }}
                      onClick={() => {
                        setReqInProcess(false);
                        setNotification({ show: false, color: "", message: "" });
                        showDeleteConfirmation(event.id);
                      }}
                      />
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip id="Check-In">Check-In</Tooltip>}>
                    <PersonAdd className={styles.icon} style={{ color: "green" }} onClick={() => {
                      setReqInProcess(false);
                      setNotification({ show: false, color: "", message: "" });
                      setShowPersonAddModal([true, event.id]);
                      }} />
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip id="Attendance">Attendance List</Tooltip>}>
                      <ListCheck className={styles.icon} onClick={() => setShowAttendanceModal([true, event.id])} />
                      </OverlayTrigger>
                  </Stack>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default withAuthenticationRequired(Events);