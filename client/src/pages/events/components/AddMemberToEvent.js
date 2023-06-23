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
  memberId: yup.string().min(3).max(10).required().label("Member ID")
}).required();

export default function AddMemberToEvent({
  addMemberToEvent,
  ssetShowPersonAddModal,
  reqInProcess,
  setReqInProcess,
  errorAlert,
  setErrorAlert
}) {
  const { getAccessTokenSilently, user } = useAuth0();

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
        </Row>
      </Form.Group>

      <div className="container-btn mt-4 mb-2">
        <Button variant="success" type="submit" disabled={reqInProcess}>
          Add
          {reqInProcess &&
            <Spinner className="ms-2" animation="border" role="status" size="sm">
              <span className="visually-hidden">Loading...</span>
            </Spinner>}
        </Button>

        {errorAlert &&
          <Alert className="mt-3" variant="danger">
            There was a problem. Please try again.
          </Alert>}
      </div>
    </Form>
  );
}