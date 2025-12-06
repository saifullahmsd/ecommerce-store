import React, { useState } from "react";
import { Image } from "phosphor-react";

const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-gray-100 dark:bg-slate-800 ${className}`}
    >
      {/* Skeleton / Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-slate-600">
          <Image size={32} className="animate-pulse" />
        </div>
      )}

      {/* Actual Image */}
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`h-full w-full object-contain transition-all duration-500 ease-in-out ${
            isLoaded
              ? "opacity-100 blur-0 scale-100"
              : "opacity-0 blur-md scale-105"
          }`}
        />
      ) : (
        /* Fallback */
        <div className="flex h-full w-full items-center justify-center bg-gray-50 text-xs text-gray-400 dark:bg-slate-900 dark:text-gray-600">
          No Image
        </div>
      )}
    </div>
  );
};

export default LazyImage;
