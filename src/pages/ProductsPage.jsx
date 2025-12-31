// src/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import { getProducts, getCategories } from '../api/api';
import { Filter, Grid, List, Search, Sliders } from 'lucide-react';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, priceRange, searchQuery, sortBy]);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
      setFilteredProducts(productsData);
    } catch (err) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.categories?.some(cat => cat.id.toString() === selectedCategory)
      );
    }

    // Price filter
    filtered = filtered.filter(product => {
      const price = product.price || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      default:
        // Default sorting (featured first)
        filtered.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchParams(categoryId ? { category: categoryId } : {});
  };

  const handlePriceChange = (min, max) => {
    setPriceRange([min, max]);
  };

  const handleResetFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 100000]);
    setSearchQuery('');
    setSortBy('default');
    setSearchParams({});
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <div className="text-6xl mb-6">😞</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Products</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={fetchData}
            className="bg-gradient-to-r from-brand-purple to-brand-purple-light text-white px-6 py-3 rounded-lg font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-brand-purple to-purple-700 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
            <p className="text-lg text-purple-100 mb-8">
              Discover our curated collection of premium digital products and solutions.
              Find exactly what you need for your digital journey.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translateY-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-1/4">
            <ProductFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              onPriceChange={handlePriceChange}
              onReset={handleResetFilters}
              productsCount={filteredProducts.length}
              totalProducts={products.length}
            />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-xl px-4 py-3 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <Sliders className="w-5 h-5 mr-2" />
                  <span className="font-medium">Filters & Sorting</span>
                </div>
                <span className="text-sm text-gray-600">
                  {filteredProducts.length} products
                </span>
              </button>
              
              {showFilters && (
                <div className="mt-4 bg-white border border-gray-300 rounded-xl p-4">
                  <ProductFilters
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                    priceRange={priceRange}
                    onPriceChange={handlePriceChange}
                    onReset={handleResetFilters}
                    productsCount={filteredProducts.length}
                    totalProducts={products.length}
                  />
                </div>
              )}
            </div>

            {/* Toolbar */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-bold">{filteredProducts.length}</span> of{' '}
                  <span className="font-bold">{products.length}</span> products
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                    >
                      <option value="default">Sort by: Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name">Name: A to Z</option>
                      <option value="newest">Newest First</option>
                    </select>
                    <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* View Toggle */}
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-purple-50 text-brand-purple' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-purple-50 text-brand-purple' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {loading ? (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "space-y-6"
              }>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 rounded-2xl h-64 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Products Found</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We couldn't find any products matching your criteria. Try adjusting your filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-gradient-to-r from-brand-purple to-brand-purple-light text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="md:w-1/4">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0].image}
                            alt={product.title}
                            className="w-full h-64 md:h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-64 md:h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <div className="text-gray-400 text-center">
                              <div className="text-4xl mb-2">📷</div>
                              <div className="text-sm">No Image</div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="md:w-3/4 p-6">
                        <div className="flex flex-col h-full justify-between">
                          <div>
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="text-xl font-bold text-gray-900">{product.title}</h3>
                              <span className="text-2xl font-bold text-brand-purple">
                                Rs. {product.price || 'Contact'}
                              </span>
                            </div>
                            
                            {/* Categories */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {product.categories?.map(category => (
                                <span
                                  key={category.id}
                                  className="px-3 py-1 bg-purple-50 text-brand-purple text-sm rounded-full"
                                >
                                  {category.name}
                                </span>
                              ))}
                            </div>

                            {/* Description */}
                            <div 
                              className="text-gray-600 line-clamp-2 mb-6"
                              dangerouslySetInnerHTML={{ 
                                __html: product.description?.substring(0, 200) + '...' || '' 
                              }}
                            />
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              {product.stock ? `${product.stock} in stock` : 'In Stock'}
                            </div>
                            <div className="flex space-x-3">
                              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                                View Details
                              </button>
                              <button className="px-4 py-2 bg-gradient-to-r from-brand-purple to-brand-purple-light text-white rounded-lg hover:shadow-lg">
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {filteredProducts.length > 0 && filteredProducts.length < products.length && (
              <div className="text-center mt-12">
                <button className="bg-white border-2 border-brand-purple text-brand-purple px-8 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="container mx-auto px-4 mt-20 mb-8">
        <div className="bg-gradient-to-r from-brand-yellow to-yellow-400 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-yellow-100 text-lg mb-8 max-w-2xl mx-auto">
            We offer custom solutions! Contact us with your requirements and we'll create the perfect product for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-100">
              Request Custom Quote
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;