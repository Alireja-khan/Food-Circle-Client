import React from 'react';
import { FaPeopleGroup, FaUsers } from 'react-icons/fa6';
import { IoFastFood } from "react-icons/io5";
import { GiAchievement } from "react-icons/gi";
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Achievements = () => {
    return (
        <div className="px-4 sm:px-6 md:px-8 lg:px-10">
            {/* Heading */}
            <div className='flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 text-center'>
                <motion.button
                    whileHover={{ scale: 1.55 }}
                    whileTap={{ scale: 1.10 }}
                    onHoverStart={() => console.log('hover started!')}
                >
                    <Link to=''><GiAchievement className='w-12 h-12 mx-auto' /></Link>
                </motion.button>
                <p className='text-3xl sm:text-4xl md:text-5xl font-extrabold'>Our Achievements</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto py-10">
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition text-center">
                    <FaUsers className="text-4xl sm:text-5xl text-blue-500 mx-auto mb-4" />
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        <CountUp end={1200} duration={5} />+
                    </h3>
                    <p className="text-gray-600 mt-2 text-base sm:text-lg">Active Members</p>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition text-center">
                    <FaPeopleGroup className="text-4xl sm:text-5xl text-purple-500 mx-auto mb-4" />
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        <CountUp end={447} duration={5} />+
                    </h3>
                    <p className="text-gray-600 mt-2 text-base sm:text-lg">Active Donors</p>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition text-center">
                    <IoFastFood className="text-4xl sm:text-5xl text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        <CountUp end={10791} duration={5} />+
                    </h3>
                    <p className="text-gray-600 mt-2 text-base sm:text-lg">Available Foods</p>
                </div>
            </div>
        </div>
    );
};

export default Achievements;
