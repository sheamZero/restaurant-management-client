import { useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        fetch("/reviews.json")
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    // console.log(reviews);

    return (
        <section className='mb-16 md:mb-20'>
            <SectionTitle title='Testimonial' subTitle='What Our Client Say'></SectionTitle>
            <Swiper
             navigation={true} 
             modules={[Navigation]} 
            
             className="mySwiper "
             >
                {
                    reviews.map(review => (

                        <SwiperSlide key={review._id}>
                            <div className="flex flex-col px-12 md:px-32 items-center">
                                <div className='mt-10'>
                                    <Rating
                                        style={{ maxWidth: 180 }}
                                        value={review.rating}
                                        onChange={setRating}
                                    />
                                </div>

                                <p className="mt-8 text-center">{review.details}</p>
                                <h3 className="text-xl md:text-2xl py-2 text-yellow-500 font-semibold">{review.name}</h3>

                            </div>
                        </SwiperSlide>


                    ))
                }
            </Swiper>


        </section>
    );
};

export default Testimonials;