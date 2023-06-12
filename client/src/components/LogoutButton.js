import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Container>
      <Row>
        <Col>
          <Button onClick={() => logout({ returnTo: window.location.origin })} variant="primary">
          Log Out
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LogoutButton;
