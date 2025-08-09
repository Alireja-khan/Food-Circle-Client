import React from 'react';
import { FaBowlRice, FaLocationDot } from 'react-icons/fa6';
import { MdOutlineAccessTimeFilled, MdFastfood } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const FoodCards = ({ foods }) => {
  return (
    <section className="max-w-screen-2xl mx-auto px-4 pt-20">
      {/* Header Section */}
      <motion.div
        className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-5 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <motion.button
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 1.15 }}
        >
          <Link to="/availableFoods">
            <MdFastfood className="w-12 text-lime-500 h-12  mx-auto" />
          </Link>
        </motion.button>
        <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold">Featured</p>
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
      </motion.div>

      <motion.p
        className="text-center text-gray-500 mb-10 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        Discover and explore the most generously shared foods, available in the highest quantities, helping to reduce waste and nourish our community.
      </motion.p>

      {/* Grid of Food Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {foods.map((food, index) => (
          <motion.div
            key={food._id}
            className="bg-white hover:shadow-xl shadow rounded-2xl overflow-hidden transition flex flex-col"
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeUp}
          >
            <motion.img
              src={food.foodImage}
              alt={food.foodName}
              className="w-full h-48 object-cover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />

            <div className="p-5 flex flex-col flex-grow justify-between">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {food.foodName}
              </h3>

              {/* <p className="text-gray-600 text-sm italic mb-4 line-clamp-3">
                {food.additionalNotes?.replace(/^"|"$/g, '')}
              </p> */}

              <div className='flex items-center gap-3 mb-1'>
                <FaLocationDot className='text-green-600' />
                <p className="text-gray-600 text-sm">{food.pickupLocation}</p>
              </div>

              <div className='flex items-center gap-3 mb-1'>
                <MdOutlineAccessTimeFilled className='text-red-500' />
                <p className="text-gray-600 text-sm">Expires: {food.expireDate}</p>
              </div>

              <div className='flex items-center gap-3 mb-3'>
                <FaBowlRice className='text-amber-600' />
                <p className="text-gray-600 text-sm">Quantity: {food.quantity}</p>
              </div>

              <Link to={`/foods/${food._id}`} state={{ from: 'food', back: location.pathname }}>
                <motion.button
                  className="mt-auto hover:bg-[#bee8b1] btn text-sm font-medium px-4 rounded-md w-full transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Details
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FoodCards;