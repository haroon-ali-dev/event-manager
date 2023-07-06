import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

import styles from "./Search.module.css";

export default function Search() {
    const [email, setEmail] = useState("");

    return (
        <Card className={`${styles.cardSearch} mb-4`}>
        <Card.Body>
          <Card.Title>Search</Card.Title>
          <Form>
            <Form.Group controlId="email">
              <Form.Control
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    );
}