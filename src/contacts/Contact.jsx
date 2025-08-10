import { motion } from "framer-motion";
import { useContext, useRef } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import ContactTitle from "./ContactTitle";
import emailjs from "@emailjs/browser";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const Contact = () => {
  const { loading } = useContext(AuthContext)

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_r28enj9",
        "template_vqgxz3l",
        form.current,
        "wkLmEE87aqOf86SJh"
      )
      .then(
        () => {
          Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "We’ll get back to you soon.",
            timer: 3000,
            showConfirmButton: false,
          });
          form.current.reset();
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong. Please try again later.",
          });
        }
      );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen h-64">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <section
      className="bg-green-50 min-h-screen flex items-center justify-center px-4"
      id="contact"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text & Info */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <ContactTitle />
          <motion.p
            className="text-gray-600 text-lg max-w-2xl mx-auto "
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            Have a question or want to join our mission to reduce food waste? Fill
            out the form or reach us through the details below.
          </motion.p>
          <div className="space-y-4">
            <p className="flex items-center gap-3 text-gray-700">
              <FaPhoneAlt className="text-lime-500" /> +880 173 342 89 76
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <FaEnvelope className="text-lime-500" /> support@foodcircle.com
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <FaMapMarkerAlt className="text-lime-500" /> Dhaka, Bangladesh
            </p>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.form
          ref={form}
          onSubmit={sendEmail}
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-lg rounded-2xl p-6 space-y-4 border"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-lime-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-lime-400"
            required
          />
          <textarea
            name="message"
            rows="4"
            placeholder="Your Message"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-lime-400"
            required
          ></textarea>
          <motion.button
            className="w-full bg-[#bee8b1] hover:bg-[#bee8b1] font-medium py-3 px-4 rounded-lg transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
