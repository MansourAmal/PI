import React from "react";
import { Container } from "reactstrap";
import "./styles/about.css";
import aboutImg from "../assets/img/img-10.jpg";
import image2 from "../assets/img/img-8.jpg";
import image3 from "../assets/img/img-9.jpg";

const About = () => {
  return (
    <section className="about__section">
      <Container>
        <div className="about__section-content-wrapper">
          {/* Texte principal */}
          <div className="about__section-content">
            <h4 className="section__subtitle">Nos Services</h4>
            <h2 className="section__title">Bienvenue sur notre site de planification de mariage</h2>
            <p className="section__description">
              Nous vous aidons à trouver les meilleures salles de fêtes, Traiteurs ... pour rendre votre journée spéciale encore plus mémorable.
            </p>
            <p className="section__description">
              Découvrez une sélection de lieux magnifiques, des services de coiffure et de maquillage professionnels pour faire de votre mariage un événement inoubliable.
            </p>

            {/* Éléments clés */}
            <div className="about__section-item">
              <p>
                <i className="ri-checkbox-circle-line"></i> À votre service depuis 2010
              </p>
              <p>
                <i className="ri-checkbox-circle-line"></i> Service personnalisé
              </p>
            </div>
            <div className="about__section-item">
              <p>
                <i className="ri-checkbox-circle-line"></i> Sélection de lieux exclusifs
              </p>
              <p>
                <i className="ri-checkbox-circle-line"></i> Support 24 heures sur 24
              </p>
            </div>
          </div>

          {/* Images */}
          <div className="about__img-wrapper">
            <img src={aboutImg} alt="Couple de mariage" className="about__img" />
            <img src={image2} alt="Invitation de mariage" className="about__img" />
            <img src={image3} alt="Fleurs de mariage" className="about__img" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
