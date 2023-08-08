import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import Logo from "../../src/assets/EventManager.png";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container className="d-flex wrap align-items-center justify-content-center min-vh-100">
      <Row>
        <Col className="text-center">
          <Image src={Logo} alt="logo" fluid />
          <h4 style={{ color:"#848181", fontSize:"20px" }} >Event management has never been easier.</h4>
          <Button variant="success" onClick={() => loginWithRedirect()} >
            Log In
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginButton;
