import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface DeleteModalProps {
  text: string;
  show: boolean;
  onHide: () => void;
  onDeleteConfirm: () => void;
}
const DeleteModal = ({ show, onHide, text, onDeleteConfirm }:any) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Xác nhận xóa</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>Bạn có chắc muốn xóa:  {text}? </p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Hủy
      </Button>
      <Button variant="danger" onClick={onDeleteConfirm}>
        Xóa
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DeleteModal;