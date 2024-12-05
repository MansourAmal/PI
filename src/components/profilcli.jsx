import React, { useState, useEffect } from "react"; 
import { Card, Button, Typography, List, Calendar, Badge, Form, Input, Modal, message } from "antd";
import { useParams } from "react-router-dom";  
import "./styles/profilcli.css";
import "antd/dist/reset.css";

const { Title } = Typography;

const ProfileClient = (props) => {
  const { lid } = useParams();  
  const [view, setView] = useState("welcome");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const [clientData, setClientData] = useState({
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    nbReservations: 0,
    nbRendezVous: 0,
  });

  const [reservations, setReservations] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Récupérer les données du client en utilisant l'ID (lid)
    fetch(`http://127.0.0.1:5000/client/${lid}`)  // Utilisez l'ID du client dans l'URL
      .then((response) => response.json())
      .then((data) => {
        setClientData({
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          tel: data.tel,
          nbReservations: data.nbReservations,
          nbRendezVous: data.nbRendezVous,
        });
      })
      .catch((error) => {
        console.error("Erreur de récupération des données du client:", error);
        message.error("Erreur lors de la récupération des données client.");
      });

    fetch(`https://api.example.com/reservations/${lid}`)  // Récupérer les réservations spécifiques au client
      .then((response) => response.json())
      .then((data) => {
        setReservations(data);
      })
      .catch((error) => {
        console.error("Erreur de récupération des réservations:", error);
        message.error("Erreur lors de la récupération des réservations.");
      });

    fetch(`https://api.example.com/appointments/${lid}`)  // Récupérer les rendez-vous spécifiques au client
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data);
      })
      .catch((error) => {
        console.error("Erreur de récupération des rendez-vous:", error);
        message.error("Erreur lors de la récupération des rendez-vous.");
      });
  }, [lid]);  // Requête API à chaque changement de l'ID du client

  const handleEditProfile = (values) => {
    setClientData({ ...clientData, ...values });
    setIsEditing(false);
    message.success("Profil mis à jour avec succès");
  };

  const handleDeactivateAccount = () => {
    setIsDeactivating(false);
    message.success("Compte désactivé avec succès");
  };

  const renderContent = () => {
    switch (view) {
      case "profile":
        return (
          <div>
            <Title level={3}>Informations {clientData.nom}</Title>
            <p>
              <strong>Nom :</strong> {clientData.nom}
            </p>
            <p>
              <strong>Prénom :</strong> {clientData.prenom}
            </p>
            <p>
              <strong>Email :</strong> {clientData.email}
            </p>
            <p>
              <strong>Téléphone :</strong> {clientData.tel}
            </p>
            <Button type="primary" onClick={() => setIsEditing(true)}>
              Modifier les informations
            </Button>
            <Button
              type="danger"
              onClick={() => setIsDeactivating(true)}
              style={{ marginTop: "10px" }}
            >
              Désactiver le compte
            </Button>
          </div>
        );
      case "appointments":
        return (
          <div>
            <Title level={3}>Mes Rendez-vous</Title>
            <List
              itemLayout="horizontal"
              dataSource={appointments}
              renderItem={(appointment) => (
                <List.Item>
                  <List.Item.Meta
                    title={`Rendez-vous avec ${appointment.prestataire}`}
                    description={`Date: ${appointment.date} - Heure: ${appointment.heure}`}
                  />
                  <Button type="primary">Confirmer</Button>
                </List.Item>
              )}
            />
          </div>
        );
      case "reservations":
        return (
          <div>
            <Title level={3}>Mes Réservations</Title>
            <List
              itemLayout="horizontal"
              dataSource={reservations}
              renderItem={(reservation) => (
                <List.Item>
                  <List.Item.Meta
                    title={`Service: ${reservation.service}`}
                    description={`Date: ${reservation.date}`}
                  />
                </List.Item>
              )}
            />
          </div>
        );
      case "calendar":
        return (
          <div>
            <Title level={3}>Calendrier des Rendez-vous</Title>
            <Calendar
              fullscreen={false}
              dateCellRender={(date) => {
                const formattedDate = date.format("YYYY-MM-DD");
                const appointmentsOnDate = appointments.filter(
                  (app) => app.date === formattedDate,
                );
                return appointmentsOnDate.length ? (
                  <ul className="calendar-event">
                    {appointmentsOnDate.map((item) => (
                      <li key={item.id}>
                        <Badge status="processing" text={item.heure} />
                      </li>
                    ))}
                  </ul>
                ) : null;
              }}
            />
          </div>
        );
      default:
        return (
          <div>
            <Title level={3}>Bienvenue, {clientData.prenom} !</Title>
            <p>Nombre de réservations : {clientData.nbReservations}</p>
            <p>Nombre de rendez-vous : {clientData.nbRendezVous}</p>
          </div>
        );
    }
  };

  return (
    <div className="profile-client-container">
      <div className="left-bar">
        <h4 onClick={() => setView("welcome")} className="profile-link">
          Accueil
        </h4>
        <Button type="link" onClick={() => setView("profile")}>
          Consulter mes informations
        </Button>
        <Button type="link" onClick={() => setView("appointments")}>
          Mes Rendez-vous
        </Button>
        <Button type="link" onClick={() => setView("reservations")}>
          Mes Réservations
        </Button>
        <Button type="link" onClick={() => setView("calendar")}>
          Calendrier
        </Button>
      </div>
      <div className="card-content">
        <Card
          style={{ width: "100%" }}
          title={<Title level={3}>Profil {clientData.nom}</Title>}
          className="shadow-card"
        >
          {renderContent()}
        </Card>
      </div>

      <Modal
        title="Modifier le profil"
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        footer={null}
      >
        <Form initialValues={clientData} onFinish={handleEditProfile}>
          <Form.Item label="Nom" name="nom">
            <Input />
          </Form.Item>
          <Form.Item label="Prénom" name="prenom">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Téléphone" name="tel">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Enregistrer
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Désactiver le compte"
        visible={isDeactivating}
        onOk={handleDeactivateAccount}
        onCancel={() => setIsDeactivating(false)}
        okText="Désactiver"
        cancelText="Annuler"
      >
        <p>Êtes-vous sûr de vouloir désactiver votre compte ?</p>
      </Modal>
    </div>
  );
};

export default ProfileClient;
