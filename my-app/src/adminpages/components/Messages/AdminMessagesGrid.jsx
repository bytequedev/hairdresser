import React, { useState } from "react";
import { Row, Col, Badge, Button } from "react-bootstrap";
import MessageModal from "./MessageModal";

const AdminMessagesGrid = ({ messages, onMarkAsRead,onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const statusConfig = {
    Yeni: { bg: "warning", text: "Yeni" },
    Okundu: { bg: "success", text: "Okundu" },
  };

  const getStatusBadge = (status) => {
    const config = statusConfig[status] || { bg: "secondary", text: status };
    return (
      <Badge bg={config.bg} className="status-badge">
        {config.text}
      </Badge>
    );
  };

  const handleOpenModal = (item) => {
    setSelectedMessage(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
    setShowModal(false);
  };

  const InfoField = ({ label, value }) => (
    <Col xs={6}>
      <div className="card-label">{label}</div>
      <div className="card-value">{value}</div>
    </Col>
  );

  const MessagesCard = ({ item }) => (
    <div className="admin-card mb-3 p-3 shadow-sm rounded-3">
      <div className="card-header-row d-flex justify-content-between align-items-center">
        <div className="card-name fw-semibold">{item.name}</div>
        <div className="d-flex align-items-center gap-3">
          <i
            className="fa-solid fa-eye text-primary"
            title="Detay"
            style={{ cursor: "pointer" }}
            onClick={() => handleOpenModal(item)}
          />
          {item.status !== "Okundu" && (
            <i
              className="fa-solid fa-check text-success"
              title="Okundu olarak işaretle"
              style={{ cursor: "pointer" }}
              onClick={() => onMarkAsRead(item.id)}
            />
          )}
          <i
          className="fa-solid fa-trash text-danger"
          title="Mesajı sil"
          style={{ cursor: "pointer" }}
          onClick={() => onDelete(item.id)}
        />
        </div>
      </div>

      <Row className="g-3 mt-2">
        <InfoField label="Telefon" value={item.phone} />
        <InfoField label="E-mail" value={item.email || "-"} />
        <InfoField label="Mesaj" value={item.note} />
        <InfoField label="Gönderilme Tarihi" value={item.current_date} />
        <Col xs={12}>
          <div className="card-label">Durum</div>
          <div>{getStatusBadge(item.status)}</div>
        </Col>
      </Row>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center text-muted py-4">Gösterilecek mesaj yok.</div>
  );

  return (
    <div className="messages-container">
      {/* Masaüstü görünüm */}
      <div className="admin-form d-none d-md-block">
        <Row className="fw-semibold text-secondary border-bottom pb-2 mb-2 flex-nowrap">
          <Col style={{ flex: 2 }} className="text-start">
            Kişi Adı
          </Col>
          <Col style={{ flex: 2 }}>Numara</Col>
          <Col style={{ flex: 2 }}>E-mail</Col>
          <Col style={{ flex: 2.5 }}>Mesaj</Col>
          <Col style={{ flex: 2 }}>Tarih</Col>
          <Col style={{ flex: 1 }}>Durum</Col>
          <Col style={{ flex: 1.2 }} className="text-end">
            İşlem
          </Col>
        </Row>

        {messages.length > 0 ? (
          messages.map((item) => (
            <Row
              key={item.id}
              className="align-items-center border-bottom py-2 hover-bg-light flex-nowrap"
            >
              <Col style={{ flex: 2 }} className="fw-semibold text-dark text-start">
                {item.name}
              </Col>
              <Col style={{ flex: 2 }}>{item.phone}</Col>
              <Col style={{ flex: 2 }}>{item.email || "-"}</Col>
              <Col style={{ flex: 2.5 }}>{item.note}</Col>
              <Col style={{ flex: 2 }}>{item.current_date}</Col>
              <Col style={{ flex: 1 }}>{getStatusBadge(item.status)}</Col>
              <Col style={{ flex: 1.2 }} className="text-end">
  <i
    className="fa-solid fa-eye text-primary me-3"
    style={{ cursor: "pointer", fontSize: "1rem" }}
    title="Detay"
    onClick={() => handleOpenModal(item)}
  />
  {item.status !== "Okundu" && (
    <i
      className="fa-solid fa-check text-success me-3"
      style={{ cursor: "pointer", fontSize: "1rem" }}
      title="Okundu olarak işaretle"
      onClick={() => onMarkAsRead(item.id)}
    />
  )}
  <i
    className="fa-solid fa-trash text-danger"
    style={{ cursor: "pointer", fontSize: "1rem" }}
    title="Mesajı sil"
    onClick={() => onDelete(item.id)} // 🗑️
  />
</Col>

            </Row>
          ))
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Mobil görünüm */}
      <div className="d-md-none">
        {messages.length > 0 ? (
          messages.map((item) => <MessagesCard key={item.id} item={item} />)
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Modal */}
      <MessageModal
        show={showModal}
        onClose={handleCloseModal}
        message={selectedMessage}
        getStatusBadge={getStatusBadge}
      />
    </div>
  );
};

export default AdminMessagesGrid;
