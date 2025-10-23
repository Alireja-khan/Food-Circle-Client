import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaUser, FaEnvelope, FaStickyNote } from 'react-icons/fa';
import { FaBowlFood } from 'react-icons/fa6';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/UseAuth';

const Modal = ({ setShowModal, food }) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    requesterName: user?.displayName || '',
    requesterEmail: user?.email || '',
    notes: '',
    quantity: food.quantity || '',
    pickupLocation: food.pickupLocation || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const requestData = {
        // Requester info
        requesterName: formData.requesterName,
        requesterEmail: formData.requesterEmail,
        requesterImage: user?.photoURL || '',
        
        // Food info
        foodId: food._id,
        foodName: food.foodName,
        foodImage: food.foodImage,
        quantity: formData.quantity,
        
        // Donor info
        donorName: food.donorName,
        donorEmail: food.donorEmail,
        donorImage: food.donorImage,
        
        // Request details
        pickupLocation: formData.pickupLocation,
        notes: formData.notes,
        userEmail: user.email,
        status: 'Pending'
      };

      console.log('📤 Submitting request:', requestData);

      const response = await axios.post('http://localhost:5000/api/requests', requestData);

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Request Submitted!',
          text: 'Your food request has been sent to the donor.',
          showConfirmButton: false,
          timer: 2000
        });
        setShowModal(false);
      } else {
        throw new Error(response.data.error || 'Failed to submit request');
      }
    } catch (error) {
      console.error('❌ Request submission error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Request Failed',
        text: error.response?.data?.error || 'Failed to submit your request. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 25 }}
        className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 p-6 pb-4 flex justify-between items-center border-b">
          <div className="flex items-center gap-3">
            <FaBowlFood className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-bold text-gray-800">Request Food</h2>
          </div>
          <button
            onClick={() => setShowModal(false)}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Food Info */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Food Details</h3>
            <div className="flex items-center gap-3">
              {food.foodImage && (
                <img
                  src={food.foodImage}
                  alt={food.foodName}
                  className="w-12 h-12 object-cover rounded"
                />
              )}
              <div>
                <p className="font-medium text-gray-900">{food.foodName}</p>
                <p className="text-sm text-gray-600">Donor: {food.donorName}</p>
              </div>
            </div>
          </div>

          {/* Form Fields in Two Columns */}
          <div className="space-y-6">
            {/* First Row - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Your Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FaUser className="text-blue-500" />
                  Your Name
                </label>
                <input
                  type="text"
                  name="requesterName"
                  value={formData.requesterName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Your Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FaEnvelope className="text-blue-500" />
                  Your Email
                </label>
                <input
                  type="email"
                  name="requesterEmail"
                  value={formData.requesterEmail}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Second Row - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Requested Quantity */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FaBowlFood className="text-amber-500" />
                  Requested Quantity
                </label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 2 servings"
                  required
                />
              </div>

              {/* Pickup Location */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FaEnvelope className="text-orange-500" />
                  Pickup Location
                </label>
                <input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Third Row - Full Width */}
            <div className="col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FaStickyNote className="text-purple-500" />
                Additional Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                placeholder="Any special requests or timing preferences..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-3">
            <motion.button
              type="button"
              onClick={() => setShowModal(false)}
              whileTap={{ scale: 0.95 }}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
              className={`flex-1 px-4 py-3 bg-green-500 text-white rounded-lg font-medium transition-colors ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-600'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Modal;