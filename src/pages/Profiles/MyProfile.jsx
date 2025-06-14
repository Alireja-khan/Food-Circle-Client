import React, { use, useEffect, useState } from 'react';
import useAuth from '../../hooks/UseAuth';
import { motion } from 'framer-motion';
import { BsPersonFill } from "react-icons/bs";
import { Link, useLocation } from 'react-router-dom';
import { myAddFoodsPromise } from '../../services/myAddFoodsApi';
import { TbCircleCheckFilled } from "react-icons/tb";

const MyProfile = () => {

    const { user } = useAuth();
    const [foodsData, setFoodsData] = useState([]);
    const location = useLocation();


    useEffect(() => {
        const fetchData = async () => {
            const data = await myAddFoodsPromise(user?.email);
            setFoodsData(data);
        };

        fetchData();
    }, []);


    console.log(user)

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
                    <span className="relative z-10">Profile</span>
                </span>
            </div>

            <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="px-4 py-8">
                    <div className="shadow-2xl rounded-xl border overflow-hidden hover:shadow-2xl transition duration-300">
                        <div className="w-full h-full">
                            {user.photoURL && (
                                <img
                                    src={user.photoURL}
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
                            <span>{user.displayName}</span>
                        </p>
                        <p className="text-base flex justify-between text-gray-600">
                            <span className="font-semibold">Donor Email:</span>
                            <span>{user.email}</span>
                        </p>
                    </div>

                    <div className="px-6 py-4 border flex flex-col shadow-2xl justify-center">
                        <p className="text-green-500 text-lg text-center mb-3">Donations</p>

                        <div className="flex justify-between gap-4 flex-wrap">
                            <div>
                                {foodsData.map((food) => (
                                    <Link to={`/foods/${food._id}`} state={{ from: location }} key={food._id}>
                                        <p className="hover:font-semibold flex justify-between items-center gap-3">
                                            {food.foodName}
                                            {food.status === 'available' && (
                                                <TbCircleCheckFilled className="text-blue-500" />
                                            )}
                                        </p>
                                    </Link>
                                ))}
                            </div>

                            <div>
                                {foodsData.map((food) => (
                                    <p key={food._id}>{food.quantity}</p>
                                ))}
                            </div>
                        </div>

                        <p className="mt-3 flex justify-between text-green-500">
                            <span>Total Quantity:</span>
                            <span>
                                {foodsData.reduce((sum, food) => sum + Number(food.quantity), 0)}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>



    );
};

export default MyProfile;