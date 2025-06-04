
import { use } from 'react';
import { FaBowlFood } from 'react-icons/fa6';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

const SignIn = () => {

    const { signInUser } = use(AuthContext);

    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signInUser(email, password)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (

        <div>

            <div className="bg-base-200  flex items-center justify-center pt-30 pb-80 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md bg-base-100 p-8 rounded-lg shadow-xl">

                    <NavLink to='/'>
                        <FaBowlFood className='w-8 h-8 hover:text-green-400' />
                    </NavLink>

                    <h1 className="text-2xl font-bold text-center mb-6">Sign in to Your Account</h1>
                    <form onSubmit={handleSignIn} className="space-y-4">
                        <div>
                            <label className="label text-sm font-semibold">Email</label>
                            <input type="email" name="email" required className="input input-bordered w-full" placeholder="Enter your email" />
                        </div>

                        <div>
                            <label className="label text-sm font-semibold">Password</label>
                            <input type="password" name="password" required className="input input-bordered w-full" placeholder="Enter your password" />
                        </div>

                        {/* {error && <p className="text-red-500 text-sm mt-1">{error}</p>} */}

                        <button type="submit" className="btn btn-neutral w-full">Sign In</button>
                    </form>

                    <div className="divider">OR</div>

                    <button
                        type="button"
                        // onClick=''
                        className="btn bg-white text-black border border-gray-300 w-full flex items-center justify-center"
                    >
                        <img src="https://img.icons8.com/color/16/google-logo.png" alt="Google" className="mr-2" />
                        Sign In with Google
                    </button>

                    <p className="mt-4 text-center text-sm">
                        Don't have an account?{" "}
                        <Link to="/signUp" className="text-red-500 hover:underline">Sign Up</Link>
                    </p>
                </div>
            </div>

        </div>
    );
};

export default SignIn;