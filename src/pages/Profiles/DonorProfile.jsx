import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsPersonFill } from 'react-icons/bs';
import { TbCircleCheckFilled } from 'react-icons/tb';
import { myAddFoodsPromise } from '../../services/myAddFoodsApi';

const DonorProfile = ({ food }) => {
    const [foodsData, setFoodsData] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            const data = await myAddFoodsPromise(food?.userEmail);
            setFoodsData(data);
        };

        if (food?.userEmail) fetchData();
    }, [food?.userEmail]);

    return (
        <div className="px-4 pb-35 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-5 text-center relative z-10">
                <div>
                    <BsPersonFill className="w-12 h-12 text-lime-500 mx-auto" />
                </div>

                <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold">Donor</p>

                <span className="relative group rounded px-5 py-2 font-semibold text-black overflow-hidden text-3xl">
                    <motion.span
                        className="absolute bottom-0 left-0 right-0 bg-[#bee8b1] z-0"
                        initial={{ height: "100%" }}
                        animate={{ height: ["100%", "70%", "100%"] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut",
                        }}
                    ></motion.span>
                    <span className="relative z-10 text-4xl">Profile</span>
                </span>
            </div>

            <motion.p
                className="text-gray-600 text-lg text-center max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false, amount: 0.3 }}
            >
                View and explore the donor’s profile including their contributions and contact details.
            </motion.p>

            <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="px-4 py-8">
                    <div className="shadow-2xl rounded-xl border overflow-hidden hover:shadow-2xl transition duration-300">
                        {food?.donorImage && (
                            <img
                                src={food.donorImage}
                                alt="Profile"
                                className="w-full h-auto object-cover"
                            />
                        )}
                    </div>
                </div>

                <div>
                    <div className="px-6 bg-white py-4 mb-5 shadow-2xl border flex flex-col justify-center">
                        <p className="text-green-500 text-lg text-center mb-3">Informations</p>

                        <p className="text-base flex justify-between text-gray-800 mb-2">
                            <span className="font-semibold">Donor:</span>
                            <span>{food?.donorName}</span>
                        </p>
                        <p className="text-base flex justify-between text-gray-600 mb-2">
                            <span className="font-semibold">Donor Email:</span>
                            <span>{food?.userEmail}</span>
                        </p>
                        <p className="text-base flex justify-between text-gray-600">
                            <span className="font-semibold">Pickup Location:</span>
                            <span>{food?.pickupLocation}</span>
                        </p>
                    </div>

                    <div className="px-6 bg-white py-4 border flex flex-col shadow-2xl justify-center">
                        <p className="text-green-500 text-lg text-center mb-3">Donations</p>

                        <div className="flex justify-between gap-4 flex-wrap">
                            <div>
                                {foodsData.map((item) => (
                                    <p className="hover:font-semibold flex justify-between items-center gap-3">
                                        {item.foodName}
                                        {item.status === 'available' && (
                                            <TbCircleCheckFilled className="text-blue-500" />
                                        )}
                                    </p>
                                ))}
                            </div>

                            <div>
                                {foodsData.map((item) => (
                                    <p key={item._id}>{item.quantity}</p>
                                ))}
                            </div>
                        </div>

                        <p className="mt-3 flex justify-between text-green-500">
                            <span>Total Quantity:</span>
                            <span>
                                {foodsData.reduce((sum, item) => sum + Number(item.quantity), 0)}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonorProfile;
