import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import './LeftSide.css'
import img_1 from '../Assets/img-1.png';
import img_2 from '../Assets/img-2.png';
import img_3 from '../Assets/img-3.png' ;
import Autoplay from "embla-carousel-autoplay";

export default function LeftSide() {
  const[emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">
            <img src={img_1} alt="" className="image"/>
        </div>
        <div className="embla__slide">
            <img src={img_2} alt="" className="image"/>
        </div>
        <div className="embla__slide">
            <img src={img_3} alt="" className="image"/>
        </div>
      </div>
    </div>
  );
};
