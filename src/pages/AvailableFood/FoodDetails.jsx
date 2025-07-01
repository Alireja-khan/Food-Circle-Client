import React, { useContext, useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { FaBowlRice, FaTag } from 'react-icons/fa6';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import Modal from './Modal';
import { BsBoxArrowInLeft, BsPersonRaisedHand } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { BiSolidNotepad } from 'react-icons/bi';
// import DonorProfile from "../pages/Profiles/DonorProfile";
import DonorProfile from '../Profiles/DonorProfile';
import { motion } from 'framer-motion';

const FoodDetails = () => {
  const food = useLoaderData();
  const [showModal, setShowModal] = useState(false);
  const { loading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // 🔁 Determine what to show
  const viewFrom = location.state?.from || 'food'; // 'food' or 'profile'
  const backTo = location.state?.back || '/availableFoods'; // default back path

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-screen-xl mx-auto bg-white shadow-xl rounded-2xl mt-10">
      {/* Back Button */}
      <div className="mb-4">
        <motion.button
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(backTo)}
        >
          <BsBoxArrowInLeft className="w-10 h-10" />
        </motion.button>
      </div>

      {viewFrom === 'food' ? (
        <>
          {/* Food Details View */}
          <img
            src={food.foodImage}
            alt={food.foodName}
            className="w-full mx-auto max-h-96 object-contain rounded-lg mb-6"
          />

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-bold text-gray-800 mb-6">
            {food.foodName}
          </h1>

          <div className="bg-white rounded-xl shadow hover:shadow-2xl transition p-4 sm:p-6 text-gray-700 text-base">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 mb-4">
              {/* Left Column */}
              <div>
                <p className="flex mb-2 items-center gap-2">
                  <FaTag />
                  <span className="font-semibold">Status:</span> {food.status}
                </p>
                <p className="flex mb-2 items-center gap-2">
                  <FaBowlRice />
                  <span className="font-semibold">Quantity:</span> {food.quantity}
                </p>
                <p className="flex mb-2 items-center gap-2">
                  <BsPersonRaisedHand />
                  <span className="font-semibold">Donor:</span> {food.donorName}
                </p>
              </div>

              {/* Right Column */}
              <div>
                <p className="flex mb-2 items-center gap-2">
                  <FaMapMarkerAlt />
                  <span className="font-semibold">Pick Up Location:</span> {food.pickupLocation}
                </p>
                <p className="flex mb-2 items-center gap-2">
                  <FaCalendarAlt />
                  <span className="font-semibold">Expire Date:</span> {food.expireDate}
                </p>
                <p className="flex mb-2 items-center gap-2">
                  <MdEmail />
                  <span className="font-semibold">Donor Email:</span> {food.donorEmail}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="border-t pt-4">
              <div className="flex items-center gap-2">
                <BiSolidNotepad className="w-5 h-5" />
                <p className="font-semibold mb-1">Description:</p>
              </div>
              <p className="text-sm text-gray-600">{food.additionalNotes}</p>
            </div>
          </div>

          {/* Request Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowModal(true)}
              className="w-full sm:w-auto hover:shadow-2xl border text-base sm:text-lg font-semibold py-3 px-8 rounded-xl shadow transition duration-300"
            >
              Request
            </button>
          </div>

          {/* Modal */}
          {showModal && <Modal setShowModal={setShowModal} food={food} />}
        </>
      ) : (
        
        <DonorProfile food={food}></DonorProfile>
      )}
    </div>
  );
};

export default FoodDetails;
