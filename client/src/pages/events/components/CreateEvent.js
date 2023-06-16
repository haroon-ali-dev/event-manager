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
  createMember,
  setShowFormModal,
  reqInProcess,
  setReqInProcess,
  errorAlert,
  setErrorAlert,
}) {
  const { getAccessTokenSilently } = useAuth0();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    data.date = moment(data.date).utcOffset("+0100").format("YYYY-MM-DD");
    console.log(data);
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
              type="textarea"
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
        {formAction === "create" &&
          <Button variant="success" type="submit" disabled={reqInProcess}>
            Add
            {reqInProcess &&
              <Spinner className="ms-2" animation="border" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
              </Spinner>}
          </Button>}
        {formAction === "update" &&
          <Button variant="warning" type="submit" disabled={reqInProcess}>
            Save
            {reqInProcess &&
              <Spinner className="ms-2" animation="border" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
              </Spinner>}
          </Button>}

        {errorAlert &&
          <Alert className="mt-3" variant="danger">
            There was a problem. Please try again.
          </Alert>}
      </div>
    </Form>
  );
}