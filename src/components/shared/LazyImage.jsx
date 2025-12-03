import React, { useState } from "react";
import { Image } from "phosphor-react";

const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      {/* 1. Placeholder / Skeleton (Visible until loaded) */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
          <Image size={32} className="animate-pulse" />
        </div>
      )}

      {/* 2. The Actual Image */}
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy" // Native lazy loading
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`h-full w-full object-contain transition-all duration-700 ease-in-out ${
            isLoaded
              ? "opacity-100 scale-100 blur-0"
              : "opacity-0 scale-110 blur-md"
          }`}
        />
      ) : (
        /* 3. Fallback if image fails */
        <div className="flex h-full w-full items-center justify-center bg-gray-50 text-xs text-gray-400">
          No Image
        </div>
      )}
    </div>
  );
};

export default LazyImage;
