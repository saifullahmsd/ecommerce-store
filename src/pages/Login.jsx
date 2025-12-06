import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../features/auth/authApi";
import { setCredentials } from "../features/auth/authSlice";
import { toast } from "react-hot-toast";
import { CircleNotch, Lock, User } from "phosphor-react";
import PageTransition from "../components/shared/PageTransition";

const Login = () => {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ username, password }).unwrap();

      // Mock Role Logic
      const userWithRole = {
        ...userData,
        role: username === "emilys" ? "admin" : "customer",
      };

      dispatch(
        setCredentials({
          user: userWithRole,
          token: userData.token,
        })
      );

      toast.success(`Welcome back, ${userData.firstName}!`);

      if (userWithRole.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.data?.message || "Login failed.");
    }
  };

  // Shared Input Class
  const inputClass =
    "w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:placeholder-gray-400";

  return (
    <PageTransition>
      <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 dark:bg-slate-900">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800 dark:border dark:border-slate-700">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome Back
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Sign in to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={inputClass}
                  required
                />
                <User
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  required
                />
                <Lock
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-lg bg-primary py-3 font-bold text-white transition hover:bg-blue-700 disabled:bg-blue-300 dark:hover:bg-blue-600"
            >
              {isLoading ? (
                <CircleNotch size={24} className="animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-primary hover:underline dark:text-blue-400"
            >
              Sign up
            </Link>
          </p>

          {/* Helper Note for Demo */}
          <div className="mt-6 rounded bg-blue-50 p-4 text-xs text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 dark:border dark:border-blue-900/50">
            <p className="font-bold">Demo Credentials:</p>
            <p>Username: emilys</p>
            <p>Password: emilyspass</p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;
