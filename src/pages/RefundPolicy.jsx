// src/pages/RefundPolicy.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="flex items-center text-sm text-purple-200 mb-8">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Refund Policy</span>
            </nav>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white/20 p-3 rounded-xl">
                <Shield className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Refund Policy</h1>
                <p className="text-purple-200 text-lg">Transparent and fair policy for our valued customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Important Notice */}
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 rounded-r-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Important Notice</h3>
                <p className="text-gray-700">
                  Since our products are digital, all sales are final. Refunds will only be issued if the product access link or account does not work and our team is unable to fix it.
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Policy Highlights */}
            <div className="lg:col-span-2 space-y-8">
              {/* Refund Eligibility */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Refund Eligibility</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      Refunds are only available if the product access link or account provided does not work
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      Our technical team must verify and confirm that the issue cannot be resolved
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      Refund requests must be made within the specified timeframe
                    </p>
                  </div>
                </div>
              </div>

              {/* Refund Process */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Refund Process Timeline</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 text-purple-600 font-bold w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Contact Support</h3>
                      <p className="text-gray-600">
                        Reach out to our support team within 3 days of purchase if you encounter any issues
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 text-purple-600 font-bold w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Verification</h3>
                      <p className="text-gray-600">
                        Our team will verify the issue and attempt to resolve it
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 text-purple-600 font-bold w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Refund Processing</h3>
                      <p className="text-gray-600">
                        Valid refunds are processed within 5 working days after verification
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-lg p-6 border border-purple-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Mail className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a 
                        href="mailto:Tesladigi@gmail.com" 
                        className="text-purple-600 hover:text-purple-700 font-medium"
                      >
                        Tesladigi@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Phone className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone/WhatsApp</p>
                      <a 
                        href="tel:+923446969962" 
                        className="text-purple-600 hover:text-purple-700 font-medium"
                      >
                        +92 344 696 9962
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Response Time</p>
                      <p className="text-gray-900 font-medium">24-48 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Dates */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Important Timeframes</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Refund Request</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      Within 3 days
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Verification</span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      1-2 days
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Refund Processing</span>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                      5 working days
                    </span>
                  </div>
                </div>
              </div>

              {/* Non-Refundable */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Non-Refundable</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Change of mind or decision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Incomplete usage of product</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Failure to follow instructions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Purchased by mistake</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I get a refund if I change my mind?</h3>
                <p className="text-gray-600">
                  No, since our products are digital and delivered instantly, we do not offer refunds for change of mind or accidental purchases.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What if the product doesn't work?</h3>
                <p className="text-gray-600">
                  Contact us immediately at Tesladigi@gmail.com or +92 3446969962 within 3 days. Our team will try to fix the issue. If unresolved, you may be eligible for a refund.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does refund processing take?</h3>
                <p className="text-gray-600">
                  Once approved, refunds are processed within 5 working days. The time it takes for the funds to appear in your account depends on your bank or payment method.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I transfer my purchase to someone else?</h3>
                <p className="text-gray-600">
                  No, digital product licenses are non-transferable and tied to the original purchaser's information.
                </p>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-200 transition-all"
              >
                Browse Products
              </Link>
              <a
                href="mailto:Tesladigi@gmail.com"
                className="inline-flex items-center justify-center bg-white text-purple-600 border-2 border-purple-200 px-8 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all"
              >
                Contact Support
              </a>
            </div>
            <p className="text-gray-500 mt-4 text-sm">
              Last updated: January 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;