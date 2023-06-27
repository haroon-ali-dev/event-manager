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

const today = new Date();

function parseDateString(value, originalValue) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsedDate;
}

const schema = yup.object({
  firstName: yup.string().min(3).max(150).required().label("First Name"),
  lastName: yup.string().min(3).max(150).required().label("Last Name"),
  gender: yup.string().required("Please select a gender.").label("Gender"),
  dateOfBirth: yup.date().transform(parseDateString).max(today).label("Date of Birth"),
  address: yup.string().min(3).max(300).required().label("Address"),
  postCode: yup.string().min(3).max(20).required().label("Post Code"),
  email: yup.string().max(256).email().required().label("Email"),
  mobile: yup.string().min(3).max(11).required().label("Mobile"),
  additionalInfo: yup.string().max(1000).label("Additional Info"),
}).required();

export default function CreateMember({
  formAction,
  createMember,
  updateMember,
  singleMember,
  setShowFormModal,
  reqInProcess,
  setReqInProcess,
  errorAlert,
  setErrorAlert,
}) {
  const { getAccessTokenSilently, user } = useAuth0();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: formAction === "update" ? singleMember.first_name : "",
      lastName: formAction === "update" ? singleMember.last_name : "",
      gender: formAction === "update" ? singleMember.gender : "",
      dateOfBirth: formAction === "update" ? moment(singleMember.date_of_birth).utcOffset("+0100").format("YYYY-MM-DD") : "",
      address: formAction === "update" ? singleMember.address : "",
      postCode: formAction === "update" ? singleMember.post_code : "",
      address: formAction === "update" ? singleMember.address : "",
      email: formAction === "update" ? singleMember.email : "",
      mobile: formAction === "update" ? singleMember.mobile : "",
      additionalInfo: formAction === "update" ? singleMember.additional_info : "",
    },
  });

  const onSubmit = async (data) => {
    data.dateOfBirth = moment(data.dateOfBirth).utcOffset("+0100").format("YYYY-MM-DD");
    data.userName = user.name;

    setReqInProcess(true);
    setErrorAlert(false);

    if (formAction === "create") {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "",
          },
        });

        const res = await fetch("/api/members", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        });

        if (res.status === 200) {
          const member = await res.json();
          createMember(member);
          setReqInProcess(false);
          setShowFormModal(false);

          const emailRes = await fetch("/api/sendmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              to: member.email,
              data: member,
            }),
          });
          if (emailRes.status === 200) {
            console.log("Email sent successfully.");
          } else {
            console.log("Failed to send email.");
          }

        } else {
          const data = await res.json();
          console.log(data);
          setReqInProcess(false);
          setErrorAlert(true);
        }
      } catch (e) {
        console.log(e.message);
        setReqInProcess(false);
        setErrorAlert(true);
      }
    }

    if (formAction === "update") {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "",
          },
        });

        const res = await fetch(`/api/members/${singleMember.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        });

        if (res.status === 200) {
          const member = await res.json();
          updateMember(member);
          setReqInProcess(false);
          setShowFormModal(false);
        } else {
          const data = await res.json();
          console.log(data);
          setReqInProcess(false);
          setErrorAlert(true);
        }
      } catch (e) {
        console.log(e.message);
        setReqInProcess(false);
        setErrorAlert(true);
      }
    }
  };

  return (
    <Form className="w-75 mx-auto mt-3" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="firstName">
        <Row>
          <Col>
            <Form.Label>First Name</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="text"
              {...register("firstName")}
              isInvalid={errors.firstName?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstName?.message}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3" controlId="lastName">
        <Row>
          <Col>
            <Form.Label>Last Name</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="text"
              {...register("lastName")}
              isInvalid={errors.lastName?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastName?.message}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3" controlId="gender">
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

      <Form.Group className="mb-3" controlId="dateOfBirth">
        <Row>
          <Col>
            <Form.Label>Date of Birth</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="date"
              {...register("dateOfBirth")}
              isInvalid={errors?.dateOfBirth}
            />
            <Form.Control.Feedback type="invalid">
              {errors.dateOfBirth?.message}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3" controlId="address">
        <Row>
          <Col>
            <Form.Label>Address</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="text"
              {...register("address")}
              isInvalid={errors.address?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address?.message}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3" controlId="postCode">
        <Row>
          <Col>
            <Form.Label>Post Code</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="text"
              {...register("postCode")}
              isInvalid={errors.postCode?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.postCode?.message}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Row>
          <Col>
            <Form.Label>Email</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="text"
              {...register("email")}
              isInvalid={errors.email?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3" controlId="mobile">
        <Row>
          <Col>
            <Form.Label>Mobile</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="text"
              {...register("mobile")}
              isInvalid={errors.mobile?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.mobile?.message}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3" controlId="additionalInfo">
        <Row>
          <Col>
            <Form.Label>Additional Info</Form.Label>
          </Col>
          <Col>
            <Form.Control
              as="textarea"
              {...register("additionalInfo")}
              isInvalid={errors.additionalInfo?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.additionalInfo?.message}
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