import React from "react";
import { Row, Col, Badge } from "react-bootstrap";

const AdminMessagesGrid = ({ messages }) => {
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

  const MessagesCard = ({ item }) => (
    <div className="admin-card">
      <div className="card-header-row">
        <div className="card-name">{item.name}</div>
        <i className="fa-solid fa-eye eye-icon" title="Detay" />
      </div>

      <Row className="g-3">
        <InfoField label="Telefon" value={item.phone} />
        <InfoField label="E-mail" value={item.email} />
        <InfoField label="Mesaj" value={item.note} />
        <InfoField label="Gönderilme Tarihi" value={item.current_date} />
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
    <div className="text-center text-muted py-4">Gösterilecek mesaj yok.</div>
  );

  return (
    <div className="messages-container">
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
          <Col style={{ flex: 0.8 }} className="text-end">
            İşlem
          </Col>
        </Row>

        {messages.length > 0 ? (
          messages.map((item) => (
            <Row
              key={item.id}
              className="align-items-center border-bottom py-2 hover-bg-light flex-nowrap"
            >
              <Col
                style={{ flex: 2 }}
                className="fw-semibold text-dark text-start"
              >
                {item.name}
              </Col>
              <Col style={{ flex: 2 }}>{item.phone}</Col>
              <Col style={{ flex: 2 }}>{item.email}</Col>
              <Col style={{ flex: 2.5 }}>{item.note}</Col>
              <Col style={{ flex: 2 }}>{item.current_date}</Col>
              <Col style={{ flex: 1 }}>{getStatusBadge(item.status)}</Col>
              <Col style={{ flex: 0.8 }} className="text-end">
                <i
                  className="fa-solid fa-eye text-primary"
                  style={{ cursor: "pointer", fontSize: "1rem" }}
                  title="Detay"
                />
              </Col>
            </Row>
          ))
        ) : (
          <EmptyState />
        )}
      </div>

      <div className="d-md-none">
        {messages.length > 0 ? (
          messages.map((item) => (
            <MessagesCard key={item.id} item={item} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default AdminMessagesGrid;
