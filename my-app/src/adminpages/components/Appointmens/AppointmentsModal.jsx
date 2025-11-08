import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Card } from "react-bootstrap";

const AppointmensModal = ({ show, onClose, message, getStatusBadge, onApprove, onReject, onComplete, onCancel }) => {
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

  const isPending = message.status === "Bekleyen";
  const isApproved = message.status === "Onaylı";
  const isCancelled = message.status === "İptal";
  const isCompleted = message.status === "Tamamlandı";

  return (
    <Modal show={show} onHide={onClose} centered size={modalSize}>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">Randevu Detayı</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <Row className="mb-2">
              <Col xs={12} md={6}>
                <strong>Müşteri Adı</strong>
                <div>{message.name}</div>
              </Col>
              <Col xs={12} md={6}>
                <strong>Telefon</strong>
                <div>{message.phone}</div>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col xs={12} md={6}>
                <strong>Tarih</strong>
                <div>{message.date}</div>
              </Col>
              <Col xs={12} md={6}>
                <strong>Saat</strong>
                <div>{message.time}</div>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col xs={12} md={6}>
                <strong>Hizmet</strong>
                <div>{message.service}</div>
              </Col>
              <Col xs={12} md={6}>
                <strong>Durum</strong>
                <div>{getStatusBadge(message.status)}</div>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col>
                <strong>Not</strong>
                <div
                  style={{
                    border: "1px solid #888",
                    padding: "10px",
                    borderRadius: "5px",
                    minHeight: "80px",
                  }}
                >
                  {message.note || "Not bulunmamaktadır."}
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        {isPending && (
          <>
            <Button 
              variant="danger" 
              onClick={() => {
                onReject(message.id);
                onClose();
              }} 
              className="me-2"
            >
              <i className="fas fa-xmark me-1"></i> Reddet
            </Button>
            <Button 
              variant="success"
              onClick={() => {
                onApprove(message.id);
                onClose();
              }}
            >
              <i className="fas fa-check me-1"></i> Onayla
            </Button>
          </>
        )}

        {isApproved && (
          <>
            <Button 
              variant="danger" 
              onClick={() => {
                onCancel(message.id);
                onClose();
              }} 
              className="me-2"
            >
              <i className="fas fa-ban me-1"></i> İptal Et
            </Button>
            <Button 
              variant="primary"
              onClick={() => {
                onComplete(message.id);
                onClose();
              }}
            >
              <i className="fas fa-check-double me-1"></i> Tamamlandı
            </Button>
          </>
        )}

        {isCancelled && (
          <>
            <Button 
              variant="success" 
              onClick={() => {
                onApprove(message.id);
                onClose();
              }} 
              className="me-2"
            >
              <i className="fas fa-check me-1"></i> Onayla
            </Button>
            <Button 
              variant="secondary"
              onClick={onClose}
            >
              <i className="fas fa-times me-1"></i> Kapat
            </Button>
          </>
        )}

        {isCompleted && (
          <Button 
            variant="secondary"
            onClick={onClose}
          >
            <i className="fas fa-times me-1"></i> Kapat
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AppointmensModal;