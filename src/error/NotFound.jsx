import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoFastFood, IoWarningOutline } from "react-icons/io5";
import errorImg from '../assets/404 imge/404 Error with a cute animal-cuate (1).png';
import { GiFruitBowl } from "react-icons/gi";

const NotFound = () => {
    return (
        <section className="min-h-screen bg-green-50 flex flex-col items-center pb-20 justify-center px-6 text-center">


            <div className="flex items-center gap-3 my-6">
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-lime-500"
                >
                    <Link to='/'><GiFruitBowl className="w-18 text-lime-500 h-18" /></Link>
                </motion.div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800">
                    Page Not
                </h1>
                <span className="relative group rounded px-5 py-2 font-semibold text-black overflow-hidden text-3xl">
                    <motion.span
                        className="absolute bottom-0 left-0 right-0 bg-[#bee8b1] z-0"
                        initial={{ height: "100%" }}
                        animate={{ height: ["100%", "70%", "100%"] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut",
                        }}
                    ></motion.span>
                    <span className="relative z-10 text-4xl">Found</span>
                </span>
            </div>

            <p className="max-w-md text-gray-600">
                Oops! The page you're looking for doesn’t exist or has been moved. Maybe check out our home page?
            </p>

            <div>
                <img className="h-100" src={errorImg} alt="" />
            </div>
        </section>
    );
};

export default NotFound;
