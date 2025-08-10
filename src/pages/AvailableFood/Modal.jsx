import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/UseAuth';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { GiFruitBowl } from 'react-icons/gi';
import { FaBowlFood } from 'react-icons/fa6';

const Modal = ({ setShowModal, food }) => {
    const { id: jobId } = useParams();
    const { user } = useAuth();
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const requestData = {
            foodId: food._id,
            foodName: food.foodName,
            donorEmail: food.donorEmail,
            donorName: food.donorName,
            userEmail: user.email,
            requestDate: new Date().toLocaleString(),
            pickupLocation: food.pickupLocation,
            expireDate: food.expireDate,
            notes: notes,
            quantity: food.quantity,
            donorImage: food.donorImage,
            foodImage: food.foodImage,
            status: "requested",
        };

        try {
            const res = await axios.post('https://food-circle-server-five.vercel.app/api/requests', requestData);
            if (res.data.insertedId) {
                await axios.patch(`https://food-circle-server-five.vercel.app/api/foods/${food._id}/status`, { status: "requested" });
                Swal.fire({
                    icon: "success",
                    title: "Request Submitted!",
                    text: "The donor has been notified of your request",
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate('/myRequestFoods');
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Request Failed",
                text: error.response?.data?.message || "Please try again later",
            });
        } finally {
            setIsSubmitting(false);
            setShowModal(false);
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
                    <div className="flex items-center  mb-5 gap-3">
                        <GiFruitBowl className="w-8 h-8 text-lime-500" />
                        <h2 className="text-2xl font-bold text-gray-800">Request Food</h2>
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
                                    <FaBowlFood className="text-amber-500" />
                                    Food Details
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Food Name</p>
                                        <p className="font-medium">{food.foodName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Quantity</p>
                                        <p className="font-medium">{food.quantity}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Expires</p>
                                        <p className="font-medium">{food.expireDate}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className='flex gap-3'>
                                    <FaBowlFood className='mt-1 text-amber-500'></FaBowlFood>
                                    <h3 className="font-medium text-gray-700 mb-3"><span></span>Food Image</h3>
                                </div>
                                <img
                                    src={food.foodImage}
                                    alt={food.foodName}
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Donor & User Info Section */}
                        <div className="space-y-4">
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
                                        <p className="font-medium">{food.donorName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium">{food.donorEmail}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Pickup Location</p>
                                        <p className="font-medium">{food.pickupLocation}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lime-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    Your Information
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Name</p>
                                        <p className="font-medium">{user.displayName || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Your Email</p>
                                        <p className="font-medium">{user.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Request Date</p>
                                        <p className="font-medium">{new Date().toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Notes Section */}
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Additional Notes
                        </label>
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                            placeholder="Any special instructions or notes for the donor..."
                            rows={3}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
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
                            {isSubmitting ? 'Submitting...' : 'Submit Request'}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default Modal;