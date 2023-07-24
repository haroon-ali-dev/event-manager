import { useState } from "react";
import { Card, Form, Button, Spinner, InputGroup } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import styles from "./Search.module.css";

export default function Search({ reqInProcess, setReqInProcess, setMembers, getMembers }) {
    const { getAccessTokenSilently } = useAuth0();

    const [email, setEmail] = useState("");
    const [timer, setTimer] = useState("");
    const [error, setError] = useState(false);

    const search = async (email) => {
        clearTimeout(timer);

        if (email) {
            setReqInProcess(true);

            setTimer(() => {
                return setTimeout(async () => {
                    try {
                        const accessToken = await getAccessTokenSilently({
                            authorizationParams: {
                                audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "https://d3n27sahgwxchw.cloudfront.net/",
                            },
                        });

                        const res = await fetch(`/api/members/email/${email}`, {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        });

                        const data = await res.json();

                        if (res.status === 200) {
                            setMembers([data]);
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
            getMembers();
            setReqInProcess(false);
        }
    }

    return (
        <Card className={`${styles.cardSearch} mb-4`}>
            <Card.Body>
                <Card.Title>Search</Card.Title>
                <Form>
                    <Form.Group className="mb-2" controlId="email">
                        <Form.Control
                            type="text"
                            placeholder="Email"
                            isInvalid={error}
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); search(e.target.value); }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {error && error}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                        variant="success"
                        type="button"
                        size="sm"
                        disabled={!email}
                        onClick={() => { setEmail(""); setError(false); getMembers(); }}
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