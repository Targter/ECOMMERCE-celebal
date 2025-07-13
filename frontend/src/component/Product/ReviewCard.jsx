

import React from "react";
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaCheckCircle,
} from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center gap-4">
        <img
          src={review.avatar || "/Profile.png"}
          alt={`${review.name}'s avatar`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-gray-800">{review.name}</p>
            <FaCheckCircle
              className="text-green-500"
              title="Verified Purchase"
            />
          </div>
          <div className="flex items-center my-2">
            {renderStars(review.rating)}
            <span className="ml-2 text-sm text-gray-500">
              {review.rating.toFixed(1)}/5
            </span>
          </div>
          <p className="text-gray-600 leading-relaxed">{review.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
