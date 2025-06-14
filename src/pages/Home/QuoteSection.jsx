import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaQuoteLeft } from 'react-icons/fa6';
import { GiClover } from "react-icons/gi";

const QuoteSection = () => {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/quotes.json')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to load quotes');
                }
                return res.json();
            })
            .then(data => {
                setQuotes(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading quotes:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center py-20">Loading quotes...</div>;
    }

    return (
        <section className=" py-20 px-4">
            <div className="max-w-screen-2xl mx-auto text-center">
                <div className='flex justify-center items-center gap-5'>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                        Share the love
                    </h2>
                    <GiClover className='w-10 h-10 text-[#a9d39d]' />
                </div>
                <p className="text-gray-600 mb-10 text-sm md:text-base">
                    See what people have to say about sharing food and kindness.
                </p>

                <Swiper
                    modules={[Pagination, Autoplay]}
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    className="pb-10"
                >
                    {quotes.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative bg-white border border-gray-200 rounded-2xl p-4 md:p-10 max-w-full mx-auto flex flex-col md:flex-row items-center md:items-start gap-6">
                                <div className="w-full md:w-4/5 mx-auto flex flex-col-reverse md:flex-row justify-between items-center md:items-center py-10 md:py-20 text-left relative z-10 gap-6">
                                    <div className="w-full hover:shadow-xl md:w-2/3 border border-gray-400 rounded-xl px-4 py-8 md:px-6 md:py-20 relative bg-white">
                                        <span className="absolute -top-4 left-4 text-4xl md:text-5xl text-gray-300 font-serif">
                                            <FaQuoteLeft />
                                        </span>
                                        <p className="text-base md:text-xl text-gray-800 font-medium leading-relaxed">
                                            {item.quote}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-4 font-semibold">{item.author}</p>
                                    </div>

                                    <div className="w-full md:w-1/3 flex justify-center">
                                        <img
                                            src={item.image}
                                            alt={item.author}
                                            className="w-40 h-40 md:w-80 md:h-90 object-cover rounded-3xl shadow-md"
                                        />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default QuoteSection;
