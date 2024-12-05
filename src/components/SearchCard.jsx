import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/SearchCard.css";

const SearchCard = () => {
  const [selectedService, setSelectedService] = useState("");
  const navigate = useNavigate();

  const services = [
    { name: "Traiteur", id: "traiteur" },
    { name: "Salle des fêtes", id: "salle_fetes" },
  ];

  const handleSearch = () => {
    if (selectedService) {
      navigate("/services", { state: { selectedService } }); 
    } else {
      alert("Veuillez sélectionner un service");
    }
  };

  return (
    <div className="search-card">
      <h2>Choisir un Service</h2>
      <select
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
        className="service-select"
      >
        <option value="">Sélectionner un service</option>
        {services.map((service) => (
          <option key={service.id} value={service.name}>
            {service.name}
          </option>
        ))}
      </select>
      <button onClick={handleSearch} className="search-button">
        Chercher
      </button>
    </div>
  );
};

export default SearchCard;
