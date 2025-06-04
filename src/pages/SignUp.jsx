
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { GoHome, GoHomeFill } from "react-icons/go";
import { FaBowlFood } from 'react-icons/fa6';
import { use } from 'react';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

const SignUp = () => {

    const { createUser, SetLoading } = use(AuthContext)
    const navigate = useNavigate()

    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        createUser(email, password)
        .then(result => {
            console.log(result);
            navigate('/')
        })
        .catch(error => {
            console.log(error);
        })
    }


    return (
        <div>

            <div className="hero bg-base-200 pb-20 pt-15 px-4">
                <div className="hero-content w-full max-w-2xl">
                    <div className="card bg-base-100 w-full shadow-2xl p-6">
                        <div className="card-body">
                            <NavLink to='/'>
                                <FaBowlFood className='w-8 h-8 hover:text-green-400' />
                            </NavLink>
                            <h1 className="text-2xl font-bold text-center mb-5">Sign Up Your Account</h1>
                            <hr className="mb-8" />

                            <form onSubmit={handleSignUp}>
                                <label className="label text-lg">Name</label>
                                <input type="text" name="name" className="input input-bordered w-full" placeholder="Name" required />
                                {/* {nameError && <p className="text-xs text-error">{nameError}</p>} */}

                                <label className="label text-lg mt-3">Photo URL</label>
                                <input type="text" name="photo" className="input input-bordered w-full" placeholder="Photo URL" required />

                                <label className="label text-lg mt-3">Email</label>
                                <input type="email" name="email" className="input input-bordered w-full" placeholder="Email" required />

                                <label className="label text-lg mt-3">Password</label>
                                <input type="password" name="password" className="input input-bordered w-full" placeholder="Password" required />
                                {/* {passwordError && <p className="text-xs text-error mt-3">{passwordError}</p>} */}

                                <button type="submit" className="btn btn-neutral mt-4 w-full mb-4">Sign Up</button>
                            </form>

                            <div className="divider">OR</div>

                            <button onClick='' className="btn bg-white text-black border-[#e5e5e5] mb-4 w-full">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-2">
                                    <g>
                                        <path d="m0 0H512V512H0" fill="#fff" />
                                        <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                                        <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                                        <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                                        <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                                    </g>
                                </svg>
                                Sign Up with Google
                            </button>

                            <p className="text-center text-sm">
                                Already have an account? <Link to="/signIn" className="text-red-500 link-hover">Sign In</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;