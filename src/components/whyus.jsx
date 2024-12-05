import React from "react";
import "./styles/whyus.css";
import { Container, Row, Col } from "reactstrap";



const Whyus = () => {
  return (
    <section className="become__driver">
      <Container>
        <Row>
            <Col>
                <h2 className="section__title become__driver-title">
                Pourquoi nous choisir ? 
                </h2>
            </Col>
        </Row>
        <Row>
            
        <Col lg="6" md="6" sm="12" className="become__driver-img">
            <div className="box">
            <h4>Meilleur Prix</h4>
              <p>Obtenez les meilleurs tarifs pour les salles de fêtes et services de mariage. Économisez plus avec nous !</p>
            </div>

            <div className="box">
            <h4>Rapide et Sûr</h4>
              <p>Nos services garantissent une planification rapide et sécurisée de votre mariage.</p>
            </div>

            <div className="box">
            <h4>Professionnels Expérimentés</h4>
              <p>Nos experts en coiffure, maquillage et organisation de mariage vous assurent un événement inoubliable.</p>
            </div>
        </Col>
        <Col lg="6" md="6" sm="12">
            <h2 className="section__title become__driver-title">
            Vous souhaitez planifier le mariage de vos rêves ? Ne tardez pas !
            </h2>

           
          </Col>


          
        </Row>
      </Container>
    </section>
  );
};

export default Whyus;