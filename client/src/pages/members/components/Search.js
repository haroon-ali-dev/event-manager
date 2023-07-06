import { useState } from "react";
import { Card, Form, Button, Spinner } from "react-bootstrap";

import styles from "./Search.module.css";

export default function Search({ reqInProcess, setReqInProcess }) {
    const [email, setEmail] = useState("");
    const [timer, setTimer] = useState("");

    const search = async (email) => {
        if (email) {
            clearTimeout(timer);

            setTimer(() => {
                return setTimeout(() => {
                    setReqInProcess(true);
                    setTimeout(() => {
                        console.log("Request sent.");
                        setReqInProcess(false);
                    }, 1000);
                }, 1000);
            });
        }
    }

    return (
        <Card className={`${styles.cardSearch} mb-4`}>
            <Card.Body>
                <Card.Title>Search</Card.Title>
                {reqInProcess &&
                    <Spinner className="ms-2" animation="border" role="status" size="sm">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                <Form>
                    <Form.Group controlId="email">
                        <Form.Control
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); search(e.target.value); }}
                        />
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
}