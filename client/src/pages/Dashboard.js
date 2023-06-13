import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const Dashboard = () => {

  return (
    <div>Dashboard
    </div>

  );
};

export default withAuthenticationRequired(Dashboard);