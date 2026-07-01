import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../../assets/images/fieb1.png';
import ExampleCarouselImage2 from '../../assets/images/fieb2.jpg';
import ExampleCarouselImage3 from '../../assets/images/fieb3.jpg';
import './CarouselStyle.css'

function CustomCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className='width-100'>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img src={ExampleCarouselImage} alt="Slide 1"  className='img'/>
        <Carousel.Caption>
          <h3>SDCE</h3>
          <p>Um projeto FIEB.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={ExampleCarouselImage2} alt="Slide 2" className='img' />
        <Carousel.Caption>
          <h3>FIEB</h3>
        </Carousel.Caption>
      </Carousel.Item>
            <Carousel.Item>
        <img src={ExampleCarouselImage3} alt="Slide 3" className='img' />
        <Carousel.Caption>
          <h3>Campanha de vacinação!</h3>
          <p>Vacine-se!!!!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default CustomCarousel;
