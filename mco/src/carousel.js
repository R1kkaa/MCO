import React from "react";

import FancyCarousel from "react-fancy-circular-carousel";
import 'react-fancy-circular-carousel/FancyCarousel.css';

import image1 from './images/carousel1.jpg';
import image2 from './images/carousel2.jpg';
import image3 from './images/carousel3.jpg';
import image4 from './images/carousel4.jpg';
import image5 from './images/carousel5.jpg';
import image6 from './images/carousel6.jpg';


const Carousel = () => {

    const images = [image1, image2, image3, image4,image5,image6];

    return <div className="carousel">
      <FancyCarousel 
        images={images} 
        carouselRadius={220}
        peripheralImageRadius={80}
        centralImageRadius={0}
        autoRotateTime={3}
        borderWidth={5}
        borderHexColor={'1c364f'}
        offsetAngle={270}
      />
    </div>
};

export default Carousel;