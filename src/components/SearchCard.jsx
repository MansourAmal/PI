import React, { useState } from "react";
import './styles/SearchCard.css'; 
import salleData from "./salleData"; // Assurez-vous d'importer vos données de salles

const SearchCard = () => {
  // State pour stocker le service sélectionné et afficher les résultats
  const [selectedService, setSelectedService] = useState("");
  const [result, setResult] = useState([]);
  
  // Liste des services disponibles
  const services = [
    { name: "Photographe", id: "photographe" },
    { name: "Traiteur", id: "traiteur" },
    { name: "Salle des fêtes", id: "salle_fetes" },
  ];

  // Gérer le changement dans le select
  const handleSelectChange = (event) => {
    setSelectedService(event.target.value);
  };

  // Gérer le clic sur le bouton Chercher
  const handleSearch = () => {
    if (selectedService === "Salle des fêtes") {
      // Filtrer salleData pour afficher uniquement les salles des fêtes
      setResult(salleData);
    } else {
      setResult([]); // Si un autre service est sélectionné, ne rien afficher
    }
  };

  return (
    <div className="search-card">
      <h2>Choisir un Service</h2>
      <div className="select-container">
        <select
          value={selectedService}
          onChange={handleSelectChange}
          className="service-select"
        >
          <option value="">Sélectionner un service</option>
          {services.map((service) => (
            <option key={service.id} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>
      </div>
      <button className="search-button" onClick={handleSearch}>
        Chercher
      </button>

      {/* Afficher les résultats sous forme de cartes (grille) */}
      {result.length > 0 && (
        <div className="services-list">
          {result.map((service) => (
            <div key={service.id} className="service-card">
              <img src={service.imgUrl} alt={service.nom} className="service-image" />
              <div className="service-info">
                <h3>{service.nom}</h3>
                <p>{service.lieu}</p>
                <p>Prix: {service.price} TND</p>
                <p>{service.description}</p>
                <button>Réserver</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message si aucun service n'est sélectionné */}
      {result.length === 0 && selectedService && (
        <p className="result">Aucun service disponible pour ce type.</p>
      )}
    </div>
  );
};

export default SearchCard;
