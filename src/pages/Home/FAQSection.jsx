import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import faqImg from '../../assets/Images/Man thinking-cuate.png';

import { Link } from 'react-router-dom';
import { BiMessageSquareDetail } from 'react-icons/bi';

const faqData = [
  {
    question: "How can I donate food?",
    answer: "Simply sign up and go to the 'Donate Food' page. Fill out the details about the food you want to share, and set the pickup location and time.",
  },
  {
    question: "Who can receive donated food?",
    answer: "Anyone in need can browse available foods and request items with dignity through our platform.",
  },
  {
    question: "Is there a cost for using the service?",
    answer: "No, FoodCircle is completely free to use for both donors and receivers. Our goal is to reduce food waste and fight hunger.",
  },
  {
    question: "How do I know the food is safe?",
    answer: "We encourage donors to only share fresh and safely prepared food. Receivers can also communicate pickup details to ensure timely collection.",
  },
  {
    question: "Can I become a volunteer?",
    answer: "Absolutely! Join our community and look for volunteer opportunities to help with pickups and deliveries.",
  },
];

const FAQItem = ({ faq, index, isOpen, toggle }) => {
  return (
    <motion.div
      layout
      initial={{ borderRadius: 12 }}
      className={`bg-white border border-gray-200 rounded-2xl p-6 cursor-pointer transition 
        ${isOpen ? "bg-green-50 border-green-300" : "hover:bg-green-50 hover:border-green-300"}`}
      onClick={() => toggle(index)}
    >
      <motion.h3
        layout
        className="text-lg sm:text-xl font-semibold text-gray-800 flex justify-between items-center"
      >
        {faq.question}
        <span className="text-green-600 font-bold text-2xl select-none">
          {isOpen ? "−" : "+"}
        </span>
      </motion.h3>

      <AnimatePresence>
        {isOpen && (
          <motion.p
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="text-gray-600 text-base sm:text-lg leading-relaxed"
          >
            {faq.answer}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-screen-2xl mx-auto pt-20 px-4 sm:px-8 lg:px-16">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-5 text-center relative z-10">
        <motion.button
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 1.15 }}
          onHoverStart={() => console.log('hover started!')}
        >
          <Link to="">
            <BiMessageSquareDetail className="w-12 text-lime-500 h-12 mx-auto" />
          </Link>
        </motion.button>
        <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold">FAQs</p>
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
          <span className="relative z-10 text-4xl">Answers</span>
        </span>
      </div>

      <motion.p
        className="text-gray-600 text-lg text-center max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        Find clear answers to the most frequently asked questions about how FoodCircle works and how you can participate in reducing food waste and supporting the community.
      </motion.p>



      <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Left: Tree Image */}
        <div className="flex justify-center flex-1 max-w-lg sm:max-w-xl lg:max-w-2xl xl:max-w-3xl">
          <motion.img
            src={faqImg}
            alt="FAQ Tree Decoration"
            className="w-full h-150 object-contain rounded-3xl scale-105"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1.05 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: false, amount: 0.3 }}
            loading="lazy"
          />
        </div>

        {/* Right: FAQ Accordion */}
        <div className="flex-1 max-w-3xl space-y-6">
          {faqData.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              toggle={toggleFAQ}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
