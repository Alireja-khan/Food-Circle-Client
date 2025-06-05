import { use } from 'react';
import { FaBowlFood } from 'react-icons/fa6';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../services/firebase.init';
import bloomAnimation from '../assets/Lottie-Animations/Animation - 1749080200452.json';
import Lottie from 'lottie-react';

const SignIn = () => {
    const provider = new GoogleAuthProvider();
    const { signInUser } = use(AuthContext);
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                console.log(result);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signInUser(email, password)
            .then(result => {
                console.log(result);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="bg-base-200 py-50 pb-100 px-4 sm:px-6 lg:px-16 ">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-30">

                {/* Left Section */}

                <div className="max-w-2xl w-full mb-30">
                    <NavLink to="/">
                        <FaBowlFood className="w-8 h-8 hover:text-green-400 mb-5" />
                    </NavLink>
                    <h1 className="text-left text-4xl font-semibold mb-2">Sign in to




                        <NavLink to='/'>
                            <span className="relative ml-2 group px-5 py-1 font-semibold text-black overflow-hidden">
                                <span
                                    className="absolute bottom-0 left-0 right-0 bg-[#bee8b1] transition-all duration-300 ease-in-out h-full group-hover:h-1/2 z-0"
                                ></span>
                                <span className="relative z-10">FoodCircle</span>
                            </span>
                        </NavLink>





                    </h1>
                    <p className="text-left">
                        Our mission is simple <span className='font-semibold'>"sharing food, spreading hope"</span>. <span className='font-bold'>FoodCircle</span> connects
                        givers and receivers to build a caring, hunger-free community.
                    </p>
                </div>

                {/* Right Section */}
                <div className="relative w-full max-w-lg flex justify-center items-center mr-40">

                    {/* Animation (only shown on md and up) */}
                    <div className="absolute bottom-30 right-60 z-0 pointer-events-none hidden md:block w-full max-w-[400px] opacity-60">
                        <Lottie animationData={bloomAnimation} loop={true} />
                    </div>

                    {/* Sign-in Form */}
                    <div className="relative z-10 w-full bg-base-100 p-8 rounded-lg shadow-xl">
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
