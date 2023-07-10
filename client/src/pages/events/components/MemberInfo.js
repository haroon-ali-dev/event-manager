import { Modal } from "react-bootstrap";

export default function MemberInfo({ showMemberInfoModal, setShowMemberInfoModal }) {
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