import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { FreeMode, Pagination, Autoplay } from "swiper/modules";

import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container/Container";

const Category = () => {
  const navigate = useNavigate();
  const slides = [slide1, slide2, slide3, slide4, slide5, slide5];
  const categories = ["salad", "soup", "pizza", "dessert", "drinks", "offered"];

  return (
    <section className="py-12 my-16 md:my-24 md:py-24 bg-backgroundcolor rounded-lg">
      <Container>
        <SectionTitle
          title="Order Online"
          subTitle="From 10:00am to 10:00pm"
        />

        <div className="mt-12">
          <Swiper
            slidesPerView={2}
            spaceBetween={20}
            freeMode={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[FreeMode, Pagination, Autoplay]}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            className="mySwiper"
          >
            {slides.map((slide, idx) => (
              <SwiperSlide key={idx}>
                <div
                  onClick={() =>
                    navigate("/our-shop", {
                      state: { category: categories[idx] },
                      replace: true,
                    })
                  }
                  className="relative cursor-pointer overflow-hidden max-h-[400px] rounded-2xl group"
                >
                  {/* Image */}
                  <img
                    src={slide}
                    alt={categories[idx]}
                    className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-500"></div>

                  {/* Text */}
                  <p
                    style={{
                      textShadow: "2px 6px 15px rgba(0,0,0,0.9)",
                    }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 uppercase text-xl md:text-2xl font-semibold text-white tracking-wide transition-all duration-500 group-hover:text-primary group-hover:bottom-8"
                  >
                    {categories[idx]}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default Category;
