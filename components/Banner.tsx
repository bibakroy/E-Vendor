import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <div className="relative">
      <div className="absolute w-full h-28 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={4000}
      >
        <div>
          <img loading="lazy" src="/product-carousel/0.jpg" alt="" />
        </div>
        <div>
          <img loading="lazy" src="/product-carousel/2.jpg" alt="" />
        </div>
        <div>
          <img loading="lazy" src="/product-carousel/4.jpg" alt="" />
        </div>
        <div>
          <img loading="lazy" src="/product-carousel/7.jpg" alt="" />
        </div>
        <div>
          <img loading="lazy" src="/product-carousel/8.jpg" alt="" />
        </div>
        <div>
          <img loading="lazy" src="/product-carousel/9.jpg" alt="" />
        </div>
        <div>
          <img loading="lazy" src="/product-carousel/10.jpg" alt="" />
        </div>
        <div>
          <img loading="lazy" src="/product-carousel/12.jpg" alt="" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
