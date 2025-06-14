import React from 'react';
import groupImg2 from '../../assets/Banner Image/cherry tree-cuate.png';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BecomeMember = () => {
    return (
        <div>
            {/* Call to Action */}
            <div className="flex flex-col lg:flex-row justify-around items-center bg-green-50 px-4 sm:px-6 md:px-10 py-12 sm:py-16 lg:py-20 gap-10">
                <div className="text-center py-10 sm:py-16 lg:py-20 rounded-3xl max-w-xl">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Become a Part of</h2>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">FoodCircle Family</h2>
                    <p className="mb-10 text-base sm:text-lg px-4 sm:px-0">
                        Whether you're sharing a meal or receiving one, your place is with us.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-8">
                        <motion.div
                            className="flex justify-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link to="/addFoods">
                                <button className="btn flex px-10 py-3 sm:px-15 sm:py-6 bg-green-500 text-white">
                                    <span>Donate</span> <span>Food</span>
                                </button>
                            </Link>
                        </motion.div>

                        <motion.div
                            className="flex justify-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link to="/signIn">
                                <button className="btn flex px-10 py-3 sm:px-15 sm:py-6 bg-green-500 text-white">
                                    <span>Join</span> <span>Us</span>
                                </button>
                            </Link>
                        </motion.div>

                        <motion.div
                            className="flex justify-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link to="/availableFoods">
                                <button className="btn px-10 flex  py-3 sm:px-15 sm:py-6 bg-green-500 text-white">
                                    <span>Request</span> <span>Food</span>
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full px-4">
                    <img src={groupImg2} alt="Why Us" className="w-full h-auto object-contain" />
                </div>
            </div>
        </div>
    );
};

export default BecomeMember;
