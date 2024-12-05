import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./styles/ServiceList.css"; 

const ServiceList = () => {
  const location = useLocation();
  const { selectedService } = location.state || {}; 

  const [services, setServices] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [isBooking, setIsBooking] = useState(false); 
  const [isAppointment, setIsAppointment] = useState(false); 
  const [selectedServiceId, setSelectedServiceId] = useState(null); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    message: "",
  });
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
  });

  useEffect(() => {
    if (selectedService) {
      fetch(`http://localhost:5000/api/services?category=${selectedService}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur de réseau");
          }
          return response.json();
        })
        .then((data) => {
          setServices(data); 
          setLoading(false); 
        })
        .catch((error) => {
          setError(error.message); 
          setLoading(false);
        });
    }
  }, [selectedService]);

  const handleBookNow = (serviceId) => {
    setIsBooking(true); 
    setSelectedServiceId(serviceId); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reservationData = {
      serviceId: selectedServiceId,
      ...formData,
    };

    fetch("http://localhost:5000/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réservation confirmée:", data);
        setIsBooking(false); 
      })
      .catch((error) => {
        console.error("Erreur lors de la réservation:", error);
      });
  };

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    const appointment = {
      serviceId: selectedServiceId,
      date: appointmentData.date,
      time: appointmentData.time,
    };

    fetch("http://localhost:5000/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Rendez-vous confirmé:", data);
        setIsAppointment(false); 
      })
      .catch((error) => {
        console.error("Erreur lors du rendez-vous:", error);
      });
  };

  if (loading) {
    return <p>Chargement des services...</p>;
  }

  if (error) {
    return <p className="result">Erreur : {error}</p>;
  }

  return (
    <div className="services-list">
      {services.length > 0 ? (
        services.map((service) => (
          <div key={service.id} className="service-card">
            <img src={service.imgUrl} alt={service.nom} className="service-image" />
            <div className="service-info">
              <h3>{service.nom}</h3>
              <p>{service.lieu}</p>
              <p>Prix: {service.price} TND</p>
              <p>{service.description}</p>
              <button onClick={() => handleBookNow(service.id)} className="appointment-button">
                Réserver
              </button>
              <button onClick={() => setIsAppointment(true)} className="appointment-button">
                Prendre rendez-vous
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="result">Aucun service disponible pour "{selectedService}".</p>
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
                  value={formData.date}
                  onChange={handleInputChange}
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

      {isAppointment && (
        <>
          <div className="booking-form-overlay" onClick={() => setIsAppointment(false)}></div>
          <div className="booking-form">
            <h3>Fixer un rendez-vous pour {services.find((s) => s.id === selectedServiceId)?.nom}</h3>
            <form onSubmit={handleAppointmentSubmit}>
              <div>
                <label htmlFor="date">Date du rendez-vous:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={appointmentData.date}
                  onChange={handleAppointmentChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="time">Heure du rendez-vous:</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={appointmentData.time}
                  onChange={handleAppointmentChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Confirmer le rendez-vous
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceList;
