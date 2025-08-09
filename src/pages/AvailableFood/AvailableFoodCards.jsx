import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaBowlRice, FaLocationDot } from 'react-icons/fa6';
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaCalendarAlt } from 'react-icons/fa';
import { IoFastFood } from "react-icons/io5";
import { FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AvailableFoodCards = ({ foods, loading }) => {
    const [sortOption, setSortOption] = useState('');
    const [sortedFoods, setSortedFoods] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const searchResults = location.state?.searchResults || [];
    const [isThreeColumn, setIsThreeColumn] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedDonor, setSelectedDonor] = useState(null);

    const [query, setQuery] = useState('');

    const handleSearch = () => {
        const cleanQuery = query.trim().toLowerCase();
        const matchedFoods = foods.filter(food =>
            food.foodName.toLowerCase().includes(cleanQuery)
        );

        if (matchedFoods.length > 0) {
            navigate('/availableFoods', { state: { searchResults: matchedFoods } });
        } else if (cleanQuery.includes('food') || cleanQuery.includes('foods')) {
            navigate('/availableFoods');
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Food is not available at the moment!",
                footer: '<a href="#">Try something else.</a>'
            });
        }
    };

    useEffect(() => {
        if (!Array.isArray(foods)) return;
        let baseFoods = searchResults.length > 0 ? searchResults : foods;
        let sorted = [...baseFoods];

        switch (sortOption) {
            case 'quantityHigh':
                sorted.sort((a, b) => b.quantity - a.quantity);
                break;
            case 'quantityLow':
                sorted.sort((a, b) => a.quantity - b.quantity);
                break;
            case 'expirySoon':
                sorted.sort((a, b) => new Date(a.expireDate) - new Date(b.expireDate));
                break;
            case 'expiryLate':
                sorted.sort((a, b) => new Date(b.expireDate) - new Date(a.expireDate));
                break;
            default:
                break;
        }

        setSortedFoods(sorted);
    }, [sortOption, foods?.length, searchResults?.length]);

    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-bars loading-xl"></span>
        </div>
      );
    }

    return (
        <section className="max-w-screen-2xl min-h-screen mx-auto px-4 py-10">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 text-center">
                <motion.button whileHover={{ scale: 1.25 }} whileTap={{ scale: 1.15 }}>
                    <Link to="/">
                        <IoFastFood className="w-12 text-lime-500 h-12 mx-auto" />
                    </Link>
                </motion.button>

                <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold">Available</p>
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
                    <span className="relative z-10 text-4xl">Foods</span>
                </span>
            </div>

            {/* Description */}
            <motion.p
                className="text-center text-gray-600 mb-10 text-sm md:text-base max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false, amount: 0.3 }}
            >
                Discover a wide variety of generously donated meals, sorted by quantity and freshness — ready for sharing with those in need.
            </motion.p>

            {/* Search Box */}
            <div className="max-w-2xl mx-auto mb-10 px-2">
                <div className="flex items-center bg-white/90 backdrop-blur-lg border border-white/30 rounded-full shadow-lg overflow-hidden">
                    <div className="px-4 text-gray-500">
                        <FaSearch />
                    </div>
                    <input
                        type="text"
                        placeholder="Search available food..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        className="flex-grow px-4 py-3 text-gray-700 bg-transparent focus:outline-none placeholder:text-gray-500"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-[#bee8b1] hover:bg-[#a9d39d] px-6 py-3 text-sm font-semibold rounded-r-full text-black transition"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Sort & Layout Buttons */}
            <div className="flex justify-between items-center mb-6">
                <motion.button
                    onClick={() => setIsThreeColumn(prev => !prev)}
                    className="ml-4 px-4 py-2 border rounded-lg hover:bg-[#bee8b1] transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Change Layout
                </motion.button>

                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    <option value="">Sort By</option>
                    <option value="quantityHigh">Highest Quantity</option>
                    <option value="quantityLow">Lowest Quantity</option>
                    <option value="expirySoon">Expiry Soon</option>
                    <option value="expiryLate">Expiry Late</option>
                </select>
            </div>

            {/* Food Cards Grid */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${isThreeColumn ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-8`}>
                {sortedFoods.map((food) => (
                    <div key={food._id} className="bg-white hover:shadow-xl shadow rounded-2xl overflow-hidden flex flex-col h-full">
                        {food.foodImage && (
                            <img
                                src={food.foodImage}
                                alt={food.foodName}
                                className={`w-full object-cover transition-all duration-300 ${isThreeColumn ? 'h-48' : 'h-72'}`}
                            />
                        )}

                        <div className="p-5 flex flex-col justify-between h-full">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2 truncate" title={food.foodName}>
                                {food.foodName}
                            </h3>

                            <div className="flex items-center gap-2 mb-1">
                                <FaLocationDot className="text-green-600" />
                                <p className="text-sm text-gray-600 truncate" title={food.pickupLocation}>
                                    {food.pickupLocation}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 mb-1">
                                <FaCalendarAlt className="text-red-500" />
                                <p className="text-sm text-gray-600 truncate" title={food.expireDate}>
                                    Expires: {food.expireDate}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                                <FaBowlRice className="text-amber-600" />
                                <p className="text-sm text-gray-600 truncate" title={String(food.quantity)}>
                                    Quantity: {food.quantity}
                                </p>
                            </div>

                            <div
                                onClick={() => {
                                    setSelectedDonor(food);
                                    setShowModal(true);
                                }}
                                className="flex items-center gap-3 mb-3 cursor-pointer"
                            >
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <img src={food.donorImage} alt={food.donorName} className="w-12 h-12 rounded object-cover border-2 border-gray-300" />
                                </motion.div>
                                <div className="w-full">
                                    <p className="text-sm text-gray-600 truncate" title={food.donorName}>
                                        <span className='font-semibold text-base'>Donor Name:</span> {food.donorName}
                                    </p>
                                    <p className="text-sm text-gray-600 truncate" title={food.userEmail}>
                                        <span className='font-semibold text-base'>Donor Email:</span> {food.userEmail}
                                    </p>
                                </div>
                            </div>

                            <Link to={`/foods/${food._id}`}>
                                <motion.button
                                    className="mt-auto hover:bg-[#bee8b1] btn text-sm font-medium px-4 py-2 rounded-md w-full transition"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    View Details
                                </motion.button>
                            </Link>

                            {/* Modal */}
                            <AnimatePresence>
                                {showModal && selectedDonor && (
                                    <motion.div
                                        className="fixed inset-0 bg-black/10 flex items-center justify-center z-50"
                                        onClick={() => {
                                            setShowModal(false);
                                            setSelectedDonor(null);
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <motion.div
                                            layoutId="profile-photo"
                                            className="w-80 bg-white rounded-b-2xl overflow-hidden"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="w-full h-110 overflow-hidden">
                                                <motion.img
                                                    src={selectedDonor.donorImage}
                                                    alt="Expanded Donor"
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>

                                            <div className="p-5 text-center space-y-2">
                                                <p className="text-xl font-semibold text-gray-800">{selectedDonor.donorName}</p>
                                                <p className="text-sm text-gray-500">{selectedDonor.userEmail}</p>
                                            </div>

                                            <div className="border-t-gray-900">
                                                <Link to={`/foods/${selectedDonor._id}`} state={{ from: 'profile' }}>
                                                    <motion.button
                                                        className="btn h-full w-full py-2 bg-[#bee8b1]/20 hover:bg-[#bee8b1] mx-auto"
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
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AvailableFoodCards;
