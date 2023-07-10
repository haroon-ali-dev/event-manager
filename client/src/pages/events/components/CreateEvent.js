import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { parse, isDate } from "date-fns";
import moment from "moment";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

function parseDateString(value, originalValue) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsedDate;
}

const schema = yup.object({
  name: yup.string().min(3).max(150).required().label("Name"),
  date: yup.date().transform(parseDateString).label("Date"),
  information: yup.string().max(1000).label("Information"),
}).required();

export default function CreateEvent({
  formAction,
  createEvent,
  updateEvent,
  singleEvent,
  setShowFormModal,
  reqInProcess,
  setReqInProcess,
  notification,
  setNotification,
  setOuterNot
}) {
  const { getAccessTokenSilently, user } = useAuth0();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: formAction === "update" ? singleEvent.name : "",
      date: formAction === "update" ? singleEvent.date : "",
      information: formAction === "update" ? singleEvent.information : "",
    },
  });

  const onSubmit = async (data) => {
    data.date = moment(data.date).utcOffset("+0100").format("YYYY-MM-DD");
    data.userName = user.name;

    setReqInProcess(true);
    setNotification({ show: false, color: "", message: "" });

    if (formAction === "create") {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience:
              process.env.NODE_ENV === "development"
                ? "http://localhost:3000/api/"
                : "",
          },
        });

        const res = await fetch("/api/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        });

        if (res.status === 200) {
          const event = await res.json();
          createEvent(event);
          setReqInProcess(false);
          setShowFormModal(false);

          setOuterNot({ show: true, color: "success", message: "Event created." });
          window.scrollTo(0, 0);
        } else {
          const data = await res.json();
          console.log(data);
          setReqInProcess(false);
          setNotification({ show: false, color: "", message: "" });
        }
      } catch (e) {
        console.log(e.message);
        setReqInProcess(false);
        setNotification({ show: false, color: "", message: "" });
      }
    }

    if (formAction === "update") {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "",
          },
        });

        const res = await fetch(`/api/events/${singleEvent.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        });

        if (res.status === 200) {
          const event = await res.json();
          updateEvent(event);
          setReqInProcess(false);
          setShowFormModal(false);
        } else {
          const data = await res.json();
          console.log(data);
          setReqInProcess(false);
          setNotification({ show: false, color: "", message: "" });
        }
      } catch (e) {
        console.log(e.message);
        setReqInProcess(false);
        setNotification({ show: false, color: "", message: "" });
      }
    }
  };

  return (
    <Form className="w-75 mx-auto mt-3" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="name">
        <Row>
          <Col>
            <Form.Label>Name</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="text"
              {...register("name")}
              isInvalid={errors.name?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="date">
        <Row>
          <Col>
            <Form.Label>Date</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="date"
              {...register("date")}
              isInvalid={errors?.date}
            />
            <Form.Control.Feedback type="invalid">
              {errors.date?.message}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="information">
        <Row>
          <Col>
            <Form.Label>Information</Form.Label>
          </Col>
          <Col>
            <Form.Control
              as="textarea"
              {...register("information")}
              isInvalid={errors?.information?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.information?.message}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>

      <div className="container-btn mt-4 mb-2">
        {formAction === "create" && (
          <Button variant="success" type="submit" disabled={reqInProcess}>
            Add
            {reqInProcess && (
              <Spinner className="ms-2" animation="border" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </Button>
        )}
        {formAction === "update" && (
          <Button variant="warning" type="submit" disabled={reqInProcess}>
            Save
            {reqInProcess && (
              <Spinner className="ms-2" animation="border" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </Button>
        )}

        {notification.show && (
          <Alert className="mt-3" variant={notification.color}>
            {notification.message}
          </Alert>
        )}
      </div>
    </Form>
  );
}
