import React from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaHandshake, FaMapMarkedAlt, FaAppleAlt } from 'react-icons/fa';
import { BsClipboardCheck } from 'react-icons/bs';
import treeImg from '../../assets/Banner Image/cherry tree-cuate.png';
import { Link } from 'react-router-dom';

const steps = [
  {
    id: 1,
    title: "Sign Up",
    description: "Create a free account to join the community of donors and receivers.",
    icon: <FaUserPlus className="text-4xl text-green-600" />,
  },
  {
    id: 2,
    title: "Donate or Browse",
    description: "Donate surplus food or browse shared items available near you.",
    icon: <FaAppleAlt className="text-4xl text-orange-500" />,
  },
  {
    id: 3,
    title: "Set Pickup",
    description: "Choose your location and pickup time for smooth food exchange.",
    icon: <FaMapMarkedAlt className="text-4xl text-blue-500" />,
  },
  {
    id: 4,
    title: "Help or Receive",
    description: "Make a real difference by helping others or getting needed food.",
    icon: <FaHandshake className="text-4xl text-purple-500" />,
  },
];

// Animation settings
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

const HowItWorks = () => {
  return (
    <section className="max-w-screen-2xl mx-auto pt-20 px-4 sm:px-8 lg:px-16">
      {/* Section Heading */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-5 text-center">
        <motion.button
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 1.15 }}
          onHoverStart={() => console.log('hover started!')}
        >
          <Link to="">
            <BsClipboardCheck className="w-12 text-lime-500 h-12 mx-auto" />
          </Link>
        </motion.button>
        <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold">How</p>
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
          <span className="relative z-10 text-4xl">It Works</span>
        </span>
      </div>
      <motion.p
        className="text-center text-gray-500 mb-10 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        A simple, respectful, and community-driven way to share surplus food or receive nourishing meals with dignity and ease.
      </motion.p>


      {/* Flex container */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-14">

        {/* Left: Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 flex-1">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm">{step.description}</p>
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

export default HowItWorks;
