// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FaBowlRice, FaLocationDot } from 'react-icons/fa6';
// import { MdOutlineAccessTimeFilled } from "react-icons/md";
// import { FaCalendarAlt } from 'react-icons/fa';
// import { IoFastFood } from "react-icons/io5";

// const AvailableFoodCards = ({ foods }) => {

//     const [sortOption, setSortOption] = useState('');
//     const [sortedFoods, setSortedFoods] = useState([]);
//     const location = useLocation();
//     const searchResults = location.state?.searchResults || [];

//     useEffect(() => {
//     if (!Array.isArray(foods)) return;
    
//     let baseFoods = searchResults.length > 0 ? searchResults : foods;
//     let sorted = [...baseFoods];

//     switch (sortOption) {
//         case 'quantityHigh':
//             sorted.sort((a, b) => b.quantity - a.quantity);
//             break;
//         case 'quantityLow':
//             sorted.sort((a, b) => a.quantity - b.quantity);
//             break;
//         case 'expirySoon':
//             sorted.sort((a, b) => new Date(a.expireDate) - new Date(b.expireDate));
//             break;
//         case 'expiryLate':
//             sorted.sort((a, b) => new Date(b.expireDate) - new Date(a.expireDate));
//             break;
//         default:
//             break;
//     }

//     setSortedFoods(sorted);
// }, [sortOption, foods?.length, searchResults?.length]);  // more stable dependency


//     console.log(foods)


//     return (
//         <section className="max-w-7xl mx-auto px-4 py-10">

//             <div className="flex items-center gap-5 justify-center mb-6">


//                 <motion.button
//                     whileHover={{ scale: 1.55 }}
//                     whileTap={{ scale: 1.10 }}
//                     onHoverStart={() => console.log('hover started!')}
//                 >
//                     <Link to='/'><IoFastFood className='w-10 h-10' /></Link>
//                 </motion.button>


//                 <span className="relative group rounded px-5 py-2 font-semibold text-black overflow-hidden text-3xl">
//                     <motion.span
//                         className="absolute bottom-0 left-0 right-0 bg-[#bee8b1] z-0"
//                         initial={{ height: '100%' }}
//                         animate={{ height: ['100%', '70%', '100%'] }}
//                         transition={{
//                             duration: 3,
//                             repeat: Infinity,
//                             repeatType: 'mirror',
//                             ease: 'easeInOut'
//                         }}
//                     ></motion.span>
//                     <span className="relative z-10">Available Foods</span>
//                 </span>
//             </div>

//             <p className="text-center text-gray-500 mb-10">Explore the top shared foods with highest quantity</p>

//             <div className="flex justify-end mb-6">
//                 <select
//                     value={sortOption}
//                     onChange={(e) => setSortOption(e.target.value)}
//                     className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
//                 >
//                     <option value="">Sort By</option>
//                     <option value="quantityHigh">Highest Quantity</option>
//                     <option value="quantityLow">Lowest Quantity</option>
//                     <option value="expirySoon">Expiry Soon</option>
//                     <option value="expiryLate">Expiry Late</option>
//                 </select>
//             </div>


//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {sortedFoods.map((food) => (
//                     <div
//                         key={food._id}
//                         className="bg-white hover:shadow-xl shadow rounded-2xl overflow-hidden transition"
//                     >
//                         <div>

//                             {/* Food Image */}
//                             {food.foodImage && (
//                                 <img
//                                     src={food.foodImage}
//                                     alt={food.foodName}
//                                     className="w-full h-48 object-cover"
//                                 />
//                             )}

//                             <div className="p-5 flex flex-col justify-between h-full">
//                                 <h3 className="text-3xl font-semibold text-gray-800 mb-4">{food.foodName}</h3>

//                                 <div className='flex items-center gap-5'>
//                                     <FaLocationDot className='text-green-600' />
//                                     <p className="text-lg text-gray-600 mb-1"> {food.pickupLocation}</p>
//                                 </div>

//                                 <div className='flex items-center gap-5'>
//                                     <FaCalendarAlt className='text-red-500' />
//                                     <p className="text-lg text-gray-600 mb-1">Expires: {food.expireDate}</p>
//                                 </div>

//                                 <div className='flex items-center gap-5 mb-4'>
//                                     <FaBowlRice className='text-amber-600' />
//                                     <p className="text-lg text-gray-600 mb-1">Quantity: {food.quantity}</p>
//                                 </div>

//                                 <div className="flex items-center gap-3 mt-auto">
//                                     <img src={food.donorImage} alt={food.donorName} className="w-10 h-15 rounded object-cover border-2 border-gray-300" />
//                                     <div>
//                                         <p className="text-base text-gray-600">Donor Name : {food.donorName}</p>
//                                         <p className="text-base text-gray-600">Donor Email : {food.userEmail}</p>
//                                     </div>
//                                 </div>

//                                 <Link to={`/foods/${food._id}`}>

//                                     <motion.button
//                                         className="mt-4 hover:bg-[#bee8b1] btn  text-sm font-medium px-4 py-2 rounded-md w-full transition"
//                                         whileHover={{ scale: 1.05 }}
//                                         whileTap={{ scale: 0.95 }}
//                                         onHoverStart={() => console.log('hover started!')}
//                                     >
//                                         View Details
//                                     </motion.button>

//                                 </Link>
//                             </div>

//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default AvailableFoodCards;