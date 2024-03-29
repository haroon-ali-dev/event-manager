import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./components/navigation/NavBar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/members/Members";
import Events from "./pages/events/Events";
import WrapperAdmin from "./components/wrappers/WrapperAdmin";
import WrapperUser from "./components/wrappers/WrapperUser";
import { Spinner } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return (
      <div style={{ paddingTop: "300px" }}>
        <Spinner className="spinner-main" animation="border" role="status" size="lg">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<WrapperUser />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/" element={<WrapperAdmin />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/events" element={<Events />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
