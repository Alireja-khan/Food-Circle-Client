import React from 'react';
import { FaBowlFood } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GiFruitBowl } from 'react-icons/gi';
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
                    {/* About Section */}
                    <div className="md:w-1/3">
                        <div className="flex items-center space-x-4 text-xl font-bold ">

                            <motion.button
                                whileHover={{ scale: 1.55 }}
                                whileTap={{ scale: 1.10 }}
                                onHoverStart={() => console.log('hover started!')}
                            >
                                <Link to='/'><GiFruitBowl className='w-10 h-10' /></Link>
                            </motion.button>

                            <span>FoodCircle</span>
                        </div>
                        <p className="text-gray-400 mt-2">
                            “Sharing Food, Spreading Hope.”
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="md:w-1/3">
                        <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
                        <ul>
                            <li><a href="/" className="hover:text-white transition">Home</a></li>
                            <li><a href="/availableFoods" className="hover:text-white transition">Available Foods</a></li>
                            <li><a href="/addFoods" className="hover:text-white transition">Add Food</a></li>
                            <li><a href="/manageMyFoods" className="hover:text-white transition">Manage My Foods</a></li>
                            <li><a href="/myRequestFoods" className="hover:text-white transition">My Food Requests</a></li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div className="md:w-1/3">
                        <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
                        <p>Email: <a href="mailto:support@foodsharing.com" className="hover:text-white transition">support@foodsharing.com</a></p>
                        <p>Phone: <a href="tel:+1234567890" className="hover:text-white transition">+1 234 567 890</a></p>

                        <div className="flex space-x-4 mt-4">
                            {/* You can replace '#' with your actual social URLs */}
                            <a href="#" aria-label="Facebook" className="hover:text-white transition">
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.6 9.8v-7h-3v-3h3v-2a3 3 0 013-3h3v3h-3a1 1 0 00-1 1v2h4l-1 3h-3v7A10 10 0 0022 12z" /></svg>
                            </a>
                            <a href="#" aria-label="Twitter" className="hover:text-white transition">
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg>
                            </a>
                            <a href="#" aria-label="Instagram" className="hover:text-white transition">
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm8 3a1 1 0 110 2 1 1 0 010-2zm-5 1a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} FoodCircle. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;