import React, { use, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBowlFood } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { GiFruitBowl } from "react-icons/gi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { AuthContext } from '../contexts/AuthContext/AuthContext';


const Navbar = () => {

    const { user, signOutUser } = use(AuthContext)
    const [dropdownOpen, setDropdownOpen] = useState(false);



    const handleSignOut = () => {
        signOutUser()
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const links = <>

        <NavLink className='transition text-base py-2 px-4 rounded-lg hover:bg-gray-100 font-semibold' to='/'>Home</NavLink>
        <NavLink className='transition text-base py-2 px-4 rounded-lg hover:bg-gray-100 font-semibold' to='/availableFoods'>Available Foods</NavLink>
        <NavLink className='transition text-base py-2 px-4 rounded-lg hover:bg-gray-100 font-semibold' to='/addFoods'>Add Food</NavLink>


        {
            user && <>
                <NavLink className='transition text-base py-2 px-4 rounded-lg hover:bg-gray-100 font-semibold' to='/manageMyFoods'>Manage My Foods</NavLink>
                <NavLink className='transition text-base py-2 px-4 rounded-lg hover:bg-gray-100 font-semibold' to='/myRequestFoods'>My Request Foods</NavLink>
                <NavLink className='transition text-base py-2 px-4 rounded-lg hover:bg-gray-100 font-semibold' to='/myProfile'>My Profile</NavLink>
            </>
        }
    </>



    return (
        <div className="navbar bg-base-100 shadow-sm px-10 z-[1000] relative">

            <div className="navbar-start">
                <div className=" hidden md:flex items-center space-x-2 text-xl font-bold ">
                    <motion.div
                        whileHover={{ scale: 1.20 }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => console.log('hover started!')}
                    >
                        <Link to='/'><GiFruitBowl className='w-10 h-10 ' /></Link>
                    </motion.div>
                    <span>FoodCircle</span>
                </div>

                <div className="dropdown md:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <HiOutlineMenuAlt2 className='w-10 h-10' />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>

            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>

            <div className="navbar-end">
                {
                    user ? (



                        <div
                            className="relative group dropdown-end py-4"
                            onClick={() => setDropdownOpen(prev => !prev)}
                            onBlur={() => setDropdownOpen(false)} // Optional: auto-close
                        >
                            <div
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 h-15 rounded ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                                    {user.photoURL && (
                                        <img src={user.photoURL} alt="Profile" className="object-cover w-full h-full" />
                                    )}
                                </div>
                            </div>

                            <ul
                                className={`absolute right-0 mt-5 w-56 bg-white text-gray-800 rounded-xl shadow-lg ring-1 ring-gray-200 p-3 z-[1] transition-all duration-200
      ${dropdownOpen ? 'visible opacity-100' : 'invisible opacity-0'}
      group-hover:visible group-hover:opacity-100
    `}
                            >
                                <li className="mb-3 border-b pb-2">
                                    <p className="text-sm font-medium">{user.displayName}</p>
                                </li>
                                <li>
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full text-left px-4 py-2 rounded-md text-sm hover:bg-[#bee8b1]/50 transition-colors duration-200"
                                    >
                                        Sign Out
                                    </button>
                                </li>
                            </ul>
                        </div>




                    ) :
                        <>

                            <NavLink className='btn  hover:bg-[#bee8b1]' to='/signIn'>Sign In</NavLink>
                            <NavLink className='btn ml-3 hover:bg-[#bee8b1]' to='/signUp'>Sign Up</NavLink>

                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;