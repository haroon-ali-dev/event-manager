
import { Outlet } from "react-router-dom";
import SideBar from "../sidebar/SideBar";

export default function WrapperAdmin() {


  return (
          <div className="container-fluid">
              <div className="row">
                  <div className="col-md-2">
                        <SideBar />
                  </div>
                  <div className="col-md-10">
                      <Outlet />
                  </div>
              </div>
          </div>
  );
}
