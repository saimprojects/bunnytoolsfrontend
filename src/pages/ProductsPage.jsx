// src/pages/ProductsPage.jsx - Premium 3D Scroll-Driven Products Page (Fixed Spacing)
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import { getAllProducts, getCategories } from '../api/api';
import { 
  Filter, Search, Sliders, ChevronDown, 
  Package, Sparkles, TrendingUp, Award, Zap, Star,
  ArrowRight, Shield
} from 'lucide-react';

// ─── THEME TOKENS ─────────────────────────────────────────────────────────────
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

@keyframes float-y { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes gradient-x { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
@keyframes blob-morph {
  0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}
  50%{border-radius:50% 60% 30% 60%/40% 50% 60% 50%}
}
@keyframes fade-up { from{opacity:0;transform:translateY(48px)} to{opacity:1;transform:translateY(0)} }

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
`;

// ─── HOOK: INTERSECTION OBSERVER ───────────────────────────────────────────────
const useInView = (ref, threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return isVisible;
};

// ─── HOOK: SCROLL LOCK (REDUCED VIRTUAL SCROLL) ────────────────────────────────
const useScrollLockSection = (totalVirtualScroll = 300) => {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const currentProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
    const startThreshold = 80;

    const getMetrics = () => {
      const el = sectionRef.current;
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const lockY = window.scrollY + rect.top;
      const enteringFromTop = rect.top <= startThreshold && rect.top >= -startThreshold;
      const inLockZone = rect.top <= startThreshold && rect.bottom >= window.innerHeight - startThreshold;
      return { rect, lockY, enteringFromTop, inLockZone };
    };

    const pinViewport = (lockY) => {
      if (Math.abs(window.scrollY - lockY) > 1) {
        window.scrollTo({ top: lockY, behavior: 'auto' });
      }
    };

    const animateToTarget = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) < 0.0006) {
        currentProgressRef.current = targetProgressRef.current;
        setProgress(currentProgressRef.current);
        rafRef.current = null;
        return;
      }
      currentProgressRef.current += diff * 0.15;
      setProgress(currentProgressRef.current);
      rafRef.current = requestAnimationFrame(animateToTarget);
    };

    const queueProgressDelta = (delta) => {
      targetProgressRef.current = clamp(
        targetProgressRef.current + delta / Math.max(1, totalVirtualScroll)
      );
      if (!rafRef.current) rafRef.current = requestAnimationFrame(animateToTarget);
    };

    const shouldCapture = (delta) => {
      const metrics = getMetrics();
      if (!metrics) return { capture: false, metrics: null };
      const movingDown = delta > 0;
      const movingUp = delta < 0;
      const hasRoomForward = targetProgressRef.current < 0.999;
      const hasRoomBackward = targetProgressRef.current > 0.001;
      const shouldEnter = movingDown && metrics.enteringFromTop && hasRoomForward;
      const shouldHold = metrics.inLockZone && ((movingDown && hasRoomForward) || (movingUp && hasRoomBackward));
      const shouldReverseEnter = movingUp && metrics.rect.top <= 0 && metrics.rect.bottom >= window.innerHeight - startThreshold && hasRoomBackward;
      return { capture: shouldEnter || shouldHold || shouldReverseEnter, metrics };
    };

    const onWheel = (e) => {
      const { capture, metrics } = shouldCapture(e.deltaY);
      if (!capture || !metrics) return;
      e.preventDefault();
      e.stopPropagation();
      pinViewport(metrics.lockY);
      queueProgressDelta(e.deltaY * 0.6);
    };

    const onKeyDown = (e) => {
      let delta = 0;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) delta = 70;
      if (['ArrowUp', 'PageUp'].includes(e.key)) delta = -70;
      if (!delta) return;
      const { capture, metrics } = shouldCapture(delta);
      if (!capture || !metrics) return;
      e.preventDefault();
      pinViewport(metrics.lockY);
      queueProgressDelta(delta);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [totalVirtualScroll]);

  const wrapperStyle = {
    position: 'relative',
    height: `calc(100vh + ${Math.round(totalVirtualScroll * 0.4)}px)`,
  };

  return { sectionRef, progress, wrapperStyle };
};

// ─── BLOB COMPONENT ────────────────────────────────────────────────────────────
const Blob = ({ color = 'rgba(124,58,237,.06)', size = 400, style = {} }) => (
  <div
    className="absolute pointer-events-none"
    style={{
      width: size,
      height: size,
      background: `radial-gradient(ellipse,${color},transparent 70%)`,
      animation: 'blob-morph 14s ease-in-out infinite',
      filter: 'blur(60px)',
      ...style,
    }}
  />
);

// ─── REVEAL COMPONENT ──────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const isVisible = useInView(ref, 0.08);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        opacity: isVisible ? 1 : 0,
        transition: `all .7s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// ─── PROGRESS RING ─────────────────────────────────────────────────────────────
const ProgressRing = ({ progress }) => {
  const r = 16;
  const c = 2 * Math.PI * r;
  const offset = c - progress * c;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 pointer-events-none"
      style={{
        opacity: progress > 0.02 && progress < 0.98 ? 1 : 0,
        transition: 'opacity .3s',
      }}
    >
      <div className="relative w-14 h-14 flex items-center justify-center rounded-full glass-dark">
        <svg width="44" height="44" className="absolute" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(124,58,237,.2)" strokeWidth="2.5" />
          <circle
            cx="22"
            cy="22"
            r={r}
            fill="none"
            stroke="#a78bfa"
            strokeWidth="2.5"
            strokeDasharray={c}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset .1s' }}
          />
        </svg>
        <span className="font-mono text-[9px] text-purple-300">{Math.round(progress * 100)}%</span>
      </div>
    </div>
  );
};

