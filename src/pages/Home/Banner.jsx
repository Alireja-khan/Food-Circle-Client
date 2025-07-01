    import { Typewriter } from 'react-simple-typewriter';
    import { FaHandHoldingHeart, FaUtensils, FaSearch } from 'react-icons/fa';
    import BannerImg from '../../assets/Banner Image/BannerImg.jpg';
    import { useEffect, useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import Swal from 'sweetalert2';

    const Banner = () => {
        const [query, setQuery] = useState('');
        const [foods, setFoods] = useState([]);
        const navigate = useNavigate();

        useEffect(() => {
            fetch('https://food-circle-server-five.vercel.app/api/foods/available')
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
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Food is not available at the moment!",
                    footer: '<a href="#">Try something else.</a>'
                });
            }
        };

        return (
            <section className="relative w-full min-h-[70vh] max-h-[80vh] flex items-center justify-center overflow-hidden px-4 md:px-8">
                {/* Background Image */}
                <img
                    src={BannerImg}
                    alt="Hero Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 z-10"></div>

                {/* Content */}
                <div className="relative z-20 w-full max-w-7xl mx-auto text-center text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6"
                    >
                        <span className="text-[#a8d194] block">
                            <Typewriter
                                words={[
                                    'Give a Meal, Save a Life',
                                    'Bridge Hunger with Hope',
                                    'Donate. Receive. Unite.'
                                ]}
                                loop
                                cursor
                                cursorStyle="_"
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={2000}
                            />
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
                    >
                        End food waste. Fight hunger. Share your extra food or find support near you. Together, we make a difference.
                    </motion.p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10 px-2">
                        <Link to="/addFoods" className="w-full sm:w-auto">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#bee8b1] hover:bg-[#a9d39d] text-black px-6 py-3 rounded-full font-semibold shadow-lg transition duration-300"
                            >
                                <FaHandHoldingHeart className="text-lg" />
                                Become a Donor
                            </motion.button>
                        </Link>

                        <Link to="/availableFoods" className="w-full sm:w-auto">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black px-6 py-3 rounded-full font-semibold shadow-lg transition duration-300"
                            >
                                <FaUtensils className="text-lg" />
                                Request Food
                            </motion.button>
                        </Link>
                    </div>

                    {/* Search Box */}
                    <div className="max-w-2xl mx-auto px-2">
                        <div className="flex items-center bg-white/90 backdrop-blur-lg border border-white/30 rounded-full shadow-lg overflow-hidden transition duration-300 focus-within:border-green-ring-green-300 focus-within:ring-2 focus-within:ring-green-300">

                            {/* Search Icon */}
                            <div className="px-4 text-gray-500">
                                <FaSearch />
                            </div>

                            {/* Input */}
                            <input
                                type="text"
                                placeholder="Search available food..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="flex-grow px-4 py-3 text-gray-700 bg-transparent focus:outline-none placeholder:text-gray-500"
                            />

                            {/* Button */}
                            <button
                                onClick={handleSearch}
                                className="bg-[#bee8b1] hover:bg-[#a9d39d] px-6 py-3 text-sm font-semibold rounded-r-full text-black transition"
                            >
                                Search
                            </button>
                        </div>
                    </div>


                    {/* Scroll Down Indicator */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-white text-xl opacity-70"
                        >
                            ↓
                        </motion.div>
                    </div>
                </div>
            </section>
        );
    };

    export default Banner;
