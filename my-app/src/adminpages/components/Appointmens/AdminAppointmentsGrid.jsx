import React, { useState } from "react";
import { Row, Col, Badge } from "react-bootstrap";
import AppointmensModal from "./AppointmentsModal";

const AdminAppointmentsGrid = ({ appointments, onUpdateStatus }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const statusConfig = {
    Bekleyen: { bg: "warning", text: "Bekliyor" },
    Onaylı: { bg: "success", text: "Onaylı" },
    Tamamlandı: { bg: "primary", text: "Tamamlandı" },
    İptal: { bg: "danger", text: "İptal" },
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

  const handleApprove = (id) => {
    onUpdateStatus(id, "Onaylı");
  };

  const handleReject = (id) => {
    onUpdateStatus(id, "İptal");
  };

  const handleComplete = (id) => {
    onUpdateStatus(id, "Tamamlandı");
  };

  const handleCancel = (id) => {
    onUpdateStatus(id, "İptal");
  };

  const AppointmentCard = ({ item }) => (
    <div className="admin-card">
      <div className="card-header-row">
        <div className="card-name">{item.name}</div>
        <i 
          className="fa-solid fa-eye eye-icon" 
          title="Detay" 
          style={{ cursor: "pointer" }} 
          onClick={() => handleOpenModal(item)} 
        />
      </div>

      <Row className="g-3">
        <InfoField label="Telefon" value={item.phone} />
        <InfoField label="Hizmet" value={item.service} />
        <InfoField label="Tarih" value={item.date} />
        <InfoField label="Saat" value={item.time} />
        <Col xs={12}>
          <div className="card-label">Durum</div>
          <div>{getStatusBadge(item.status)}</div>
        </Col>
      </Row>
    </div>
  );

  const InfoField = ({ label, value }) => (
    <Col xs={6}>
      <div className="card-label">{label}</div>
      <div className="card-value">{value}</div>
    </Col>
  );

  const EmptyState = () => (
    <div className="text-center text-muted py-4">Hiç randevu bulunamadı.</div>
  );

  return (
    <div className="appointment-container">
      <div className="admin-form d-none d-md-block">
        <Row className="fw-semibold text-secondary border-bottom pb-2 mb-2 flex-nowrap">
          <Col style={{ flex: 2.5 }} className="text-start">
            Müşteri
          </Col>
          <Col style={{ flex: 2 }}>Numara</Col>
          <Col style={{ flex: 2 }}>Hizmet</Col>
          <Col style={{ flex: 1.5 }}>Tarih</Col>
          <Col style={{ flex: 1 }}>Saat</Col>
          <Col style={{ flex: 1 }}>Durum</Col>
          <Col style={{ flex: 0.8 }} className="text-end">
            İşlem
          </Col>
        </Row>

        {appointments.length > 0 ? (
          appointments.map((item) => (
            <Row
              key={item.id}
              className="align-items-center border-bottom py-2 hover-bg-light flex-nowrap"
            >
              <Col
                style={{ flex: 2.5 }}
                className="fw-semibold text-dark text-start"
              >
                {item.name}
              </Col>
              <Col style={{ flex: 2 }}>{item.phone}</Col>
              <Col style={{ flex: 2 }}>{item.service}</Col>
              <Col style={{ flex: 1.5 }}>{item.date}</Col>
              <Col style={{ flex: 1 }}>{item.time}</Col>
              <Col style={{ flex: 1 }}>{getStatusBadge(item.status)}</Col>
              <Col style={{ flex: 0.8 }} className="text-end">
                <i
                  className="fa-solid fa-eye text-primary"
                  style={{ cursor: "pointer", fontSize: "1rem" }}
                  title="Detay"
                  onClick={() => handleOpenModal(item)}
                />
              </Col>
            </Row>
          ))
        ) : (
          <EmptyState />
        )}
      </div>

      <div className="d-md-none">
        {appointments.length > 0 ? (
          appointments.map((item) => (
            <AppointmentCard key={item.id} item={item} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>

      <AppointmensModal
        show={showModal}
        onClose={handleCloseModal}
        message={selectedMessage}
        getStatusBadge={getStatusBadge}
        onApprove={handleApprove}
        onReject={handleReject}
        onComplete={handleComplete}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default AdminAppointmentsGrid;