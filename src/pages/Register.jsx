import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

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

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          Create Account
        </h1>
        <p className="mb-8 text-center text-gray-500">
          Join us for exclusive deals
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full rounded-lg border p-3 focus:border-primary focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full rounded-lg border p-3 focus:border-primary focus:outline-none"
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-lg border p-3 focus:border-primary focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border p-3 focus:border-primary focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-3 font-bold text-white transition hover:bg-blue-700"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
