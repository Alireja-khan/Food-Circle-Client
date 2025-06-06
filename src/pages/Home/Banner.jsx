import React from 'react';
import BannerImg from '../../assets/Banner Image/BannerImg4.png';
import { Typewriter } from 'react-simple-typewriter';

const Banner = () => {
    return (
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-12 lg:px-50 mt-10 gap-10 ">
            
            {/* Left Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 leading-tight">
                    <span className="text-[#a9d49e]">
                        <Typewriter
                            words={['Give a Meal, Save a Life', 'Bridge Hunger with Hope', 'Donate. Receive. Unite.']}
                            loop
                            cursor
                            cursorStyle="_"
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={2000}
                        />
                    </span>
                </h1>
                <p className="text-gray-600 text-lg mb-6">
                    Stand up to hunger. Share your extra food or find support near you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button className="bg-[#bee8b1] hover:bg-[#a9d39d] text-black px-6 py-3 rounded-xl font-semibold transition shadow-md">
                        Become a Donor
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-black px-6 py-3 rounded-xl font-semibold transition shadow-md">
                        Request Food
                    </button>
                </div>

                {/* Optional Search */}
                <div className="mt-6 w-full max-w-xl">
                    <div className="bg-white border  rounded-xl p-3 flex gap-3 shadow-2xl">
                        <input
                            type="text"
                            placeholder="Search for food or donors near you..."
                            className="flex-grow px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#bee8b1]"
                        />
                        <button className="bg-[#bee8b1] px-5 py-2 rounded-xl text-black hover:bg-[#a9d39d] transition">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Image Content */}
            <div className="w-2/3 lg:w-1/3">
                <img
                    src={BannerImg}
                    alt="Food Sharing Community"
                    className="rounded-3xl w-full h-auto object-cover "
                />
            </div>
        </div>
    );
};

export default Banner;
