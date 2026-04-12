// 📁 src/pages/ProductDetail.jsx - Homepage Theme with 3D Effects
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star,
  ChevronRight,
  BookOpen,
  CheckCircle,
  Check,
  Zap,
  Crown,
  Calendar,
  Shield,
  Sparkles,
  Award,
  Download,
  Clock,
  RefreshCw,
  HeartHandshake,
  ArrowRight
} from 'lucide-react';
import ImageGallery from '../components/products/ImageGallery';
import ReviewList from '../components/products/ReviewList';
import ProductCard from '../components/products/ProductCard';
import { OrderModal, SuccessModal } from '../components/order';
import { getProductById, getBankAccounts } from '../api/api';
import { useProducts } from '../api/hooks/useProducts';

// ─── THEME TOKENS (Homepage se match) ─────────────────────────────────────────
const T = {
  p: '#7c3aed',
  pl: '#a78bfa',
  y: '#f59e0b',
  d: '#0f0a1e',
  dd: '#160d2e',
  g: '#64748b',
  gP: 'linear-gradient(135deg,#7c3aed,#a855f7)',
  gY: 'linear-gradient(135deg,#f59e0b,#fbbf24)',
};

// ─── CSS Animations (Homepage style) ──────────────────────────────────────────
const CSS = `
@keyframes float-y { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes gradient-x { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
@keyframes blob-morph {
  0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}
  50%{border-radius:50% 60% 30% 60%/40% 50% 60% 50%}
}
@keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes pulse-glow { 0%,100%{opacity:.4} 50%{opacity:.8} }

.text-gradient-p {
  background: linear-gradient(90deg,#7c3aed,#a855f7,#c084fc);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-x 4s ease infinite;
}
.text-gradient-y {
  background: linear-gradient(90deg,#f59e0b,#fbbf24,#fcd34d);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-x 4s ease infinite;
}
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
.font-display { font-family:'Clash Display',sans-serif; }
.font-body { font-family:'Cabinet Grotesk',sans-serif; }
.font-mono { font-family:'Fira Code',monospace; }
`;

// Helper functions for plan decoding
const decodePlanCode = (code) => {
  if (!code && code !== 0) return null;
  const codeStr = code.toString().trim();
  if (codeStr.length < 3) {
    const months = parseInt(codeStr, 10);
    if (isNaN(months) || months <= 0) return { type: 'Monthly', unit: 'month', quantity: 1 };
    return { type: 'Monthly', unit: 'month', quantity: months };
  }
  if (codeStr.startsWith('100')) {
    const quantity = parseInt(codeStr.substring(3), 10);
    if (isNaN(quantity) || quantity <= 0) return { type: 'Daily', unit: 'day', quantity: 30 };
    return { type: 'Daily', unit: 'day', quantity: quantity };
  }
  if (codeStr.startsWith('200')) {
    const quantity = parseInt(codeStr.substring(3), 10);
    if (isNaN(quantity) || quantity <= 0) return { type: 'Yearly', unit: 'year', quantity: 1 };
    return { type: 'Yearly', unit: 'year', quantity: quantity };
  }
  const allNumber = parseInt(codeStr, 10);
  if (!isNaN(allNumber) && allNumber > 0) return { type: 'Monthly', unit: 'month', quantity: allNumber };
  return { type: 'Monthly', unit: 'month', quantity: 1 };
};

const formatPlanDisplay = (plan) => {
  if (!plan) return { displayText: '', isDaily: false, isYearly: false, quantity: 0 };
  let durationValue = plan.duration_months || plan.duration || plan.duration_code;
  if (!durationValue) return { displayText: '1 month', isDaily: false, isYearly: false, quantity: 1 };
  const decoded = decodePlanCode(durationValue);
  if (!decoded) return { displayText: '1 month', isDaily: false, isYearly: false, quantity: 1 };
  const { type, unit, quantity } = decoded;
  return {
    displayText: `${quantity} ${unit}${quantity > 1 ? 's' : ''}`,
    isDaily: type === 'Daily',
    isYearly: type === 'Yearly',
    quantity: quantity
  };
};

