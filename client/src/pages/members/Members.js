import React from "react";
import { useState, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Alert, Table, Button, Modal, Stack, Spinner } from "react-bootstrap";
import { PencilSquare, Trash, ListCheck, PersonVcard } from "react-bootstrap-icons";
import moment from "moment";

import CreateMember from "./components/CreateMember";
import MemberAttendance from "./components/MemberAttendance";

import styles from "./Members.module.css";
import Search from "./components/Search";
import MemberInfo from "../events/components/MemberInfo";

const Members = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [singleMember, setSingleMember] = useState({});
  const [formAction, setFormAction] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [showMemberInfoModal, setShowMemberInfoModal] = useState([false, 0]);
  const [showDeleteModal, setShowDeleteModal] = useState([false, 0]);
  const [showAttendanceModal, setShowAttendanceModal] = useState([false, 0]);
  const [reqInProcess, setReqInProcess] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    color: "",
    "message": "",
    data: ""
  });
  const [outerNot, setOuterNot] = useState({
    show: false,
    color: "",
    "message": ""
  });

  async function getMembers() {
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMembers();
  }, []);

  const create = () => {
    setFormAction("create");
    setReqInProcess(false);
    setNotification({ show: false, color: "", message: "" });
    setShowFormModal(true);
  };

  const update = (id) => {
    setFormAction("update");
    setSingleMember(members.filter((member) => member.id === id)[0]);
    setReqInProcess(false);
    setNotification({ show: false, color: "", message: "" });
    setShowFormModal(true);
  };

  const createMember = (member) => {
    setMembers([...members, member]);
  };

  const updateMember = (member) => {
    setMembers(members.map((mem) => (mem.id === member.id ? member : mem)));
  };

  const deleteMember = async (id) => {
    setReqInProcess(true);
    setNotification({ show: false, color: "", message: "" });

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "",
        },
      });

      const res = await fetch(`/api/members/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.status === 200) {
        setMembers(members.filter((member) => member.id !== id));
        setShowDeleteModal([false, 0]);
        setReqInProcess(false);

        setOuterNot({ show: true, color: "success", message: "Member deleted." });
        window.scrollTo(0, 0);
      } else {
        const data = await res.json();
        console.log(data);
        setNotification({ show: true, color: "danger", message: "There was a problem." });
        setReqInProcess(false);
      }
    } catch (e) {
      console.log(e.message);
      setNotification({ show: true, color: "danger", message: "There was a problem." });
      setReqInProcess(false);
    }
  };

  return (
    <>
      <Modal size="xl" show={showMemberInfoModal[0]} onHide={() => setShowMemberInfoModal([false, 0])}>
        <Modal.Header closeButton>
          <Modal.Title>Member Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MemberInfo
            showMemberInfoModal={showMemberInfoModal}
            setShowMemberInfoModal={setShowMemberInfoModal}
          />
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

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
            notification={notification}
            setNotification={setNotification}
            setOuterNot={setOuterNot}
          />
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal[0]} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are You Sure?
          {notification.show && (
            <Alert className="mt-3" variant={notification.color}>
              {notification.message}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteMember(showDeleteModal[1])} disabled={reqInProcess}>
            Yes
            {reqInProcess &&
              <Spinner className="ms-2" animation="border" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
              </Spinner>}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAttendanceModal[0]} onHide={() => setShowAttendanceModal([false, 0])}>
        <Modal.Header closeButton>
          <Modal.Title>Attendance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MemberAttendance memberId={showAttendanceModal[1]} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      {outerNot.show && (
        <Alert className="text-center" variant={outerNot.color} onClose={() => setOuterNot(false)} dismissible>
          {outerNot.message}
        </Alert>
      )}

      <h1 className={styles.heading}>Members</h1>

      <div className="text-center">
        <Button variant="success" onClick={create} className="mb-4">
          Add New
        </Button>
      </div>

      <Search
        setMembers={setMembers}
        getMembers={getMembers}
        reqInProcess={reqInProcess}
        setReqInProcess={setReqInProcess}
      />

      {loading && (
        <Spinner className="spinner-main" animation="border" role="status" size="lg">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!loading && (
        <Table striped bordered hover style={{ tableLayout: "fixed", wordWrap: "break-word" }}>
          <thead>
            <tr>
              <th>Member ID</th>
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
                <td>{member["g_id"]}</td>
                <td>{member["first_name"]}</td>
                <td>{member["last_name"]}</td>
                <td>{member["gender"]}</td>
                <td>{member["email"]}</td>
                <td>{member["mobile"]}</td>
                <td>{moment(member["member_since"]).utcOffset("+0100").format("DD-MM-YYYY")}</td>
                <td>{member["created_by"]}</td>
                <td>
                  <Stack direction="horizontal" gap={3}>
                    <PersonVcard className={styles.icon} onClick={() => setShowMemberInfoModal([true, member.id])} />
                    <PencilSquare className={styles.icon} onClick={() => update(member.id)} />
                    <Trash className={styles.icon} onClick={() => {
                      setReqInProcess(false); setNotification({ show: false, color: "", message: "" }); setShowDeleteModal([true, member.id]);
                    }} />
                    <ListCheck className={styles.icon} onClick={() => setShowAttendanceModal([true, member.id])} />
                  </Stack>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default withAuthenticationRequired(Members);