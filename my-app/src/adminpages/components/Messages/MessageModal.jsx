import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col,Card, CardBody } from "react-bootstrap";

const MessageModal = ({ show, onClose, message, getStatusBadge }) => {
  const [modalSize, setModalSize] = useState("lg");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setModalSize("sm");
      } else {
        setModalSize("lg");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!message) return null;

  return (
    <Modal show={show} onHide={onClose} centered size={modalSize}>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">Mesaj Detayı</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
        <CardBody>
        <Row className="mb-2">
          <Col>
            <strong>Kişi Adı</strong>
            <div>{message.name}</div>
          </Col>
        </Row>

        <Row className="mb-2">
          <Col xs={12} md={6}>
            <strong>Telefon</strong>
            <div>{message.phone}</div>
          </Col>
          <Col xs={12} md={6}>
            <strong>Email</strong>
            <div>{message.email}</div>
          </Col>
        </Row>

        <Row className="mb-2">
          <Col xs={12} md={6}>
            <strong>Durum</strong>
            <div>{message.status}</div>
          </Col>
          <Col xs={12} md={6}>
            <strong>Tarih</strong>
            <div>{message.current_date}</div>
          </Col>
        </Row>

        <Row className="mb-2">
          <Col>
            <strong>Mesaj</strong>
            <div
              style={{
                border: "1px solid #888",
                padding: "10px",
                borderRadius: "5px",
                minHeight: "80px",
              }}
            >
              {message.note}
            </div>
          </Col>
        </Row>
        </CardBody>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Kapat
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageModal;
