import { motion } from "framer-motion";
import { IoFastFood, IoMailOpenOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ContactTitle = () => (
  <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 text-center">
    <motion.button
      whileHover={{ scale: 1.25 }}
      whileTap={{ scale: 1.15 }}
      className="focus:outline-none"
    >
      <Link to="/">
        <IoMailOpenOutline className="w-12 h-12 mx-auto text-lime-500" />
      </Link>
    </motion.button>

    <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800">
      Get in
    </p>

    <span className="relative group rounded px-5 py-2 font-semibold text-black overflow-hidden text-3xl">
      <motion.span
        className="absolute bottom-0 left-0 right-0 bg-[#bee8b1] z-0"
        initial={{ height: "100%" }}
        animate={{ height: ["100%", "70%", "100%"] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      ></motion.span>
      <span className="relative z-10 text-4xl">Touch</span>
    </span>
  </div>
);

export default ContactTitle;
