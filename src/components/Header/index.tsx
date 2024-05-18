import { useRef, useState, useContext } from "react";
import { DatabasesContext } from "../../store/databases-context";
import { Container } from "./styled";
import { Button } from "../UI";

import Modal, { ModalHandle } from "../UI/Modal";
import AddDatabase from "../AddDatabase";
import ErrorViewer from "../ErrorViewer";

const Header: React.FC = () => {
    const modalRef = useRef<ModalHandle>(null);
    const [addingDatabase, setAddingDatabase] = useState<boolean>(false);
    const { error, resetError } = useContext(DatabasesContext);

    const handleAddDatabase = () => {
        setAddingDatabase(true);
        modalRef.current?.openModal();
    };

    if (error) {
        modalRef.current?.openModal();
    }

    const handleClose = () => {
        setAddingDatabase(false);
        if (error) {
            resetError();
        }
    };

    const onFinishAddDatabase = () => {
        setAddingDatabase(false);
        modalRef.current?.closeModal();
    };

    return (
        <Container>
            <h1>Database <span>Management</span> <span>System</span></h1>
            <Button onClick={handleAddDatabase}>+ Add New Database</Button>
            <Modal ref={modalRef} onClose={handleClose}>
                {addingDatabase ? <AddDatabase onFinishAddDatabase={onFinishAddDatabase} /> : null}
                {error ? <ErrorViewer error="error" /> : null}
            </Modal>
        </Container>
    );
};

export default Header;