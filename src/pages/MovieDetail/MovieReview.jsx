import React, { useState } from "react";
import { useMovieReviewsQuery } from "../../hooks/useMovieReviews";
import "./ReviewSection.style.css";

const ReviewSection = ({ movieId }) => {
    const { data: reviews, isLoading } = useMovieReviewsQuery(movieId);
    const [expandedReviewIds, setExpandedReviewIds] = useState([]);

    const toggleReview = (id) => {
        setExpandedReviewIds((prev) =>
            prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
        );
    };

    if (isLoading)
        return <div className="review-message">Loading reviews...</div>;
    if (!reviews || reviews.length === 0)
        return <div className="review-message">No reviews found.</div>;

    return (
        <div className="review-container">
            {reviews.map((review) => (
                <div className="review-item" key={review.id}>
                    <div className="review-author">{review.author}</div>
                    <div className="review-content">
                        {expandedReviewIds.includes(review.id)
                            ? review.content
                            : `${review.content.slice(0, 200)}...`}
                        <button
                            className="toggle-button ms-2"
                            onClick={() => toggleReview(review.id)}
                        >
                            {expandedReviewIds.includes(review.id) ? "접기" : "더보기"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReviewSection;