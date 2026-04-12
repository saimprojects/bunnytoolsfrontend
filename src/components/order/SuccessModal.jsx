// src/components/order/SuccessModal.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Copy, Check, ArrowRight } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose, orderData }) => {
  const [copied, setCopied] = React.useState(false);

  // Debug log to check what data is received
  React.useEffect(() => {
    if (orderData) {
      console.log('📦 Order Data received in SuccessModal:', orderData);
      console.log('🆔 Order ID:', orderData.id);
    }
  }, [orderData]);

  const copyOrderId = () => {
    if (orderData?.id) {
      navigator.clipboard?.writeText(orderData.id.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl border border-purple-100">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          
          <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">Order Placed! 🎉</h3>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully. We'll verify your payment and activate your order soon.
          </p>
          
          {orderData && orderData.id ? (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 mb-6 border border-purple-100">
              <p className="text-sm text-gray-600 mb-2">Your Order ID:</p>
              <div className="flex items-center justify-center gap-2">
                <p className="font-mono text-2xl font-bold text-purple-600">
                  #{orderData.id}
                </p>
                <button
                  onClick={copyOrderId}
                  className="p-2 hover:bg-purple-100 rounded-xl transition-colors"
                  title="Copy Order ID"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Save this ID to track your order
              </p>
            </div>
          ) : (
            <div className="bg-yellow-50 rounded-2xl p-5 mb-6 border border-yellow-200">
              <p className="text-yellow-800 text-sm">
                Order created! Check your email for details.
              </p>
            </div>
          )}
          
          <div className="space-y-3">
            <Link
              to="/track-order"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3.5 rounded-xl font-display font-semibold hover:shadow-lg transition-all"
            >
              Track Your Order
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={onClose}
              className="w-full border-2 border-gray-200 text-gray-700 py-3.5 rounded-xl font-display font-semibold hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
          
          <p className="text-xs text-gray-400 mt-4">
            {orderData?.customer_email && `A confirmation has been sent to ${orderData.customer_email}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;