import React from "react";
import { Link } from "react-router-dom";
import { SmileySad } from "phosphor-react";

const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
      <SmileySad size={80} className="text-accent" />
      <h1 className="mt-4 text-5xl font-bold text-text">404</h1>
      <p className="mt-2 text-xl text-text-muted">Page Not Found</p>
      <p className="mt-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-primary px-6 py-2 font-semibold text-white transition-all hover:bg-primary-dark"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
