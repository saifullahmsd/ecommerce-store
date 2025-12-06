import React from "react";
import Skeleton from "../shared/Skeleton";

const ProductDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      {/* Breadcrumbs */}
      <Skeleton className="mb-8 h-4 w-48" />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* LEFT: Gallery */}
        <div className="flex flex-col gap-4">
          <Skeleton className="aspect-square w-full rounded-xl" />
          <div className="flex gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-20 rounded-lg" />
            ))}
          </div>
        </div>

        {/* RIGHT: Info */}
        <div className="flex flex-col space-y-6">
          <Skeleton className="h-4 w-24" /> {/* Brand */}
          <Skeleton className="h-10 w-3/4" /> {/* Title */}
          <div className="flex gap-4">
            <Skeleton className="h-6 w-32" /> {/* Rating */}
            <Skeleton className="h-6 w-24" /> {/* Stock */}
          </div>
          <Skeleton className="h-24 w-full rounded-lg" /> {/* Price Box */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
