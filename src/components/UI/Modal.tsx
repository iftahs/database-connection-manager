import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

interface ModalProps {
    onClose?: () => void;
    children: React.ReactNode;
}

export type ModalHandle = {
    openModal: () => void;
    closeModal: () => void;
};

const Dialog = styled.dialog`
    position: fixed;
    background-color: white;
    border: 1px solid black;
    padding: 1rem;
    z-index: 100;
    border-radius: 16px;

    &::backdrop {
        background-color: rgba(0, 0, 0, 0.7);
    }

    @media (max-width: 600px) {
        width: 80%;
    }
`;

const CloseBUtton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 0.5rem;
`;

const Modal = forwardRef<ModalHandle, ModalProps>(
    ({ onClose, children }, ref) => {
        const dialog = useRef<HTMLDialogElement | null>(null);

        useImperativeHandle(ref, () => ({
            openModal() {
                dialog.current?.showModal();
            },
            closeModal() {
                dialog.current?.close();
            }
        }));

        const handleClose = () => {
            dialog.current?.close();
            onClose?.();
        };

        return createPortal(
            <Dialog ref={dialog} onClose={onClose}>
                <CloseBUtton onClick={handleClose}>X</CloseBUtton>
                <div>{children}</div>
            </Dialog>,
            document.getElementById("modal-root")!
        );
    }
);

export default Modal;
