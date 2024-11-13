import React, { useState } from "react";

const ReviewsPage = () => {
  // Sample reviews data (this could come from Firebase or a backend)
  const [reviews, setReviews] = useState([
    // Example reviews
  ]);

  // New review state
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 1,
    comment: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  // Submit the review
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.comment) {
      setReviews([...reviews, newReview]);
      setNewReview({ name: "", rating: 1, comment: "" }); // Reset the form
    }
  };

  return (
    <div className="bg-[#2F4F4F] min-h-screen">
      <div className="max-w-4xl mx-auto py-10">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Guest Reviews</h2>

        {/* Reviews List */}
        <div className="space-y-4 mb-10">
          {reviews.map((review, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-lg bg-white">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{review.name}</h3>
                <div className="text-yellow-500">
                  {"★".repeat(review.rating)}{" "}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* New Review Form */}
        <div className="mt-10 p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Add Your Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={newReview.name}
                onChange={handleInputChange}
                required
                className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700">Rating</label>
              <select
                name="rating"
                value={newReview.rating}
                onChange={handleInputChange}
                required
                className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>1 Star</option>
                <option value={2}>2 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={5}>5 Stars</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Comment</label>
              <textarea
                name="comment"
                value={newReview.comment}
                onChange={handleInputChange}
                required
                rows="4"
                className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
