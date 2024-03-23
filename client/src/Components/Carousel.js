import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import first from "../Assets/Carousel/pexels-daria-daria-552535.jpg";
import second from "../Assets/Carousel/pexels-engin-akyurt-1437267.jpg";
import third from "../Assets/Carousel/pexels-engin-akyurt-1552635.jpg";
import fourth from "../Assets/Carousel/pexels-engin-akyurt-2619970.jpg";
import fifth from "../Assets/Carousel/pexels-marvin-ozz-2474658.jpg";
import sixth from "../Assets/Carousel/pexels-marvin-ozz-2474661.jpg";
import seventh from "../Assets/Carousel/pexels-valeria-boltneva-1639562.jpg";
function Carousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className=" w-12/12 flex justify-between py-10 shadow-sm">
      <div className=" w-6/12 flex flex-col gap-12 items-center justify-center ">
        <p className="font-semibold text-4xl">Feeling Hungry?</p>
        <p className="text-4xl text-center">
          <span className="text-custom-color font-bold">Make-It:</span>
          <br />{" "}
          <span className="text-xl font-semibold text-gray-500">
            Making Mealtime Magical!
          </span>
        </p>
      </div>
      <div className="w-6/12 ">
        <Slider {...settings} className="w-[80%]">
          <div>
            <img
              src={first}
              alt="Img 1"
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
          <div>
            <img
              src={second}
              alt="Img 2"
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
          <div>
            <img
              src={third}
              alt="Img 3"
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
          <div>
            <img
              src={third}
              alt="Img 3"
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
          <div>
            <img
              src={fourth}
              alt="Img 4"
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
          <div>
            <img
              src={fifth}
              alt="Img 5"
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
          <div>
            <img
              src={sixth}
              alt="Img 6"
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
          <div>
            <img
              src={seventh}
              alt="Img 7"
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Carousel;
