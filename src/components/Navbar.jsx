import React, { use } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBowlFood } from "react-icons/fa6";
import { AuthContext } from '../contexts/AuthContext/AuthContext';


const Navbar = () => {

    const { user, signOutUser } = use(AuthContext)


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

        <NavLink className='transition py-2 px-4 rounded-lg hover:bg-gray-100 font-semibold' to='/'>Home</NavLink>
        <NavLink className='transition py-2 px-4 rounded-lg hover:bg-gray-100 font-semibold' to='/addFoods'>Available Foods</NavLink>
        <NavLink className='transition py-2 px-4 rounded-lg hover:bg-gray-100 font-semibold' to='/availableFoods'>Add Food</NavLink>
        <NavLink className='transition py-2 px-4 rounded-lg hover:bg-gray-100 font-semibold' to='/manageMyFoods'>Manage My Foods</NavLink>
        <NavLink className='transition py-2 px-4 rounded-lg hover:bg-gray-100 font-semibold' to='/myFoodRequest'>My Food Request</NavLink>

    </>


    return (
        <div className="navbar bg-base-100 shadow-sm px-10">
            <div className="navbar-start">
                <div className="flex items-center space-x-2 text-xl font-bold ">
                    <FaBowlFood className='w-8 h-8 hover:text-[#82a079]' />
                    <span>FoodCircle</span>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <button onClick={handleSignOut} className='btn'>Sign Out</button> :
                        <>

                            <NavLink className='btn ' to='/signIn'>Sign In</NavLink>
                            <NavLink className='btn ml-3' to='/signUp'>Sign Up</NavLink>

                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;