import { Typewriter } from 'react-simple-typewriter';
import { FaHandHoldingHeart, FaUtensils } from 'react-icons/fa';
import BannerImg from '../../assets/Banner Image/BannerImg.jpg';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Banner = () => {
    const [query, setQuery] = useState('');
    const [foods, setFoods] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetch('http://localhost:3000/foods/available')
            .then(res => res.json())
            .then(data => setFoods(data));
    }, []);

    const handleSearch = () => {
        const cleanQuery = query.trim().toLowerCase();

        const matchedFoods = foods.filter(food =>
            food.foodName.toLowerCase().includes(cleanQuery)
        );

        if (matchedFoods.length > 0) {

            navigate('/availableFoods', { state: { searchResults: matchedFoods } });

        } else if (cleanQuery.includes('food') || cleanQuery.includes('foods')) {
            navigate('/availableFoods');
        } else {
            alert('No match found. Try searching for food or donors');
        }
    };


    return (
        <div className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8">
            {/* Background Image */}
            <img
                src={BannerImg}
                alt="Decorative"
                className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-[#000000]/70 z-10 pointer-events-none"></div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-5xl mx-auto rounded-3xl px-4 sm:px-6 md:px-8 py-10 sm:py-14 text-center">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                    <span className="text-[#78ab6c] inline-block">
                        <Typewriter
                            words={[
                                'Give a Meal, Save a Life',
                                'Bridge Hunger with Hope',
                                'Donate. Receive. Unite.',
                            ]}
                            loop
                            cursor
                            cursorStyle="_"
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={2000}
                        />
                    </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-white mb-8">
                    Stand up to hunger. Share your extra food or find support near you.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 w-full px-2">
                    <Link to="/addFoods" className="w-full sm:w-auto">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#bee8b1] hover:bg-[#a9d39d] text-black px-6 py-3 rounded-l-2xl font-semibold shadow-md transition duration-300"
                        >
                            <FaHandHoldingHeart />
                            Become a Donor
                        </motion.button>
                    </Link>

                    <Link to="/availableFoods" className="w-full sm:w-auto">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black px-6 py-3 rounded-r-2xl font-semibold shadow-md transition duration-300"
                        >
                            <FaUtensils />
                            Request Food
                        </motion.button>
                    </Link>
                </div>

                {/* Search */}
                <div className="w-full max-w-xl mx-auto px-2">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white border border-gray-300 rounded-2xl shadow-md p-2 gap-2">
                        <input
                            type="text"
                            placeholder="Type food name for particular available Food or food..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                            className="flex-grow px-4 py-2 text-gray-700 bg-transparent focus:outline-none rounded-full"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-[#bee8b1] hover:bg-[#a9d39d] px-5 py-2 rounded-2xl text-black font-medium transition"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
