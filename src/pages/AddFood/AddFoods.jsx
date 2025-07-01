import React, { useState } from 'react';
import useAuth from '../../hooks/UseAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { GiFruitBowl } from "react-icons/gi";

const AddFoods = () => {
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleAddFood = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        data.userEmail = user.email;
        data.donorName = user.displayName;
        data.donorImage = user.photoURL;
        data.donorEmail = user.email;

        axios.post('https://food-circle-server-five.vercel.app/api/foods', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Food Added",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/availableFoods');
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="min-h-screen flex items-start bg-green-50 justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 p-8 sm:p-12">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 text-center relative z-10">
                    <motion.button
                        whileHover={{ scale: 1.25 }}
                        whileTap={{ scale: 1.15 }}
                    >
                        <Link to="/availableFoods">
                            <GiFruitBowl className="w-12 h-12 text-lime-500 mx-auto" />
                        </Link>
                    </motion.button>

                    <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold">Add</p>

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
                        <span className="relative z-10 text-4xl">New Food</span>
                    </span>
                </div>

                <motion.p
                    className="text-gray-600 text-lg text-center max-w-2xl mx-auto mb-12"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: false, amount: 0.3 }}
                >
                    Add surplus or extra food here and help reduce waste. Enter details like image, quantity, and expiry, and share with the community through FoodCircle.
                </motion.p>


                {/* Form */}
                <form onSubmit={handleAddFood}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Food Name</label>
                            <input
                                type="text"
                                name="foodName"
                                placeholder="Enter food name"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Food Image URL</label>
                            <input
                                type="text"
                                name="foodImage"
                                placeholder="Paste image URL"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Food Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Enter Food Quantity"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                            <input
                                type="text"
                                name="pickupLocation"
                                placeholder="Write Pickup Location"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date & Time</label>
                            <input
                                type="date"
                                name="expireDate"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Food Status</label>
                            <select
                                name="status"
                                defaultValue="available"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                                required
                            >
                                <option value="available">Available</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                            <textarea
                                name="additionalNotes"
                                rows="4"
                                placeholder="Mention ingredients, allergens, or any note"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 resize-none"
                            />
                        </div>
                    </div>

                    {/* Donor Info Card */}
                    <motion.div
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-4 border mb-4 mt-8 p-4 rounded shadow-sm cursor-pointer"
                        whileHover={{ scale: 0.99 }}
                        whileTap={{ scale: 0.85 }}
                    >
                        <div className="w-10 h-20 rounded ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                            <img
                                src={user.photoURL}
                                alt="Donor"
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <div>
                            <p className="font-semibold text-gray-800">{user.displayName}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                    </motion.div>

                    <motion.button
                        type="submit"
                        className="w-full hover:shadow-2xl bg-[#bee8b1]/50 hover:bg-[#bee8b1]/70 border text-lg font-semibold py-3 rounded transition duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Add Food
                    </motion.button>

                    {/* Modal */}
                    <AnimatePresence>
                        {showModal && (
                            <motion.div
                                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                                onClick={() => setShowModal(false)}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.div
                                    className="w-80 bg-white rounded-b-2xl overflow-hidden"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* Image */}
                                    <div className="w-full h-110 overflow-hidden">
                                        <img
                                            src={user.photoURL}
                                            alt="Expanded Donor"
                                            className="object-cover w-full h-full"
                                        />
                                    </div>

                                    {/* User Info */}
                                    <div className="p-5 text-center space-y-2">
                                        <p className="text-xl font-semibold text-gray-800">{user.displayName}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>

                                    {/* Button */}
                                    <div className='border-t-gray-900'>
                                        <Link to='/myProfile'>
                                            <motion.button
                                                className='btn h-full w-full py-2 bg-[#bee8b1]/20 hover:bg-[#bee8b1] mx-auto'
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Show Profile
                                            </motion.button>
                                        </Link>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </div>
        </div>
    );
};

export default AddFoods;
