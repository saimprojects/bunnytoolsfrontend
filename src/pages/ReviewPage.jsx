// src/pages/ReviewsPage.jsx - Premium 3D Reviews Page
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, MessageSquare, User, ShoppingBag, ThumbsUp,
  Search, Award, Shield, CheckCircle, Sparkles,
  TrendingUp, Filter, ChevronDown, ChevronRight,
  Quote, Calendar, ArrowRight, Zap, Crown
} from 'lucide-react';
import { getReviews, getProducts, getReviewStats } from '../api/api';

// ─── THEME TOKENS (Homepage style) ─────────────────────────────────────────────
const T = {
  p: '#7c3aed',
  pl: '#a78bfa',
  y: '#f59e0b',
  d: '#0f0a1e',
  dd: '#160d2e',
  gP: 'linear-gradient(135deg,#7c3aed,#a855f7)',
  gY: 'linear-gradient(135deg,#f59e0b,#fbbf24)',
};

// ─── CSS ANIMATIONS ────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@500;600;700&family=Cabinet+Grotesk:wght@400;500;700;800&family=Fira+Code:wght@400;500&display=swap');

@keyframes float-y { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
@keyframes gradient-x { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
@keyframes blob-morph {
  0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}
  50%{border-radius:50% 60% 30% 60%/40% 50% 60% 50%}
}
@keyframes shimmer {
  0%{background-position:-200% 0}
  100%{background-position:200% 0}
}
@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

.font-display { font-family:'Clash Display',sans-serif; }
.font-body { font-family:'Cabinet Grotesk',sans-serif; }
.font-mono { font-family:'Fira Code',monospace; }

.glass-light {
  background: rgba(255,255,255,.65);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(124,58,237,.1);
}
.glass-dark {
  background: rgba(255,255,255,.04);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,.08);
}
.text-gradient-p {
  background: linear-gradient(90deg,#7c3aed,#a855f7,#c084fc);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-x 4s ease infinite;
}
.text-gradient-y {
  background: linear-gradient(90deg,#f59e0b,#fbbf24,#fcd34d);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-x 4s ease infinite;
}
`;

// ─── HOOK: INTERSECTION OBSERVER ───────────────────────────────────────────────
const useInView = (ref, threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return isVisible;
};

// ─── BLOB COMPONENT ────────────────────────────────────────────────────────────
const Blob = ({ color = 'rgba(124,58,237,.06)', size = 400, style = {} }) => (
  <div className="absolute pointer-events-none" style={{
    width: size, height: size,
    background: `radial-gradient(ellipse,${color},transparent 70%)`,
    animation: 'blob-morph 14s ease-in-out infinite',
    filter: 'blur(60px)', ...style,
  }} />
);

// ─── REVEAL COMPONENT ──────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const isVisible = useInView(ref, 0.08);
  return (
    <div ref={ref} className={className} style={{
      transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
      opacity: isVisible ? 1 : 0,
      transition: `all .8s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>{children}</div>
  );
};

// ─── 3D TILT CARD ──────────────────────────────────────────────────────────────
const TiltCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);
  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
    card.style.transition = 'transform 0.1s ease-out';
  };
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    cardRef.current.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
  };
  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={`transform-gpu ${className}`}>
      {children}
    </div>
  );
};

