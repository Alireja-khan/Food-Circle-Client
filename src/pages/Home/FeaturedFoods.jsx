import React, { useEffect, useState } from 'react';
import FoodCards from '../../shared/FoodCards';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeaturedFoods = () => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        fetch('https://food-circle-server-five.vercel.app/foods/featured')
            .then(res => res.json())
            .then(data => setFoods(data));

    }, []);


    return (
        <div>
            <FoodCards foods={foods} />
            <motion.div
                className="flex justify-center w-full px-4 sm:px-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link to="/availableFoods">
                    <button className="w-full sm:w-auto px-6 sm:px-36 py-4 sm:py-6 btn bg-[#bee8b1] flex justify-center text-sm sm:text-base font-semibold">
                        Show All
                    </button>
                </Link>
            </motion.div>

        </div>
    );
};

export default FeaturedFoods;
