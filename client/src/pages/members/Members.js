import React from "react";
import { useState, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import moment from "moment";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import { PencilSquare } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons';

import styles from "./Members.module.css";
import CreateMember from "./components/CreateMember";

const Members = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [members, setMembers] = useState([]);
  const [singleMember, setSingleMember] = useState({});
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

  const update = (id) => {
    setFormAction("update");
    setSingleMember(members.filter((member) => member.id === id)[0]);
    setReqInProcess(false);
    setErrorAlert(false);
    setShowFormModal(true);
  };

  const createMember = (member) => {
    setMembers([...members, member]);
  };

  const updateMember = (member) => {
    setMembers(members.map((mem) => (mem.id === member.id ? member : mem)));
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
          <CreateMember
            formAction={formAction}
            createMember={createMember}
            updateMember={updateMember}
            singleMember={singleMember}
            setShowFormModal={setShowFormModal}
            reqInProcess={reqInProcess}
            setReqInProcess={setReqInProcess}
            errorAlert={errorAlert}
            setErrorAlert={setErrorAlert}
          />
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
            <th>Member Since</th>
            <th>Created By</th>
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
              <td>{moment(member["member_since"]).utcOffset('+0100').format('DD-MM-YYYY')}</td>
              <td>{member["created_by"]}</td>
              <td>
                <Stack direction="horizontal" gap={3}>
                  <PencilSquare className={styles.icon} onClick={() => update(member.id)} />
                  <Trash className={styles.icon} onClick={() => { setReqInProcess(false); setErrorAlert(false); setShowDeleteModal([true, ngo.id]); }} />
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default withAuthenticationRequired(Members);