// src/components/products/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Star, TrendingUp, Zap, Shield, Heart, ShoppingBag, Eye } from 'lucide-react';

function ProductCard({ product, featured = false }) {
  const mainImage =
    product.images && product.images.length > 0
      ? product.images[0].image
      : null;

  const discountPercentage = product.discount_percentage || 0;
  const isOnSale = discountPercentage > 0;
  const isFeatured = product.is_featured || featured;
  const isTrending = product.is_trending || false;

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200">
      {/* Badges Container */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        {isOnSale && (
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-r-lg shadow-lg">
            -{discountPercentage}% OFF
          </div>
        )}
        
        {isFeatured && (
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-bold px-3 py-1.5 rounded-r-lg shadow-lg flex items-center gap-1.5">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </div>
        )}
        
        {isTrending && (
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-r-lg shadow-lg flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3" />
            Trending
          </div>
        )}
      </div>

      {/* Quick Action Buttons */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
        <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
          <Eye className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Image Container */}
      <Link to={`/product/${product.id}`}>
        <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          {mainImage ? (
            <>
              <img
                src={mainImage}
                alt={product.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-5xl mb-2">📷</div>
                <div className="text-sm font-medium">No Image Available</div>
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Categories */}
        {product.categories?.length > 0 && (
          <div className="flex items-center gap-2 mb-3">
            {product.categories.slice(0, 2).map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug || cat.id}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-brand-purple hover:bg-purple-100 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
            {product.categories.length > 2 && (
              <span className="text-xs text-gray-500 font-medium">
                +{product.categories.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-brand-purple transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Rating & Reviews */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < (product.rating || 4)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              ({product.review_count || 0} reviews)
            </span>
          </div>
          
          {/* Best Seller Badge */}
          {product.is_bestseller && (
            <span className="text-xs px-2.5 py-1 bg-yellow-100 text-yellow-800 font-medium rounded-full">
              Bestseller
            </span>
          )}
        </div>

        {/* Description */}
        {product.short_description && (
          <p className="text-sm text-gray-600 mb-5 line-clamp-2">
            {product.short_description}
          </p>
        )}

        {/* Price & Actions Section */}
        <div className="pt-4 border-t border-gray-100">
          {/* Price Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                {product.price !== null && product.price !== undefined
                  ? `Rs. ${product.price.toLocaleString()}`
                  : "Contact for Price"}
              </span>
              
              {product.original_price && product.price < product.original_price && (
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 line-through">
                    Rs. {product.original_price.toLocaleString()}
                  </span>
                  <span className="text-xs text-red-500 font-medium">
                    Save Rs. {(product.original_price - product.price).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Unit Price */}
            {product.price_type === 'per_unit' && product.unit && (
              <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                Per {product.unit}
              </div>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center text-xs text-gray-600">
              <Shield className="w-3 h-3 mr-1.5 text-green-500 flex-shrink-0" />
              <span className="truncate">Warranty Included</span>
            </div>
            
            {product.delivery_days && (
              <div className="flex items-center text-xs text-gray-600">
                <Zap className="w-3 h-3 mr-1.5 text-blue-500 flex-shrink-0" />
                <span className="truncate">{product.delivery_days} Day Delivery</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Link
              to={`/product/${product.id}`}
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-semibold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              View Details
            </Link>
            <button className="w-12 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-200 rounded-xl transition-colors duration-300 pointer-events-none"></div>
    </div>
  );
}

export default ProductCard;