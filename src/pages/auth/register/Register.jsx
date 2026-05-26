import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../../shared/socialLogin/SocialLogin";
import uploadIcon from "../../../assets/image-upload-icon.png"; // Note: update extension to .svg or .jpg if needed
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Register = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const axiosSecure = useAxiosSecure()

  const { registerUser, updateUserProfile } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  // Watch the profilePic field to show a live preview of the selected image
  const selectedFile = useWatch({
    control,
    name: "profilePic"
  });
  const previewImage = selectedFile && selectedFile.length > 0 ? URL.createObjectURL(selectedFile[0]) : uploadIcon;

  const handleRegistration = async (data) => {
    try {
      // 1. Upload image to ImgBB
      const imageFile = data.profilePic[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbbUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST}`;
      const imgRes = await axios.post(imgbbUrl, formData);
      
      if (imgRes.data.success) {
        const photoURL = imgRes.data.data.display_url;
        
        // 2. Register user & update profile in Firebase
        const userRes = await registerUser(data.email, data.password);
        await updateUserProfile(data.name, photoURL);
        console.log("User registered and profile updated!", userRes.user);
        
        // 3. Save user info to the database
        const userInfo = {
          name: data.name,
          email: data.email,
          image: photoURL
        };
        await axiosSecure.post("/users", userInfo);

        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Your account has been created successfully.",
          timer: 1500,
          showConfirmButton: false
        });

        navigate(location?.state || '/');
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white">
      <h2 className="text-4xl font-extrabold text-black mb-2">
        Create an account
      </h2>
      <p className="text-gray-500 mb-8">Register with zap shift</p>

      <form onSubmit={handleSubmit(handleRegistration)} className="space-y-5">
        <div className="flex flex-col items-start">
          <label htmlFor="profilePic" className="cursor-pointer group flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-dashed border-gray-300 group-hover:border-primary transition-all flex items-center justify-center bg-gray-50 shrink-0">
              <img 
                src={previewImage} 
                alt="Upload profile" 
                className={selectedFile && selectedFile.length > 0 ? "w-full h-full object-cover" : "w-6 h-6 opacity-50 object-contain"} 
              />
            </div>
            <span className="text-sm text-gray-500 font-medium group-hover:text-primary transition-colors text-center">
              {selectedFile && selectedFile.length > 0 ? "Change Picture" : "Upload Picture"}
            </span>
          </label>
          <input
            type="file" 
            id="profilePic"
            accept="image/*"
            {...register('profilePic', { required: "Profile picture is required" })}
            className="hidden"
          />
          {errors.profilePic && <p className="text-red-500 text-xs mt-1">{errors.profilePic.message}</p>}
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text" 
            id="name"
            {...register('name', { required: "Name is required" })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email" 
            id="email"
            {...register('email', { required: "Email is required" })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} 
              id="password"
              {...register('password', { 
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all pr-10"
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              )}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-primary text-black font-medium py-2.5 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
          <p className="mt-3 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              state={location?.state}
              to="/login"
              className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
