import React from "react";
import img1 from "../../assets/grocery-banner-fECAEdf_.png";
import img2 from "../../assets/grocery-banner-2-BWrZqEBM.jpeg";
import slid1 from "../../assets/slider-image-2-Xt88XJy9.jpeg";
import slid2 from "../../assets/slider-image-3-BtMvVf4V.jpeg";
import Slider from "react-slick";
import style from "./style.module.css";
export default function HomeSliderCateory() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <>
      <div className="flex flex-wrap justify-center items-center mb-10 rounded-xl overflow-hidden">
        <div className=" w-full lg:w-2/3">
          <Slider {...settings}>
            <img
              src={slid1}
              className=" w-full sm:h-[250px]  md:h-[450px] lg:h-[460px] object-center"
              alt=""
            />
            <img
              src={slid2}
              className="  w-full sm:h-[250px]  md:h-[450px] lg:h-[460px] object-center"
              alt=""
            />
            {/* <img src={img1} className=' w-full sm:h-[250px]  md:h-[450px] lg:h-[460px] object-center  ' alt="" /> */}
          </Slider>
        </div>
        <div className={`${style.media} lg:block lg:w-1/4 hidden`}>
          <img src={img1} className=" w-full object-cover h-[230px] " alt="" />
          <img src={img2} className=" w-fulL object-center h-[230px] " alt="" />
        </div>
      </div>
    </>
  );
}
