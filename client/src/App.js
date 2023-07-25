import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./components/navigation/NavBar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/members/Members";
import Events from "./pages/events/Events";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SideBar from "../src/components/sidebar/SideBar";

const App = () => {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <SideBar />
          </div>
          <div className="col-md-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/members" element={<Members />} />
              <Route path="/events" element={<Events />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
