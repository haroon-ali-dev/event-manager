import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

export default function MemberAttendance({ memberId }) {
    const [attendance, setAttendance] = useState([]);

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        async function getAttendance() {
            try {
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "",
                    },
                });

                const res = await fetch(`/api/attendance/member/${memberId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const data = await res.json();
                console.log(data);
                setAttendance(data);

            } catch (e) {
                console.log(e.message);
            }
        }

        getAttendance();
    }, []);

    return (
        <Table striped bordered hover style={{ tableLayout: "fixed", wordWrap: "break-word" }}>
            <thead>
                <tr>
                    <th>Event Date</th>
                    <th>Event Name</th>
                </tr>
            </thead>
            <tbody>
                {attendance.map((aItem, i) => (
                    <tr key={i}>
                        <td>{aItem["date"]}</td>
                        <td>{aItem["name"]}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}