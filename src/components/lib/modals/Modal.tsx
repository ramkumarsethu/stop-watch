import React, { PropsWithChildren } from 'react';
import { Modal, ModalProps as BootModalProps, ModalHeaderProps } from 'react-bootstrap';

type ModalProps = PropsWithChildren<{
  showModal: boolean;
  handleClose: () => void;
  title: string;
  floatingBackdrop?: BootModalProps['backdrop'];
  showCloseButton?: ModalHeaderProps['closeButton'];
  modalSize?: BootModalProps['size'];
}>;

const BasicModal: React.FC<ModalProps> = ({
  title,
  children,
  handleClose,
  showModal,
  floatingBackdrop = true,
  showCloseButton = true,
  modalSize = 'lg'
}: ModalProps) => {
  return (
    <Modal
      size={modalSize}
      show={showModal}
      onHide={handleClose}
      centered
      backdrop={floatingBackdrop}>
      <Modal.Header closeButton={showCloseButton}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default BasicModal;
