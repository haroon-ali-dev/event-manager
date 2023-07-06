import { useState } from "react";
import { Card, Form, Button, Spinner, InputGroup } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import styles from "./Search.module.css";

export default function Search({ reqInProcess, setReqInProcess, setEvents, getEvents }) {
    const { getAccessTokenSilently } = useAuth0();

    const [date, setDate] = useState("");
    const [timer, setTimer] = useState("");
    const [error, setError] = useState(false);

    const search = async (date) => {
        clearTimeout(timer);

        if (date) {
            setReqInProcess(true);

            setTimer(() => {
                return setTimeout(async () => {
                    try {
                        const accessToken = await getAccessTokenSilently({
                            authorizationParams: {
                                audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "",
                            },
                        });

                        const res = await fetch(`/api/events/date/${date}`, {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        });

                        const data = await res.json();

                        if (res.status === 200) {
                            setEvents(data);
                            setError(false);
                        } else {
                            setError(data.message);
                        }
                    } catch (e) {
                        console.log(e.message);
                        setError("There was a problem.");
                    } finally {
                        setReqInProcess(false);
                    }
                }, 1000);
            });
        } else {
            setError(false);
            getEvents();
        }
    }

    return (
        <Card className={`${styles.cardSearch} mb-4`}>
            <Card.Body>
                <Card.Title>Search</Card.Title>
                <Form>
                    <Form.Group className="mb-2" controlId="date">
                        <Form.Control
                            type="date"
                            isInvalid={error}
                            value={date}
                            onChange={(e) => { setDate(e.target.value); search(e.target.value); }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {error && error}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                        variant="success"
                        type="button"
                        size="sm"
                        disabled={!date}
                        onClick={() => { setDate(""); setError(false); getEvents(); }}
                    >
                        Clear
                    </Button>
                </Form>
            </Card.Body>
            {reqInProcess &&
                <Spinner className={styles.spinner} animation="border" role="status" size="sm">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
        </Card>
    );
}