// src/pages/AboutPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Award, 
  Globe, 
  TrendingUp,
  Users,
  Star,
  Zap,
  ArrowRight,
  CheckCircle,
  Trophy,
  BarChart3,
  DollarSign,
  Cpu,
  Database,
  Palette,
  Smartphone,
  Shield,
  MessageCircle,
  Clock,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const [activeStat, setActiveStat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % achievements.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const achievements = [
    { icon: Trophy, value: "500+", label: "Software Sold", color: "from-orange-500 to-orange-600" },
    { icon: Users, value: "1000+", label: "Happy Customers", color: "from-purple-500 to-purple-600" },
    { icon: TrendingUp, value: "98%", label: "Satisfaction Rate", color: "from-green-500 to-green-600" },
    { icon: Globe, value: "50+", label: "Countries Served", color: "from-blue-500 to-blue-600" },
    { icon: Star, value: "4.9/5", label: "Average Rating", color: "from-yellow-500 to-yellow-600" },
    { icon: Zap, value: "24/7", label: "Support Available", color: "from-pink-500 to-pink-600" }
  ];

  const softwareCategories = [
    {
      icon: Cpu,
      title: 'Development Tools',
      description: 'Advanced IDEs and code editors',
      features: ["VS Code Extensions", "Development Suites", "Debugging Tools"]
    },
    {
      icon: Database,
      title: 'Database Software',
      description: 'Powerful database management tools',
      features: ["Query Optimizers", "Database Managers", "Data Migration"]
    },
    {
      icon: Palette,
      title: 'Design Software',
      description: 'Professional creative and design tools',
      features: ["UI/UX Tools", "Graphics Software", "Prototyping"]
    }
  ];

  const principles = [
    {
      title: "Quality First",
      description: "We only provide premium, tested software solutions",
      icon: "⭐"
    },
    {
      title: "Customer Success",
      description: "Your productivity is our success metric",
      icon: "🎯"
    },
    {
      title: "Continuous Support",
      description: "Lifetime updates and 24/7 technical support",
      icon: "🔄"
    },
    {
      title: "Transparent Pricing",
      description: "No hidden costs, one-time payment model",
      icon: "💰"
    }
  ];

  const successStories = [
    {
      title: "10X Productivity Boost",
      description: "Businesses increased efficiency with our tools",
      metric: "500+ Companies",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Cost Reduction",
      description: "Clients saved on software expenses",
      metric: "60% Average Savings",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Global Reach",
      description: "Software used across continents",
      metric: "50+ Countries",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent("Hello Bunny Tools! I'd like to learn more about your software solutions.");
    const url = `https://chat.whatsapp.com/EJeZt7XL9T3Lt6L9lAJE6k`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-purple-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-6xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 mb-8">
              <Award className="w-5 h-5 text-white mr-2" />
              <span className="font-bold text-white">Premium Subscriptions Provider</span>
            </div>

            {/* Main Title */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                  About <span className="gradient-text">Bunny Tools</span>
                </h1>
                
                {/* Tagline */}
                <p className="text-2xl md:text-3xl text-gray-700 mb-8 font-medium">
                  Empowering Productivity with Premium Subscriptions Solutions
                </p>

                {/* Description */}
                <div className="max-w-3xl">
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Bunny Tools is your trusted partner for premium digital software solutions. 
                    We specialize in providing cutting-edge tools that help businesses and 
                    individuals boost productivity, streamline workflows, and achieve remarkable results.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 mt-12">
                  <button
                    onClick={handleWhatsAppContact}
                    className="group relative bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-green-200 transition-all duration-300 inline-flex items-center"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    <span>Contact on WhatsApp</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <Link 
                    to="/products"
                    className="group border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all duration-300 inline-flex items-center"
                  >
                    <span>Browse Software</span>
                  </Link>
                </div>
              </div>

              {/* Profile Image */}
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-purple-600 rounded-3xl blur-xl opacity-30"></div>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <img 
                      src="https://res.cloudinary.com/dxommxt6d/image/upload/v1767085547/WhatsApp_Image_2025-12-30_at_12.04.16_PM_uxogwd.jpg" 
                      alt="Bunny Tools Team" 
                      className="w-full h-auto object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='40' fill='%239ca3af'%3EBunny Tools Team%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  
                  {/* Floating Badges */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl shadow-xl">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span className="text-sm font-bold">Trusted</span>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl shadow-xl">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm font-bold">Since 2020</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              onClick={() => setActiveStat(index)}
              className={`bg-white rounded-2xl shadow-xl p-6 text-center transform transition-all duration-500 cursor-pointer ${
                activeStat === index 
                  ? '-translate-y-2 shadow-2xl border-2 border-orange-200' 
                  : 'hover:-translate-y-1'
              }`}
            >
              <div className={`h-14 w-14 bg-gradient-to-r ${achievement.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <achievement.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{achievement.value}</div>
              <div className="text-sm text-gray-600">{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        {/* Our Story */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-orange-500">Story</span>
            </h2>
            
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Bunny Tools began with a simple mission: to provide premium software 
                solutions that actually make a difference. We noticed that many businesses 
                were struggling with inefficient tools and complex software.
              </p>
              
              <p>
                Our journey started by curating the best digital tools available and 
                making them accessible to everyone. Today, we've grown into a trusted 
                platform offering a wide range of software solutions for various needs.
              </p>
              
              <p>
                What sets us apart is our commitment to quality. Every software in our 
                collection is thoroughly tested and vetted to ensure it delivers 
                real value to our customers.
              </p>
            </div>

            <div className="mt-8 flex items-center space-x-6">
              <div className="flex items-center">
                <Download className="w-5 h-5 text-green-500 mr-2" />
                <span className="font-medium">Instant Delivery</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-blue-500 mr-2" />
                <span className="font-medium">Lifetime Updates</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-5 h-5 text-purple-500 mr-2" />
                <span className="font-medium">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="order-1 lg:order-2">
            <div className="bg-gradient-to-br from-orange-500 to-purple-600 rounded-3xl p-8 text-white">
              <div className="text-center">
                <Target className="w-16 h-16 mx-auto mb-6" />
                <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg mb-6">
                  To empower individuals and businesses with premium software tools 
                  that enhance productivity, simplify complex tasks, and drive success 
                  in the digital world.
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full">
                  <Star className="w-4 h-4 mr-2" />
                  <span>Since 2020</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Software Categories */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="gradient-text">Subscriptions Focus</span>
            </h2>
            <p className="text-lg text-gray-600">
              Specialized subscriptions solutions for every need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {softwareCategories.map((category, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="h-14 w-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <category.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                
                <div className="space-y-3">
                  {category.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Principles */}
        <div className="bg-gradient-to-r from-orange-500 to-purple-600 rounded-3xl p-8 md:p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Our <span className="text-yellow-300">Principles</span>
            </h2>
            <p className="text-orange-100">
              The foundation of everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors"
              >
                <div className="text-4xl mb-4">{principle.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{principle.title}</h3>
                <p className="text-orange-100">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-lg text-gray-600">
              Real impact made by our Subscriptions solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="relative group">
                <div className={`bg-gradient-to-r ${story.color} rounded-2xl p-8 text-white h-full transform transition-transform duration-500 group-hover:-translate-y-2`}>
                  <div className="text-3xl font-bold mb-2">{story.title}</div>
                  <p className="text-lg mb-4 opacity-90">{story.description}</p>
                  <div className="text-2xl font-bold mt-6">{story.metric}</div>
                </div>
                <div className="absolute -top-3 -right-3 h-6 w-6 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute -bottom-3 -left-3 h-6 w-6 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Team CTA */}
        <div className="text-center bg-gradient-to-r from-orange-50 to-purple-50 rounded-3xl p-12">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white mb-6">
            <Users className="w-5 h-5 text-orange-500 mr-2" />
            <span className="font-medium text-gray-900">Dedicated Team</span>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Meet Our <span className="gradient-text">Expert Team</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Our team of software experts, quality analysts, and support specialists 
            work tirelessly to ensure you get the best software solutions and support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleWhatsAppContact}
              className="group relative bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              <span>Chat with Our Team</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <Link 
              to="/products"
              className="border-2 border-orange-500 text-orange-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-colors"
            >
              Explore Our Tools
            </Link>
          </div>
        </div>
      </div>

      {/* Final Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            {/* <div className="h-20 w-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🐰</span>
            </div> */}
            <h3 className="text-2xl font-bold mb-4">
              Bunny Tools - Your Subscriptions Partner
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We're more than just a software store. We're your partner in 
              digital transformation, helping you achieve more with the right tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;