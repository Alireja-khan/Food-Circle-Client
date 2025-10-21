import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GiFruitBowl } from "react-icons/gi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, signOutUser, loading } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") === "light" ? "light" : "dark"
    );

    const handleThemeChange = (event) => {
        const newTheme = event.target.checked ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "dark";
        setTheme(savedTheme);
        document.querySelector("html").setAttribute("data-theme", savedTheme);
    }, [theme]);

    const handleLinkClick = () => {
        setMobileMenuOpen(false);
    };

    useEffect(() => {
        if (user?.photoURL) {
            const img = new Image();
            img.src = user.photoURL;
        }
    }, [user?.photoURL]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSignOut = () => {
        signOutUser()
            .then(() => console.log('Signed out'))
            .catch(error => console.error(error));
    };

    const navLinkClass = 'transition text-base py-2 px-4 rounded-lg hover:bg-gray-100 font-semibold';

    const links = (
        <>
            <NavLink className={navLinkClass} to="/" onClick={handleLinkClick}>Home</NavLink>
            <NavLink className={navLinkClass} to="/availableFoods" onClick={handleLinkClick}>Available Foods</NavLink>
            <NavLink className={navLinkClass} to="/contact" onClick={handleLinkClick}>Contact</NavLink>
            <NavLink className={navLinkClass} to="/addFoods" onClick={handleLinkClick}>Add Food</NavLink>
            {user && (
                <>
                    <NavLink className={navLinkClass} to="/manageMyFoods" onClick={handleLinkClick}>Manage My Foods</NavLink>
                    <NavLink className={navLinkClass} to="/myRequestFoods" onClick={handleLinkClick}>My Request Foods</NavLink>
                    <NavLink className={navLinkClass} to="/myProfile" onClick={handleLinkClick}>My Profile</NavLink>
                </>
            )}
        </>
    );

    if (loading) return null;

    return (
        <div className="sticky top-0 z-[1000] bg-white shadow-sm px-4 md:px-40 dark:bg-gray-800">
            <div className="navbar py-3">
                {/* Navbar Start */}
                <div className="navbar-start">
                    {/* Logo */}
                    <div className="hidden md:flex items-center space-x-2 text-xl font-bold">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/"><GiFruitBowl className="w-12 text-lime-500 h-12" /></Link>
                        </motion.div>
                        <span className="dark:text-white">FoodCircle</span>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="btn btn-ghost btn-circle"
                        >
                            <HiOutlineMenuAlt2 className="w-8 h-8 dark:text-white" />
                        </button>
                    </div>
                </div>

                {/* Navbar Center */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{links}</ul>
                </div>

                {/* Navbar End */}
                <div className="navbar-end flex items-center gap-3">
                    {/* Theme Toggle */}
                    <label className="swap swap-rotate mr-4">
                        <input
                            type="checkbox"
                            className="theme-controller"
                            checked={theme === "dark"}
                            onChange={handleThemeChange}
                        />
                        {/* sun icon */}
                        <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>
                        {/* moon icon */}
                        <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>

                    {user ? (
                        <div ref={dropdownRef} className="relative">
                            {/* Profile Avatar Click */}
                            <div
                                role="button"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden relative bg-gray-200">
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt="Profile"
                                            width="40"
                                            height="40"
                                            className="object-cover w-full h-full opacity-0 transition-opacity duration-300"
                                            onLoad={(e) => e.currentTarget.classList.add("opacity-100")}
                                        />
                                    ) : (
                                        <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
                                            {user.displayName?.charAt(0) || "U"}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Dropdown on Click */}
                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.ul
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="dropdown-content absolute right-0 mt-3 w-56 bg-white text-gray-800 rounded-xl shadow-lg ring-1 ring-gray-200 p-3 z-50 dark:bg-gray-700 dark:text-white"
                                    >
                                        <li className="mb-3 border-b pb-2 dark:border-gray-600">
                                            <p className="text-sm font-medium">{user.displayName || 'Anonymous'}</p>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full text-left px-4 py-2 rounded-md text-sm hover:bg-[#bee8b1]/50 transition dark:hover:bg-gray-600"
                                            >
                                                Sign Out
                                            </button>
                                        </li>
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <>
                            <NavLink className="btn hover:bg-[#bee8b1] dark:hover:bg-gray-600 dark:text-white" to="/signIn">Sign In</NavLink>
                            <NavLink className="btn ml-2 hover:bg-[#bee8b1] dark:hover:bg-gray-600 dark:text-white" to="/signUp">Sign Up</NavLink>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Dropdown Menu on Click */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-2 md:hidden py-2 px-3 bg-white rounded-b-xl shadow-lg dark:bg-gray-700"
                    >
                        {links}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navbar;
