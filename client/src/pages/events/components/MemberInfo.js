import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

export default function MemberInfo({ showMemberInfoModal, setShowMemberInfoModal }) {
    const { getAccessTokenSilently } = useAuth0();

    // async function getMemberInfo() {
    //     try {
    //         const accessToken = await getAccessTokenSilently({
    //             authorizationParams: {
    //                 audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "",
    //             },
    //         });

    //         const res = await fetch("/api/members", {
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`,
    //             },
    //         });

    //         const members = await res.json();
    //         setMembers(members);

    //     } catch (e) {
    //         console.log(e.message);
    //     }
    // }

    // useEffect(() => {
    //     getMemberInfo();
    // }, []);

    return (
        <Modal size="lg" show={showMemberInfoModal[0]} onHide={() => setShowMemberInfoModal([false, 0])}>
            <Modal.Header closeButton>
                <Modal.Title>Member Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showMemberInfoModal[1]}
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}