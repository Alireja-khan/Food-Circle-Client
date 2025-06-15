import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsPersonFill } from 'react-icons/bs';
import { TbCircleCheckFilled } from 'react-icons/tb';

const DonorProfile = ({ food }) => {


    const location = useLocation();

    return (
        <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-5 my-6">
                    <motion.button
                        whileHover={{ scale: 1.25 }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => console.log('hover started!')}
                    >
                        <Link>
                            <BsPersonFill className="w-13 h-13" />
                        </Link>
                    </motion.button>

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
                        <span className="relative z-10">Donor Profile</span>
                    </span>
                </div>

                <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div className="px-4 py-8">
                        <div className="shadow-2xl rounded-xl border overflow-hidden hover:shadow-2xl transition duration-300">
                            <div className="w-full h-full">
                                {food.donorImage && (
                                    <img
                                        src={food.donorImage}
                                        alt="Profile"
                                        className="w-full h-auto object-cover"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="px-6 py-4 mb-5 shadow-2xl border flex flex-col justify-center">
                            <p className="text-green-500 text-lg text-center mb-3">Informations</p>

                            <p className="text-base flex justify-between text-gray-800 mb-2">
                                <span className="font-semibold">Donor:</span>
                                <span>{food.donorName}</span>
                            </p>
                            <p className="text-base flex justify-between text-gray-600 mb-2">
                                <span className="font-semibold">Donor Email:</span>
                                <span>{food.userEmail}</span>
                            </p>
                            <p className="text-base flex justify-between text-gray-600">
                                <span className="font-semibold">Location:</span>
                                <span>{food.pickupLocation}</span>
                            </p>
                        </div>

                        <div className="px-6 py-4 border flex flex-col shadow-2xl justify-center">
                            <p className="text-green-500 text-lg text-center mb-3">Donation</p>

                            <div className="flex justify-between gap-4 flex-wrap">
                                
                            </div>

                            <p className="mt-2 flex justify-between ">
                                <span>Total Quantity:</span>
                                <span>
                                    {food.quantity}
                                </span>
                            </p>
                            <p className="mt-2 flex justify-between ">
                                <span>Shared Food:</span>
                                <span>
                                    {food.foodName}
                                </span>
                            </p>
                            <p className="mt-2 flex justify-between ">
                                <span>Expires:</span>
                                <span>
                                    {food.expireDate}
                                </span>
                            </p>
                            <p className="mt-2 flex justify-between ">
                                <span>Status:</span>
                                <span className='text-green-500'>
                                    {food.status}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default DonorProfile;
