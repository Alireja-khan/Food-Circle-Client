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

    // Preload user photo early
    useEffect(() => {
        if (user?.photoURL) {
            const img = new Image();
            img.src = user.photoURL;
        }
    }, [user?.photoURL]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
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
            <NavLink className={navLinkClass} to="/">Home</NavLink>
            <NavLink className={navLinkClass} to="/availableFoods">Available Foods</NavLink>
            <NavLink className={navLinkClass} to="/addFoods">Add Food</NavLink>
            {user && (
                <>
                    <NavLink className={navLinkClass} to="/manageMyFoods">Manage My Foods</NavLink>
                    <NavLink className={navLinkClass} to="/myRequestFoods">My Request Foods</NavLink>
                    <NavLink className={navLinkClass} to="/myProfile">My Profile</NavLink>
                </>
            )}
        </>
    );

    if (loading) return null;

    return (
        <div className="sticky top-0 z-[1000] bg-white shadow-sm px-4 md:px-40">
            <div className="navbar py-3">
                {/* Navbar Start */}
                <div className="navbar-start">
                    {/* Logo */}
                    <div className="hidden md:flex items-center space-x-2 text-xl font-bold">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/"><GiFruitBowl className="w-12 text-lime-500 h-12" /></Link>
                        </motion.div>
                        <span>FoodCircle</span>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="btn btn-ghost btn-circle"
                        >
                            <HiOutlineMenuAlt2 className="w-8 h-8" />
                        </button>
                    </div>
                </div>

                {/* Navbar Center */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{links}</ul>
                </div>

                {/* Navbar End */}
                <div className="navbar-end flex items-center gap-3">
                    {user ? (
                        <div
                            className="relative"
                            onMouseEnter={() => setDropdownOpen(true)}
                            onMouseLeave={() => setDropdownOpen(false)}
                            ref={dropdownRef}
                        >
                            {/* Profile Avatar */}
                            <div role="button" className="btn btn-ghost btn-circle avatar">
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

                            {/* Hover Dropdown */}
                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.ul
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="dropdown-content absolute right-0 mt-3 w-56 bg-white text-gray-800 rounded-xl shadow-lg ring-1 ring-gray-200 p-3 z-50"
                                    >
                                        <li className="mb-3 border-b pb-2">
                                            <p className="text-sm font-medium">{user.displayName || 'Anonymous'}</p>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full text-left px-4 py-2 rounded-md text-sm hover:bg-[#bee8b1]/50 transition"
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
                            <NavLink className="btn hover:bg-[#bee8b1]" to="/signIn">Sign In</NavLink>
                            <NavLink className="btn ml-2 hover:bg-[#bee8b1]" to="/signUp">Sign Up</NavLink>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-2 md:hidden py-2 px-3 bg-white rounded-b-xl shadow-lg"
                    >
                        {links}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navbar;
