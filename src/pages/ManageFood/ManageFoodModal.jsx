import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/UseAuth';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { GiFruitBowl } from 'react-icons/gi';
import { FaBowlFood } from 'react-icons/fa6';
import { BiSolidNotepad } from 'react-icons/bi';

const ManageFoodModal = ({ setShowModal, food, onUpdate }) => {
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        foodName: food.foodName || '',
        foodId: food._id || '',
        foodImage: food.foodImage || '',
        donorEmail: user.email || '',
        donorName: food.donorName || '',
        userEmail: user.email || '',
        pickupLocation: food.pickupLocation || '',
        expireDate: food.expireDate || '',
        additionalNotes: food.additionalNotes || '',
        quantity: food.quantity || '',
        donorImage: food.donorImage || '',
        status: food.status || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const updatedFoodData = {
            donorEmail: user.email,
            donorName: formData.donorName,
            donorImage: formData.donorImage,
            foodImage: formData.foodImage,
            foodName: formData.foodName,
            pickupLocation: formData.pickupLocation,
            expireDate: formData.expireDate,
            additionalNotes: formData.additionalNotes,
            quantity: formData.quantity,
            status: formData.status,
        };

        try {
            await axios.put(`https://food-circle-server-five.vercel.app/api/foods/${formData.foodId}`, updatedFoodData);
            Swal.fire({
                icon: "success",
                title: "Food Info Updated",
                showConfirmButton: false,
                timer: 1500
            });
            onUpdate({ ...updatedFoodData, _id: formData.foodId });
            setShowModal(false);
        } catch (err) {
            console.error("Update error:", err);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "Something went wrong while updating the food item.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center mt-20 justify-center bg-black/50 backdrop-blur-sm p-4"
        >
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 25 }}
                className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="sticky top-0 bg-white z-10 p-6 pb-0 flex justify-between items-center border-b">
                    <div className="flex items-center mb-5 gap-3">
                        <GiFruitBowl className="w-8 h-8 text-lime-500" />
                        <h2 className="text-2xl font-bold text-gray-800">Update Food</h2>
                    </div>
                    <button
                        onClick={() => setShowModal(false)}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Food Info Section */}
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                                    <FaBowlFood className="text-green-500" />
                                    Food Details
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm text-gray-500">Food Name</label>
                                        <input
                                            name="foodName"
                                            type="text"
                                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                            value={formData.foodName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Quantity</label>
                                        <input
                                            name="quantity"
                                            type="text"
                                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Expiry Date</label>
                                        <input
                                            name="expireDate"
                                            type="text"
                                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                            value={formData.expireDate}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className='flex gap-3'>
                                    <FaBowlFood className='mt-1 text-green-500'></FaBowlFood>
                                    <h3 className="font-medium text-gray-700 mb-3">Food Image</h3>
                                </div>
                                <input
                                    name="foodImage"
                                    type="text"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md mb-3"
                                    value={formData.foodImage}
                                    onChange={handleChange}
                                />
                                {formData.foodImage && (
                                    <img
                                        src={formData.foodImage}
                                        alt={formData.foodName}
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Donor & Location Section */}
                        <div className="space-y-4">

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    Pickup Information
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm text-gray-500">Pickup Location</label>
                                        <input
                                            name="pickupLocation"
                                            type="text"
                                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                            value={formData.pickupLocation}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Additional Notes Section */}
                            <div className="px-4 pt-4 rounded-lg bg-gray-50">
                                <div className='flex items-center gap-3'>
                                    <BiSolidNotepad className="w-5 h-5 mb-2 text-purple-500" />
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Additional Notes
                                    </label>
                                </div>
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                                    placeholder="Any special instructions or notes..."
                                    rows={3}
                                    name="additionalNotes"
                                    value={formData.additionalNotes}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Additional Information */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                                    </svg>
                                    Additional Information
                                </h3>
                                <div>
                                    <label className="text-sm text-gray-500">Status</label>
                                    <p className="font-medium">{formData.status}</p>
                                </div>
                            </div>


                            {/* Donor Information */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lime-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    Donor Information
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Name</p>
                                        <p className="font-medium">{formData.donorName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium">{formData.donorEmail}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>



                    {/* Action Buttons */}
                    <div className="mt-8 flex justify-end gap-3">
                        <motion.button
                            type="button"
                            onClick={() => setShowModal(false)}
                            whileTap={{ scale: 0.95 }}
                            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                        >
                            Cancel
                        </motion.button>
                        <motion.button
                            type="submit"
                            whileTap={{ scale: 0.95 }}
                            disabled={isSubmitting}
                            className={`px-5 py-2.5 rounded-lg bg-lime-500 text-white font-medium hover:bg-lime-600 transition ${isSubmitting ? 'opacity-70' : ''}`}
                        >
                            {isSubmitting ? 'Updating...' : 'Update Food'}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default ManageFoodModal;