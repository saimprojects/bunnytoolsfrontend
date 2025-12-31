// src/components/layout/Footer.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  Send, 
  Download,
  Shield,
  Zap,
  Clock,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Cpu,
  Database,
  Palette,
  Smartphone,
  CheckCircle
} from 'lucide-react';
import { getWhatsAppNumber } from '../../api/api';

const Footer = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetchWhatsAppNumber();
  }, []);

  const fetchWhatsAppNumber = async () => {
    try {
      setLoading(true);
      const number = await getWhatsAppNumber();
      setWhatsappNumber(number);
    } catch (error) {
      console.error('Error fetching WhatsApp number:', error);
      setWhatsappNumber('+923001234567'); // Fallback
    } finally {
      setLoading(false);
    }
  };

  const softwareCategories = [
    { name: 'ChatGPT Subscriptions', href: '/products', icon: Cpu },
    { name: 'CapCut Subscription', href: '/products', icon: Database },
    { name: 'Canva Subscription', href: '/products', icon: Palette },
    { name: 'All Tools', href: '/products', icon: Smartphone },
  ];

  const footerLinks = {
    'Categories': softwareCategories,
    'Company': [
      { name: 'About Us', href: '/about' },
      { name: 'Our Software', href: '/products' },
      { name: 'Contact', href: '/contact' },
    ],
    'Support': [
      { name: 'WhatsApp Support', href: '/contact' },
    ]
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const features = [
    {
      icon: Download,
      title: 'Instant Delivery',
      description: 'Get Subscription immediately'
    },
    {
      icon: Shield,
      title: 'Lifetime License',
      description: 'One-time payment'
    },
    {
      icon: Zap,
      title: '24/7 Support',
      description: 'Always available'
    },
    {
      icon: Clock,
      title: 'Free Updates',
      description: 'Lifetime updates'
    }
  ];

  const handleWhatsAppClick = () => {
    if (!whatsappNumber) {
      alert('WhatsApp number not available. Please try again.');
      return;
    }

    const message = encodeURIComponent("Hello Bunny Tools! I need help with subscription selection.");
    const url = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`;
    window.open(url, '_blank');
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              {/* <div className="h-14 w-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center group-hover:shadow-lg transition-shadow">
                <span className="text-2xl"></span>
              </div> */}
              <div>
                <h2 className="text-2xl font-bold">
                  <span className="text-orange-400">Bunny</span>
                  <span className="text-white">Tools</span>
                </h2>
                <p className="text-gray-400 text-sm">Premium Subscriptions Solutions</p>
              </div>
            </Link>
            
            <p className="text-gray-400 mb-8 max-w-md">
              Your trusted source for premium digital tools. We provide 
              high-quality solutions that boost productivity and streamline workflows.
            </p>
            
            {/* WhatsApp Contact Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Need Help? WhatsApp Us</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                {loading ? (
                  <div className="animate-pulse bg-gray-800 h-12 w-48 rounded-lg"></div>
                ) : (
                  <>
                    <div className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3">
                      <div className="text-sm text-gray-400">WhatsApp Number</div>
                      <div className="font-mono font-bold">{whatsappNumber}</div>
                    </div>
                    <button
                      onClick={handleWhatsAppClick}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-900/30 transition-shadow flex items-center justify-center"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Chat Now
                    </button>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Average response time: 5-10 minutes
              </p>
            </div>
            
            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="h-10 w-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-white mb-6">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-orange-400 transition-colors flex items-center group"
                    >
                      {link.icon && (
                        <link.icon className="w-4 h-4 mr-2 text-gray-500 group-hover:text-orange-400" />
                      )}
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-6 text-center">Why Choose Bunny Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="h-12 w-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-gray-400">Get notified about new Subscriptions releases and updates</p>
            </div>
            {/* <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
              />
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-r-lg font-semibold hover:shadow-lg transition-shadow flex items-center">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </button>
            </div> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <p className="text-gray-400 text-sm">
                © {currentYear} Bunny Tools. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">Secure Payments:</span>
                <div className="flex space-x-2">
                  <div className="h-6 w-10 bg-gray-800 rounded"></div>
                  <div className="h-6 w-10 bg-gray-800 rounded"></div>
                  <div className="h-6 w-10 bg-gray-800 rounded"></div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Link to="/privacy" className="text-gray-400 text-sm hover:text-orange-400">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 text-sm hover:text-orange-400">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">24/7</div>
              <div className="text-xs text-gray-400">Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">100%</div>
              <div className="text-xs text-gray-400">Secure</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">30-Day</div>
              <div className="text-xs text-gray-400">Refund</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">Free</div>
              <div className="text-xs text-gray-400">Updates</div>
            </div>
          </div>
        </div>

        {/* Final Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Bunny Tools is a premium software provider. All software comes with 
            lifetime license and free updates. Instant digital delivery.
          </p>
          <div className="mt-4">
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center text-orange-400 hover:text-orange-300 font-medium"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Need help? Click to chat on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;