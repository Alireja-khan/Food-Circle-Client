import React, { useContext, useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaUser } from 'react-icons/fa';
import { FaBowlRice, FaTag } from 'react-icons/fa6';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import Modal from './Modal';
import { BsBoxArrowInLeft, BsPersonRaisedHand } from 'react-icons/bs';
import { MdEmail, MdOutlineFoodBank } from 'react-icons/md';
import { BiSolidNotepad, BiTimeFive } from 'react-icons/bi';
import DonorProfile from '../Profiles/DonorProfile';
import { motion } from 'framer-motion';

const FoodDetails = () => {
  const food = useLoaderData();
  const [showModal, setShowModal] = useState(false);
  const [showFullDonorImage, setShowFullDonorImage] = useState(false);
  const { loading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const viewFrom = location.state?.from || 'food';
  const backTo = location.state?.back || '/availableFoods';

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  console.log(food.status)

  return (
    <div className="min-h-screen bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Full Donor Image Modal */}
      {showFullDonorImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setShowFullDonorImage(false)}
            className="absolute top-4 right-4 text-white text-4xl"
          >
            &times;
          </button>
          <img
            src={food.donorImage || '/default-avatar.png'}
            alt={food.donorName}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center mb-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(backTo)}
            className="flex items-center transition-colors"
          >
            <BsBoxArrowInLeft className="w-12 h-12 text-lime-500 mr-2" />
          </motion.button>
          <h1 className="text-3xl font-bold text-gray-900 ml-4">Food Details</h1>
        </div>

        {viewFrom === 'food' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Food image gallery */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main food image */}

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={food.foodImage}
                  alt={food.foodName}
                  className="w-full h-96 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => window.open(food.foodImage, '_blank')}
                />
              </div>

              {/* Food details card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{food.foodName}</h2>
                <div className="flex items-center mb-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${food.status === 'available'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}>
                    {food.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-start">
                    <FaBowlRice className="mt-1 mr-3 text-amber-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Quantity</p>
                      <p className="text-gray-900">{food.quantity}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaCalendarAlt className="mt-1 mr-3 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Expiration Date</p>
                      <p className="text-gray-900">{food.expireDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <BiTimeFive className="mt-1 mr-3 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Posted On</p>
                      <p className="text-gray-900">{food.postedDate || 'Not specified'}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaTag className="mt-1 mr-3 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Food Category</p>
                      <p className="text-gray-900">{food.category || 'General'}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BiSolidNotepad className="w-5 h-5 text-gray-500" />
                    <p className="font-semibold">Description:</p>
                  </div>
                  <p className="text-gray-600">{food.additionalNotes}</p>
                </div>
              </div>

            </div>

            {/* Right column - Donor information */}
            <div className="lg:col-span-1 space-y-6">
              {/* Donor profile card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col items-center mb-6">

                  <div className="bg-white rounded-xl mb-5 shadow-lg overflow-hidden">
                    <img
                      src={food.donorImage}
                      alt={food.donorName}
                      className="w-44 h-44 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => window.open(food.donorImage, '_blank')}
                    />
                  </div>


                  <h3 className="text-xl font-bold text-gray-900">{food.donorName}</h3>
                  <p className="text-gray-600">{food.donorRole || 'Food Donor'}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <MdEmail className="mt-1 mr-3 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-gray-900">{food.donorEmail}</p>
                    </div>
                  </div>

                  {food.donorPhone && (
                    <div className="flex items-start">
                      <FaPhone className="mt-1 mr-3 text-orange-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone</p>
                        <p className="text-gray-900">{food.donorPhone}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start">
                    <FaMapMarkerAlt className="mt-1 mr-3 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="text-gray-900">{food.pickupLocation}</p>
                      {food.pickupInstructions && (
                        <p className="text-sm text-gray-500 mt-1">
                          <span className="font-medium">Instructions:</span> {food.pickupInstructions}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">About the Donor</h4>
                    <p className="text-gray-600">
                      {food.donorBio || 'This donor hasn\'t provided additional information yet.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Request This Food</h3>
                <p className="text-gray-600 mb-6">If you're interested in this donation, please contact the donor or submit a request.</p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(true)}
                  className="w-full bg-[#bee8b1]  font-medium py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg mb-4"
                >
                  Request Now
                </motion.button>

                {/* <div className="flex  space-x-4">

                  <button
                    onClick={handleEmailClick}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center"
                  >
                    <MdEmail className="mr-2" />
                    <span>{food.donorEmail}</span>
                  </button>
                  <Link>
                    <button
                      className="text-indigo-600 hover:text-indigo-800 flex items-center"
                    >
                      <GiFruitBowl className="mr-2" />
                      <span>Support</span>
                    </button>
                  </Link>

                </div> */}
              </div>
            </div>
          </div>
        ) : (
          <DonorProfile food={food} />
        )}

        {/* Modal for food request */}
        {showModal && <Modal setShowModal={setShowModal} food={food} />}
      </div>
    </div>
  );
};

export default FoodDetails;