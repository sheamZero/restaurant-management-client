import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./banner.css";
import logo_1 from "../../../assets/home/01.jpg";
import logo_2 from "../../../assets/home/02.jpg";
import logo_3 from "../../../assets/home/03.png";
import logo_4 from "../../../assets/home/04.jpg";
import logo_5 from "../../../assets/home/05.png";
import logo_6 from "../../../assets/home/06.png";
import Container from "../../components/Container/Container";

const Banner = () => {
  const images = [logo_1, logo_2, logo_3, logo_4, logo_5, logo_6];

  return (
    <section className="w-full">
      <Carousel
        showThumbs
        thumbWidth={80}
        infiniteLoop={true}
        autoPlay={true}
        interval={4000}
        showStatus={false}
        showArrows={false}
        className="custom-carousel"
      >
        {images.map((img, i) => (
          <div key={i} className="relative h-[88vh] w-full">
            {/* Full-width image */}
            <img
              src={img}
              alt={`Slide ${i + 1}`}
              className="h-full w-full object-cover object-center"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/10" />

            {/* Alignment layer (same boundary as navbar) */}
            <div className="absolute inset-0">
              <Container>
                <div className="h-full" />
              </Container>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;
