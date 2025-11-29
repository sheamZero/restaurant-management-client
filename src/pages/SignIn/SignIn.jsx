
import { useForm } from "react-hook-form";
import bg_of_page from '../../assets/others/authentication.png';
import singIn_imag from '../../assets/others/authentication2.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";


const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInWithEmailPass,user, signInWithGoogle, setUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = async (data) => {
        const email = data.email;
        const pass = data.password;
        try {
            const result = await signInWithEmailPass(email, pass);
            navigate(location.state || "/");
        } catch (err) {
            console.log(err?.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            console.log(result);
            setUser({ ...result?.user })
            navigate(location.state || "/");
        }

        catch (err) {
            console.log(err?.message);
        }
    }

    useEffect(() => {
        if (user) {
            navigate(location.state || "/");
        }
    }, [user,location.state])

    return (
        <div
            className="hero min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${bg_of_page})`,
            }}
        >
            <div style={{ boxShadow: "10px 10px 10px 10px rgba(0, 0, 0, 0.25)" }} className="hero-content border-2 flex-col lg:flex-row gap-10 py-10 px-6 md:px-28">
                {/* Right side: Image */}
                <div className="text-center md:w-1/2 lg:text-left flex justify-center items-center">
                    <img
                        src={singIn_imag}
                        alt="Sign Up Illustration"
                        className="w-64 md:w-80 lg:w-[400px] h-auto rounded"
                    />
                </div>

                {/* Left side: Form Card */}
                <div className="card w-full md:w-1/2 rounded-lg "  >
                    <div className="">
                        <h2 className="text-2xl font-bold text-center mb-4">
                            Sign In
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="fieldset space-y-1">
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
                                        })} />
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
                                <div>
                                    <input type="text" placeholder="type here" className="input input-bordered w-full" name="" id="" />
                                </div>
                            </fieldset>
                            {/* Submit Button */}
                            <button type="submit" className="btn mt-4 bg-[#D1A054] hover:bg-[#b88845] text-white w-full"  > Sign In</button>
                        </form>

                        <p className="text-center text-sm my-6">
                            New here?{" "}
                            <Link className="link link-hover text-[#D1A054] font-medium" to={"/sign-up"}>Sign Up</Link>
                        </p>
                        <p className="text-center text-base mb-4">------ Or sign in with ------</p>

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

export default SignIn;