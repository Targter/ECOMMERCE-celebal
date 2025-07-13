
import React, { useState, useEffect, useRef } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

const ReviewDialog = ({ open, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const dialogRef = useRef(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.focus();
    }
  }, [open]);

  const handleSubmit = () => {
    if (!rating || !comment.trim()) {
      setError("Please provide a rating and comment");
      return;
    }
    onSubmit({ rating, comment });
    setRating(0);
    setComment("");
    setError("");
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        open ? "block" : "hidden"
      }`}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Dialog */}
      <dialog
        open={open}
        ref={dialogRef}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-xl p-6 w-full max-w-md bg-white z-50"
        aria-labelledby="review-dialog-title"
      >
        <div className="space-y-6">
          <h2
            id="review-dialog-title"
            className="text-xl font-bold text-gray-800"
          >
            Submit Your Review
          </h2>

          {/* Star Rating */}
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="text-3xl focus:outline-none transition-colors duration-200"
                aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
              >
                {(hoverRating || rating) >= star ? (
                  <FaStar className="text-yellow-400" />
                ) : (
                  <FaRegStar className="text-gray-300" />
                )}
              </button>
            ))}
          </div>

          {/* Comment Textarea */}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[120px]"
            placeholder="Share your thoughts about the product..."
            aria-label="Review comment"
          />

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm animate-fade-in">{error}</p>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setRating(0);
                setComment("");
                setError("");
                onClose();
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
            >
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ReviewDialog;
