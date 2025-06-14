import React from 'react';
import { FaUserFriends, FaMapMarkerAlt, FaHeart, FaCheckCircle } from 'react-icons/fa';
import groupImg from '../../assets/Banner Image/cherry tree-pana.png';
import { motion } from 'framer-motion';

const WhyChoose = () => {
    return (
        <div className="px-4 sm:px-6 md:px-8 lg:px-10">

            <section className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto mt-10 py-10 gap-10 items-center">

                {/* Responsive Image */}
                <div className="flex justify-center md:justify-start">
                    <img src={groupImg} alt="Why Us" className="w-full max-w-md sm:max-w-lg md:max-w-full h-auto" />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-8 rounded-2xl max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 leading-tight tracking-tight">
                        Why Choose
                        <span className="relative group ml-3 rounded px-4 sm:px-5 py-2 font-semibold text-black overflow-hidden text-3xl sm:text-4xl inline-block">
                            <motion.span
                                className="absolute bottom-0 left-0 right-0 bg-[#bee8b1] z-0"
                                initial={{ height: '100%' }}
                                animate={{ height: ['100%', '70%', '100%'] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: 'mirror',
                                    ease: 'easeInOut'
                                }}
                            ></motion.span>
                            <span className="relative z-10">FoodCircle?</span>
                        </span>
                    </h2>

                    <ul className="space-y-5 text-base sm:text-lg md:text-xl font-medium text-gray-700">
                        <li className="flex items-center gap-4">
                            <FaCheckCircle className="text-green-600 text-2xl sm:text-3xl" />
                            <span className="hover:text-green-700 transition duration-300">Safe Food Sharing</span>
                        </li>
                        <li className="flex items-center gap-4">
                            <FaMapMarkerAlt className="text-green-600 text-2xl sm:text-3xl" />
                            <span className="hover:text-green-700 transition duration-300">Local Matching System</span>
                        </li>
                        <li className="flex items-center gap-4">
                            <FaUserFriends className="text-green-600 text-2xl sm:text-3xl" />
                            <span className="hover:text-green-700 transition duration-300">Easy Community Involvement</span>
                        </li>
                        <li className="flex items-center gap-4">
                            <FaHeart className="text-green-600 text-2xl sm:text-3xl shrink-0 animate-pulse" />
                            <span className="hover:text-green-700 transition duration-300">100% Free Platform</span>
                        </li>
                    </ul>
                </div>
            </section>

        </div>
    );
};

export default WhyChoose;
