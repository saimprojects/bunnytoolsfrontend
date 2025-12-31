// src/components/products/ProductFilters.jsx
import React, { useState } from 'react';
import { X, Filter, Tag, DollarSign, RefreshCw, Star } from 'lucide-react';

const ProductFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  onReset,
  productsCount,
  totalProducts
}) => {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [selectedRating, setSelectedRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);

  const priceRanges = [
    { label: 'Under Rs. 1,000', min: 0, max: 1000 },
    { label: 'Rs. 1,000 - Rs. 5,000', min: 1000, max: 5000 },
    { label: 'Rs. 5,000 - Rs. 10,000', min: 5000, max: 10000 },
    { label: 'Rs. 10,000 - Rs. 20,000', min: 10000, max: 20000 },
    { label: 'Over Rs. 20,000', min: 20000, max: 1000000 },
  ];

  const handlePriceSubmit = () => {
    onPriceChange(localPriceRange[0], localPriceRange[1]);
  };

  const handleResetAll = () => {
    setSelectedRating(0);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setLocalPriceRange([0, 100000]);
    onReset();
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Filter className="w-5 h-5 text-brand-purple mr-2" />
          <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        </div>
        <button
          onClick={handleResetAll}
          className="text-sm text-gray-600 hover:text-brand-purple flex items-center"
        >
          <RefreshCw className="w-4 h-4 mr-1" />
          Reset All
        </button>
      </div>

      {/* Products Count */}
      <div className="bg-purple-50 rounded-lg p-4 mb-6">
        <div className="text-sm text-gray-600 mb-1">Showing</div>
        <div className="flex items-baseline">
          <div className="text-2xl font-bold text-brand-purple">{productsCount}</div>
          <div className="text-gray-600 ml-2">out of {totalProducts} products</div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Tag className="w-5 h-5 text-gray-600 mr-2" />
          <h4 className="font-semibold text-gray-900">Categories</h4>
        </div>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          <button
            onClick={() => onCategoryChange('')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === ''
                ? 'bg-brand-purple text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id.toString())}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id.toString()
                  ? 'bg-brand-purple text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{category.name}</span>
                <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-full">
                  {category.product_count || 0}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <DollarSign className="w-5 h-5 text-gray-600 mr-2" />
          <h4 className="font-semibold text-gray-900">Price Range</h4>
        </div>

        {/* Quick Price Filters */}
        <div className="space-y-2 mb-6">
          {priceRanges.map((range, index) => (
            <button
              key={index}
              onClick={() => onPriceChange(range.min, range.max)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                priceRange[0] === range.min && priceRange[1] === range.max
                  ? 'bg-brand-purple text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Custom Price Range */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-900">Custom Range</div>
            <div className="text-sm text-brand-purple font-medium">
              Rs. {localPriceRange[0].toLocaleString()} - Rs. {localPriceRange[1].toLocaleString()}
            </div>
          </div>

          <div className="relative pt-1">
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={localPriceRange[0]}
              onChange={(e) => setLocalPriceRange([parseInt(e.target.value), localPriceRange[1]])}
              className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-purple"
            />
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={localPriceRange[1]}
              onChange={(e) => setLocalPriceRange([localPriceRange[0], parseInt(e.target.value)])}
              className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-purple"
            />
            <div className="h-2 bg-gray-300 rounded-lg"></div>
          </div>

          <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
            <span>Rs. 0</span>
            <span>Rs. 100,000</span>
          </div>

          <button
            onClick={handlePriceSubmit}
            className="w-full mt-4 bg-gradient-to-r from-brand-purple to-brand-purple-light text-white py-2 rounded-lg font-medium hover:shadow-lg transition-shadow"
          >
            Apply Price Range
          </button>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Star className="w-5 h-5 text-gray-600 mr-2" />
          Rating
        </h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <button
              key={stars}
              onClick={() => setSelectedRating(stars)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center justify-between ${
                selectedRating === stars
                  ? 'bg-purple-50 text-brand-purple'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm">& above</span>
              </div>
              <span className="text-xs text-gray-500">(24)</span>
            </button>
          ))}
        </div>
      </div>

      {/* Status Filters */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-900 mb-4">Status</h4>
        <div className="space-y-3">
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded text-brand-purple focus:ring-brand-purple" 
            />
            <span className="ml-2 text-gray-700">In Stock Only</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={onSaleOnly}
              onChange={(e) => setOnSaleOnly(e.target.checked)}
              className="rounded text-brand-purple focus:ring-brand-purple" 
            />
            <span className="ml-2 text-gray-700">On Sale</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;