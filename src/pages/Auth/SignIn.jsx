import { use } from 'react';
import { FaBowlFood } from 'react-icons/fa6';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../services/firebase.init';
import bloomAnimation from '../../assets/Lottie-Animations/Animation - 1749080200452.json';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { GiFruitBowl } from 'react-icons/gi';

const SignIn = () => {
    const provider = new GoogleAuthProvider();
    const { signInUser } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                console.log(result);
                navigate(from);
                Swal.fire({
                    icon: "success",
                    title: "You Are Successfully Signed In With Google",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Google Sign-In Failed',
                    text: 'Something went wrong. Please try again.',
                    confirmButtonColor: '#d33'
                });
            });
    };

    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(result => {
                console.log(result);
                navigate(from);
                Swal.fire({
                    icon: "success",
                    title: "You Are Successfully Signed In",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Sign-in Failed',
                    text: 'Invalid email or password!',
                    confirmButtonColor: '#d33'
                });
            });
    };

    return (
        <div className="bg-base-200 py-16 px-4 sm:px-6 lg:px-16 min-h-screen flex items-center justify-center">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-16 w-full max-w-7xl">

                {/* Left Section */}
                <div className="w-full max-w-xl">

                    <div className=" hidden md:flex items-center space-x-2 text-xl font-bold mb-2">
                        <motion.div
                            whileHover={{ scale: 1.20 }}
                            whileTap={{ scale: 0.95 }}
                            onHoverStart={() => console.log('hover started!')}
                        >
                            <Link to='/'><GiFruitBowl className='w-12 h-12 ' /></Link>
                        </motion.div>
                    </div>

                    <h1 className="text-left text-3xl sm:text-4xl font-semibold mb-2">
                        <div className='flex items-center'>
                            <span>
                                Sign in to
                            </span>
                            <NavLink to='/' className="inline-block ml-2 relative group px-4 py-2 font-semibold text-black overflow-hidden">
                                <span className="absolute bottom-0 left-0 right-0 bg-[#bee8b1] transition-all duration-300 ease-in-out h-full group-hover:h-1/2 z-0"></span>
                                <span className="relative z-10">FoodCircle</span>
                            </NavLink>
                        </div>
                    </h1>

                    <p className="text-left text-sm sm:text-base">
                        Our mission is simple <span className='font-semibold'>"sharing food, spreading hope"</span>. <span className='font-bold'>FoodCircle</span> connects
                        givers and receivers to build a caring, hunger-free community.
                    </p>
                </div>

                {/* Right Section */}
                <div className="relative w-full max-w-lg flex justify-center items-center">

                    {/* Animation (only shown on md and up) */}
                    <div
                        className="absolute bottom-30 right-58 z-10 pointer-events-none hidden md:block w-[400px] opacity-60"
                    >
                        <Lottie animationData={bloomAnimation} loop={true} />
                    </div>








                    {/* Sign-in Form */}
                    <div className="relative z-10 w-full bg-base-100 p-6 sm:p-8 rounded-lg shadow-xl">
                        <form onSubmit={handleSignIn} className="space-y-4">
                            <div>
                                <label className="label text-sm font-semibold">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="input input-bordered w-full"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label className="label text-sm font-semibold">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    className="input input-bordered w-full"
                                    placeholder="Enter your password"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-outline border-[#bee8b1] hover:bg-[#bee8b1] w-full"
                            >
                                Sign In
                            </button>
                        </form>

                        <div className="divider">OR</div>

                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="btn bg-white text-black border border-gray-300 w-full flex items-center justify-center"
                        >
                            <img
                                src="https://img.icons8.com/color/16/google-logo.png"
                                alt="Google"
                                className="mr-2"
                            />
                            Sign In with Google
                        </button>

                        <p className="mt-4 text-center text-sm">
                            Don't have an account?{' '}
                            <Link to="/signUp" className="text-red-500 hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
