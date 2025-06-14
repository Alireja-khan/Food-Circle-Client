import React, { use } from 'react';
import { motion } from 'framer-motion';
import { IoFastFood } from "react-icons/io5";
import { Link } from 'react-router-dom';

const RequestsList = ({ myRequestFoodsPromise }) => {
  const requests = use(myRequestFoodsPromise);
  console.log(requests);

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

                {/* Donor Info */}
                <div className="flex items-center my-4">
                  {donorImage && (
                    <img
                      src={donorImage}
                      alt={donorName}
                      className="w-12 h-15 rounded object-cover mr-3"
                    />
                  )}
                  <div>
                    <p className="text-sm text-gray-700"><span className="font-medium">Donor:</span> {donorName}</p>
                    <p className="text-sm text-gray-500"><span className="font-medium">Donor Email:</span> {donorEmail}</p>

                  </div>
                </div>

                {notes && (
                  <div className="mt-4 bg-gray-100 p-3 rounded text-sm text-gray-600 italic">
                    "{notes}"
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    
  );
};

export default RequestsList;
