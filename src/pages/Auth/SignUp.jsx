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
import { useState } from 'react';

const SignUp = () => {
    const { createUser, SetLoading } = use(AuthContext);
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    // Handle image selection
    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid File',
                    text: 'Please select an image file (JPEG, PNG, etc.)',
                    confirmButtonColor: '#d33',
                });
                return;
            }

            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                Swal.fire({
                    icon: 'error',
                    title: 'File Too Large',
                    text: 'Please select an image smaller than 5MB',
                    confirmButtonColor: '#d33',
                });
                return;
            }

            setSelectedImage(file);

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Upload image to server
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            return data.imageUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Failed to upload image');
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.Name.value;
        const email = form.email.value;
        const password = form.password.value;

        // Password validation
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

        setIsUploading(true);

        try {
            let photoURL = '';

            // Upload image if selected
            if (selectedImage) {
                photoURL = await uploadImage(selectedImage);
            }

            // Create user account
            createUser(email, password)
                .then((result) => {
                    const user = result.user;

                    updateProfile(user, {
                        displayName: name,
                        photoURL: photoURL,
                    })
                        .then(() => {
                            // Register user for chat system
                            fetch('http://localhost:5000/api/register-user', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    userId: user.uid,
                                    userName: name,
                                    userEmail: email,
                                    userImage: photoURL
                                }),
                            });

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
                            Swal.fire({
                                icon: 'error',
                                title: 'Profile Update Failed',
                                text: 'Account created but profile update failed.',
                                confirmButtonColor: '#d33',
                            });
                        });
                })
                .catch((error) => {
                    console.log(error);
                    let errorMessage = 'Sign up failed. Please try again.';

                    if (error.code === 'auth/email-already-in-use') {
                        errorMessage = 'This email is already registered. Please use a different email or sign in.';
                    } else if (error.code === 'auth/invalid-email') {
                        errorMessage = 'Invalid email address.';
                    }

                    Swal.fire({
                        icon: 'error',
                        title: 'Sign Up Failed',
                        text: errorMessage,
                        confirmButtonColor: '#d33',
                    });
                })
                .finally(() => {
                    setIsUploading(false);
                });

        } catch (error) {
            console.log(error);
            setIsUploading(false);
            Swal.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: 'Failed to upload profile image. Please try again.',
                confirmButtonColor: '#d33',
            });
        }
    };

    const handleGoogleSignUp = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;

                // Register Google user for chat system
                fetch('http://localhost:5000/api/register-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: user.uid,
                        userName: user.displayName,
                        userEmail: user.email,
                        userImage: user.photoURL
                    }),
                });

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
                Swal.fire({
                    icon: 'error',
                    title: 'Google Sign Up Failed',
                    text: 'Failed to sign up with Google. Please try again.',
                    confirmButtonColor: '#d33',
                });
            });
    };

    const removeSelectedImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
    };

    return (
        <div className="bg-base-200 py-12 min-h-screen items-center justify-center flex px-4 sm:px-6 lg:px-16">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                {/* Left Section */}
                <div className="max-w-2xl w-full mb-12 lg:mb-0">
                    <div className="hidden md:flex items-center space-x-2 text-xl font-bold mb-2">
                        <motion.div
                            whileHover={{ scale: 1.20 }}
                            whileTap={{ scale: 0.95 }}
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
                        className="absolute bottom-95 right-68 z-10 pointer-events-none hidden md:block w-[400px] opacity-60"
                    >
                        <Lottie animationData={bloomAnimation} loop={true} />
                    </div>

                    {/* Sign-up Form */}
                    <div className="relative z-10 w-full bg-base-100 p-6 md:p-8 rounded-lg shadow-xl">
                        <form onSubmit={handleSignUp} className="space-y-4">

                            <div>
                                {/* Image Upload Section */}
                                <div>
                                    <label className="label text-sm font-semibold">Profile Photo</label>
                                    <div className="space-y-3">
                                        {/* Combined File Input and Image Preview */}
                                        <label className={`flex flex-col items-center justify-center w-32 h-32 mx-auto border-2 border-dashed rounded-lg cursor-pointer transition-colors ${imagePreview ? 'border-[#bee8b1] bg-green-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                                            }`}>

                                            {imagePreview ? (
                                                /* Image Preview */
                                                <div className="relative w-full h-full flex items-center justify-center">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="w-28 h-28 rounded-full object-cover border-2 border-[#bee8b1]"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // Prevent triggering file input
                                                            removeSelectedImage();
                                                        }}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ) : (
                                                /* File Input - Default State */
                                                <div className="flex flex-col items-center justify-center w-full h-full">
                                                    <svg
                                                        className="w-8 h-8 mb-2 text-gray-500"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        ></path>
                                                    </svg>
                                                    <p className="text-sm text-gray-500 text-center px-2">
                                                        <span className="font-semibold">Click to upload</span>
                                                    </p>
                                                </div>
                                            )}

                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageSelect}
                                            />
                                        </label>

                                        {/* Helper text */}
                                        {imagePreview ? (
                                            <p className="text-xs text-gray-500 text-center">Click the image to change photo</p>
                                        ) : (
                                            <p className="text-xs text-gray-500 text-center">PNG, JPG, JPEG (MAX. 5MB)</p>
                                        )}
                                    </div>
                                </div>

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
                                <div className="text-xs text-gray-500 mt-1">
                                    Password must contain: at least 6 characters, one uppercase, one lowercase letter
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isUploading}
                                className={`btn btn-outline border-[#bee8b1] hover:bg-[#bee8b1] w-full ${isUploading ? 'loading' : ''
                                    }`}
                            >
                                {isUploading ? 'Creating Account...' : 'Sign Up'}
                            </button>
                        </form>

                        <div className="divider">OR</div>

                        <button
                            type="button"
                            onClick={handleGoogleSignUp}
                            className="btn bg-white text-black border border-gray-300 w-full flex items-center justify-center hover:bg-gray-50"
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