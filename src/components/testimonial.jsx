import React from "react";
import Slider from "react-slick";
import "./styles/temoignage.css"
import { Container ,Row} from "reactstrap";
import 'remixicon/fonts/remixicon.css';


const Testimonial = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 2,
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
    <div className="testimonial-area">
      <Container>
        <Row>
      <div className="card-title">
    <h1>Témoignages de Nos Clients Mariés</h1>
  </div>
  
  <Slider {...settings}>

    <div className="testimonial py-4 px-3">
      <p className="section__description">
      Nous avons réservé notre salle de mariage avec eux et
                  l'expérience a été incroyable. 
                  <p></p>Le personnel était très
                  serviable et professionnel. Notre mariage était parfait !

      </p>
      <div className="mt-3 d-flex align-items-center gap-4">
        <div>
          <h6 className="mb-0 mt-3 rate "><i className="ri-user-line"></i> Abdelhafid Aichouba</h6>
          <p className="section__description rate"><i className="ri-calendar-line"></i> 09 Jan, 2017</p>
          <p className="rate">
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
          </p>
        </div>
      </div>
    </div>

    <div className="testimonial py-4 px-3">
      <p className="section__description">
      Merci à l'équipe pour leur soutien exceptionnel lors de la
                  réservation de notre salle de réception. Ils ont rendu le
                  processus si simple et nous ont aidés à trouver le lieu
                  parfait pour notre grand jour !
      </p>
      <div className="mt-3 d-flex align-items-center gap-4">
        <div>
          <h6 className="mb-0 mt-3 rate"><i className="ri-user-line"></i> Mohamed Derouiche</h6>
          <p className="section__description rate"><i className="ri-calendar-line"></i> 24 Apr, 2017</p>
          <p className="rate">
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
          </p>
        </div>
      </div>
    </div>

    <div className="testimonial py-4 px-3">
      <p className="section__description">
      Nous avons fait appel à leur service de coiffure pour notre
                  mariage et nous avons été très satisfaits du résultat. Les
                  coiffeurs étaient talentueux et ont contribué à rendre notre
                  journée spéciale encore plus belle.
      </p>
      <div className="mt-3 d-flex align-items-center gap-4">
        <div>
          <h6 className="mb-0 mt-3 rate"><i className="ri-user-line"></i> LAHLOU HANOUTI</h6>
          <p className="section__description rate"><i className="ri-calendar-line"></i> 06 Dec, 2017</p>
          <p className="rate">
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
          </p>
        </div>
      </div>
    </div>
  </Slider>
      
  </Row>
  
  </Container>
</div>

  );
};

export default Testimonial;
