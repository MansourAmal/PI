import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Typography,
  List,
  Calendar,
  Badge,
  Form,
  Input,
  Modal,
  message,
} from "antd";
import "./styles/profilcli.css";
import "antd/dist/reset.css";

const { Title } = Typography;

const ProfileClient = (props) => {
  // Déclarations des états pour gérer l'affichage et les données du client
  const [view, setView] = useState("welcome"); // Vue actuelle du profil (accueil, informations, rendez-vous, etc.)
  const [isEditing, setIsEditing] = useState(false); // État pour gérer la modification du profil
  const [isDeactivating, setIsDeactivating] = useState(false); // État pour gérer la désactivation du compte

  // État pour stocker les informations du client
  const [clientData, setClientData] = useState({
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    nbReservations: 0,
    nbRendezVous: 0,
  });

  // États pour stocker les réservations et les rendez-vous
  const [reservations, setReservations] = useState([]); // Liste des réservations du client
  const [appointments, setAppointments] = useState([]); // Liste des rendez-vous du client

  // Récupération des données via l'API (client, réservations, rendez-vous)
  useEffect(() => {
    // Récupérer les données du client
    fetch("https://api.example.com/client")
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

    // Récupérer les réservations
    fetch("https://api.example.com/reservations")
      .then((response) => response.json())
      .then((data) => {
        setReservations(data); // Mettre à jour l'état des réservations
      })
      .catch((error) => {
        console.error("Erreur de récupération des réservations:", error);
        message.error("Erreur lors de la récupération des réservations.");
      });

    // Récupérer les rendez-vous
    fetch("https://api.example.com/appointments")
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data); // Mettre à jour l'état des rendez-vous
      })
      .catch((error) => {
        console.error("Erreur de récupération des rendez-vous:", error);
        message.error("Erreur lors de la récupération des rendez-vous.");
      });
  }, []); // Cette fonction ne s'exécute qu'une seule fois lors du chargement initial

  // Fonction de gestion de la modification du profil
  const handleEditProfile = (values) => {
    setClientData({ ...clientData, ...values }); // Met à jour les données du client avec les nouvelles valeurs
    setIsEditing(false); // Ferme le modal de modification
    message.success("Profil mis à jour avec succès");
  };

  // Fonction de gestion de la désactivation du compte
  const handleDeactivateAccount = () => {
    setIsDeactivating(false); // Ferme le modal de désactivation
    message.success("Compte désactivé avec succès");
  };

  // Rendu du contenu basé sur la vue actuelle (profil, rendez-vous, réservations, etc.)
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
                    title={`Rendez-vous avec ${appointment.prestataire}`} // Affiche le prestataire pour chaque rendez-vous
                    description={`Date: ${appointment.date} - Heure: ${appointment.heure}`} // Affiche la date et l'heure
                  />
                  <Button type="primary">Confirmer</Button>{" "}
                  {/* Ajouter fonctionnalité de confirmation */}
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
                    title={`Service: ${reservation.service}`} // Affiche le service réservé
                    description={`Date: ${reservation.date}`} // Affiche la date de la réservation
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
                ); // Filtre les rendez-vous par date
                return appointmentsOnDate.length ? (
                  <ul className="calendar-event">
                    {appointmentsOnDate.map((item) => (
                      <li key={item.id}>
                        <Badge status="processing" text={item.heure} />{" "}
                        {/* Affiche les horaires de rendez-vous */}
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
            <p>Nombre de réservations : {clientData.nbReservations}</p>{" "}
            {/* Affiche le nombre de réservations */}
            <p>Nombre de rendez-vous : {clientData.nbRendezVous}</p>{" "}
            {/* Affiche le nombre de rendez-vous */}
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

      {/* Modal pour modifier les informations */}
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

      {/* Modal de confirmation pour la désactivation */}
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
