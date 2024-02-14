import React from "react";

import FancyCarousel from "react-fancy-circular-carousel";
import 'react-fancy-circular-carousel/FancyCarousel.css';

import image1 from './images/bg.jpg';
import image2 from './images/bg.jpg';
import image3 from './images/bg.jpg';
import image4 from './images/bg.jpg';


const Carousel = () => {

    const images = [image1, image2, image3, image4];

    return <div className="carousel">
      <FancyCarousel 
        images={images} 
        carouselRadius={220}
        peripheralImageRadius={60}
        centralImageRadius={0}
        autoRotateTime={2}
        borderWidth={5}
        borderHexColor={'1c364f'}
        offsetAngle={270}
      />
    </div>
};

export default Carousel;