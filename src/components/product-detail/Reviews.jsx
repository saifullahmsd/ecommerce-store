import React from "react";
import { Star, UserCircle } from "phosphor-react";

const Reviews = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="mt-12 rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
      <h3 className="mb-6 text-xl font-bold text-gray-800 dark:text-white">
        Customer Reviews ({reviews.length})
      </h3>

      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="border-b border-gray-100 pb-6 last:border-0 last:pb-0 dark:border-slate-700"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCircle
                  size={32}
                  className="text-gray-400 dark:text-gray-500"
                />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {review.reviewerName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    weight={i < review.rating ? "fill" : "regular"}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600 italic dark:text-gray-300">
              "{review.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
