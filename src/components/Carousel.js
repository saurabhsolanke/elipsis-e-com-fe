import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = () => {
  const slides = [
    {
      image: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_oTsuJWT.jpg?format=webp&w=1500&dpr=2.0",
      title: "Exclusive Deals on Electronics",
      description: "Get the latest gadgets at unbeatable prices.",
    },
    {
      image: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/fandom_feb_fest-homepage__copy_2.jpg?format=webp&w=1500&dpr=2.0",
      title: "New Arrivals in Fashion",
      description: "Trendy outfits to upgrade your wardrobe.",
    },
    {
      image: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/shirts-homepage-banner.jpg?format=webp&w=1500&dpr=2.0",
      title: "Home & Kitchen Essentials",
      description: "Upgrade your home with our best deals.",
    },
  ];

  return (
    <div className="w-full mx-auto mt-6">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="rounded-lg shadow-lg"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-[400px] object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40 text-white p-6 text-center">
                <h2 className="text-3xl font-bold">{slide.title}</h2>
                <p className="mt-2 text-lg">{slide.description}</p>
                {/* <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg">
                  Shop Now
                </button> */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
