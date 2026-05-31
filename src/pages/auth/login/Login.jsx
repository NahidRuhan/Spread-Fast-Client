import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../../shared/socialLogin/SocialLogin";
import Swal from "sweetalert2";

const Login = () => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm({
    defaultValues: {
      email: "admin@account.com",
      password: "adminAccount"
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser, resetPassword, setLoading } = useAuth();
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          timer: 1500,
          showConfirmButton: false
        });
        navigate(location?.state || '/');
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleForgetPassword = (e) => {
    e.preventDefault();
    const email = getValues("email");
    if (!email) {
      alert("Please provide your email address to reset your password.");
      return;
    }
    resetPassword(email)
      .then(() => {
        alert("Password reset email sent! Please check your inbox.");
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white">
      <h2 className="text-4xl font-extrabold text-black mb-2">Welcome back</h2>
      <p className="text-gray-500 mb-8">Login with zap shift</p>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              {...register('password', { required: "Password is required" })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all pr-10" 
              placeholder="Enter your password" 
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
          <div className="flex justify-end mt-1">
            <a href="#" onClick={handleForgetPassword} className="text-sm text-blue-600 hover:text-blue-700 hover:underline">Forgot password?</a>
          </div>
        </div>

        <div>
          <button 
            type="submit" 
            className="w-full bg-primary text-black font-medium py-2.5 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
          <p className="mt-3 text-center text-sm text-gray-600">
            Don't have an account? <Link state={location?.state} to="/register" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">Register</Link>
          </p>
        </div>
      </form>

      <SocialLogin></SocialLogin>
    </div>
  )
}

export default Login
