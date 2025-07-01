import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaShieldAlt, FaRocket, FaHandsHelping } from 'react-icons/fa';
import treeImg from '../../assets/Banner Image/cherry tree-bro.png';
import { Link } from 'react-router-dom';
import { MdVolunteerActivism } from 'react-icons/md';

const reasons = [
    {
        title: "Trusted Community",
        description: "Join a caring network of verified donors and receivers helping each other.",
        icon: <FaUsers className="text-4xl text-green-600" />,
    },
    {
        title: "Safe & Secure",
        description: "Your information is protected and all interactions are monitored for safety.",
        icon: <FaShieldAlt className="text-4xl text-blue-500" />,
    },
    {
        title: "Quick & Easy",
        description: "Donate or request food with just a few clicks. No complicated steps.",
        icon: <FaRocket className="text-4xl text-orange-500" />,
    },
    {
        title: "Meaningful Impact",
        description: "Every meal shared brings hope and dignity to someone in need.",
        icon: <FaHandsHelping className="text-4xl text-purple-600" />,
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: 'easeOut',
        },
    }),
};

const WhyChooseUs = () => {
    return (
        <section className="relative bg-green-50 pt-20 px-4 sm:px-8 lg:px-16 overflow-hidden">
            {/* Section heading */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-5 text-center relative z-10">
                <motion.button
                    whileHover={{ scale: 1.25 }}
                    whileTap={{ scale: 1.15 }}
                    onHoverStart={() => console.log('hover started!')}
                >
                    <Link to="">
                        <MdVolunteerActivism className="w-12 text-lime-500 h-12 mx-auto" />
                    </Link>
                </motion.button>
                <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold">Why</p>
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
                    <span className="relative z-10 text-4xl">Choose Us</span>
                </span>
            </div>

            <motion.p
                className="text-center text-gray-500 mb-10 max-w-xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false, amount: 0.3 }}
            >
                We’re more than just a food-sharing platform — we’re a movement of kindness, trust, and community.
            </motion.p>



            {/* Main content */}
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 max-w-screen-xl mx-auto relative z-10">

                {/* Left: Tree Image */}
                <motion.div
                    className="flex-1 flex justify-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <img
                        src={treeImg}
                        alt="Tree Illustration"
                        className="w-full max-w-xl sm:max-w-2xl lg:max-w-3xl object-contain scale-105"
                    />
                </motion.div>

                {/* Right: Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 flex-1">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.3 }}
                            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition hover:-translate-y-1 p-6 flex flex-col items-center text-center"
                        >
                            <div className="mb-4">{reason.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{reason.title}</h3>
                            <p className="text-gray-500 text-sm">{reason.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
