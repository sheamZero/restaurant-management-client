import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Container from '../../components/Container/Container';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import PageLoader from '../../components/PageLoader/PageLoader';

const Testimonials = () => {
    const axiosSecure = useAxiosSecure();

    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await axiosSecure.get("/reviews");
            return res.data;
        }
    });
console.log(reviews);
    if (isLoading) return <PageLoader />;

    return (
        <section className="py-12 md:py-24 my-16 md:my-24 bg-backgroundcolor rounded-lg">
            <Container>
                <SectionTitle
                    title="Testimonial"
                    subTitle="What Our Clients Say"
                />

                <Swiper
                    navigation
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {reviews.map(review => (
                        <SwiperSlide key={review._id}>
                            <div className="flex flex-col px-8 md:px-32 items-center text-center">

                                {/* Rating (READ ONLY) */}
                                <div className="mt-10">
                                    <Rating
                                        style={{ maxWidth: 180 }}
                                        value={review.rating}
                                        readOnly
                                    />
                                </div>

                                {/* Review Text */}
                                <p className="mt-8 text-gray-700">
                                    {review.details}
                                </p>

                                {/* Reviewer */}
                                <h3 className="text-xl md:text-2xl py-2 text-teal-dark font-semibold">
                                    {review.name}
                                </h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </section>
    );
};

export default Testimonials;
