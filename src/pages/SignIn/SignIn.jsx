import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import bg_of_page from "../../assets/others/authentication.png";
import singIn_imag from "../../assets/others/authentication2.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { signInWithEmailPass, signInWithGoogle, setUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();

    const from = location.state?.from?.pathname || "/";

    // Loading state
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            const result = await signInWithEmailPass(data.email, data.password);

            const userInfo = {
                email: result.user?.email,
                displayName: result.user?.displayName,
                image: result.user?.photoURL,
            };

            if (result.user) {
                await axiosPublic.post("/users", userInfo);
                navigate(from, { replace: true });
            }
        } catch (err) {
            console.log(err?.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);

        try {
            const result = await signInWithGoogle();

            const userInfo = {
                email: result.user?.email,
                displayName: result.user?.displayName,
                image: result.user?.photoURL,
            };

            setUser({ ...result.user });
            await axiosPublic.post("/users", userInfo);
            navigate(from, { replace: true });
        } catch (err) {
            console.log(err?.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${bg_of_page})` }}
        >
            <div
                style={{ boxShadow: "10px 10px 30px rgba(0,0,0,0.25)" }}
                className="rounded-xl flex flex-col lg:flex-row w-full max-w-5xl mx-4 sm:mx-8 px-6 py-8 lg:px-12 lg:py-10 gap-10"
            >
                {/* LEFT IMAGE (DESKTOP ONLY) */}
                <div className="hidden lg:flex w-1/2 items-center justify-center">
                    <img
                        src={singIn_imag}
                        alt="Sign In Illustration"
                        className="w-full max-w-[380px] h-auto"
                    />
                </div>

                {/* RIGHT FORM */}
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                    <div className="w-full max-w-md">
                        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="space-y-3">
                                {/* Email */}
                                <div>
                                    <label className="label font-medium">Email</label>
                                    <input
                                        type="email"
                                        className="input input-bordered outline-none border-0 w-full bg-white focus:outline-1 focus:outline-primary transition-all"
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
                                        className="input input-bordered outline-none border-0 w-full bg-white focus:outline-1 focus:outline-primary transition-all"
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
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn mt-5 bg-primary hover:bg-btnHover text-white w-full transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Signing in...
                                    </span>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </form>

                        {/* Links */}
                        <p className="text-center text-sm my-6">
                            New here?{" "}
                            <Link
                                className="link link-hover text-btnHover font-medium"
                                to="/sign-up"
                            >
                                Sign Up
                            </Link>
                        </p>

                        <p className="text-center text-base mb-4">
                            —— Or sign in with ——
                        </p>

                        {/* Social Icons */}
                        <div className="flex justify-center gap-6">
                            {[
                                { icon: <FaFacebook />, label: "Facebook" },
                                { icon: <FaGithub />, label: "GitHub" },
                                {
                                    icon: <FaGoogle />,
                                    label: "Google",
                                    onClick: handleGoogleSignIn,
                                },
                            ].map(({ icon, label, onClick }, index) => (
                                <button
                                    key={index}
                                    onClick={onClick}
                                    disabled={isLoading}
                                    aria-label={label}
                                    className="w-11 h-11 rounded-full border-2 border-primary flex items-center justify-center text-primary disabled:opacity-50 transition-all duration-300 hover:bg-primary hover:text-white hover:scale-110 hover:shadow-lg active:scale-95"
                                >
                                    <span className="text-xl">{icon}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