// ─── FILTER SIDEBAR COMPONENT ──────────────────────────────────────────────────
const FilterSidebar = ({ categories, selectedCategory, onCategoryChange, priceRange, onPriceChange, onReset, productsCount, totalProducts }) => {
  const [localPrice, setLocalPrice] = useState({ min: priceRange[0], max: priceRange[1] });

  useEffect(() => {
    setLocalPrice({ min: priceRange[0], max: priceRange[1] });
  }, [priceRange]);

  const handlePriceApply = () => {
    onPriceChange(localPrice.min, localPrice.max);
  };

  return (
    <div className="glass-light rounded-3xl p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg font-bold text-gray-900">Filters</h3>
        <button
          onClick={onReset}
          className="font-mono text-[10px] text-purple-500 hover:text-purple-700 transition-colors"
        >
          Reset All
        </button>
      </div>

      <div className="mb-6 pb-6 border-b border-purple-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Products Found</span>
          <span className="font-display text-2xl font-bold text-gradient-p">{productsCount}</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">out of {totalProducts} total</p>
      </div>

      <div className="mb-6 pb-6 border-b border-purple-100">
        <h4 className="font-display font-semibold text-gray-900 mb-3">Categories</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ''}
              onChange={() => onCategoryChange('')}
              className="w-4 h-4 accent-purple-600"
            />
            <span className={`text-sm ${selectedCategory === '' ? 'text-purple-600 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
              All Categories
            </span>
          </label>
          {categories.map(cat => (
            <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="category"
                value={cat.id}
                checked={selectedCategory === cat.id.toString()}
                onChange={() => onCategoryChange(cat.id.toString())}
                className="w-4 h-4 accent-purple-600"
              />
              <span className={`text-sm ${selectedCategory === cat.id.toString() ? 'text-purple-600 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display font-semibold text-gray-900 mb-3">Price Range</h4>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="font-mono text-[10px] text-gray-500">Min</label>
              <input
                type="number"
                value={localPrice.min}
                onChange={(e) => setLocalPrice(prev => ({ ...prev, min: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-purple-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex-1">
              <label className="font-mono text-[10px] text-gray-500">Max</label>
              <input
                type="number"
                value={localPrice.max}
                onChange={(e) => setLocalPrice(prev => ({ ...prev, max: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-purple-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <button
            onClick={handlePriceApply}
            className="w-full py-2 rounded-xl text-sm font-medium text-white"
            style={{ background: T.gP }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── HERO SECTION (NON-PINNED - SIMPLE) ────────────────────────────────────────
const HeroSection = () => {
  const ref = useRef(null);
  const isVisible = useInView(ref, 0.1);

  return (
    <section ref={ref} className="relative pt-12 pb-8 overflow-hidden">
      <Blob color="rgba(124,58,237,.06)" size={500} style={{ top: '-10%', left: '-5%' }} />
      <Blob color="rgba(168,85,247,.04)" size={400} style={{ bottom: '-10%', right: '-5%' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div 
          className="text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all .8s cubic-bezier(.16,1,.3,1)',
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 glass-light">
            <Sparkles size={14} className="text-purple-500" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-purple-600">
              Premium Collection
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="text-gray-900">Discover </span>
            <span className="text-gradient-p">Premium Tools</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Curated collection of professional digital products and subscriptions.
            Find exactly what you need for your creative workflow.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {[
              { value: '50+', label: 'Premium Tools', icon: Package },
              { value: '1000+', label: 'Happy Customers', icon: Star },
              { value: '98%', label: 'Satisfaction', icon: TrendingUp },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <stat.icon size={16} className="text-purple-500" />
                  <span className="font-display text-2xl font-bold text-gray-900">{stat.value}</span>
                </div>
                <p className="font-mono text-[10px] text-gray-500 tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── SEARCH & FILTER SECTION ───────────────────────────────────────────────────
const SearchSection = ({ searchQuery, setSearchQuery, categories, selectedCategory, onCategoryChange, sortBy, setSortBy, filteredCount, totalCount }) => {
  const ref = useRef(null);
  const isVisible = useInView(ref, 0.1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <section ref={ref} className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div
          className="glass-light rounded-3xl p-5 md:p-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all .6s cubic-bezier(.16,1,.3,1)',
          }}
        >
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white/80 backdrop-blur-sm border border-purple-100 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-purple-200 text-purple-600"
              >
                <Sliders size={16} />
                <span className="text-sm">Filters</span>
              </button>

              <div className="hidden md:flex flex-wrap gap-2">
                <button
                  onClick={() => onCategoryChange('')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === '' ? 'text-white' : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                  }`}
                  style={selectedCategory === '' ? { background: T.gP } : {}}
                >
                  All
                </button>
                {categories.slice(0, 5).map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => onCategoryChange(cat.id.toString())}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat.id.toString() ? 'text-white' : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                    }`}
                    style={selectedCategory === cat.id.toString() ? { background: T.gP } : {}}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-gray-500">
                <span className="font-bold text-purple-600">{filteredCount}</span> / {totalCount}
              </span>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white/80 backdrop-blur-sm border border-purple-100 rounded-xl px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
                <Filter className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {showMobileFilters && (
            <div className="mt-4 p-4 bg-white rounded-xl border border-purple-100 md:hidden">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onCategoryChange('')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${selectedCategory === '' ? 'text-white' : 'bg-purple-50 text-purple-600'}`}
                  style={selectedCategory === '' ? { background: T.gP } : {}}
                >
                  All
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => onCategoryChange(cat.id.toString())}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${selectedCategory === cat.id.toString() ? 'text-white' : 'bg-purple-50 text-purple-600'}`}
                    style={selectedCategory === cat.id.toString() ? { background: T.gP } : {}}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ─── PRODUCTS GRID SECTION ─────────────────────────────────────────────────────
const ProductsGridSection = ({ products, loading, onViewDetails, hasMore, onLoadMore, visibleCount, filteredCount }) => {
  if (loading) {
    return (
      <div className="py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-purple-100/50 rounded-2xl h-64 mb-4"></div>
              <div className="h-4 bg-purple-100 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-purple-100 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="font-display text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
        <p className="text-gray-500 max-w-md mx-auto text-sm">
          Try adjusting your filters or search query.
        </p>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product, index) => (
          <Reveal key={product.id} delay={index * 0.02}>
            <ProductCard product={product} onViewDetails={() => onViewDetails(product.id)} />
          </Reveal>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-10">
          <button
            onClick={onLoadMore}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-white transition-all duration-300 hover:shadow-lg"
            style={{ background: T.gP }}
          >
            <span>Load More</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
          <p className="text-xs text-gray-500 mt-2 font-mono">
            Showing {visibleCount} of {filteredCount} products
          </p>
        </div>
      )}
    </div>
  );
};

// ─── CTA SECTION ───────────────────────────────────────────────────────────────
const CTASection = () => {
  const ref = useRef(null);
  const isVisible = useInView(ref, 0.1);

  return (
    <section ref={ref} className="py-16 relative overflow-hidden">
      <Blob color="rgba(124,58,237,.06)" size={400} style={{ top: '-10%', left: '-5%' }} />
      <Blob color="rgba(245,158,11,.04)" size={350} style={{ bottom: '-10%', right: '-5%' }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10">
        <div
          className="rounded-[32px] border border-white/10 p-8 md:p-10 text-center"
          style={{
            background: 'linear-gradient(135deg,rgba(124,58,237,.08),rgba(124,58,237,.02))',
            backdropFilter: 'blur(20px)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all .7s cubic-bezier(.16,1,.3,1)',
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 bg-white/5 border border-white/10">
            <Sparkles size={14} className="text-purple-300" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-purple-300">
              Can't Find What You Need?
            </span>
          </div>

          <h2 className="font-display text-2xl md:text-4xl font-bold text-gray-900 mb-3">
            Request a <span className="text-gradient-p">Custom Solution</span>
          </h2>

          <p className="text-gray-600 max-w-xl mx-auto mb-6 text-sm md:text-base">
            We offer custom solutions tailored to your specific needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-white transition-all duration-300 hover:shadow-lg"
              style={{ background: T.gP }}
            >
              Request Custom Quote
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-display font-semibold border-2 border-purple-200 text-purple-600 hover:bg-purple-50 transition-all duration-300"
            >
              Browse All Products
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-purple-100">
            {[
              { icon: Shield, text: 'Secure Payments' },
              { icon: Zap, text: 'Instant Delivery' },
              { icon: Award, text: 'Verified Quality' },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <badge.icon size={14} className="text-purple-500" />
                <span className="font-mono text-[9px] text-gray-500">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── MAIN PRODUCTS PAGE ────────────────────────────────────────────────────────
const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [allProducts, selectedCategory, priceRange, searchQuery, sortBy]);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) setSelectedCategory(category);
  }, [searchParams]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [productsData, categoriesData] = await Promise.all([
        getAllProducts(),
        getCategories()
      ]);
      setAllProducts(productsData);
      setCategories(categoriesData);
      setFilteredProducts(productsData);
    } catch (err) {
      console.error("Error in fetchData:", err);
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...allProducts];

    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.categories?.some(cat => cat.id.toString() === selectedCategory)
      );
    }

    filtered = filtered.filter(product => {
      const price = parseFloat(product.price) || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0));
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      default:
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    setFilteredProducts(filtered);
    setVisibleCount(12);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchParams(categoryId ? { category: categoryId } : {});
  };

  const handlePriceChange = (min, max) => setPriceRange([min, max]);
  
  const handleResetFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 100000]);
    setSearchQuery('');
    setSortBy('newest');
    setVisibleCount(12);
    setSearchParams({});
  };

  const handleLoadMore = () => setVisibleCount(prev => prev + 12);
  const handleViewDetails = (productId) => navigate(`/product/${productId}`);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMoreProducts = visibleProducts.length < filteredProducts.length;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f4ff] via-white to-[#f0ebff]">
        <style>{CSS}</style>
        <div className="text-center">
          <div className="text-5xl mb-4">😞</div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Error Loading Products</h2>
          <p className="text-gray-600 mb-6 text-sm">{error}</p>
          <button onClick={fetchData} className="px-5 py-2.5 rounded-xl font-semibold text-white text-sm" style={{ background: T.gP }}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f4ff] via-white to-[#f0ebff] font-body overflow-x-hidden">
      <style>{CSS}</style>

      {/* Track Order Button */}
      <Link
        to="/track-order"
        className="fixed top-20 right-4 z-40 md:right-6 glass-light rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-md hover:shadow-lg transition-all group"
      >
        <Package className="w-4 h-4 text-purple-600" />
        <span className="font-display font-semibold text-gray-900 text-sm hidden sm:inline">Track Order</span>
        <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-0.5 transition-transform hidden sm:block" />
      </Link>

      {/* Hero Section */}
      <HeroSection />

      {/* Search Section */}
      <SearchSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filteredCount={filteredProducts.length}
        totalCount={allProducts.length}
      />

      {/* Filters Sidebar + Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-12">
        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              onPriceChange={handlePriceChange}
              onReset={handleResetFilters}
              productsCount={filteredProducts.length}
              totalProducts={allProducts.length}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <ProductsGridSection
              products={visibleProducts}
              loading={loading}
              onViewDetails={handleViewDetails}
              hasMore={hasMoreProducts}
              onLoadMore={handleLoadMore}
              visibleCount={visibleProducts.length}
              filteredCount={filteredProducts.length}
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default ProductsPage;