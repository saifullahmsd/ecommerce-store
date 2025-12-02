import React from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return null;

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-800">
        Personal Information
      </h2>

      <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={user.image}
            alt={user.firstName}
            className="h-32 w-32 rounded-full border-4 border-gray-100 object-cover"
          />
        </div>

        {/* Details Grid */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
              First Name
            </label>
            <p className="mt-1 text-lg font-medium text-gray-800">
              {user.firstName}
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
              Last Name
            </label>
            <p className="mt-1 text-lg font-medium text-gray-800">
              {user.lastName}
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
              Email Address
            </label>
            <p className="mt-1 text-lg font-medium text-gray-800">
              {user.email}
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
              Gender
            </label>
            <p className="mt-1 text-lg font-medium text-gray-800 capitalize">
              {user.gender}
            </p>
          </div>

          {/* DummyJSON user object doesn't always have phone/address in login response, 
              but if it does, render it. Else fallback. */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
              Username
            </label>
            <p className="mt-1 text-lg font-medium text-gray-800">
              @{user.username}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Button (Mock) */}
      <div className="mt-8 flex justify-end">
        <button className="rounded-lg bg-gray-900 px-6 py-2 text-sm font-semibold text-white transition hover:bg-gray-700">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
