// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/home/hero';
import ProductCard from '../components/products/ProductCard';
import Testimonials from '../components/home/Testimonials';
import { getProducts } from '../api/api';
import { 
  Sparkles, 
  TrendingUp, 
  Star, 
  Download, 
  Shield, 
  Zap, 
  Cpu,
  Clock,
  CheckCircle
} from 'lucide-react';

const HomePage = () => {
  const [featuredSoftwares, setFeaturedSoftwares] = useState([]);
  const [trendingSoftwares, setTrendingSoftwares] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSoftwares();
  }, []);

  const fetchSoftwares = async () => {
    try {
      setLoading(true);
      const products = await getProducts();
      
      // Featured software (first 4)
      const featured = products.slice(0, 4);
      
      // Trending software (next 4)
      const trending = products.slice(4, 8);
      
      // New releases (next 4)
      const newRelease = products.slice(8, 12);
      
      setFeaturedSoftwares(featured);
      setTrendingSoftwares(trending);
      setNewReleases(newRelease);
    } catch (error) {
      console.error('Error fetching softwares:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Download,
      title: "Instant Download",
      description: "Get software immediately after purchase",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Shield,
      title: "Lifetime License",
      description: "One-time payment, lifetime updates",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Zap,
      title: "Premium Support",
      description: "24/7 technical support included",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Cpu,
      title: "Regular Updates",
      description: "Free lifetime software updates",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const stats = [
    { value: "1000+", label: "Software Sold" },
    { value: "50+", label: "Premium Tools" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <div className="fade-in">
      <Hero />
      
      {/* Featured Software */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-50 border border-purple-100 mb-4">
              <Sparkles className="w-4 h-4 text-brand-purple mr-2" />
              <span className="text-sm font-medium text-brand-purple">Premium Collection</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured <span className="gradient-text">Software Tools</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked premium software solutions that deliver exceptional results
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredSoftwares.map((software) => (
                  <ProductCard key={software.id} product={software} featured={true} />
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link 
                  to="/products" 
                  className="inline-flex items-center bg-gradient-to-r from-brand-purple to-brand-purple-light text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-purple-200 transition-all"
                >
                  <span>View All Software</span>
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Why Choose Bunny Tools */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-brand-purple">Bunny Tools</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide premium digital tools with exceptional quality and support
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-xl transition-shadow hover:-translate-y-1"
              >
                <div className={`h-16 w-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      


      {/* Stats Banner */}
      <section className="py-20 bg-gradient-to-r from-brand-purple to-purple-700">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-purple-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-gradient-to-r from-yellow-50 to-purple-50 rounded-3xl p-8 md:p-12 text-center">
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-white mb-6">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span className="font-medium text-gray-900">Limited Time Offer</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Boost Your Productivity?
            </h2>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Get premium software tools that help you work smarter, not harder. 
              Join thousands of satisfied customers today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products"
                className="group relative bg-gradient-to-r from-brand-purple to-purple-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center"
              >
                <span>Browse All Software</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              
              <Link 
                to="/contact"
                className="border-2 border-brand-purple text-brand-purple px-10 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-colors"
              >
                Get Custom Quote
              </Link>
            </div>
            
            <div className="flex items-center justify-center mt-8 text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-2" />
              <span>All software come with 30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
};

export default HomePage;