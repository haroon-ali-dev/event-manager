import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import { QrCodeScan } from "react-bootstrap-icons";
import { Html5QrcodeScanner } from "html5-qrcode";

const schema = yup.object({
    memberId: yup.string().min(3).max(100).required().label("Member ID")
}).required();

export default function AddMemberToEventModal({
    showPersonAddModal,
    setShowPersonAddModal,
    reqInProcess,
    setReqInProcess,
    notification,
    setNotification,
    setOuterNot
}) {
    const { getAccessTokenSilently } = useAuth0();

    const [secondStage, setSecondStage] = useState([false, {}])

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(schema)
    });

    let html5QrcodeScanner;

    const scanQR = () => {
        setNotification({ show: false, color: "", message: "" });

        html5QrcodeScanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            false);

        html5QrcodeScanner.render(onScanSuccess);
    }

    async function onScanSuccess(decodedText) {
        try {
            await html5QrcodeScanner.clear();
            setValue("memberId", decodedText);
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async (formData) => {
        setReqInProcess(true);
        setNotification({ show: false, color: "", message: "" });

        try {
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "",
                },
            });

            const res = await fetch(`/api/add-member-to-event/${formData.memberId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });

            const data = await res.json();

            if (res.status === 200) {
                setReqInProcess(false);
                setValue("memberId", "");
                setSecondStage([true, { member: data, eventId: showPersonAddModal[1] }]);
                // setShowPersonAddModal(false);
                // setNotification({ show: true, color: "primary", message: "Member added to event.", data: showPersonAddModal[1] });

                // setOuterNot({ show: true, color: "success", message: "Member added to event." });
                // window.scrollTo(0, 0);
            } else {
                setReqInProcess(false);
                setNotification({ show: true, color: "danger", message: data.message });
            }
        } catch (e) {
            console.log(e.message);
            setReqInProcess(false);
            setNotification({ show: true, color: "danger", message: "There was a problem." });
        }
    };



    return (
        <Modal size="lg" show={showPersonAddModal[0]} onHide={async () => {
            setValue("memberId", "");
            setSecondStage([false, {}]);
            setNotification({ show: false, color: "", message: "" });
            if (html5QrcodeScanner) {
                try {
                    await html5QrcodeScanner.clear();
                    setShowPersonAddModal([false, 0]);
                } catch (error) {
                    console.log(error);
                }
            } else {
                setShowPersonAddModal([false, 0]);
            }
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Add Member To Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!secondStage[0] && (
                    <Form className="w-75 mx-auto mt-3" onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="memberId">
                            <Row>
                                <Col>
                                    <Form.Label>Member ID</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        {...register("memberId")}
                                        isInvalid={errors.memberId?.message}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.memberId?.message}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col>
                                    <QrCodeScan className="icon" style={{ fontSize: "29px", marginTop: "4px" }} onClick={scanQR} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <div id="reader" width="600px"></div>

                        <div className="container-btn mt-4 mb-2">
                            <Button variant="success" type="submit" disabled={reqInProcess}>
                                Add
                                {reqInProcess &&
                                    <Spinner className="ms-2" animation="border" role="status" size="sm">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>}
                            </Button>

                            {notification.show &&
                                <Alert className="mt-3" variant={notification.color}>
                                    {notification.message}
                                </Alert>}
                        </div>
                    </Form>
                )}
                {secondStage[0] && (
                    <p>{secondStage[1].member["first_name"]}</p>
                )}
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    );
}