
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import slide1 from '../../../assets/home/slide1.jpg';
import slide2 from '../../../assets/home/slide2.jpg';
import slide3 from '../../../assets/home/slide3.jpg';
import slide4 from '../../../assets/home/slide4.jpg';
import slide5 from '../../../assets/home/slide5.jpg';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { replace, useLocation, useNavigate } from 'react-router-dom';


const Category = () => {
    const location = useLocation();
    const slides = [slide1, slide2, slide3, slide4, slide5, slide5];
    const categories = ["salad", "soup", "pizza", "dessert", "drinks", "offered"]
    const navigate = useNavigate();

    return (
        <section className="my-10 p-2 md:my-16">
            <SectionTitle title="Order online" subTitle="From 10.00am to 10.00pm" />

            <div className="my-12">
                <Swiper
                    slidesPerView={2}  //default
                    spaceBetween={30}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    breakpoints={{
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                        },
                    }}
                    className="mySwiper"
                >
                    {
                        slides.map((slide, idx) => (
                            <SwiperSlide key={idx}>
                                <div
                                    onClick={() => navigate(`/our-shop`,
                                        { state: { category: categories[idx] } },
                                        { replace: true }
                                    )}
                                    className="relative cursor-pointer rounded-xl group"
                                >
                                    <img src={slide} alt="" className="w-full object-cover rounded-xl" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
                                    <p
                                        style={{ textShadow: "2px 5px 15px rgba(0,0,0,0.7)" }}
                                        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 uppercase text-2xl z-50 text-white group-hover:font-bold">
                                        {categories[idx]}s
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>
        </section>
    );
};

export default Category;