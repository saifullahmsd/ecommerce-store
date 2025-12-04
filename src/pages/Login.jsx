import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../features/auth/authApi";
import { setCredentials } from "../features/auth/authSlice";
import { toast } from "react-hot-toast";
import { CircleNotch, Lock, User } from "phosphor-react";
import PageTransition from "../components/shared/PageTransition";

const Login = () => {
  const [username, setUsername] = useState("emilys"); // Default for easy testing
  const [password, setPassword] = useState("emilyspass"); // Default for easy testing

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { isAuthenticated } = useSelector((state) => state.auth);

  // If already logged in, redirect to home
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/");
  //   }
  // }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ username, password }).unwrap();

      // --- MOCK ROLE LOGIC ---
      // We treat 'emilys' as the Super Admin
      const userWithRole = {
        ...userData,
        role: username === "emilys" ? "admin" : "customer",
      };
      // -----------------------

      dispatch(
        setCredentials({
          user: userWithRole,
          token: userData.token,
        })
      );

      toast.success(`Welcome back, ${userData.firstName}!`);

      // Redirect Admin to Dashboard, User to Home
      if (userWithRole.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.data?.message || "Login failed.");
    }
  };

  return (
    <PageTransition>
      <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="mt-2 text-gray-500">Sign in to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
                <User
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
                <Lock
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-lg bg-primary py-3 font-bold text-white transition hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isLoading ? (
                <CircleNotch size={24} className="animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>

          {/* Helper Note for Demo */}
          <div className="mt-6 rounded bg-blue-50 p-4 text-xs text-blue-800">
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
