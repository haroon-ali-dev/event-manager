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
import fieldData from "../../../../../data/fieldData";

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

  return (
    <Form className="w-75 mx-auto mt-3">
      
    </Form>
  );
}