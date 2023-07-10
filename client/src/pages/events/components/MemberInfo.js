import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";

export default function MemberInfo({ showMemberInfoModal }) {
    const { getAccessTokenSilently } = useAuth0();

    const [member, setMember] = useState({});

    async function getMemberInfo() {
        try {
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "",
                },
            });

            const res = await fetch(`/api/members/${showMemberInfoModal[1]}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const member = await res.json();
            setMember(member);

        } catch (e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        getMemberInfo();
    }, []);

    return (
        <Table striped bordered hover style={{ tableLayout: "fixed", wordWrap: "break-word" }}>
            <thead>
                <tr>
                    <th>Member ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Date of Birth</th>
                    <th>Address</th>
                    <th>Post Code</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Member Since</th>
                    <th>Created By</th>
                    <th>Additional Info</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{member["g_id"]}</td>
                    <td>{member["first_name"]}</td>
                    <td>{member["last_name"]}</td>
                    <td>{member["gender"]}</td>
                    <td>{moment(member["date_of_birth"]).utcOffset("+0100").format("DD-MM-YYYY")}</td>
                    <td>{member["address"]}</td>
                    <td>{member["post_code"]}</td>
                    <td>{member["email"]}</td>
                    <td>{member["mobile"]}</td>
                    <td>{moment(member["member_since"]).utcOffset("+0100").format("DD-MM-YYYY")}</td>
                    <td>{member["created_by"]}</td>
                    <td>{member["additional_info"]}</td>
                </tr>
            </tbody>
        </Table>
    );
}