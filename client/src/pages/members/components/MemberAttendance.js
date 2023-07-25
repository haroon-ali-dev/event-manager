import { useState, useEffect } from "react";
import { Table, Spinner } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";

export default function MemberAttendance({ memberId }) {
    const [loading, setLoading] = useState(false);
    const [attendance, setAttendance] = useState([]);

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        async function getAttendance() {
            setLoading(true);

            try {
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "https://d3n27sahgwxchw.cloudfront.net/",
                    },
                });

                const res = await fetch(`/api/attendance/member/${memberId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const data = await res.json();
                setAttendance(data);

            } catch (e) {
                console.log(e.message);
            } finally {
                setLoading(false);
            }
        }

        getAttendance();
    }, []);

    return (
        <>
            {loading && (
                <Spinner className="spinner-main" animation="border" role="status" size="md">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
            {!loading && (
                <>
                    {attendance.length <= 0 && (
                        <div className="text-center">Member hasn't attended any events.</div>
                    )}
                    {attendance.length >= 1 && (
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
                                        <td>{moment(aItem["date"]).utcOffset("+0100").format("DD-MM-YYYY")}</td>
                                        <td>{aItem["name"]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </>
            )}

        </>
    );
}