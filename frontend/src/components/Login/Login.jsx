import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const showToast = (message, type) => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isForgot) {
        const response = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
        showToast(response.data.message || "Password reset link sent!", "success");
      } else if (isLogin) {
        const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
        showToast(response.data.message || "Login successful", "success");
        navigate("/deshboard"); // Redirect to deshboard page after successful login
      } else {
        const response = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
        showToast(response.data.message || "Registration successful", "success");
        navigate("/deshboard"); // Redirect to deshboard page after successful registration
      }
    } catch (error) {
      showToast(error.response?.data?.message || "Something went wrong", "error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <div className="flex w-full max-w-4xl rounded-lg bg-white shadow-lg">
        <div className="hidden w-1/2 items-center justify-center bg-gray-100 md:flex">
          <img src="/auth-illustration.png" alt="Illustration" className="w-3/4" />
        </div>
        <div className="w-full p-8 md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-900">
            {isForgot ? "Reset Password" : isLogin ? "Welcome back!" : "Create an account"}
          </h2>
          <form className="mt-6" onSubmit={handleSubmit}>
            {!isForgot && !isLogin && (
              <div>
                <label className="block text-gray-700">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>
            )}
            <div className="mt-4">
              <label className="block text-gray-700">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
            </div>
            {!isForgot && (
              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>
            )}
            <div className="mt-4 flex items-center justify-between">
              {!isForgot && (
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-700">Remember me</span>
                </label>
              )}
              {isLogin && (
                <button type="button" className="text-sm text-blue-600" onClick={() => setIsForgot(true)}>
                  Forgot password?
                </button>
              )}
            </div>
            <button type="submit" className="mt-6 w-full rounded-md bg-black px-4 py-2 text-white">
              {isForgot ? "Reset Password" : isLogin ? "Log In" : "Sign Up"}
            </button>
            <button className="mt-4 flex w-full items-center justify-center rounded-md bg-gray-200 px-4 py-2">
              <img src="/google-icon.svg" alt="Google" className="mr-2 w-5" /> Log in with Google
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            {isForgot ? (
              <button onClick={() => setIsForgot(false)} className="text-blue-600">
                Back to Login
              </button>
            ) : isLogin ? (
              <p>
                Don't have an account?{' '}
                <button onClick={() => setIsLogin(false)} className="text-blue-600">
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button onClick={() => setIsLogin(true)} className="text-blue-600">
                  Log In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="light" />
    </div>
  );
}