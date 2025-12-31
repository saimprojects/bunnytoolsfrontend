// src/components/products/ReviewList.jsx
import React from 'react';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';

function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
        <p className="text-gray-600">Be the first to review this product</p>
      </div>
    );
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const ratingDistribution = Array(5).fill(0).map((_, i) => ({
    stars: 5 - i,
    count: reviews.filter(r => r.rating === 5 - i).length,
    percentage: (reviews.filter(r => r.rating === 5 - i).length / reviews.length) * 100
  }));

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {getAverageRating()}
            </div>
            <div className="flex items-center justify-center md:justify-start mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(getAverageRating())
                      ? 'text-yellow-400 fill-current'
                      : i < getAverageRating()
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-gray-600">
              Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2 min-w-[200px]">
            {ratingDistribution.map((dist) => (
              <div key={dist.stars} className="flex items-center">
                <div className="flex items-center w-16">
                  <span className="text-sm text-gray-600 w-4">{dist.stars}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current ml-1" />
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden mx-3">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${dist.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-10 text-right">
                  {dist.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center mb-2">
                  {/* User Avatar */}
                  <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {review.customer_name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {review.customer_name || 'Anonymous User'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(review.created_at)}
                    </div>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {review.rating}/5
                  </span>
                </div>
              </div>

              {/* Helpful Button */}
              <button className="flex items-center text-gray-500 hover:text-gray-700 text-sm">
                <ThumbsUp className="w-4 h-4 mr-1" />
                <span>Helpful</span>
              </button>
            </div>

            {/* Review Comment */}
            {review.comment && (
              <div className="prose prose-sm max-w-none text-gray-700">
                <p className="whitespace-pre-line">{review.comment}</p>
              </div>
            )}

            {/* Review Meta */}
            {(review.verified_purchase || review.location) && (
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                {review.verified_purchase && (
                  <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full">
                    ✓ Verified Purchase
                  </span>
                )}
                {review.location && (
                  <span>{review.location}</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Write Review Button */}
      <div className="text-center pt-6 border-t border-gray-200">
        <button className="inline-flex items-center bg-gradient-to-r from-brand-purple to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow">
          <MessageCircle className="w-5 h-5 mr-2" />
          Write a Review
        </button>
      </div>
    </div>
  );
}

export default ReviewList;