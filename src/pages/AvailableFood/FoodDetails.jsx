import React, { useContext, useState } from 'react';
import { FaCalendarAlt, FaComments, FaMapMarkerAlt, FaPhone, FaUser, FaEllipsisV } from 'react-icons/fa';
import { FaBowlRice, FaTag } from 'react-icons/fa6';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import Modal from './Modal';
import { BsBoxArrowInLeft, BsPersonRaisedHand } from 'react-icons/bs';
import { MdEmail, MdOutlineFoodBank } from 'react-icons/md';
import { BiSolidNotepad, BiTimeFive } from 'react-icons/bi';
import DonorProfile from '../Profiles/DonorProfile';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../hooks/UseAuth';
import Swal from 'sweetalert2';
import axios from 'axios';

// Expiry warning utility
const getExpiryStatus = (expireDate) => {
  const today = new Date();
  const expiry = new Date(expireDate);
  const diffTime = expiry - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { status: 'expired', text: 'Expired', color: 'text-red-500', bgColor: 'bg-red-100' };
  if (diffDays === 0) return { status: 'today', text: 'Expires today!', color: 'text-red-500', bgColor: 'bg-red-100' };
  if (diffDays <= 2) return { status: 'urgent', text: `Expires in ${diffDays} day${diffDays > 1 ? 's' : ''}`, color: 'text-orange-500', bgColor: 'bg-orange-100' };
  if (diffDays <= 5) return { status: 'warning', text: `Expires in ${diffDays} days`, color: 'text-yellow-500', bgColor: 'bg-yellow-100' };
  return { status: 'fresh', text: `Expires in ${diffDays} days`, color: 'text-green-500', bgColor: 'bg-green-100' };
};

const FoodDetails = () => {
  const { user } = useAuth();
  const food = useLoaderData();
  const [showModal, setShowModal] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { loading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const viewFrom = location.state?.from || 'food';
  const backTo = location.state?.back || '/availableFoods';

  const expiryStatus = getExpiryStatus(food.expireDate);

  const handleChatWithDonor = async () => {
    if (user) {
      try {
        // Get donor's user ID from backend
        const donorResponse = await axios.get(`http://localhost:5000/api/user/${food.donorEmail}`);
        const donorUserId = donorResponse.data.userId;

        // Create consistent room ID using both Firebase UIDs
        const roomId = [user.uid, donorUserId].sort().join('_');

        // Navigate directly to chat room
        navigate(`/chat/${roomId}`, {
          state: {
            donorInfo: {
              userId: donorUserId,
              userName: food.donorName,
              userEmail: food.donorEmail,
              userImage: food.donorImage
            }
          }
        });
      } catch (error) {
        console.error('Error starting chat:', error);
        // Fallback: use email as ID if user not found
        const roomId = [user.uid, food.donorEmail].sort().join('_');
        navigate(`/chat/${roomId}`, {
          state: {
            donorInfo: {
              userId: food.donorEmail,
              userName: food.donorName,
              userEmail: food.donorEmail,
              userImage: food.donorImage
            }
          }
        });
      }
    } else {
      navigate('/signIn');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
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
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{food.foodName}</h2>
                  <div className='flex gap-5'>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${expiryStatus.bgColor} ${expiryStatus.color}`}>
                      {expiryStatus.text}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${food.status === 'available'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      {food.status}
                    </span>
                  </div>
                </div>



                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                  <div className="flex items-start">
                    <FaBowlRice className="mt-1 mr-3 text-amber-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Quantity</p>
                      <p className="text-gray-900">{food.quantity}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaCalendarAlt className="mt-1 mr-3 text-red-500" />
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
                  <p className="text-gray-600 max-w-150">{food.additionalNotes}</p>
                </div>
              </div>

            </div>

            {/* Right column - Donor information */}
            <div className="lg:col-span-1 space-y-6">
              {/* Donor profile card */}
              <div className="bg-white rounded-xl shadow-lg p-6 relative">
                {/* Three-dot dropdown menu */}
                <div className="absolute top-4 right-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <FaEllipsisV className="w-4 h-4 text-gray-500" />
                  </motion.button>

                  {/* Dropdown menu */}
                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                      >
                        <Link to={`/foods/${food._id}`} state={{ from: 'profile' }}>
                          <button
                            onClick={() => {
                              setSelectedDonor(food);
                              setShowDropdown(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-[#bee8b1]/60 flex items-center gap-3 transition-colors rounded-t-lg"
                          >
                            <FaUser className="w-4 h-4 text-gray-600" />
                            <span>View Profile</span>
                          </button>
                        </Link>


                        <button
                          onClick={() => {
                            handleChatWithDonor();
                            setShowDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-[#bee8b1]/60 flex items-center gap-3 transition-colors rounded-b-lg"
                        >
                          <FaComments className="w-4 h-4 text-gray-600" />
                          <span>Message</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex flex-col items-center mb-6">
                  <div className="bg-white rounded-xl mb-5 shadow-lg overflow-hidden">
                    <img
                      src={food.donorImage}
                      alt={food.donorName}
                      className="w-60 h-56 object-cover object-center hover:opacity-90 transition-opacity"
                    />
                  </div>

                  <div
                    onClick={() => {
                      setSelectedDonor(food);
                    }}
                    className="cursor-pointer text-center"
                  >
                    <h3 className="text-xl font-bold text-gray-900 hover:text-green-600 transition-colors">
                      {food.donorName}
                    </h3>
                    <p className="text-gray-600">{food.donorRole || 'Food Donor'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <MdEmail className="mt-1 mr-3 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-gray-900">{food.donorEmail}</p>
                    </div>
                  </div>

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
                </div>
              </div>

              {/* Action card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Request This Food</h3>
                <p className="text-gray-600 mb-6">If you're interested in this donation, please contact the donor or submit a request.</p>

                {/* Expiry Warning */}
                {(expiryStatus.status === 'today' || expiryStatus.status === 'urgent') && (
                  <div className={`mb-4 p-3 rounded-lg ${expiryStatus.bgColor} ${expiryStatus.color} text-sm font-medium`}>
                    ⚠️ {expiryStatus.text} - Request soon!
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (user) {
                      setShowModal(true);
                    } else {
                      navigate('/signIn');
                    }
                  }}
                  className="w-full bg-[#bee8b1] font-medium py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg mb-4 hover:bg-[#a8d897]"
                >
                  Request Now
                </motion.button>
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