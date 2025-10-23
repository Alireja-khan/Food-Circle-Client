import React, { useState } from 'react';
import useAuth from '../../hooks/UseAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { GiFruitBowl } from "react-icons/gi";
import { FiUpload, FiUser, FiCalendar, FiMapPin, FiInfo, FiImage } from 'react-icons/fi';
import { IoFastFoodOutline, IoPricetagOutline } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';

const AddFoods = () => {
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [quantityUnit, setQuantityUnit] = useState('servings'); // Default unit
    const [customUnit, setCustomUnit] = useState('');
    const [showCustomUnit, setShowCustomUnit] = useState(false);
    const navigate = useNavigate();

    // Food name to unit mapping with intelligent suggestions
    const foodUnitMapping = {
        // Liquids
        'water': 'liters', 'juice': 'liters', 'milk': 'liters', 'soda': 'liters', 
        'soup': 'liters', 'oil': 'liters', 'sauce': 'liters', 'broth': 'liters',
        'tea': 'liters', 'coffee': 'liters', 'smoothie': 'liters', 'yogurt': 'liters',
        
        // Grains & Bulk Items
        'rice': 'kg', 'flour': 'kg', 'sugar': 'kg', 'salt': 'kg', 'pasta': 'kg',
        'beans': 'kg', 'lentils': 'kg', 'cereal': 'kg', 'oats': 'kg', 'grains': 'kg',
        'nuts': 'kg', 'seeds': 'kg', 'spices': 'kg',
        
        // Fruits & Vegetables (typically sold by weight)
        'apple': 'kg', 'banana': 'kg', 'orange': 'kg', 'potato': 'kg', 'tomato': 'kg',
        'onion': 'kg', 'carrot': 'kg', 'broccoli': 'kg', 'spinach': 'kg', 'lettuce': 'kg',
        'mango': 'kg', 'berry': 'kg', 'grape': 'kg', 'pepper': 'kg', 'cucumber': 'kg',
        'fruit': 'kg', 'vegetable': 'kg',
        
        // Packaged/Countable Items
        'bread': 'loaves', 'pizza': 'pizzas', 'sandwich': 'sandwiches', 'burger': 'burgers',
        'cake': 'cakes', 'pie': 'pies', 'cookie': 'cookies', 'biscuit': 'biscuits',
        'egg': 'eggs', 'cupcake': 'cupcakes', 'muffin': 'muffins', 'donut': 'donuts',
        
        // Portioned Items
        'meal': 'portions', 'curry': 'portions', 'stew': 'portions', 'salad': 'portions',
        'lasagna': 'portions', 'casserole': 'portions',
        
        // Beverages (packaged)
        'can': 'cans', 'bottle': 'bottles', 'pack': 'packs', 'carton': 'cartons'
    };

    const commonUnits = [
        'servings', 'portions', 'plates', 'kg', 'grams', 'liters', 'ml', 
        'pieces', 'packets', 'boxes', 'loaves', 'bottles', 'cans'
    ];

    const handleFoodNameChange = (e) => {
        const foodName = e.target.value.toLowerCase().trim();
        
        if (!foodName) {
            setQuantityUnit('servings');
            setShowCustomUnit(false);
            return;
        }

        // Find matching unit from food name
        let matchedUnit = 'servings'; // default
        let foundMatch = false;

        for (const [keyword, unit] of Object.entries(foodUnitMapping)) {
            if (foodName.includes(keyword)) {
                matchedUnit = unit;
                foundMatch = true;
                break;
            }
        }

        setQuantityUnit(matchedUnit);
        setShowCustomUnit(!foundMatch && foodName.length > 2);
    };

    const handleUnitChange = (e) => {
        const selectedUnit = e.target.value;
        if (selectedUnit === 'custom') {
            setShowCustomUnit(true);
            setQuantityUnit('');
        } else {
            setQuantityUnit(selectedUnit);
            setShowCustomUnit(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                Swal.fire({
                    icon: "error",
                    title: "Invalid File",
                    text: "Please select an image file (JPEG, PNG, etc.)",
                });
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                Swal.fire({
                    icon: "error",
                    title: "File Too Large",
                    text: "Please select an image smaller than 5MB",
                });
                return;
            }

            setImageFile(file);

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImageToServer = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.imageUrl;
        } catch (error) {
            console.error('Image upload failed:', error);
            throw new Error('Failed to upload image');
        }
    };

    const handleAddFood = async (e) => {
        e.preventDefault();

        if (!imageFile) {
            Swal.fire({
                icon: "error",
                title: "Image Required",
                text: "Please select a food image to upload",
            });
            return;
        }

        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Combine quantity and unit
        const finalQuantity = `${data.quantity} ${showCustomUnit ? customUnit : quantityUnit}`;

        // Validate expiry date
        const today = new Date().toISOString().split('T')[0];
        if (data.expireDate < today) {
            Swal.fire({
                icon: "error",
                title: "Invalid Expiry Date",
                text: "Expiry date cannot be in the past!",
            });
            return;
        }

        setIsUploading(true);

        try {
            // Upload image first
            const imageUrl = await uploadImageToServer(imageFile);

            // Prepare food data with combined quantity
            const foodData = {
                ...data,
                quantity: finalQuantity, // Use the combined quantity with unit
                foodImage: imageUrl,
                userEmail: user.email,
                donorName: user.displayName,
                donorImage: user.photoURL,
                donorEmail: user.email,
            };

            // Submit food data
            const res = await axios.post('http://localhost:5000/api/foods', foodData);

            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Food Added Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/availableFoods');
            }
        } catch (error) {
            console.error('Error adding food:', error);
            Swal.fire({
                icon: "error",
                title: "Upload Failed",
                text: "There was an error uploading your food. Please try again.",
            });
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
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
                                <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                                    <IoFastFoodOutline className="text-lime-500" />
                                    Food Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Food Name</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="foodName"
                                                    placeholder="e.g. Fresh Salad, Pasta, Rice, Milk"
                                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                    required
                                                    onChange={handleFoodNameChange}
                                                />
                                                <IoFastFoodOutline className="absolute left-3 top-3 text-gray-400" />
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

                                        {/* Dynamic Quantity Field */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                            <div className="flex gap-2">
                                                <div className="relative flex-1">
                                                    <input
                                                        type="number"
                                                        name="quantity"
                                                        placeholder="Amount"
                                                        className="w-full pl-3 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                        required
                                                        min="1"
                                                        step="0.1"
                                                    />
                                                    <IoPricetagOutline className="absolute right-3 top-3 text-gray-400" />
                                                </div>
                                                <div className="w-32">
                                                    {showCustomUnit ? (
                                                        <input
                                                            type="text"
                                                            placeholder="Unit"
                                                            value={customUnit}
                                                            onChange={(e) => setCustomUnit(e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                            required
                                                        />
                                                    ) : (
                                                        <select
                                                            value={quantityUnit}
                                                            onChange={handleUnitChange}
                                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                                                        >
                                                            {commonUnits.map(unit => (
                                                                <option key={unit} value={unit}>
                                                                    {unit}
                                                                </option>
                                                            ))}
                                                            <option value="custom">Custom...</option>
                                                        </select>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Location & Timing Section */}
                                        <div className="space-y-2 mt-4">
                                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                                <FiMapPin className="text-orange-500" />
                                                Location & Timing
                                            </h3>

                                            <div className="space-y-2">
                                                <div className="">
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

                                        {/* Additional Information */}
                                        <div className="space-y-2 mt-4">
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
                                    </div>

                                    <div>
                                        {/* Image Upload Section */}
                                        <div className="space-y-1">
                                            <label className="block text-sm font-medium text-gray-700">Food Image</label>
                                            <div className="space-y-3">
                                                {imagePreview ? (
                                                    <div className="relative">
                                                        <img
                                                            src={imagePreview}
                                                            alt="Food preview"
                                                            className="w-112 h-72 object-cover rounded-lg border border-gray-200"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={removeImage}
                                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <label className="flex flex-col items-center justify-center w-106 h-72 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-400 transition-colors bg-gray-50 hover:bg-gray-100">
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <FiUpload className="w-8 h-8 mb-3 text-gray-400" />
                                                            <p className="mb-2 text-sm text-gray-500">
                                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                                            </p>
                                                            <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB)</p>
                                                        </div>
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                        />
                                                    </label>
                                                )}
                                            </div>
                                        </div>

                                        {/* Donor Card */}
                                        <div className="space-y-4 mt-4">
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

                                        {/* Submit Button */}
                                        <div className="mt-8">
                                            <motion.button
                                                type="submit"
                                                disabled={isUploading || !imageFile}
                                                className={`w-full font-medium py-3 px-6 rounded-lg shadow-sm transition-all ${isUploading || !imageFile
                                                    ? 'bg-gray-300 cursor-not-allowed'
                                                    : 'bg-[#bee8b1] hover:shadow-md'
                                                    }`}
                                                whileHover={!isUploading && imageFile ? { scale: 1.01 } : {}}
                                                whileTap={!isUploading && imageFile ? { scale: 0.98 } : {}}
                                            >
                                                {isUploading ? (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        Uploading...
                                                    </div>
                                                ) : (
                                                    'Add Food Donation'
                                                )}
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFoods;