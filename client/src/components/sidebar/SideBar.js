import { Nav } from "react-bootstrap";
import { House, People, Calendar } from "react-bootstrap-icons";

import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.css";



function SideBar() {
  const { isAuthenticated } = useAuth0();

  return (
      isAuthenticated && (
          <div className={styles.sidebar} >
              <Nav className="flex-column">
                <Nav.Link to="/dashboard" as={Link}><House  size={20} style={{ marginRight:"10px" }}></House> Dashboard</Nav.Link>
              <Nav.Link to="/members" as={Link}><People size={20} style={{ marginRight:"10px" }}></People> Members</Nav.Link>
              <Nav.Link to="/events" as={Link}><Calendar size={20} style={{ marginRight:"10px" }}></Calendar> Events</Nav.Link>
      </Nav>
    </div>
          )
  );
}

export default SideBar;