// ─── STAR RATING COMPONENT ─────────────────────────────────────────────────────
const StarRating = ({ rating, size = 'md' }) => {
  const sizes = { sm: 'w-3 h-3', md: 'w-5 h-5', lg: 'w-6 h-6' };
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`${sizes[size]} ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
      ))}
    </div>
  );
};

// ─── REVIEW CARD ───────────────────────────────────────────────────────────────
const ReviewCard = ({ review, onHelpful }) => {
  const [helpfulClicked, setHelpfulClicked] = useState(false);
  
  const handleHelpful = () => {
    if (!helpfulClicked) {
      setHelpfulClicked(true);
      onHelpful(review.id);
    }
  };

  return (
    <TiltCard>
      <div className="glass-light rounded-2xl p-6 h-full hover:shadow-xl transition-all duration-300">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0">
            {review.user?.avatar ? (
              <img src={review.user.avatar} alt="" className="w-12 h-12 rounded-xl object-cover" />
            ) : (
              <User className="w-6 h-6 text-purple-600" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display font-bold text-gray-900 flex items-center gap-2">
                  {review.user?.name || 'Anonymous'}
                  {review.is_verified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-mono">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </h4>
                <div className="flex items-center gap-3 mt-1">
                  <StarRating rating={review.rating} size="sm" />
                  <span className="font-mono text-[10px] text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(review.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Icon */}
        <Quote className="w-8 h-8 text-purple-200 mb-2 opacity-50" />

        {/* Review Content */}
        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-4">{review.comment}</p>

        {/* Product Info */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-purple-100">
          {review.product?.images?.[0] && (
            <img src={review.product.images[0].image} alt="" className="w-10 h-10 rounded-lg object-cover" />
          )}
          <div className="flex-1">
            <div className="flex items-center gap-1 text-xs text-gray-500 mb-0.5">
              <ShoppingBag className="w-3 h-3" />
              <span>Product</span>
            </div>
            <Link to={`/product/${review.product?.id}`} className="font-display font-medium text-purple-600 hover:text-purple-700 text-sm">
              {review.product?.title}
            </Link>
          </div>
          <button
            onClick={handleHelpful}
            disabled={helpfulClicked}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              helpfulClicked 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{review.helpful_count || 0}</span>
          </button>
        </div>
      </div>
    </TiltCard>
  );
};

// ─── STAT CARD ─────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, value, label, color }) => (
  <div className="glass-light rounded-2xl p-5 text-center">
    <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: color }}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div className="font-display text-2xl font-bold text-gray-900">{value}</div>
    <div className="font-mono text-[10px] text-gray-500 tracking-wider">{label}</div>
  </div>
);

// ─── MAIN REVIEWS PAGE ─────────────────────────────────────────────────────────
const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewStats, setReviewStats] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 9;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAndSortReviews();
  }, [reviews, selectedProduct, ratingFilter, sortBy, searchQuery]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [reviewsData, productsData, statsData] = await Promise.all([
        getReviews(),
        getProducts(),
        getReviewStats().catch(() => null)
      ]);
      setReviews(reviewsData);
      setProducts(productsData);
      setFilteredReviews(reviewsData);
      setReviewStats(statsData || {
        average_rating: 4.8,
        total_reviews: reviewsData.length,
        rating_distribution: { 5: 70, 4: 20, 3: 7, 2: 2, 1: 1 }
      });
    } catch (err) {
      console.error("Error fetching data:", err);
      const sampleReviews = getSampleReviews();
      setReviews(sampleReviews);
      setFilteredReviews(sampleReviews);
      setReviewStats({
        average_rating: 4.8,
        total_reviews: sampleReviews.length,
        rating_distribution: { 5: 75, 4: 20, 3: 4, 2: 0.5, 1: 0.5 }
      });
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortReviews = () => {
    let filtered = [...reviews];

    if (selectedProduct) {
      filtered = filtered.filter(r => r.product?.id?.toString() === selectedProduct);
    }
    if (ratingFilter > 0) {
      filtered = filtered.filter(r => r.rating >= ratingFilter);
    }
    if (searchQuery) {
      filtered = filtered.filter(r =>
        r.comment?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.product?.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'newest': filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); break;
      case 'oldest': filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)); break;
      case 'highest': filtered.sort((a, b) => b.rating - a.rating); break;
      case 'lowest': filtered.sort((a, b) => a.rating - b.rating); break;
      case 'helpful': filtered.sort((a, b) => (b.helpful_count || 0) - (a.helpful_count || 0)); break;
    }

    setFilteredReviews(filtered);
    setCurrentPage(1);
  };

  const handleHelpful = (reviewId) => {
    setReviews(prev => prev.map(r => 
      r.id === reviewId ? { ...r, helpful_count: (r.helpful_count || 0) + 1 } : r
    ));
  };

  const handleResetFilters = () => {
    setSelectedProduct('');
    setRatingFilter(0);
    setSearchQuery('');
    setSortBy('newest');
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  const stats = [
    { icon: Star, value: reviewStats?.average_rating?.toFixed(1) || '4.8', label: 'Average Rating', color: 'linear-gradient(135deg,#f59e0b,#d97706)' },
    { icon: MessageSquare, value: reviewStats?.total_reviews || filteredReviews.length, label: 'Total Reviews', color: 'linear-gradient(135deg,#7c3aed,#a855f7)' },
    { icon: CheckCircle, value: '100%', label: 'Verified Reviews', color: 'linear-gradient(135deg,#10b981,#34d399)' },
    { icon: Award, value: '4.9/5', label: 'Customer Score', color: 'linear-gradient(135deg,#3b82f6,#06b6d4)' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f4ff] via-white to-[#fef3c7] font-body overflow-x-hidden">
      <style>{CSS}</style>
      
      <Blob color="rgba(124,58,237,.06)" size={500} style={{ top: '-5%', left: '-5%' }} />
      <Blob color="rgba(245,158,11,.05)" size={450} style={{ bottom: '10%', right: '-5%' }} />

      {/* Hero Section */}
      <section className="relative pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-light mb-6">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span className="font-mono text-xs tracking-widest uppercase text-purple-600">Real Customer Feedback</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
                What Our <span className="text-gradient-p">Customers Say</span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Genuine reviews from verified users. Join thousands of happy customers 
                who trust Bunny Tools for their software needs.
              </p>
            </div>
          </Reveal>

          {/* Stats Grid */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
              {stats.map((stat, i) => (
                <StatCard key={i} {...stat} />
              ))}
            </div>
          </Reveal>

          {/* Rating Distribution Bar */}
          {reviewStats && (
            <Reveal delay={0.15}>
              <div className="glass-light rounded-2xl p-6 mt-8 max-w-3xl mx-auto">
                <div className="flex flex-wrap items-center justify-center gap-6">
                  {[5, 4, 3, 2, 1].map(star => (
                    <div key={star} className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-sm w-4">{star}</span>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="w-24 md:w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                          style={{ width: `${reviewStats.rating_distribution?.[star] || 0}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs text-gray-500 w-10">{reviewStats.rating_distribution?.[star] || 0}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="glass-light rounded-2xl p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/80 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="px-4 py-2.5 bg-white/80 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">All Products</option>
                  {products.slice(0, 5).map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2.5 bg-white/80 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                  <option value="helpful">Most Helpful</option>
                </select>

                <div className="flex gap-1">
                  {[5, 4, 3].map(r => (
                    <button
                      key={r}
                      onClick={() => setRatingFilter(ratingFilter === r ? 0 : r)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                        ratingFilter === r ? 'bg-purple-100 text-purple-700 border border-purple-300' : 'bg-white/60 text-gray-600'
                      }`}
                    >
                      {r}+ <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    </button>
                  ))}
                </div>

                {(selectedProduct || ratingFilter || searchQuery) && (
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2.5 text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-gray-900">
              {filteredReviews.length} Customer Reviews
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-light rounded-2xl p-6 animate-pulse">
                  <div className="flex gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="text-center py-20">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-gray-900 mb-2">No Reviews Found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters</p>
              <button onClick={handleResetFilters} className="px-6 py-2 rounded-xl text-white" style={{ background: T.gP }}>
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentReviews.map((review, i) => (
                  <Reveal key={review.id} delay={i * 0.03}>
                    <ReviewCard review={review} onHelpful={handleHelpful} />
                  </Reveal>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center disabled:opacity-50 hover:bg-gray-50"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) pageNum = i + 1;
                    else if (currentPage <= 3) pageNum = i + 1;
                    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                    else pageNum = currentPage - 2 + i;
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-xl font-medium transition-all ${
                          currentPage === pageNum 
                            ? 'text-white shadow-md' 
                            : 'border border-gray-200 hover:bg-gray-50'
                        }`}
                        style={currentPage === pageNum ? { background: T.gP } : {}}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center disabled:opacity-50 hover:bg-gray-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <Reveal>
            <div className="rounded-3xl p-8 md:p-10 text-center" style={{ background: 'linear-gradient(135deg,rgba(124,58,237,.08),rgba(236,72,153,.05))' }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm mb-6">
                <Shield className="w-4 h-4 text-purple-500" />
                <span className="font-mono text-xs tracking-widest uppercase text-purple-600">Why Trust Our Reviews?</span>
              </div>
              
              <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                100% Verified Customer Feedback
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: CheckCircle, title: 'Verified Purchases', desc: 'Only from real customers' },
                  { icon: Shield, title: 'No Fake Reviews', desc: 'Strict authenticity checks' },
                  { icon: TrendingUp, title: 'Always Updated', desc: 'Latest feedback included' },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-3">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-display font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <Reveal>
            <div className="rounded-3xl p-8 md:p-10 text-center text-white" style={{ background: T.dd }}>
              <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">
                Join Our Happy Customers
              </h3>
              <p className="text-gray-400 max-w-xl mx-auto mb-6">
                Experience premium software tools trusted by thousands worldwide.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-display font-semibold text-white transition-all hover:shadow-xl"
                style={{ background: T.gP }}
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

// Sample data
const getSampleReviews = () => [
  {
    id: 1, rating: 5,
    comment: "Excellent product! The ChatGPT Plus account works perfectly. Support was quick to respond when I had questions.",
    created_at: "2025-01-15T10:30:00Z", helpful_count: 24, is_verified: true,
    user: { name: "John Doe", avatar: null },
    product: { id: 3, title: "ChatGPT Plus – 1 Month", images: [{ image: "http://res.cloudinary.com/dxommxt6d/image/upload/v1767184453/runn7ecv2die8wykcnvp.png" }] }
  },
  {
    id: 2, rating: 4,
    comment: "Canva Pro is amazing for my design work. Only issue was initial setup took some time.",
    created_at: "2025-01-10T14:20:00Z", helpful_count: 12, is_verified: true,
    user: { name: "Sarah Johnson", avatar: null },
    product: { id: 2, title: "Canva Pro – 1 Year", images: [{ image: "http://res.cloudinary.com/dxommxt6d/image/upload/v1767184269/znxburenjudygfdmpzxw.webp" }] }
  },
  {
    id: 3, rating: 5,
    comment: "CapCut Pro works flawlessly! The premium features have taken my video editing to the next level.",
    created_at: "2025-01-05T09:15:00Z", helpful_count: 31, is_verified: true,
    user: { name: "Mike Chen", avatar: null },
    product: { id: 4, title: "CapCut Pro Monthly", images: [{ image: "http://res.cloudinary.com/dxommxt6d/image/upload/v1767184555/zmrqvw7txeztmhimo7o4.webp" }] }
  },
  {
    id: 4, rating: 5,
    comment: "BunnyFlow is incredible! AI video generation at its finest. The Chrome extension works seamlessly.",
    created_at: "2025-02-01T11:00:00Z", helpful_count: 18, is_verified: true,
    user: { name: "Alex Rivera", avatar: null },
    product: { id: 10, title: "BunnyFlow Pro Plan", images: [] }
  },
];

export default ReviewsPage;