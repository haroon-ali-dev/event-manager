import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Users = () => {
  const { user, error, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <Container>

      <Row>
        <Col>{
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )}
        </Col>
      </Row>
    </Container>

  );
};

export default Users;