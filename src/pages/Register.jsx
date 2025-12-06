import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import PageTransition from "../components/shared/PageTransition";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      toast.success("Account created successfully! Please login.");
      navigate("/login");
    }, 1000);
  };

  // Shared Input Class for consistency
  const inputClass =
    "w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:placeholder-gray-400";

  return (
    <PageTransition>
      <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 dark:bg-slate-900">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800 dark:border dark:border-slate-700">
          <h1 className="mb-2 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Create Account
          </h1>
          <p className="mb-8 text-center text-gray-500 dark:text-gray-400">
            Join us for exclusive deals
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className={inputClass}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className={inputClass}
                required
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className={inputClass}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className={inputClass}
              required
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-primary py-3 font-bold text-white transition hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary hover:underline dark:text-blue-400"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </PageTransition>
  );
};

export default Register;
