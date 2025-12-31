// src/pages/ContactPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Send, 
  ArrowRight, 
  Star, 
  Shield,
  Zap,
  Clock,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  ExternalLink
} from 'lucide-react';
import { getWhatsAppNumber } from '../api/api';

const ContactPage = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    fetchWhatsAppNumber();
    
    // Auto rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchWhatsAppNumber = async () => {
    try {
      setIsLoading(true);
      const number = await getWhatsAppNumber();
      setWhatsappNumber(number);
    } catch (error) {
      console.error('Error fetching WhatsApp number:', error);
      setWhatsappNumber('+923001234567'); // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Shield,
      title: 'Instant Support',
      description: 'Get immediate responses to your queries'
    },
    {
      icon: Zap,
      title: 'Quick Quotations',
      description: 'Receive price quotes within minutes'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'We\'re always here to help you'
    },
    {
      icon: Star,
      title: 'Expert Advice',
      description: 'Get guidance from software experts'
    }
  ];

  const handleWhatsAppClick = () => {
    if (!whatsappNumber) {
      alert('WhatsApp number is not available. Please try again.');
      return;
    }

    const defaultMessage = message || "Hello Bunny Tools! I'm interested in your software products and would like more information.";
    const encodedMessage = encodeURIComponent(defaultMessage);
    const url = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodedMessage}`;
    
    window.open(url, '_blank');
  };

  const handleCopyNumber = () => {
    if (!whatsappNumber) return;
    
    navigator.clipboard.writeText(whatsappNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactMethods = [
    {
      title: 'WhatsApp Chat',
      description: 'Fastest way to get support',
      action: 'Chat Now',
      color: 'from-green-500 to-green-600',
      onClick: handleWhatsAppClick
    },
    {
      title: 'Email Support',
      description: 'For detailed inquiries',
      action: 'Send Email',
      color: 'from-blue-500 to-blue-600',
      onClick: () => window.location.href = 'mailto:support@bunnytools.com'
    },
    {
      title: 'Phone Call',
      description: 'For urgent matters',
      action: 'Call Now',
      color: 'from-purple-500 to-purple-600',
      onClick: () => window.location.href = 'tel:+923001234567'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating Arrows */}
        <div className="absolute top-10 left-10 animate-float">
          <ChevronRight className="w-12 h-12 text-purple-200 transform rotate-45" />
        </div>
        <div className="absolute top-20 right-20 animate-float" style={{ animationDelay: '0.5s' }}>
          <ChevronLeft className="w-16 h-16 text-orange-200 transform -rotate-45" />
        </div>
        <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '1s' }}>
          <ChevronRight className="w-14 h-14 text-blue-200 transform rotate-90" />
        </div>
        <div className="absolute bottom-10 right-10 animate-float" style={{ animationDelay: '1.5s' }}>
          <ChevronLeft className="w-10 h-10 text-green-200 transform -rotate-90" />
        </div>
        <div className="absolute top-1/2 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
          <ChevronRight className="w-8 h-8 text-yellow-200" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float" style={{ animationDelay: '2.5s' }}>
          <ChevronLeft className="w-12 h-12 text-pink-200" />
        </div>

        {/* Gradient Blobs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-50 to-purple-50 border border-orange-100 mb-6">
            <MessageCircle className="w-5 h-5 text-orange-500 mr-2" />
            <span className="text-sm font-medium text-orange-700">Instant Support</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with us instantly via WhatsApp for quick support, 
            quotations, and expert advice about our premium software tools.
          </p>
        </div>

        {/* Main WhatsApp Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl border-2 border-gray-200 shadow-2xl p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left Side - WhatsApp Info */}
              <div className="lg:w-1/2">
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">WhatsApp Support</h2>
                      <p className="text-gray-600">Fastest way to reach us</p>
                    </div>
                  </div>

                  {/* WhatsApp Number Display */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Our WhatsApp Number
                    </label>
                    <div className="flex items-center">
                      {isLoading ? (
                        <div className="animate-pulse bg-gray-200 h-12 w-64 rounded-xl"></div>
                      ) : (
                        <>
                          <div className="flex-1 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-300 rounded-xl px-6 py-3 text-lg font-mono">
                            {whatsappNumber}
                          </div>
                          <button
                            onClick={handleCopyNumber}
                            className="ml-4 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-medium hover:shadow-lg transition-shadow"
                          >
                            {copied ? 'Copied!' : 'Copy'}
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message (Optional)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows="4"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      placeholder="Type your message here... (You can also type directly in WhatsApp)"
                    />
                    <div className="text-sm text-gray-500 mt-2">
                      You can edit this message in WhatsApp after opening
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-4 rounded-xl transition-all duration-300 ${
                        activeFeature === index
                          ? 'bg-gradient-to-r from-green-50 to-white border-2 border-green-100 shadow-md'
                          : 'bg-gray-50'
                      }`}
                    >
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center mr-4 ${
                        activeFeature === index
                          ? 'bg-gradient-to-r from-green-500 to-green-600'
                          : 'bg-gray-200'
                      }`}>
                        <feature.icon className={`w-5 h-5 ${
                          activeFeature === index ? 'text-white' : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - WhatsApp Button */}
              <div className="lg:w-1/2">
                <div className="relative">
                  {/* Center WhatsApp Button */}
                  <div className="flex flex-col items-center justify-center">
                    {/* Pulsing Ring Effect */}
                    <div className="relative mb-8">
                      <div className="absolute -inset-8 bg-green-500 rounded-full opacity-20 animate-ping"></div>
                      <div className="absolute -inset-4 bg-green-400 rounded-full opacity-30 animate-pulse"></div>
                      
                      {/* Main WhatsApp Button */}
                      <button
                        onClick={handleWhatsAppClick}
                        disabled={isLoading || !whatsappNumber}
                        className="relative group"
                      >
                        <div className="h-48 w-48 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-2xl flex flex-col items-center justify-center hover:shadow-3xl hover:scale-105 transition-all duration-500">
                          <MessageCircle className="w-20 h-20 text-white mb-4" />
                          <span className="text-white text-xl font-bold">Chat on WhatsApp</span>
                          <span className="text-green-100 text-sm mt-2">Click to Open</span>
                        </div>
                        
                        {/* Hover Effect */}
                        <div className="absolute -inset-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                      </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                      <button
                        onClick={() => setMessage("Hello! I need help choosing the right software.")}
                        className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-500 hover:shadow-md transition-all"
                      >
                        <span className="text-sm font-medium text-gray-900">Get Help Choosing</span>
                      </button>
                      <button
                        onClick={() => setMessage("Hello! I'd like a quotation for bulk purchase.")}
                        className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-500 hover:shadow-md transition-all"
                      >
                        <span className="text-sm font-medium text-gray-900">Get Quotation</span>
                      </button>
                    </div>

                    {/* WhatsApp Status */}
                    <div className="mt-8 flex items-center">
                      <div className={`h-3 w-3 rounded-full mr-2 ${whatsappNumber ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                      <span className="text-sm text-gray-600">
                        {isLoading ? 'Loading WhatsApp number...' : 'WhatsApp is available'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Contact Methods */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Other Ways to <span className="gradient-text">Connect</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`h-14 w-14 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mb-6`}>
                  {index === 0 && <MessageCircle className="w-7 h-7 text-white" />}
                  {index === 1 && <Send className="w-7 h-7 text-white" />}
                  {index === 2 && <ExternalLink className="w-7 h-7 text-white" />}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                <p className="text-gray-600 mb-6">{method.description}</p>
                
                <button
                  onClick={method.onClick}
                  className={`w-full py-3 rounded-xl font-bold text-center bg-gradient-to-r ${method.color} text-white hover:shadow-lg transition-shadow`}
                >
                  {method.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  q: "What's the response time on WhatsApp?",
                  a: "We typically respond within 5-10 minutes during business hours (9AM-6PM)."
                },
                {
                  q: "Can I get technical support via WhatsApp?",
                  a: "Yes! Our technical team is available on WhatsApp for instant support."
                },
                {
                  q: "Do you provide custom software solutions?",
                  a: "Absolutely! Contact us via WhatsApp to discuss your custom requirements."
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept bank transfers, credit cards, and EasyPaisa/JazzCash via WhatsApp."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                      <p className="text-gray-600">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <button
                onClick={handleWhatsAppClick}
                className="inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Ask More on WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white mb-6">
            <Zap className="w-5 h-5 mr-2" />
            <span className="font-bold">24/7 Support Available</span>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Need <span className="text-green-600">Immediate</span> Assistance?
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Don't wait! Click the WhatsApp button above to start a conversation with our team right now.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleWhatsAppClick}
              className="group relative bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              <span>Open WhatsApp Now</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={handleCopyNumber}
              className="border-2 border-green-500 text-green-600 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-green-50 transition-colors"
            >
              Copy WhatsApp Number
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;