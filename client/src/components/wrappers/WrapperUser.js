import { Outlet } from "react-router-dom";


export default function WrapperUser() {
    return (
        <div className="text-center">
            <Outlet />
        </div>
    );
}
