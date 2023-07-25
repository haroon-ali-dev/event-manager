import { useState } from "react";
import { Container, Form, Nav, Navbar, Image, Button, Offcanvas } from "react-bootstrap";

import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.css";



function SideBar() {
  const { isAuthenticated } = useAuth0();

  return (
      isAuthenticated && (
          <div className={styles.sidebar} >
              <Nav className="flex-column">
                <Nav.Link to="/dashboard" as={Link}>Dashboard</Nav.Link>
              <Nav.Link to="/members" as={Link}>Members</Nav.Link>
              <Nav.Link to="/events" as={Link}>Events</Nav.Link>
      </Nav>
    </div>
          )
  );
}

export default SideBar;