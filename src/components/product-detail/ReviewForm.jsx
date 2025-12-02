import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import StarRatingInput from "../ui/StarRatingInput";

const ReviewForm = ({ productId, onReviewSubmit }) => {
  const { user } = useSelector((state) => state.auth);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }

    const newReview = {
      id: Date.now(), // Random ID
      productId: productId, // Link review to this product
      reviewerName: user ? `${user.firstName} ${user.lastName}` : "Guest User",
      rating: rating,
      comment: comment,
      date: new Date().toISOString(),
    };

    // Send to parent component to handle saving
    onReviewSubmit(newReview);

    // Reset Form
    setRating(0);
    setComment("");
    toast.success("Review submitted successfully!");
  };

  return (
    <div className="mb-8 rounded-xl border border-gray-100 bg-gray-50 p-6">
      <h3 className="mb-4 text-lg font-bold text-gray-800">Write a Review</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating Input */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Rating
          </label>
          <StarRatingInput rating={rating} setRating={setRating} />
        </div>

        {/* Comment Input */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Review
          </label>
          <textarea
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you like or dislike?"
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary focus:outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="rounded-lg bg-primary px-6 py-2 font-bold text-white transition hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
