import { useForm } from "react-hook-form";
import bg_of_page from "../../assets/others/authentication.png";
import singUp_imag from "../../assets/others/authentication.gif";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const { signUpWithEmailPass, updateUserProfile, signInWithGoogle, setUser } = useAuth();
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

      setUser({
        ...result.user,
        displayName: name,
        photoURL: photo,
      });

      const userInfo = {
        email,
        displayName: name,
        image: photo,
      };

      if (result.user) {
        await axiosPublic("users", userInfo);
        navigate(location.state || "/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await signInWithGoogle();
    setUser({ ...result.user });

    const userInfo = {
      email: result.user?.email,
      displayName: result.user?.displayName,
      image: result.user?.photoURL,
    };

    if (result.user) {
      await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);
    }
    navigate(location.state || "/");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${bg_of_page})` }}
    >
      <div
        style={{ boxShadow: "10px 10px 30px rgba(0,0,0,0.25)" }}
        className="rounded-xl flex flex-col lg:flex-row-reverse w-full max-w-5xl mx-auto px-6 py-8 lg:px-12 lg:py-10 gap-10"
      >
        {/* Image */}
        <div className="hidden lg:flex w-1/2 items-center justify-center">
          <img
            src={singUp_imag}
            alt="Sign Up Illustration"
            className="w-full max-w-[380px] h-auto"
          />
        </div>

        {/* Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6">
              Create an Account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="space-y-3">
                {/* Name */}
                <div>
                  <label className="label font-medium">Name</label>
                  <input
                    type="text"
                    className="input input-bordered outline-none border-0 w-full bg-white focus:outline-1 focus:outline-primary transition-all"
                    placeholder="Full Name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Photo URL */}
                <div>
                  <label className="label font-medium">Photo URL</label>
                  <input
                    type="text"
                    className="input input-bordered outline-none border-0 w-full bg-white focus:outline-1 focus:outline-primary transition-all"
                    placeholder="Profile Image URL"
                    {...register("photoUrl")}
                  />
                </div>

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
                className="btn mt-5 bg-primary hover:bg-btnHover text-white w-full transition-all"
              >
                Sign Up
              </button>
            </form>

            {/* Links */}
            <p className="text-center text-sm my-6">
              Already have an account?{" "}
              <Link
                className="link link-hover text-btnHover font-medium"
                to="/sign-in"
              >
                Sign In
              </Link>
            </p>

            <p className="text-center text-base mb-4">
              —— Or sign up with ——
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
                  aria-label={label}
                  className="w-11 h-11 rounded-full border-2 border-primary flex items-center justify-center text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:scale-110 hover:shadow-lg active:scale-95"
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

export default SignUp;
