import React, { useState } from "react";
import { Star } from "phosphor-react";

const StarRatingInput = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={index}
            type="button"
            className="focus:outline-none transition-transform hover:scale-110"
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            <Star
              size={24}
              weight={starValue <= (hover || rating) ? "fill" : "regular"}
              className={
                starValue <= (hover || rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRatingInput;
