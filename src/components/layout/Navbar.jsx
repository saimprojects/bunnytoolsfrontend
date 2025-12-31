// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, ChevronDown, Star, Users } from 'lucide-react';
import { getCategories, getWhatsAppNumber } from '../../api/api';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesData, whatsappData] = await Promise.all([
        getCategories(),
        getWhatsAppNumber()
      ]);
      setCategories(categoriesData.slice(0, 5));
      setWhatsappNumber(whatsappData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback WhatsApp number
      setWhatsappNumber('+923001234567');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/products' },
    { name: 'Reviews', path: '/reviews' }, // Added Reviews link
    { name: 'About', path: '/about' },
  ];

  const handleWhatsAppOrder = () => {
    if (!whatsappNumber) {
      alert('WhatsApp number not available. Please try again later.');
      return;
    }

    const message = encodeURIComponent("Hello Bunny Tools! I'm interested in your software products.");
    const url = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`;
    window.open(url, '_blank');
    
    // Optional: Track click event
    if (window.gtag) {
      window.gtag('event', 'whatsapp_navbar_click', {
        'event_category': 'engagement',
        'event_label': 'navbar_whatsapp_button'
      });
    }
  };

  const handleCommunityClick = () => {
    const communityUrl = 'https://chat.whatsapp.com/EJeZt7XL9T3Lt6L9lAJE6k';
    window.open(communityUrl, '_blank');
    
    // Optional: Track click event
    if (window.gtag) {
      window.gtag('event', 'community_click', {
        'event_category': 'engagement',
        'event_label': 'whatsapp_community'
      });
    }
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-xl py-3' : 'bg-white py-4'
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo with Bunny Tools Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative h-12 w-12 rounded-lg overflow-hidden flex items-center justify-center bg-white">
                {/* Bunny Tools Logo */}
                <img 
                  src="https://res.cloudinary.com/dxommxt6d/image/upload/v1767081844/Orange_Modern_Bunny_Boss_Collection_Logo_ziu8tl.png" 
                  alt="Bunny Tools Logo" 
                  className="h-full w-full object-contain p-1"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23F97316'/%3E%3Ctext x='50' y='60' text-anchor='middle' font-size='30' fill='white'%3EBT%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-brand-black tracking-tight">
                <span className="text-orange-500">Bunny</span>
                <span className="text-brand-purple">Tools</span>
              </span>
              <span className="text-xs text-gray-500 -mt-1">Premium Tools Subscription Store</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative font-medium transition-colors duration-200 flex items-center ${
                  location.pathname === link.path
                    ? 'text-brand-purple'
                    : 'text-gray-700 hover:text-brand-purple'
                }`}
              >
                {link.name === 'Reviews' && (
                  <Star className="w-4 h-4 mr-2" />
                )}
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500 rounded-full"></span>
                )}
              </Link>
            ))}
            
            {/* Our Team Button - WhatsApp Community */}
            <button
              onClick={handleCommunityClick}
              className="group relative flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-200 transition-all duration-300"
            >
              <Users className="w-4 h-4" />
              <span>Our Team</span>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            </button>
          </div>

          {/* Action Buttons - Order on WhatsApp only */}
          <div className="hidden lg:flex items-center space-x-4">
            {whatsappNumber ? (
              <button
                onClick={handleWhatsAppOrder}
                className="group relative flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-200 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-green-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              </button>
            ) : (
              <button
                onClick={handleWhatsAppOrder}
                className="group relative flex items-center space-x-2 bg-gradient-to-r from-gray-400 to-gray-500 text-white px-6 py-2.5 rounded-lg font-semibold cursor-not-allowed"
                disabled
              >
                <MessageCircle className="w-4 h-4" />
                <span>Loading...</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-700 hover:text-brand-purple"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                    location.pathname === link.path
                      ? 'bg-purple-50 text-brand-purple'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.name === 'Reviews' && (
                    <Star className="w-4 h-4 mr-2" />
                  )}
                  {link.name}
                </Link>
              ))}
              
              {/* Our Team Button - Mobile */}
              <button
                onClick={() => {
                  handleCommunityClick();
                  setIsOpen(false);
                }}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-lg font-medium mt-2"
              >
                <Users className="w-4 h-4" />
                <span>Our Team (Community)</span>
              </button>
              
              {/* WhatsApp Order Button for Mobile */}
              {whatsappNumber ? (
                <button
                  onClick={() => {
                    handleWhatsAppOrder();
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-lg font-semibold mt-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </button>
              ) : (
                <button
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-400 to-gray-500 text-white px-4 py-3 rounded-lg font-semibold mt-2 cursor-not-allowed"
                  disabled
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Loading WhatsApp...</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;