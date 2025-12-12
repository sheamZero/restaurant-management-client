import { useForm } from "react-hook-form";
import bg_of_page from '../../assets/others/authentication.png';
import singUp_imag from '../../assets/others/authentication.gif';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();

    const { signUpWithEmailPass, updateUserProfile, signInWithGoogle, user, setUser } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const name = data.name;
        const email = data.email;
        const pass = data.password;
        const photo = data.photoUrl;

        try {
            const result = await signUpWithEmailPass(email, pass);
            await updateUserProfile(name, photo);
            reset();

            // 3. Update local auth state
            setUser({
                ...result.user,
                displayName: name,
                photoURL: photo
            });

            // 4. Prepare user data for DB
            const userInfo = {
                email,
                displayName: name,
                image: photo,
            };

            if (result.user) {
                const res = await axiosPublic("users", userInfo);
                navigate(location.state || "/");
            }


        } catch (err) {
            console.log(err.message);
        }
    };


    // google login
    const handleGoogleSignIn = async () => {
        const result = await signInWithGoogle();
        setUser({ ...result.user });

        const userInfo = {
            email: result.user?.email,
            displayName: result.user?.displayName,
            image: result.user?.photoURL
        };

        if (result.user) {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);
            console.log(res.data);
        }
        navigate(location.state || "/");
    };

    useEffect(() => {
        if (user) navigate(location.state || "/");
    }, [user])

    return (
        <div
            className="hero min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${bg_of_page})`,
            }}
        >
            <div style={{ boxShadow: "10px 10px 10px 10px rgba(0, 0, 0, 0.25)" }} className="hero-content border-2 flex-col lg:flex-row-reverse gap-10 py-10 px-6 md:px-28">
                {/* Right side: Image */}
                <div className="text-center md:w-1/2 lg:text-left flex justify-center items-center">
                    <img
                        src={singUp_imag}
                        alt="Sign Up Illustration"
                        className="w-64 md:w-80 lg:w-[400px] h-auto rounded"
                    />
                </div>

                {/* Left side: Form Card */}
                <div className="card w-full md:w-1/2 rounded-lg "  >
                    <div className="">
                        <h2 className="text-2xl font-bold text-center mb-4">
                            Create an Account
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="fieldset space-y-1">
                                {/* Name */}
                                <div>
                                    <label className="label font-medium mb-0">Name</label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full"
                                        placeholder="Full Name"
                                        {...register("name", { required: "Name is required" })}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>
                                {/* Name */}
                                <div>
                                    <label className="label font-medium mb-0">Photo Url</label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full"
                                        placeholder="Full Name"
                                        {...register("photoUrl")}
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="label font-medium">Email</label>
                                    <input
                                        type="email"
                                        className="input input-bordered w-full"
                                        placeholder="Email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Invalid email address",
                                            },
                                        })}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="label font-medium">Password</label>
                                    <input
                                        type="password"
                                        className="input input-bordered w-full"
                                        placeholder="Password"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters",
                                            },
                                        })}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>
                            </fieldset>
                            {/* Submit Button */}
                            <button type="submit" className="btn mt-4 bg-[#D1A054] hover:bg-[#b88845] text-white w-full"  > Sign Up</button>
                        </form>

                        <p className="text-center text-sm my-6">
                            Already have an account?{" "}
                            <Link className="link link-hover text-[#D1A054] font-medium" to={"/sign-in"}>Sign In</Link>
                        </p>
                        <p className="text-center text-base mb-4">Or sign up with</p>

                        {/* Social icons — aligned and spaced */}
                        <div className="flex justify-center gap-6 mt-2">
                            <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center cursor-pointer">
                                <FaFacebook className="text-black text-xl" />
                            </div>
                            <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center cursor-pointer">
                                <FaGithub className="text-black text-xl" />
                            </div>
                            <div onClick={handleGoogleSignIn} className="w-10 h-10 rounded-full border border-black flex items-center justify-center cursor-pointer">
                                <FaGoogle className="text-black text-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
