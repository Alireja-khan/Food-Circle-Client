import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBowlFood } from 'react-icons/fa6';
import { use } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth } from '../../services/firebase.init';
import bloomAnimation from '../../assets/Lottie-Animations/Animation - 1749080200452.json';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
import { GiFruitBowl } from 'react-icons/gi';
import { motion } from 'framer-motion';

const SignUp = () => {
    const { createUser, SetLoading } = use(AuthContext);
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.Name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        if (!/[A-Z]/.test(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Weak Password',
                text: 'Password must contain at least one uppercase letter.',
                confirmButtonColor: '#d33',
            });
            return;
        }

        if (!/[a-z]/.test(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Weak Password',
                text: 'Password must contain at least one lowercase letter.',
                confirmButtonColor: '#d33',
            });
            return;
        }

        if (password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Weak Password',
                text: 'Password must be at least 6 characters long.',
                confirmButtonColor: '#d33',
            });
            return;
        }

        createUser(email, password)
            .then((result) => {
                const user = result.user;

                updateProfile(user, {
                    displayName: name,
                    photoURL: photo,
                })
                    .then(() => {
                        navigate('/');
                        Swal.fire({
                            icon: 'success',
                            title: 'You Are Successfully Signed Up',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleGoogleSignUp = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result);
                navigate('/');
                Swal.fire({
                    icon: 'success',
                    title: 'You Are Successfully Signed Up With Google',
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="bg-base-200 py-12 min-h-screen items-center justify-center flex px-4 sm:px-6 lg:px-16">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                {/* Left Section */}
                <div className="max-w-2xl w-full mb-12 lg:mb-0">

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
                                Sign Up to
                            </span>
                            <NavLink to='/' className="inline-block ml-2 relative group px-4 py-2 font-semibold text-black overflow-hidden">
                                <span className="absolute bottom-0 left-0 right-0 bg-[#bee8b1] transition-all duration-300 ease-in-out h-full group-hover:h-1/2 z-0"></span>
                                <span className="relative z-10">FoodCircle</span>
                            </NavLink>
                        </div>
                    </h1>


                    <p className="text-left">
                        Our mission is simple <span className="font-semibold">"sharing food, spreading hope"</span>.{' '}
                        <span className="font-bold">FoodCircle</span> connects givers and receivers to build a caring,
                        hunger-free community.
                    </p>
                </div>

                {/* Right Section */}
                <div className="relative w-full max-w-lg flex justify-center items-center">


                    {/* Animation (only shown on md and up) */}
                    <div
                        className="absolute bottom-70 right-58 z-10 pointer-events-none hidden md:block w-[400px] opacity-60"
                    >
                        <Lottie animationData={bloomAnimation} loop={true} />
                    </div>


                    {/* Sign-up Form */}
                    <div className="relative z-10 w-full bg-base-100 p-6 md:p-8 rounded-lg shadow-xl">
                        <form onSubmit={handleSignUp} className="space-y-4">
                            <div>
                                <label className="label text-sm font-semibold">Name</label>
                                <input
                                    type="text"
                                    name="Name"
                                    required
                                    className="input input-bordered w-full"
                                    placeholder="Enter your Name"
                                />
                            </div>
                            <div>
                                <label className="label text-sm font-semibold">Photo URL</label>
                                <input
                                    type="text"
                                    name="photo"
                                    
                                    className="input input-bordered w-full"
                                    placeholder="Input your Photo URL"
                                />
                            </div>
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
                                Sign Up
                            </button>
                        </form>

                        <div className="divider">OR</div>

                        <button
                            type="button"
                            onClick={handleGoogleSignUp}
                            className="btn bg-white text-black border border-gray-300 w-full flex items-center justify-center"
                        >
                            <img
                                src="https://img.icons8.com/color/16/google-logo.png"
                                alt="Google"
                                className="mr-2"
                            />
                            Sign Up with Google
                        </button>

                        <p className="mt-4 text-center text-sm">
                            Already have an account?{' '}
                            <Link to="/signIn" className="text-red-500 hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
