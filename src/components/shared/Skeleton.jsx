import React from "react";

const Skeleton = ({ className, variant = "rect" }) => {
  // Base classes for animation and colors (Light vs Dark)
  const baseClasses = "animate-pulse bg-gray-200 dark:bg-slate-700";

  // Shape classes
  const shapeClasses = variant === "circle" ? "rounded-full" : "rounded-md";

  return <div className={`${baseClasses} ${shapeClasses} ${className}`} />;
};

export default Skeleton;
