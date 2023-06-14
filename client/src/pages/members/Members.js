import React from "react";
import { useState, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import styles from "./Members.module.css";

const Members = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [members, setMembers] = useState([]);
  const [formAction, setFormAction] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [reqInProcess, setReqInProcess] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const create = () => {
    setFormAction("create");
    setReqInProcess(false);
    setErrorAlert(false);
    setShowFormModal(true);
  };

  useEffect(() => {
    async function getMembers() {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "",
          },
        });

        const res = await fetch("/api/members", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const members = await res.json();
        setMembers(members);

      } catch (e) {
        console.log(e.message);
      }
    }

    getMembers();
  }, []);

  return (
    <>
      <Modal size="lg" show={showFormModal} onHide={() => setShowFormModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{formAction === "create" ? "Create Member" : "Edit Member"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

      <h1 className={styles.heading}>Members</h1>

      <div className="text-center">
        <Button variant="success" onClick={create} className="mb-4">
          Add New
        </Button>
      </div>

      <Table striped bordered hover style={{ tableLayout: "fixed", wordWrap: "break-word" }}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, i) => (
            <tr key={i}>
              <td>{member["first_name"]}</td>
              <td>{member["last_name"]}</td>
              <td>{member["gender"]}</td>
              <td>{member["email"]}</td>
              <td>{member["mobile"]}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default withAuthenticationRequired(Members);