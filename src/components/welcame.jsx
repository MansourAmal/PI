import React from "react";
import "./styles/welcame.css";
import "../../node_modules/video-react/dist/video-react.css";
import Slider from "react-slick";
import { Container } from "reactstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Welcame = () => {
  const settings = {
    fade: true,
    speed: 2000,
    autoplaySpeed: 2500,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    
  };

  return (
    <Container fluid>
      <Slider {...settings}>
        <div className="slideritem item-01"> 
        </div>
        <div className="slideritem item-02">
        </div>
        <div className="slideritem item-03">
        </div>
        <div className="slideritem item-04">
        </div>
      </Slider>
    </Container>
  );
};

export default Welcame;
