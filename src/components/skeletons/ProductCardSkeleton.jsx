import React from "react";
import Skeleton from "../shared/Skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Image Area */}
      <div className="relative mb-4 flex h-48 items-center justify-center rounded-md bg-gray-50 dark:bg-slate-900">
        <Skeleton className="h-24 w-24 rounded-md" />
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col space-y-3">
        {/* Title */}
        <Skeleton className="h-4 w-3/4 rounded" />

        {/* Rating & Brand */}
        <div className="flex gap-2">
          <Skeleton className="h-3 w-12 rounded" />
          <Skeleton className="h-3 w-16 rounded" />
        </div>

        {/* Price & Button */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="space-y-1">
            <Skeleton className="h-5 w-16 rounded" />
            <Skeleton className="h-3 w-10 rounded" />
          </div>
          <Skeleton className="h-9 w-9 rounded-full" variant="circle" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
