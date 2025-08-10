import React, { useState } from 'react';
import useAuth from '../../hooks/UseAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { GiFruitBowl } from "react-icons/gi";
import { FiUpload, FiUser, FiCalendar, FiMapPin, FiInfo } from 'react-icons/fi';
import { IoFastFoodOutline, IoPricetagOutline } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';

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
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header - Preserved as requested */}
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

                {/* Modern Form Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <form onSubmit={handleAddFood} className="p-6 sm:p-8">
                        <div className="space-y-6">
                            {/* Food Information Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    <IoFastFoodOutline className="text-lime-500" />
                                    Food Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-gray-700">Food Name</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="foodName"
                                                placeholder="e.g. Fresh Salad, Pasta"
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                required
                                            />
                                            <IoFastFoodOutline className="absolute left-3 top-3 text-gray-400" />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-gray-700">Food Image URL</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="foodImage"
                                                placeholder="Paste image URL"
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                required
                                            />
                                            <FiUpload className="absolute left-3 top-3 text-gray-400" />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                name="quantity"
                                                placeholder="Number of servings"
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                required
                                            />
                                            <IoPricetagOutline className="absolute left-3 top-3 text-gray-400" />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-gray-700">Category</label>
                                        <div className="relative">
                                            <select
                                                name="category"
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                                                required
                                            >
                                                <option value="">Select category</option>
                                                <option value="vegetarian">Vegetarian</option>
                                                <option value="non-vegetarian">Non-Vegetarian</option>
                                                <option value="vegan">Vegan</option>
                                                <option value="gluten-free">Gluten Free</option>
                                                <option value="other">Other</option>
                                            </select>
                                            <FiInfo className="absolute left-3 top-3 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Location & Timing Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    <FiMapPin className="text-orange-500" />
                                    Location & Timing
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="pickupLocation"
                                                placeholder="Address or landmark"
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                required
                                            />
                                            <FiMapPin className="absolute left-3 top-3 text-gray-400" />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                name="expireDate"
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                required
                                            />
                                            <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-5'>

                                {/* Additional Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                        <FiInfo className="text-gray-500" />
                                        Additional Information
                                    </h3>

                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-gray-700">Notes</label>
                                        <textarea
                                            name="additionalNotes"
                                            rows="3"
                                            placeholder="Ingredients, allergens, special instructions..."
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                                        />
                                    </div>
                                </div>

                                {/* Donor Card */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                        <FiUser className="text-green-500" />
                                        Your Information
                                    </h3>

                                    <div className='flex gap-5 items-center'>
                                        <div className="h-28 overflow-hidden ">
                                            <img
                                                src={user.photoURL}
                                                alt="Donor"
                                                className="object-cover rounded-lg w-full h-full"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex ">
                                                <FiUser className="mt-1 w-6 h-6 mr-3 text-green-500" />
                                                <div className=' items-center gap-3 mb-3'>
                                                    <p className="text-sm font-medium text-gray-500">Name :</p>
                                                    <p className="text-gray-900">{user.displayName}</p>
                                                </div>
                                            </div>
                                            <div className="flex ">
                                                <MdEmail className="mt-1 w-6 h-6 mr-3 text-blue-500" />
                                                <div className=' items-center gap-3'>
                                                    <p className="text-sm font-medium text-gray-500">Email :</p>
                                                    <p className="text-gray-900">{user.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* Submit Button */}
                        <div className="mt-8">
                            <motion.button
                                type="submit"
                                className="w-full bg-[#bee8b1] font-medium py-3 px-6 rounded-lg shadow-sm hover:shadow-md transition-all"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Add Food Donation
                            </motion.button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFoods;