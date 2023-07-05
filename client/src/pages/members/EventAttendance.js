import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

export default function EventAttendance({ eventID }) {
    const [EventAttendance, setEventAttendance] = useState([]);

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        async function getAttendance() {
            try {
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "",
                    },
                });

                const res = await fetch(`/api/attendance/event/${eventID}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const data = await res.json();
                setEventAttendance(data);
                console.log(data);

            } catch (e) {
                console.log(e.message);
            }
        }

        getAttendance();
    }, []);

    return (
        <>
            {EventAttendance.length <= 0 && (
                <div className="text-center">No members attended to this event.</div>
            )}
            {EventAttendance.length >= 1 && (
                <Table striped bordered hover style={{ tableLayout: "fixed", wordWrap: "break-word" }}>
                    <thead>
                        <tr>
                            <th>Members ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {EventAttendance.map((aItem, i) => (
                            <tr key={i}>
                                <td>{aItem["g_id"]}</td>
                                <td>{aItem["first_name"]} {aItem["last_name"]}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
}