import { Nav } from "react-bootstrap";
import { House, People, Calendar } from "react-bootstrap-icons";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation } from "react-router-dom";
import styles from "./SideBar.module.css";

function SideBar() {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();

  return (
    isAuthenticated && (
      <div className={styles.sidebar}>
        <Nav className="flex-column">
          <Nav.Link
            to="/dashboard"
            as={Link}
            className={location.pathname === "/dashboard" ? styles.active : ""}
          >
            <House size={20} style={{ marginRight: "10px" }} /> Dashboard
          </Nav.Link>
          <Nav.Link
            to="/members"
            as={Link}
            className={location.pathname === "/members" ? styles.active : ""}
          >
            <People size={20} style={{ marginRight: "10px" }} /> Members
          </Nav.Link>
          <Nav.Link
            to="/events"
            as={Link}
            className={location.pathname === "/events" ? styles.active : ""}
          >
            <Calendar size={20} style={{ marginRight: "10px" }} /> Events
          </Nav.Link>
        </Nav>
      </div>
    )
  );
}

export default SideBar;
