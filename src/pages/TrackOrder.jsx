// 📁 src/pages/TrackOrder.jsx - Premium 3D Design (Fixed)
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Package, Clock, CheckCircle, XCircle, AlertCircle,
  ArrowRight, Sparkles, Shield, Receipt, User, Mail, Phone,
  CreditCard, Building2, Calendar, ChevronRight, ExternalLink  // ✅ ExternalLink added
} from 'lucide-react';
import { trackOrderById, trackOrdersByEmail } from '../api/api';

// ─── THEME TOKENS ─────────────────────────────────────────────────────────────
const T = {
  p: '#7c3aed',
  pl: '#a78bfa',
  gP: 'linear-gradient(135deg,#7c3aed,#a855f7)',
};

// ─── CSS ANIMATIONS ────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@500;600;700&family=Cabinet+Grotesk:wght@400;500;700;800&family=Fira+Code:wght@400;500&display=swap');

@keyframes float-y { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
@keyframes gradient-x { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
@keyframes blob-morph {
  0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}
  50%{border-radius:50% 60% 30% 60%/40% 50% 60% 50%}
}

.font-display { font-family:'Clash Display',sans-serif; }
.font-body { font-family:'Cabinet Grotesk',sans-serif; }
.font-mono { font-family:'Fira Code',monospace; }

.glass-light {
  background: rgba(255,255,255,.65);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(124,58,237,.1);
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

const Blob = ({ color = 'rgba(124,58,237,.06)', size = 400, style = {} }) => (
  <div className="absolute pointer-events-none" style={{
    width: size, height: size,
    background: `radial-gradient(ellipse,${color},transparent 70%)`,
    animation: 'blob-morph 14s ease-in-out infinite',
    filter: 'blur(60px)', ...style,
  }} />
);

const TrackOrder = () => {
  const [searchType, setSearchType] = useState('id');
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const getStatusBadge = (status) => {
    const badges = {
      'PENDING': { color: 'bg-yellow-100 text-yellow-700 border-yellow-300', icon: Clock, label: 'Pending Verification' },
      'PROCESSING': { color: 'bg-blue-100 text-blue-700 border-blue-300', icon: Package, label: 'Processing' },
      'COMPLETED': { color: 'bg-green-100 text-green-700 border-green-300', icon: CheckCircle, label: 'Completed' },
      'CANCELLED': { color: 'bg-red-100 text-red-700 border-red-300', icon: XCircle, label: 'Cancelled' }
    };
    
    const badge = badges[status] || badges['PENDING'];
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${badge.color}`}>
        <Icon className="w-3.5 h-3.5" />
        {badge.label}
      </span>
    );
  };

  const getStatusSteps = (status) => {
    const steps = ['PENDING', 'PROCESSING', 'COMPLETED'];
    const currentIndex = steps.indexOf(status);
    
    return (
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                i <= currentIndex 
                  ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {i + 1}
              </div>
              <span className={`text-[10px] font-mono mt-1 ${i <= currentIndex ? 'text-purple-600' : 'text-gray-400'}`}>
                {step === 'PENDING' ? 'Pending' : step === 'PROCESSING' ? 'Processing' : 'Completed'}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 flex-1 mx-2 ${i < currentIndex ? 'bg-purple-400' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchValue.trim()) {
      setError('Please enter a value to search');
      return;
    }
    
    setLoading(true);
    setError(null);
    setOrderData(null);
    setSearched(true);
    
    try {
      let data;
      if (searchType === 'id') {
        console.log('🔍 Tracking by ID:', searchValue);
        data = await trackOrderById(searchValue);
        console.log('📦 Order data received:', data);
        setOrderData(Array.isArray(data) ? data : [data]);
      } else {
        console.log('🔍 Tracking by Email:', searchValue);
        data = await trackOrdersByEmail(searchValue);
        console.log('📦 Orders data received:', data);
        setOrderData(data);
      }
      
      if (!data || data.length === 0) {
        setError('No orders found. Please check your Order ID or Email and try again.');
      }
    } catch (err) {
      console.error('❌ Track order error:', err);
      setError(err.message || 'Failed to track order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f4ff] via-white to-[#f0ebff] font-body overflow-x-hidden">
      <style>{CSS}</style>
      
      <Blob color="rgba(124,58,237,.06)" size={500} style={{ top: '-5%', left: '-5%' }} />
      <Blob color="rgba(168,85,247,.04)" size={400} style={{ bottom: '10%', right: '-5%' }} />

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-4">
            <Package className="w-4 h-4 text-purple-500" />
            <span className="font-mono text-xs tracking-widest uppercase text-purple-600">Order Tracking</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Track Your <span className="text-gradient-p">Order</span>
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Enter your Order ID or Email to check the status of your purchase
          </p>
        </div>
        
        {/* Search Form */}
        <div className="glass-light rounded-3xl p-6 md:p-8 mb-8">
          <form onSubmit={handleSearch}>
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => setSearchType('id')}
                className={`flex-1 py-3 rounded-xl font-display font-semibold transition-all ${
                  searchType === 'id'
                    ? 'text-white shadow-lg'
                    : 'bg-white/50 text-gray-600 hover:bg-white/80'
                }`}
                style={searchType === 'id' ? { background: T.gP } : {}}
              >
                <Receipt className="w-4 h-4 inline mr-2" />
                Order ID
              </button>
              <button
                type="button"
                onClick={() => setSearchType('email')}
                className={`flex-1 py-3 rounded-xl font-display font-semibold transition-all ${
                  searchType === 'email'
                    ? 'text-white shadow-lg'
                    : 'bg-white/50 text-gray-600 hover:bg-white/80'
                }`}
                style={searchType === 'email' ? { background: T.gP } : {}}
              >
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </button>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={searchType === 'email' ? 'email' : 'text'}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={searchType === 'id' ? 'Enter your Order ID (e.g., 123)' : 'Enter your email address'}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/80 backdrop-blur-sm border border-purple-100 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 rounded-2xl font-display font-semibold text-white transition-all hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
                style={{ background: T.gP }}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <span>Track</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Error Message */}
        {error && searched && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-800 mb-1">No Results Found</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Order Results */}
        {orderData && orderData.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-gray-900">
                Found {orderData.length} Order{orderData.length > 1 ? 's' : ''}
              </h2>
              {searchType === 'email' && (
                <span className="font-mono text-xs text-gray-500">{searchValue}</span>
              )}
            </div>
            
            {orderData.map((order) => (
              <div key={order.id} className="glass-light rounded-2xl p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-2xl font-bold text-gray-900">
                        Order #{order.id}
                      </h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="font-mono text-xs text-gray-500 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                
                {/* Status Steps */}
                {getStatusSteps(order.status)}
                
                {/* Order Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  {/* Customer Info */}
                  <div className="bg-white/50 rounded-xl p-5">
                    <h4 className="font-display font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <User className="w-4 h-4 text-purple-500" />
                      Customer Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2">
                        <span className="text-gray-500 w-20">Name:</span>
                        <span className="font-medium text-gray-900">{order.customer_name}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-gray-500 w-20">Email:</span>
                        <span className="font-medium text-gray-900">{order.customer_email}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-gray-500 w-20">Phone:</span>
                        <span className="font-medium text-gray-900">{order.customer_phone}</span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="bg-white/50 rounded-xl p-5">
                    <h4 className="font-display font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Package className="w-4 h-4 text-purple-500" />
                      Product Details
                    </h4>
                    <div className="space-y-2">
                      <p className="font-medium text-gray-900">{order.product_details?.title || 'Product'}</p>
                      {order.plan_details && (
                        <p className="text-sm text-gray-600">
                          Plan: {order.plan_details.title} ({order.plan_details.duration_months} month{order.plan_details.duration_months > 1 ? 's' : ''})
                        </p>
                      )}
                      <p className="text-xl font-display font-bold text-purple-600 mt-3">
                        Rs. {order.amount}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Payment Info */}
                <div className="mt-4 bg-white/50 rounded-xl p-5">
                  <h4 className="font-display font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-purple-500" />
                    Payment Information
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Bank</p>
                      <p className="font-medium text-gray-900 flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-gray-400" />
                        {order.bank_account_details?.bank_name_display || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Transaction ID</p>
                      <p className="font-mono text-sm text-gray-900">{order.transaction_id}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Payment Proof</p>
                      {order.payment_proof_url ? (
                        <a 
                          href={order.payment_proof_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-purple-600 hover:text-purple-700 text-sm flex items-center gap-1"
                        >
                          View Screenshot 
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm">Uploaded</span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Admin Notes */}
                {order.admin_notes && (
                  <div className="mt-4 bg-purple-50 rounded-xl p-4 border border-purple-200">
                    <p className="text-sm text-purple-800">
                      <span className="font-semibold">📝 Note from team:</span> {order.admin_notes}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* No Results Yet */}
        {!searched && !loading && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-purple-400" />
            </div>
            <h3 className="font-display text-xl font-bold text-gray-900 mb-2">Track Your Order</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Enter your Order ID or Email above to check the status of your purchase
            </p>
          </div>
        )}
        
        {/* Help Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">Need help with your order?</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold border-2 border-purple-200 text-purple-600 hover:bg-purple-50 transition-all"
          >
            <Shield className="w-4 h-4" />
            Contact Support
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;