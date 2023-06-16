import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const Events = () => {

  return (
    <div>Events</div>
  );
};

export default withAuthenticationRequired(Events);