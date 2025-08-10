import React, { use, useState } from 'react';
import Modal from '../ManageFood/ManageFoodModal';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { HiOutlineCreditCard } from "react-icons/hi2";

const AddFoodList = ({ myAddFoodsPromise }) => {
    const foodsData = use(myAddFoodsPromise);
    const [foods, setFoods] = useState(foodsData);  // put data in state for easy update
    const [activeFoodId, setActiveFoodId] = useState(null);

    const handleUpdate = (updatedFood) => {
        setFoods(prevFoods => prevFoods.map(food =>
            food._id === updatedFood._id ? updatedFood : food
        ));
        setActiveFoodId(null);
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            reverseButtons: true,
        });



        if (result.isConfirmed) {
            try {
                const res = await axios.delete(`https://food-circle-server-five.vercel.app/api/delete-food/${id}`);

                if (res.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Food has been deleted.',
                        timer: 1500,
                        showConfirmButton: false,
                    });

                    // update foods state (remove deleted item)
                    setFoods(prevFoods => prevFoods.filter(food => food._id !== id));
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to delete the food.',
                    });
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while deleting.',
                });
            }
        }
    };

    return (

        <div className="px-4 sm:px-6 lg:px-8 pt-10 pb-30 max-w-7xl mx-auto">
            {/* Title */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 text-center relative z-10">
                <motion.button
                    whileHover={{ scale: 1.25 }}
                    whileTap={{ scale: 1.15 }}
                >
                    <HiOutlineCreditCard className="w-12 h-12 text-lime-500 mx-auto" />
                </motion.button>

                <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold">Manage</p>

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
                    <span className="relative z-10 text-4xl">Your Foods</span>
                </span>
            </div>

            <motion.p
                className="text-gray-600 text-lg text-center max-w-2xl mx-auto mb-12"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false, amount: 0.3 }}
            >
                Review, update, or remove the food items you’ve added. Keep your shared meals current and available to those in need.
            </motion.p>


            {/* Table */}
            <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-gray-200">

                <table className="min-w-full divide-y divide-gray-200 text-sm">


                    <thead className="bg-gray-50">
                        <tr className="text-gray-700 text-left">
                            {['Image', 'Name', 'Quantity', 'Pickup Location', 'Expire Date', 'Status', 'Actions'].map((header) => (
                                <th key={header} className="px-6 py-4 text-center font-semibold tracking-wide uppercase text-xs">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>


                    <tbody className="divide-y divide-gray-100">
                        {foods.map((food) => {
                            const { _id, foodName, foodImage, quantity, pickupLocation, expireDate, status } = food;

                            return (
                                <tr key={_id} className="hover:bg-gray-50 transition">
                                    {/* Image */}
                                    <td className="px-6 py-4">
                                        <img
                                            src={foodImage}
                                            alt={foodName}
                                            className="w-32 h-15 object-cover rounded border border-gray-200 shadow-sm"
                                        />
                                    </td>

                                    {/* Details */}
                                    <td className="px-6 py-4 font-medium text-gray-900">{foodName}</td>
                                    <td className="px-6 py-4">{quantity}</td>
                                    <td className="px-6 py-4">{pickupLocation}</td>
                                    <td className="px-6 py-4">{new Date(expireDate).toLocaleDateString()}</td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-block px-3 py-1 rounded text-xs font-semibold ${status === 'available'
                                                ? 'bg-blue-200 '
                                                : 'bg-red-100 text-red-600'
                                                }`}
                                        >
                                            {status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <button
                                            onClick={() => setActiveFoodId(_id)}
                                            className="inline-flex items-center gap-1 btn mt-1 text-sm font-medium  bg-[#bee8b1]  shadow-sm transition"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(_id)}
                                            className="inline-flex items-center gap-1 btn mt-1 text-sm font-medium text-white bg-red-600 hover:bg-red-700  shadow-sm transition"
                                        >
                                            Delete
                                        </button>

                                        {activeFoodId === _id && (
                                            <Modal
                                                setShowModal={() => setActiveFoodId(null)}
                                                food={food}
                                                onUpdate={handleUpdate}
                                            />
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>
        </div>

    );
};

export default AddFoodList;
