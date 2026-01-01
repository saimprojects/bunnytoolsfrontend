// src/components/home/Hero.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Download, Shield, Zap, Cpu } from 'lucide-react';

const Hero = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    { icon: Download, text: 'Instant Digital Delivery' },
    { icon: Shield, text: 'Lifetime License & Updates' },
    { icon: Zap, text: '24/7 Premium Support' },
  ];

  // Image URLs
  const softwareImages = [
    'https://res.cloudinary.com/dxommxt6d/image/upload/v1767184269/znxburenjudygfdmpzxw.webp',
    'https://res.cloudinary.com/dxommxt6d/image/upload/v1767184555/zmrqvw7txeztmhimo7o4.webp',
    'https://res.cloudinary.com/dxommxt6d/image/upload/v1767186255/fen2w8dlushcthzqnmtt.png'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Purple Gradient Blobs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-4 lg:px-8 py-16 md:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-yellow-50 px-4 py-2 rounded-full border border-purple-100">
              <div className="h-2 w-2 bg-brand-yellow rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-brand-purple">Premium Tools Subscriptions</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Premium Digital
              <span className="block">
                <span className="relative">
                  <span className="relative z-10">Tools Subscriptions</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-brand-yellow opacity-30 -rotate-1"></span>
                </span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 max-w-lg">
              Discover cutting-edge software tools, Subscriptions, premium digital products, 
              and expert solutions. Everything you need to boost your productivity 
              and business growth.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/products"
                className="group relative bg-gradient-to-r from-brand-purple to-brand-purple-light text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-200 transition-all duration-300 inline-flex items-center justify-center"
              >
                <span>Browse Tools</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-purple to-brand-purple-light rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              </Link>
              
            </div>

            {/* Features */}
            <div className="pt-8">
              <div className="flex flex-wrap gap-4 mb-6">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      currentFeature === index 
                        ? 'bg-white shadow-lg border border-purple-100' 
                        : 'opacity-70'
                    }`}
                  >
                    <feature.icon className={`w-5 h-5 ${
                      currentFeature === index ? 'text-brand-purple' : 'text-gray-400'
                    }`} />
                    <span className={`font-medium ${
                      currentFeature === index ? 'text-gray-900' : 'text-gray-600'
                    }`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Stats */}
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-purple">1000+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-purple">50+</div>
                  <div className="text-sm text-gray-600">Premium Tools</div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-purple">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Software Showcase */}
          <div className="relative">
            {/* Main Software Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple to-purple-900"></div>
              <div className="relative p-8">
                <div className="text-white mb-6">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 mb-4">
                    <span className="text-sm">Featured Tools</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Bunny Pro Suite</h3>
                  <p className="text-purple-200">Complete Subscripitions bundle for maximum productivity</p>
                </div>
                
                {/* Software Features with Images */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {softwareImages.map((imageUrl, index) => (
                      <div key={index} className="bg-white/20 rounded-lg p-3">
                        <div className="h-20 bg-white/30 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                          <img 
                            src={imageUrl} 
                            alt={`Software feature ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="h-2 bg-white/40 rounded w-3/4 mx-auto"></div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-white">Rs. 999</div>
                      <div className="text-sm text-purple-200 line-through">Rs. 899</div>
                    </div>
                    <button className="bg-white text-brand-purple px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-brand-yellow text-white p-3 rounded-xl shadow-lg animate-bounce-slow">
                <div className="text-center">
                  <div className="text-xs">SAVE</div>
                  <div className="text-lg font-bold">30%</div>
                </div>
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 w-56">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Instant Download</div>
                  <div className="text-sm text-gray-600">Get Access immediately</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 w-56">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Lifetime Updates</div>
                  <div className="text-sm text-gray-600">Free updates forever</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;