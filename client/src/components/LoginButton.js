import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="justify-content-center">
        <Col className="text-center">
          <h2>Welcome to the event manager system</h2>
          <h3>Please log in</h3>
          <Button onClick={() => loginWithRedirect()} variant="primary">
            Log In
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginButton;
