    import React, { useState } from 'react';
    import { Link } from 'react-router-dom';
    import useAuth from '../../hooks/UseAuth';
    import { FaBowlFood } from 'react-icons/fa6';
    import { LucideUtensilsCrossed } from 'lucide-react';
    import { motion } from 'framer-motion';
    import axios from 'axios';
    import Swal from 'sweetalert2';

    const ManageFoodModal = ({ setShowModal, food, onUpdate }) => {
        const { user } = useAuth();

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

        const handleSubmit = (e) => {
            e.preventDefault();

            const updatedFoodData = {
                donorEmail: user.email,
                donorName: formData.donorName,
                donorImage: formData.donorImage,
                
                foodImage: formData.foodImage,
                foodName: formData.foodName,
                pickupLocation: formData.pickupLocation,
                expireDate: formData.expireDate,
                notes: formData.notes,
                quantity: formData.quantity,
                status: formData.status,
                additionalNotes: food.additionalNotes
            };

            axios.put(`https://food-circle-server-five.vercel.app/api/foods/${formData.foodId}`, updatedFoodData)
                .then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Food Info Updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setShowModal(false);
                    onUpdate({ ...updatedFoodData, _id: formData.foodId });

                })
                .catch(err => {
                    console.error("Update error:", err);
                    Swal.fire({
                        icon: "error",
                        title: "Update Failed",
                        text: "Something went wrong while updating the food item.",
                    });
                });
        };

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl overflow-y-auto max-h-[80vh]"
                >
                    <div className="flex justify-between items-center mb-6">
                        <motion.button whileHover={{ scale: 1.25 }} whileTap={{ scale: 0.95 }}>
                            <Link to='/availableFoods'>
                                <FaBowlFood className='w-8 h-8 hover:text-[#82a079] text-[#82a079]/80' />
                            </Link>
                        </motion.button>
                        <h2 className="text-3xl font-bold text-gray-800">Update The Food Information</h2>
                        <motion.button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="text-3xl font-bold hover:text-gray-600"
                            whileHover={{ scale: 1.25 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <LucideUtensilsCrossed />
                        </motion.button>
                    </div>


                    <div className="md:col-span-2 mb-3">
                        {/* <label className="block text-sm font-medium text-gray-600">Food Image URL</label>
                            <input
                                name="foodImage"
                                type="text"
                                className="w-full mt-1 p-3 border border-gray-300 rounded-md"
                                value={formData.foodImage}
                                onChange={handleChange}
                            /> */}
                        {formData.foodImage && (
                            <img src={formData.foodImage} alt="Food" className="w-full h-64 object-cover rounded-lg mt-2 shadow-md" />
                        )}
                    </div>



                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Food Name</label>
                            <input
                                name="foodName"
                                type="text"
                                className="w-full mt-1 p-3 border border-gray-300 rounded-md"
                                value={formData.foodName}
                                onChange={handleChange}
                            />
                        </div>

                        {/* <div>
                            <label className="block text-sm font-medium text-gray-600">Food ID</label>
                            <input
                                name="foodId"
                                type="text"
                                className="w-full mt-1 p-3 border border-gray-300 rounded-md bg-gray-100"
                                value={formData.foodId}
                                readOnly
                            />
                        </div> */}



                        <div>
                            <label className="block text-sm font-medium text-gray-600">Donator Email</label>
                            <input
                                name="donorEmail"
                                type="email"
                                className="w-full mt-1 p-3 border border-gray-300 rounded-md bg-gray-100"
                                value={formData.donorEmail}
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">Donator Name</label>
                            <input
                                name="donorName"
                                type="text"
                                className="w-full mt-1 p-3 border border-gray-300 rounded-md bg-gray-100"
                                value={formData.donorName}
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">Your Email</label>
                            <input
                                name="userEmail"
                                type="email"
                                className="w-full mt-1 p-3 border border-gray-300 rounded-md bg-gray-100"
                                value={formData.userEmail}
                                readOnly
                            />
                        </div>

                        {/* <div>
                            <label className="block text-sm font-medium text-gray-600">Request Date</label>
                            <input
                                name="requestDate"
                                type="text"
                                className="w-full mt-1 p-3 border border-gray-300 rounded-md bg-gray-100"
                                value={formData.requestDate}
                                readOnly
                            />
                        </div> */}

                        <div>
                            <label className="block text-sm font-medium text-gray-600">Pickup Location</label>
                            <input
                                name="pickupLocation"
                                type="text"
                                className="w-full mt-1 p-3 border border-gray-300 rounded-md"
                                value={formData.pickupLocation}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">Expire Date</label>
                            <input
                                name="expireDate"
                                type="text"
                                className="w-full mt-1 p-3 border border-gray-300 rounded-md bg-gray-100"
                                value={formData.expireDate}
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">Quantity</label>
                            <input
                                name="quantity"
                                type="text"
                                className="w-full mt-1 p-3 border border-gray-300 rounded-md"
                                value={formData.quantity}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">Status</label>
                            <input
                                name="quantity"
                                type="text"
                                className="w-full mt-1 p-3 border border-gray-300 rounded-md bg-gray-100"
                                value={formData.status}
                                readOnly
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-600">Additional Notes</label>
                            <textarea
                                name="additionalNotes"
                                className="w-full mt-1 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter any special instructions..."
                                value={formData.additionalNotes}
                                onChange={handleChange}
                                rows={4}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-semibold shadow-md transition"
                        >
                            Update Food
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    export default ManageFoodModal;
