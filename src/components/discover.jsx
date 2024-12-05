import React, { useState } from 'react';
import { Container, Row, Col, Label, FormGroup, Input } from 'reactstrap';
import Slider from 'react-slick';
import salleData from './salleData'; 
import './styles/discover.css';

const Discover = () => {
  const [filters, setFilters] = useState({
    lieu: '',
  });

  const filterSalles = (salle) => {
    return !filters.lieu || salle.lieu.toLowerCase().includes(filters.lieu.toLowerCase());
  };

  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value,
    });
  };

  const filteredSalles = salleData.filter(filterSalles);

  const sliderSettings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container>
      <div className="booking-section">
        <div className="booking-title">
          <h2 className='section__title' style={{color: '#C4515B'}}>Réservez dans notre collection de salles</h2>
          <p className='section__subtitle' style={{color: '#C4515B'}}>Explorez notre collection de salles et trouvez celle qui vous convient parfaitement.</p>
        </div>

        {/* Filtres */}
        <Row className="mb-4">
          <Col>
            <FormGroup>
              <Label for="lieu" style={{color: '#C4515B'}}>Lieu:</Label>
              <Input
                type="select"
                id="lieu"
                onChange={(e) => handleFilterChange('lieu', e.target.value)}
                style={{width:'30%'}}
              >
                <option value="" style={{color: '#3A001E'}}>Tous</option>
                <option value="Nabeul" style={{color: '#3A001E'}}>Nabeul</option>
                <option value="Hammamet" style={{color: '#3A001E'}}>Hammamet</option>
                <option value="Tunis" style={{color: '#3A001E'}}>Tunis</option>
                <option value="Gammarth" style={{color: '#3A001E'}}>Gammarth</option>
                <option value="Sousse" style={{color: '#3A001E'}}>Sousse</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>

        <Container>
          
          <Row>
            <Col>
              <Slider {...sliderSettings} className="slick-container">
               
                {filteredSalles.map((salle) => (
                  <div key={salle.id} className="slick-item py-4 px-3">
                   
                    <img src={salle.imgUrl} alt={salle.nom} />
                    <div className="slick-caption">
                      <h3 className='section__description' style={{color: '#C4515B'}}>{salle.nom}</h3>
                      <p>{salle.description}</p>
                    </div>
                  </div>
                ))}
              </Slider>
            </Col>
          </Row>
        </Container>
        
        <div className='tousModel'>
          <a href='/salle'>
            <i className="ri-arrow-right-s-line"></i>Toutes les Salles
          </a>
        </div>
      </div>
    </Container>
  );
};

export default Discover;
