import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LogoutButton from "../LogoutButton";
import Image from "react-bootstrap/Image";
import { useAuth0 } from "@auth0/auth0-react";

function NavBar() {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Event Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
              <Nav.Link href="#">Events</Nav.Link>
              <Nav.Link href="#">Members</Nav.Link>
            </Nav>
            <Form className="d-flex align-items-center">
              <Image style={{ width: "15%", marginRight: "5px" }} src={user.picture} alt={user.name} roundedCircle />
              <Nav.Link href="#" className="w-100">{user.name}</Nav.Link>
              <LogoutButton />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  );
}

export default NavBar;
