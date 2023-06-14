import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Alert from 'react-bootstrap/Alert';

const schema = yup.object({
  first_name: yup.string().min(3).max(150).required().label("First Name"),
  last_name: yup.string().min(3).max(150).required().label("Last Name"),
  gender: yup.string().required("Please select a gender.").label("Gender"),
}).required();

export default function CreateMember({
  formAction,
  createMember,
  setShowFormModal,
  reqInProcess,
  setReqInProcess,
  errorAlert,
  setErrorAlert
}) {
  const { getAccessTokenSilently } = useAuth0();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Form className="w-75 mx-auto mt-3" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="first_name">
        <Row>
          <Col>
            <Form.Label>First Name</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="text"
              {...register("first_name")}
              isInvalid={errors.first_name?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.first_name?.message}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3" controlId="last_name">
        <Row>
          <Col>
            <Form.Label>Last Name</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="text"
              {...register("last_name")}
              isInvalid={errors.last_name?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.last_name?.message}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group controlId="gender">
        <Row>
          <Col>
            <Form.Label>Gender</Form.Label>
          </Col>
          <Col>
            <Form.Select
              aria-label="gender"
              {...register("gender")}
              isInvalid={errors?.gender}
            >
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.gender?.message}
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