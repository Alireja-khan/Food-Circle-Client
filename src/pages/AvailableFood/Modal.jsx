import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/UseAuth';
import { FaBowlFood } from 'react-icons/fa6';
import { LucideUtensilsCrossed } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { GiFruitBowl } from 'react-icons/gi';

const Modal = ({ setShowModal, food }) => {
    const { id: jobId } = useParams();
    const { user } = useAuth();
    const [notes, setNotes] = useState('');
    const navigate = useNavigate();

    console.log(jobId);

    const handleSubmit = (e) => {
        e.preventDefault();

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

        axios.post('https://food-circle-server-five.vercel.app/api/requests', requestData)
            .then(res => {
                if (res.data.insertedId) {
                    // Update status to "requested"
                    axios.patch(`https://food-circle-server-five.vercel.app/api/foods/${food._id}/status`, { status: "requested" })
                        .then(() => {
                            Swal.fire({
                                icon: "success",
                                title: "Food Request Success",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/myRequestFoods');
                            setShowModal(false);
                        })
                        .catch(error => {
                            console.error("Error updating food status", error);
                        });
                }
            })
            .catch(error => {
                console.log("Request submission failed", error);
            });

        console.log('Submitting request:', requestData);

        // TODO: Send to backend API
        setShowModal(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl transition-all duration-300 ease-in-out overflow-y-auto max-h-[80vh]"
            >
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 text-center relative z-10">
                    <motion.button
                        whileHover={{ scale: 1.25 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to="/availableFoods">
                            <GiFruitBowl className="w-12 h-12 text-lime-500 mx-auto" />
                        </Link>
                    </motion.button>

                    <div className='flex justify-center items-center gap-5 mx-10'>
                        <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold">Request</p>

                        <span className="relative group rounded px-5 py-2 font-semibold text-black overflow-hidden text-3xl">
                            <motion.span
                                className="absolute bottom-0 left-0 right-0 bg-[#bee8b1] z-0"
                                initial={{ height: '100%' }}
                                animate={{ height: ['100%', '70%', '100%'] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: 'mirror',
                                    ease: 'easeInOut'
                                }}
                            ></motion.span>
                            <span className="relative z-10 text-4xl">Food</span>
                        </span>
                    </div>

                    <motion.button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="absolute right-4 top-1 sm:static sm:ml-6 text-3xl font-bold hover:text-gray-600"
                        whileHover={{ scale: 1.25 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <LucideUtensilsCrossed className='text-lime-500 w-10 h-10' />
                    </motion.button>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Food Name</label>
                        <input type="text" className="w-full mt-1 p-3 border border-gray-300 rounded-md bg-gray-50" value={food.foodName} readOnly />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Food ID</label>
                        <input type="text" className="w-full mt-1 p-3 border border-gray-300 rounded-md bg-gray-50" value={food._id} readOnly />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-600">Food Image</label>
                        <img src={food.foodImage} alt="Food" className="w-full h-64 object-cover rounded-lg mt-2 shadow-md" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Donator Email</label>
                        <input type="email" className="w-full mt-1 p-3 border border-gray-300 rounded-md bg-gray-50" value={food.userEmail} readOnly />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Donator Name</label>
                        <input type="text" className="w-full mt-1 p-3 border border-gray-300 rounded-md bg-gray-50" value={food.donorName} readOnly />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Your Email</label>
                        <input type="email" className="w-full mt-1 p-3 border border-gray-300 rounded-md bg-gray-50" value={user.email} readOnly />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Request Date</label>
                        <input type="text" className="w-full mt-1 p-3 border border-gray-300 rounded-md bg-gray-50" value={new Date().toLocaleString()} readOnly />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Pickup Location</label>
                        <input type="text" className="w-full mt-1 p-3 border border-gray-300 rounded-md bg-gray-50" value={food.pickupLocation} readOnly />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Expire Date</label>
                        <input type="text" className="w-full mt-1 p-3 border border-gray-300 rounded-md bg-gray-50" value={food.expireDate} readOnly />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-600">Additional Notes</label>
                        <textarea
                            className="w-full mt-1 p-3 border border-gray-300 rounded-md bg-white resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter any special instructions..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
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
                        Submit Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Modal;
