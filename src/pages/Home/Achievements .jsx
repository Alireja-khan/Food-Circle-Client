import React from 'react';
import { FaPeopleGroup, FaUsers } from 'react-icons/fa6';
import { IoFastFood } from "react-icons/io5";
import { GiAchievement, GiCookingPot, GiFoodTruck, GiFoodChain } from 'react-icons/gi';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import treeImg from '../../assets/Banner Image/olive tree-bro.png'; // Use the same tree image path

const stats = [
  {
    id: 1,
    icon: <FaUsers className="text-5xl text-blue-500 mx-auto mb-4" />,
    end: 1200,
    label: "Active Members",
  },
  {
    id: 2,
    icon: <FaPeopleGroup className="text-5xl text-purple-500 mx-auto mb-4" />,
    end: 447,
    label: "Active Donors",
  },
  {
    id: 3,
    icon: <IoFastFood className="text-5xl text-green-500 mx-auto mb-4" />,
    end: 10791,
    label: "Available Foods",
  },
  {
    id: 4,
    icon: <GiCookingPot className="text-5xl text-orange-500 mx-auto mb-4" />,
    end: 3200,
    label: "Meals Shared",
  },
  {
    id: 5,
    icon: <GiFoodTruck className="text-5xl text-red-500 mx-auto mb-4" />,
    end: 150,
    label: "Active Pickup Points",
  },
  {
    id: 6,
    icon: <GiFoodChain className="text-5xl text-teal-500 mx-auto mb-4" />,
    end: 5300,
    label: "Food Requests Fulfilled",
  },
];

// Animation variants matching your HowItWorks style
const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const Achievements = () => {
  return (
    <section className="max-w-screen-2xl mx-auto pt-20 px-4 sm:px-8 lg:px-16">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-5 text-center relative z-10">
        <motion.button
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 1.15 }}
          onHoverStart={() => console.log('hover started!')}
        >
          <Link to="">
            <GiAchievement className="w-12 text-lime-500 h-12 mx-auto" />
          </Link>
        </motion.button>
        <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold">Our</p>
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
          <span className="relative z-10 text-4xl">Achievements</span>
        </span>
      </div>

      <motion.p
        className="text-center text-gray-500 mb-10 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        Celebrating the positive impact we’ve made together — from meals donated to lives touched across the community.
      </motion.p>


      {/* Flex container for stats and tree image */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-14">
        {/* Left: Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 flex-1">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-all hover:shadow-xl hover:-translate-y-1"
            >
              {stat.icon}
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                <CountUp end={stat.end} duration={5} />+
              </h3>
              <p className="text-gray-600 mt-2 text-base sm:text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Right: Tree Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.3 }}
          className="flex justify-center flex-1"
        >
          <img
            src={treeImg}
            alt="Food Donation Tree"
            className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
