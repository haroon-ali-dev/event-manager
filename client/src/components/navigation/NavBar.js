import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LogoutButton from "../LogoutButton";
import Image from "react-bootstrap/Image";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/EventManager.png";


function NavBar() {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand to="/dashboard" as={Link}><Image src={Logo} style={{ width: "170px" }} /></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Form className="d-flex align-items-center justify-content-lg-end" style={{ marginLeft:"10px" }}>
              <Image style={{ width: "10%", marginRight: "5px" }} src={user.picture} alt={user.name} roundedCircle />
              <Nav.Link href="#" className="w-auto">Hello {user.name}!</Nav.Link>
            </Form>
            <hr style={{ width: "10%", borderTop: "1px solid green", borderRadius:"10px" , marginLeft:"10px" }} />
            <Form className="d-flex align-items-center">
              <LogoutButton />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  );
}

export default NavBar;
