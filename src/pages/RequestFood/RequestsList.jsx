import React, { use, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoFastFood } from "react-icons/io5";
import { Link } from 'react-router-dom';

const RequestsList = ({ requests, foods }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  console.log(requests, foods);

  return (

    <div className="max-w-6xl mx-auto px-4 py-8">


      <div className="flex justify-center items-center gap-5 mb-6">

        <motion.button
          whileHover={{ scale: 1.55 }}
          whileTap={{ scale: 1.10 }}
          onHoverStart={() => console.log('hover started!')}
        >
          <Link to='/availableFoods'><IoFastFood className='w-10 h-10' /></Link>
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
          <span className="relative z-10">My Requested Foods</span>
        </span>
      </div>



      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">



        {requests.map((request) => {
          const { _id, donorName, foodName, pickupLocation, expireDate, requestDate, notes, donorImage, foodImage, quantity, status, donorEmail, userEmail } = request;

          return (
            <div
              key={_id}
              className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition"
            >
              {/* Food Image */}
              {foodImage && (
                <img
                  src={foodImage}
                  alt={foodName}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-green-700">{foodName}</h3>
                  <span className={`text-sm font-medium px-3 py-1 rounded ${status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-200 text-gray-800'}`}>
                    {status}
                  </span>
                </div>



                <div className="space-y-1 text-sm text-gray-700">
                  <p className="text-sm text-gray-500"><span className="font-medium">Requested By:</span> {userEmail}</p>
                  <p><span className="font-medium">Quantity:</span> {quantity}</p>
                  <p><span className="font-medium">Pickup Location:</span> {pickupLocation}</p>
                  <p><span className="font-medium">Expire Date:</span> {new Date(expireDate).toLocaleDateString()}</p>
                  <p><span className="font-medium">Request Date:</span> {new Date(requestDate).toLocaleDateString()}</p>
                </div>


                {
                  foods
                    .filter(food => food.donorEmail === donorEmail)
                    .map((food) => (
                      <div key={food._id}>

                        <div
                          onClick={() => {
                            setSelectedDonor(food);
                            setShowModal(true);
                          }}
                          className="flex items-center gap-3 mt-auto"
                        >
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <img src={food.donorImage} alt={food.donorName} className="w-10 h-15 rounded object-cover border-2 border-gray-300" />
                          </motion.div>

                          <div>
                            <p className="text-base text-gray-600">Donor Name : {food.donorName}</p>
                            <p className="text-base text-gray-600">Donor Email : {food.donorEmail}</p>
                            <p className="text-base text-gray-600">Donor Email : {food.userEmail}</p>
                          </div>
                        </div>
                      </div>
                    ))
                }


                {notes && (
                  <div className="mt-4 bg-gray-100 p-3 rounded text-sm text-gray-600 italic">
                    "{notes}"
                  </div>
                )}


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
                        {/* Donor Image */}
                        <div className="w-full h-110 overflow-hidden">
                          <motion.img
                            src={donorImage}
                            alt="Expanded Donor"
                            className="object-cover w-full h-full"
                          />
                        </div>

                        {/* Donor Info */}
                        <div className="p-5 text-center space-y-2">
                          <p className="text-xl font-semibold text-gray-800">{donorName}</p>
                          <p className="text-sm text-gray-500">{donorEmail}</p>
                        </div>

                        <div className="border-t-gray-900">


                          <Link to={`/foods/${selectedDonor._id}`} state={{ from: 'profile', back: location.pathname }}>

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
          );
        })}
      </div>
    </div>

  );
};

export default RequestsList;
