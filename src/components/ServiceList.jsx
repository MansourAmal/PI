import React, { useState, useEffect } from "react"; 
import { useLocation } from "react-router-dom"; 
import traiteurData from './traitData'; 
import salleData from './salleData'; 
import "./styles/ServiceList.css";

const ServiceList = () => {
  const location = useLocation(); 
  const selectedService = location.state?.selectedService || "";

  const [services, setServices] = useState([]); 
  const [isBooking, setIsBooking] = useState(false); 
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false); 
  const [selectedServiceId, setSelectedServiceId] = useState(null); 
  const [selectedDate, setSelectedDate] = useState(""); 
  const [selectedTime, setSelectedTime] = useState(""); 
  const [formData, setFormData] = useState({ name: "", email: "", message: "", });

  useEffect(() => { 
    let filteredServices = []; 
    if (selectedService === "Traiteur") { 
      filteredServices = traiteurData; 
    } else if (selectedService === "Salle des fêtes") { 
      filteredServices = salleData; 
    } else { 
      filteredServices = [...traiteurData, ...salleData]; 
    } 
    setServices(filteredServices); 
  }, [selectedService]);

  const handleBookNow = (serviceId) => { 
    setIsBooking(true); 
    setSelectedServiceId(serviceId); 
  };

  const handleTimeSelect = (date, time) => {
    setSelectedDate(date);
    setSelectedTime(time);
    
  };

  const handleInputChange = (e) => { 
    const { name, value } = e.target; 
    setFormData((prevData) => ({ ...prevData, [name]: value, })); 
  };

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    const reservationData = { serviceId: selectedServiceId, ...formData, date: selectedDate, time: selectedTime, }; 
    console.log("Réservation confirmée:", reservationData); 
    setIsBooking(false); 
  };

  return ( 
    <div className="services-list"> 
      {services.length === 0 ? ( 
        <p>Aucun service disponible pour ce choix.</p>
      ) : ( 
        services.map((service) => ( 
          <div key={service.id} className="service-card"> 
            <img src={service.imgUrl} alt={service.nom} className="service-image" /> 
            <div className="service-info"> 
              <h3>{service.nom}</h3> 
              <p>{service.lieu}</p> 
              <p>Prix: {service.price} TND</p> 
              <p>{service.description}</p> 
              <button onClick={() => setIsTimeModalOpen(true)} className="appointment-button">
                Prendre un rendez-vous 
              </button> 
              <button onClick={() => handleBookNow(service.id)} className="reserve-button"> 
                Confirmer la réservation 
              </button> 
            </div> 
          </div> 
        )) 
      )}

      {isTimeModalOpen && (
        <div className="time-modal-overlay" onClick={() => setIsTimeModalOpen(false)}>
          <div className="time-modal">
            <h3>Choisir la date et l'heure du rendez-vous</h3>
            <label htmlFor="modalDate">Sélectionner la date:</label>
            <input
              type="date"
              id="modalDate"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <h4>Choisir l'heure:</h4>
            <button onClick={() => handleTimeSelect(selectedDate, "09:00")}>09:00</button>
            <button onClick={() => handleTimeSelect(selectedDate, "10:00")}>10:00</button>
            <button onClick={() => handleTimeSelect(selectedDate, "11:00")}>11:00</button>
            <button onClick={() => handleTimeSelect(selectedDate, "14:00")}>14:00</button>
            <button onClick={() => handleTimeSelect(selectedDate, "16:00")}>16:00</button>
            <button onClick={() => setIsTimeModalOpen(false)}>Annuler</button>
          </div>
        </div>
      )}

      {isBooking && (
        <>
          <div className="booking-form-overlay" onClick={() => setIsBooking(false)}></div>
          <div className="booking-form">
            <h3>Réserver {services.find((s) => s.id === selectedServiceId)?.nom}</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Nom:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="date">Date de réservation:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="message">Message (facultatif):</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button type="submit" className="submit-button">
                Confirmer la réservation
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceList;
