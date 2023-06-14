import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const Members = () => {

  return (
    <div>Members</div>
  );
};

export default withAuthenticationRequired(Members);