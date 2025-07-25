import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaQuoteLeft } from 'react-icons/fa6';
import { GiClover } from "react-icons/gi";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
        <section className=" pt-20 pb-5 px-4">
            <div className="max-w-screen-2xl mx-auto text-center">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-5 text-center relative z-10">
                    <motion.button
                        whileHover={{ scale: 1.25 }}
                        whileTap={{ scale: 1.15 }}
                        onHoverStart={() => console.log('hover started!')}
                    >
                        <Link to="/addFoods">
                            <GiClover className="w-12 h-12 mx-auto text-lime-500" />
                        </Link>
                    </motion.button>
                    <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold">Spread</p>
                    <span className="relative group rounded px-5 py-2 font-semibold text-black overflow-hidden text-3xl">
                        <motion.span
                            className="absolute bottom-0 left-0 right-0 bg-[#bee8b1] z-0"
                            initial={{ height: '100%' }}
                            animate={{ height: ['100%', '70%', '100%'] }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: 'mirror',
                                ease: 'easeInOut',
                            }}
                        ></motion.span>
                        <span className="relative z-10 text-4xl">the Love</span>
                    </span>
                </div>

                <motion.p
                    className="text-gray-600 mb-10 text-center text-sm md:text-base max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: false, amount: 0.3 }}
                >
                    Discover stories from our community and see how sharing meals creates moments of kindness, connection, and hope.
                </motion.p>

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
                                            <FaQuoteLeft className='text-lime-500' />
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
