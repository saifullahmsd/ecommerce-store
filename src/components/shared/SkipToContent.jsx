import React from "react";

const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="absolute left-4 top-4 z-[9999] -translate-y-[150%] rounded-lg bg-primary px-4 py-2 font-bold text-white transition-transform focus:translate-y-0"
    >
      Skip to Main Content
    </a>
  );
};

export default SkipToContent;