// ─── 3D Tilt Card Component ───────────────────────────────────────────────────
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
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
    card.style.transition = 'transform 0.1s ease-out';
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
  };
  
  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transform-gpu ${className}`}
    >
      {children}
    </div>
  );
};

// ─── Blob Background Component ─────────────────────────────────────────────────
const Blob = ({ color = 'rgba(124,58,237,.08)', size = 300, style = {} }) => {
  return (
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
};

// ─── Reveal Animation Component ────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        opacity: isVisible ? 1 : 0,
        transition: `all .8s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// ─── MAIN PRODUCT DETAIL COMPONENT ─────────────────────────────────────────────
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [bankLoading, setBankLoading] = useState(true);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [orderResponse, setOrderResponse] = useState(null);
  
  const { products: allProducts } = useProducts();

  useEffect(() => {
    fetchProduct();
    fetchBankAccounts();
  }, [id]);

  useEffect(() => {
    if (product && allProducts.length > 0) {
      const related = allProducts.filter(p => p.id !== product.id).slice(0, 4);
      setRelatedProducts(related);
    }
  }, [product, allProducts]);

  useEffect(() => {
    if (product?.plans && product.plans.length > 0) {
      const defaultPlan = product.plans.find(p => p.is_active !== false) || product.plans[0];
      setSelectedPlan(defaultPlan);
    }
  }, [product]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProductById(id);
      if (data.plans && data.plans.length > 0) {
        data.plans = data.plans.map((plan) => ({
          ...plan,
          displayInfo: formatPlanDisplay(plan)
        }));
      }
      setProduct(data);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err.message || 'Product not found');
    } finally {
      setLoading(false);
    }
  };

  const fetchBankAccounts = async () => {
    try {
      setBankLoading(true);
      const accounts = await getBankAccounts();
      const activeAccounts = accounts.filter(acc => acc.is_active);
      setBankAccounts(activeAccounts);
    } catch (error) {
      console.error('Error fetching bank accounts:', error);
      setBankAccounts([]);
    } finally {
      setBankLoading(false);
    }
  };

  const handlePurchase = () => {
    if (!selectedPlan) {
      alert('Please select a plan first');
      return;
    }
    if (bankAccounts.length === 0) {
      alert('No payment methods available. Please try again later or contact support.');
      return;
    }
    setIsOrderModalOpen(true);
  };

  const handleOrderSubmit = (response) => {
    setOrderResponse(response);
    setIsSuccessModalOpen(true);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const getPlanIcon = (plan) => {
    const displayInfo = plan.displayInfo || formatPlanDisplay(plan);
    if (displayInfo.isDaily) return Zap;
    if (displayInfo.isYearly) return Crown;
    return Calendar;
  };

  const getPlanColor = (displayInfo) => {
    if (displayInfo.isDaily) return '#f59e0b';
    if (displayInfo.isYearly) return '#7c3aed';
    return '#3b82f6';
  };

  const getPlanGradient = (displayInfo) => {
    if (displayInfo.isDaily) return 'from-amber-400 to-orange-500';
    if (displayInfo.isYearly) return 'from-purple-500 to-violet-600';
    return 'from-blue-500 to-cyan-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f4ff] via-white to-[#f0ebff]">
        <style>{CSS}</style>
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse space-y-8">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-20 bg-purple-200/50 rounded-full"></div>
              <ChevronRight className="w-4 h-4 text-purple-300" />
              <div className="h-4 w-40 bg-purple-200/50 rounded-full"></div>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="h-[500px] bg-purple-100/30 rounded-3xl backdrop-blur-sm"></div>
              <div className="space-y-6">
                <div className="h-10 bg-purple-200/50 rounded-2xl w-3/4"></div>
                <div className="h-6 bg-purple-200/50 rounded-full w-40"></div>
                <div className="h-32 bg-purple-100/30 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f4ff] via-white to-[#f0ebff] flex items-center justify-center px-4">
        <style>{CSS}</style>
        <div className="max-w-md w-full">
          <div className="glass-light rounded-3xl p-8 text-center">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                 style={{ background: 'rgba(124,58,237,.15)', color: T.p }}>
              <span className="text-4xl">😔</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
            <p className="text-gray-600 mb-8">{error || "The product you're looking for doesn't exist."}</p>
            <Link 
              to="/products"
              className="inline-flex items-center justify-center w-full gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-xl"
              style={{ background: T.gP }}
            >
              Browse Products
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const displayInfo = selectedPlan ? (selectedPlan.displayInfo || formatPlanDisplay(selectedPlan)) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f4ff] via-white to-[#f0ebff] font-body overflow-x-hidden">
      <style>{CSS}</style>
      
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <Blob color="rgba(124,58,237,.06)" size={450} style={{ top: '5%', left: '-5%' }} />
        <Blob color="rgba(168,85,247,.05)" size={500} style={{ bottom: '10%', right: '-8%' }} />
        <Blob color="rgba(245,158,11,.04)" size={350} style={{ top: '40%', right: '15%' }} />
      </div>

      {/* Breadcrumb - Glass Style */}
      <div className="relative z-10 border-b border-purple-100/50 glass-light">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-purple-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <Link to="/products" className="text-gray-500 hover:text-purple-600 transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="font-medium text-gray-900 truncate">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Left Column - Image Gallery with 3D Tilt */}
          <div>
            <div className="sticky top-24">
              <TiltCard className="rounded-3xl shadow-2xl shadow-purple-200/30">
                <div className="glass-light rounded-3xl overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <ImageGallery images={product.images} />
                  ) : (
                    <div className="bg-gradient-to-br from-purple-100/50 to-violet-100/50 rounded-3xl h-[500px] flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float"
                             style={{ background: T.gP }}>
                          <BookOpen className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">Preview Not Available</h3>
                        <p className="text-gray-500">Contact us for more details</p>
                      </div>
                    </div>
                  )}
                </div>
              </TiltCard>
              
              {/* Trust Badges - Glass Cards */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { icon: Shield, text: 'Secure', color: '#10b981' },
                  { icon: RefreshCw, text: '30-Day', color: '#3b82f6' },
                  { icon: Award, text: 'Verified', color: '#7c3aed' }
                ].map((badge, i) => (
                  <div 
                    key={i} 
                    className="glass-light rounded-2xl p-3 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
                         style={{ background: `${badge.color}15`, color: badge.color }}>
                      <badge.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs text-gray-700 font-semibold">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div>
            {/* Categories Tags */}
            <Reveal>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.categories?.map(category => (
                  <Link
                    key={category.id}
                    to={`/products?category=${category.id}`}
                    className="px-4 py-1.5 glass-light text-purple-700 text-sm rounded-full font-medium hover:shadow-md transition-all"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </Reveal>

            {/* Title */}
            <Reveal delay={0.05}>
              <h1 className="font-display text-3xl lg:text-4xl font-bold mb-4 leading-tight text-gray-900">
                {product.title}
              </h1>
            </Reveal>
            
            {/* Rating & Meta */}
            <Reveal delay={0.1}>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600 font-medium">4.8 (128 reviews)</span>
                </div>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  Premium Product
                </span>
              </div>
            </Reveal>

            {/* Plan Selection Cards */}
            {product.plans && product.plans.length > 0 && (
              <div className="mb-8">
                <Reveal delay={0.15}>
                  <h3 className="font-display text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                         style={{ background: T.gP }}>
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    Select Your License
                  </h3>
                </Reveal>
                
                <div className="grid gap-4">
                  {product.plans.map((plan, index) => {
                    const planDisplayInfo = plan.displayInfo || formatPlanDisplay(plan);
                    const PlanIcon = getPlanIcon(plan);
                    const isSelected = selectedPlan?.id === plan.id;
                    const isPopular = planDisplayInfo.isYearly;
                    const gradient = getPlanGradient(planDisplayInfo);
                    const planColor = getPlanColor(planDisplayInfo);
                    
                    return (
                      <Reveal key={plan.id} delay={0.2 + index * 0.05}>
                        <TiltCard>
                          <div
                            onClick={() => handlePlanSelect(plan)}
                            className={`relative cursor-pointer rounded-2xl border-2 p-5 transition-all duration-300 ${
                              isSelected 
                                ? 'border-purple-400 bg-gradient-to-r from-purple-50/90 to-white/90 shadow-xl shadow-purple-200/50 scale-[1.02]' 
                                : 'glass-light hover:border-purple-300 hover:shadow-lg'
                            }`}
                          >
                            {isPopular && (
                              <div className="absolute -top-3 left-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-4 py-1.5 rounded-full font-bold shadow-lg shadow-amber-200">
                                ⭐ MOST POPULAR
                              </div>
                            )}
                            
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradient} shadow-md ${isSelected ? 'scale-110' : ''} transition-transform`}>
                                    <PlanIcon className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <h4 className="font-display font-bold text-lg text-gray-900">{plan.title}</h4>
                                    <p className="text-sm text-gray-500">{planDisplayInfo.displayText} access</p>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-display text-2xl font-bold text-gray-900">
                                  Rs. {plan.price}
                                </div>
                                {isSelected && (
                                  <div className="w-6 h-6 rounded-full flex items-center justify-center ml-auto mt-1 shadow-md"
                                       style={{ background: T.gP }}>
                                    <Check className="w-4 h-4 text-white" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </TiltCard>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Checkout Card */}
            {selectedPlan && displayInfo && (
              <Reveal delay={0.3}>
                <TiltCard>
                  <div className="glass-light rounded-3xl p-6 mb-8 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-1 font-mono">Total Amount</p>
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-4xl font-bold text-gradient-p">
                            Rs. {selectedPlan.price}
                          </span>
                          <span className="text-sm text-gray-400 line-through">Rs. {selectedPlan.price * 1.5}</span>
                        </div>
                      </div>
                      <div className="px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg animate-pulse"
                           style={{ background: 'linear-gradient(135deg,#10b981,#34d399)' }}>
                        Save 33%
                      </div>
                    </div>
                    
                    <button
                      onClick={handlePurchase}
                      disabled={bankLoading}
                      className={`w-full py-4 rounded-2xl font-display font-bold text-lg text-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 ${
                        bankLoading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                      style={{ background: T.gP }}
                    >
                      {bankLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Loading...
                        </>
                      ) : (
                        <>
                          Proceed to Payment
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                    
                    <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
                      <Shield className="w-3 h-3" />
                      Secure checkout · Instant activation
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            )}

            {/* Features List */}
            <Reveal delay={0.35}>
              <div className="glass-light rounded-3xl p-6 mb-8">
                <h3 className="font-display font-semibold text-gray-900 mb-4">What's Included</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { text: 'Lifetime Updates', color: '#10b981' },
                    { text: 'Premium Support', color: '#3b82f6' },
                    { text: 'All Features', color: '#7c3aed' },
                    { text: 'Unlimited Usage', color: '#f59e0b' }
                  ].map((feature, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-3 p-3 rounded-xl hover:scale-105 transition-transform duration-300"
                      style={{ background: 'rgba(255,255,255,.5)' }}
                    >
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center shadow-md"
                           style={{ background: feature.color }}>
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Description Section */}
        <Reveal delay={0.2}>
          <div className="mt-16 glass-light rounded-3xl p-8">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                   style={{ background: 'linear-gradient(135deg,#3b82f6,#06b6d4)' }}>
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              Product Description
            </h2>
            <div 
              className="prose prose-lg max-w-none text-gray-600"
              dangerouslySetInnerHTML={{ __html: product.description || '' }}
            />
          </div>
        </Reveal>

        {/* Reviews Section */}
        <Reveal delay={0.25}>
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-gray-900">Customer Reviews</h2>
              <Link to={`/product/${id}/reviews`} className="text-purple-600 hover:text-purple-700 font-medium">
                View All →
              </Link>
            </div>
            
            <div className="glass-light rounded-3xl p-8">
              {product.reviews && product.reviews.length > 0 ? (
                <ReviewList reviews={product.reviews} />
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                       style={{ background: 'rgba(124,58,237,.15)' }}>
                    <Star className="w-8 h-8" style={{ color: T.p }} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
                  <p className="text-gray-500 mb-6">Be the first to share your experience!</p>
                  <button className="px-6 py-2 rounded-xl font-medium text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                          style={{ background: T.gP }}>
                    Write a Review
                  </button>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <Reveal delay={0.3}>
            <div className="mt-16 mb-12">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>

      {/* Order Modals */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={product}
        selectedPlan={selectedPlan}
        bankAccounts={bankAccounts}
        onSuccess={handleOrderSubmit}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          navigate('/products');
        }}
        orderData={orderResponse}
      />
    </div>
  );
};

export default ProductDetail;