import React from 'react';
import { FaBowlRice, FaLocationDot } from 'react-icons/fa6';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';
import { MdFastfood } from "react-icons/md";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FoodCards = ({ foods }) => {
  console.log(foods)
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">


      <div className="flex justify-center mb-6 gap-5">


        <motion.button
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => console.log('hover started!')}
        >
          <Link to='/availableFoods'><MdFastfood className='w-12 h-12' /></Link>
        </motion.button>

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
          <span className="relative z-10">Featured Foods</span>
        </span>
      </div>


      <p className="text-center text-gray-500 mb-10">Explore the top shared foods with highest quantity</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {foods.map((food) => (
          <div
            key={food._id}
            className="bg-white hover:shadow-xl shadow rounded-2xl overflow-hidden transition"
          >
            <div className="p-5 flex flex-col justify-between h-full">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">{food.foodName}</h3>

              <div className='flex items-center gap-5'>
                <FaLocationDot className='text-green-600' />
                <p className="text-lg text-gray-600 mb-1"> {food.pickupLocation}</p>
              </div>

              <div className='flex items-center gap-5'>
                <MdOutlineAccessTimeFilled className='text-red-500' />
                <p className="text-lg text-gray-600 mb-1">Expires: {new Date(food.expireDate).toLocaleString()}</p>
              </div>

              <div className='flex items-center gap-5 mb-4'>
                <FaBowlRice className='text-amber-600' />
                <p className="text-lg text-gray-600 mb-1">Quantity: {food.quantity}</p>
              </div>

              <div className="flex items-center gap-3 mt-auto">
                <img src={food.donorImage} alt={food.donorName} className="w-10 h-10 rounded-full object-cover border-2 border-gray-300" />
                <span className="text-lg font-medium text-gray-700">{food.donorName}</span>
              </div>

              <Link to={`/foods/${food._id}`}>

                <motion.button
                  className="mt-4 hover:bg-[#bee8b1] btn  text-sm font-medium px-4 py-2 rounded-md w-full transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => console.log('hover started!')}
                >
                  View Details
                </motion.button>

              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FoodCards;