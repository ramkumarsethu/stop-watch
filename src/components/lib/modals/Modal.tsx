import React, { PropsWithChildren } from 'react';
import { Modal } from 'react-bootstrap';

type ModalProps = PropsWithChildren<{
  showModal: boolean;
  handleClose: () => void;
  title: string;
}>;

const BasicModal: React.FC<ModalProps> = ({
  title,
  children,
  handleClose,
  showModal
}: ModalProps) => {
  return (
    <Modal size="xl" show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default BasicModal;
