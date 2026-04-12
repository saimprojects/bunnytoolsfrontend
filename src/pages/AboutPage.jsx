// // src/pages/AboutPage.jsx
// import React, { useState, useEffect } from 'react';
// import { 
//   Target, 
//   Award, 
//   Globe, 
//   TrendingUp,
//   Users,
//   Star,
//   Zap,
//   ArrowRight,
//   CheckCircle,
//   Trophy,
//   BarChart3,
//   DollarSign,
//   Cpu,
//   Database,
//   Palette,
//   Smartphone,
//   Shield,
//   MessageCircle,
//   Clock,
//   Download
// } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const AboutPage = () => {
//   const [activeStat, setActiveStat] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveStat((prev) => (prev + 1) % achievements.length);
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   const achievements = [
//     { icon: Trophy, value: "500+", label: "Software Sold", color: "from-orange-500 to-orange-600" },
//     { icon: Users, value: "1000+", label: "Happy Customers", color: "from-purple-500 to-purple-600" },
//     { icon: TrendingUp, value: "98%", label: "Satisfaction Rate", color: "from-green-500 to-green-600" },
//     { icon: Globe, value: "50+", label: "Countries Served", color: "from-blue-500 to-blue-600" },
//     { icon: Star, value: "4.9/5", label: "Average Rating", color: "from-yellow-500 to-yellow-600" },
//     { icon: Zap, value: "24/7", label: "Support Available", color: "from-pink-500 to-pink-600" }
//   ];

//   const softwareCategories = [
//     {
//       icon: Cpu,
//       title: 'Development Tools',
//       description: 'Advanced IDEs and code editors',
//       features: ["VS Code Extensions", "Development Suites", "Debugging Tools"]
//     },
//     {
//       icon: Database,
//       title: 'Database Software',
//       description: 'Powerful database management tools',
//       features: ["Query Optimizers", "Database Managers", "Data Migration"]
//     },
//     {
//       icon: Palette,
//       title: 'Design Software',
//       description: 'Professional creative and design tools',
//       features: ["UI/UX Tools", "Graphics Software", "Prototyping"]
//     }
//   ];

//   const principles = [
//     {
//       title: "Quality First",
//       description: "We only provide premium, tested software solutions",
//       icon: "⭐"
//     },
//     {
//       title: "Customer Success",
//       description: "Your productivity is our success metric",
//       icon: "🎯"
//     },
//     {
//       title: "Continuous Support",
//       description: "Lifetime updates and 24/7 technical support",
//       icon: "🔄"
//     },
//     {
//       title: "Transparent Pricing",
//       description: "No hidden costs, one-time payment model",
//       icon: "💰"
//     }
//   ];

//   const successStories = [
//     {
//       title: "10X Productivity Boost",
//       description: "Businesses increased efficiency with our tools",
//       metric: "500+ Companies",
//       color: "from-green-500 to-green-600"
//     },
//     {
//       title: "Cost Reduction",
//       description: "Clients saved on software expenses",
//       metric: "60% Average Savings",
//       color: "from-blue-500 to-blue-600"
//     },
//     {
//       title: "Global Reach",
//       description: "Software used across continents",
//       metric: "50+ Countries",
//       color: "from-purple-500 to-purple-600"
//     }
//   ];

//   const handleWhatsAppContact = () => {
//     const message = encodeURIComponent("Hello Bunny Tools! I'd like to learn more about your software solutions.");
//     const url = `https://chat.whatsapp.com/EJeZt7XL9T3Lt6L9lAJE6k`;
//     window.open(url, '_blank');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
//       {/* Hero Section */}
//       <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-purple-50">
//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200 rounded-full blur-3xl opacity-30"></div>
//           <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-30"></div>
//           <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
//         </div>
        
//         <div className="container mx-auto px-4 py-16 md:py-24 relative">
//           <div className="max-w-6xl mx-auto">
//             {/* Badge */}
//             <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 mb-8">
//               <Award className="w-5 h-5 text-white mr-2" />
//               <span className="font-bold text-white">Premium Subscriptions Provider</span>
//             </div>

//             {/* Main Title */}
//             <div className="flex flex-col lg:flex-row items-center gap-12">
//               <div className="lg:w-1/2">
//                 <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
//                   About <span className="gradient-text">Bunny Tools</span>
//                 </h1>
                
//                 {/* Tagline */}
//                 <p className="text-2xl md:text-3xl text-gray-700 mb-8 font-medium">
//                   Empowering Productivity with Premium Subscriptions Solutions
//                 </p>

//                 {/* Description */}
//                 <div className="max-w-3xl">
//                   <p className="text-lg text-gray-600 mb-8 leading-relaxed">
//                     Bunny Tools is your trusted partner for premium digital software solutions. 
//                     We specialize in providing cutting-edge tools that help businesses and 
//                     individuals boost productivity, streamline workflows, and achieve remarkable results.
//                   </p>
//                 </div>

//                 {/* CTA Buttons */}
//                 <div className="flex flex-wrap gap-4 mt-12">
//                   <button
//                     onClick={handleWhatsAppContact}
//                     className="group relative bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-green-200 transition-all duration-300 inline-flex items-center"
//                   >
//                     <MessageCircle className="w-5 h-5 mr-2" />
//                     <span>Contact on WhatsApp</span>
//                     <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                   </button>
                  
//                   <Link 
//                     to="/products"
//                     className="group border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all duration-300 inline-flex items-center"
//                   >
//                     <span>Browse Software</span>
//                   </Link>
//                 </div>
//               </div>

//               {/* Profile Image */}
//               <div className="lg:w-1/2">
//                 <div className="relative">
//                   <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-purple-600 rounded-3xl blur-xl opacity-30"></div>
//                   <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//                     <img 
//                       src="https://res.cloudinary.com/dxommxt6d/image/upload/v1767085547/WhatsApp_Image_2025-12-30_at_12.04.16_PM_uxogwd.jpg" 
//                       alt="Bunny Tools Team" 
//                       className="w-full h-auto object-cover"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='40' fill='%239ca3af'%3EBunny Tools Team%3C/text%3E%3C/svg%3E";
//                       }}
//                     />
//                   </div>
                  
//                   {/* Floating Badges */}
//                   <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl shadow-xl">
//                     <div className="flex items-center">
//                       <CheckCircle className="w-4 h-4 mr-2" />
//                       <span className="text-sm font-bold">Trusted</span>
//                     </div>
//                   </div>
                  
//                   <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl shadow-xl">
//                     <div className="flex items-center">
//                       <Clock className="w-4 h-4 mr-2" />
//                       <span className="text-sm font-bold">Since 2020</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="container mx-auto px-4 -mt-8 relative z-10">
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//           {achievements.map((achievement, index) => (
//             <div 
//               key={index}
//               onClick={() => setActiveStat(index)}
//               className={`bg-white rounded-2xl shadow-xl p-6 text-center transform transition-all duration-500 cursor-pointer ${
//                 activeStat === index 
//                   ? '-translate-y-2 shadow-2xl border-2 border-orange-200' 
//                   : 'hover:-translate-y-1'
//               }`}
//             >
//               <div className={`h-14 w-14 bg-gradient-to-r ${achievement.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
//                 <achievement.icon className="w-7 h-7 text-white" />
//               </div>
//               <div className="text-2xl font-bold text-gray-900 mb-1">{achievement.value}</div>
//               <div className="text-sm text-gray-600">{achievement.label}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-20">
//         {/* Our Story */}
//         <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
//           <div className="order-2 lg:order-1">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               Our <span className="text-orange-500">Story</span>
//             </h2>
            
//             <div className="space-y-6 text-lg text-gray-600">
//               <p>
//                 Bunny Tools began with a simple mission: to provide premium software 
//                 solutions that actually make a difference. We noticed that many businesses 
//                 were struggling with inefficient tools and complex software.
//               </p>
              
//               <p>
//                 Our journey started by curating the best digital tools available and 
//                 making them accessible to everyone. Today, we've grown into a trusted 
//                 platform offering a wide range of software solutions for various needs.
//               </p>
              
//               <p>
//                 What sets us apart is our commitment to quality. Every software in our 
//                 collection is thoroughly tested and vetted to ensure it delivers 
//                 real value to our customers.
//               </p>
//             </div>

//             <div className="mt-8 flex items-center space-x-6">
//               <div className="flex items-center">
//                 <Download className="w-5 h-5 text-green-500 mr-2" />
//                 <span className="font-medium">Instant Delivery</span>
//               </div>
//               <div className="flex items-center">
//                 <Shield className="w-5 h-5 text-blue-500 mr-2" />
//                 <span className="font-medium">Lifetime Updates</span>
//               </div>
//               <div className="flex items-center">
//                 <MessageCircle className="w-5 h-5 text-purple-500 mr-2" />
//                 <span className="font-medium">24/7 Support</span>
//               </div>
//             </div>
//           </div>

//           {/* Mission Card */}
//           <div className="order-1 lg:order-2">
//             <div className="bg-gradient-to-br from-orange-500 to-purple-600 rounded-3xl p-8 text-white">
//               <div className="text-center">
//                 <Target className="w-16 h-16 mx-auto mb-6" />
//                 <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
//                 <p className="text-lg mb-6">
//                   To empower individuals and businesses with premium software tools 
//                   that enhance productivity, simplify complex tasks, and drive success 
//                   in the digital world.
//                 </p>
//                 <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full">
//                   <Star className="w-4 h-4 mr-2" />
//                   <span>Since 2020</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>



//         {/* Principles */}
//         <div className="bg-gradient-to-r from-orange-500 to-purple-600 rounded-3xl p-8 md:p-12 mb-20">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-white mb-6">
//               Our <span className="text-yellow-300">Principles</span>
//             </h2>
//             <p className="text-orange-100">
//               The foundation of everything we do
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {principles.map((principle, index) => (
//               <div 
//                 key={index}
//                 className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors"
//               >
//                 <div className="text-4xl mb-4">{principle.icon}</div>
//                 <h3 className="text-xl font-bold text-white mb-2">{principle.title}</h3>
//                 <p className="text-orange-100">{principle.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Success Stories */}
//         <div className="mb-20">
//           <div className="text-center max-w-3xl mx-auto mb-12">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               Success <span className="gradient-text">Stories</span>
//             </h2>
//             <p className="text-lg text-gray-600">
//               Real impact made by our Subscriptions solutions
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {successStories.map((story, index) => (
//               <div key={index} className="relative group">
//                 <div className={`bg-gradient-to-r ${story.color} rounded-2xl p-8 text-white h-full transform transition-transform duration-500 group-hover:-translate-y-2`}>
//                   <div className="text-3xl font-bold mb-2">{story.title}</div>
//                   <p className="text-lg mb-4 opacity-90">{story.description}</p>
//                   <div className="text-2xl font-bold mt-6">{story.metric}</div>
//                 </div>
//                 <div className="absolute -top-3 -right-3 h-6 w-6 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                 <div className="absolute -bottom-3 -left-3 h-6 w-6 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Team CTA */}
//         <div className="text-center bg-gradient-to-r from-orange-50 to-purple-50 rounded-3xl p-12">
//           <div className="inline-flex items-center px-6 py-3 rounded-full bg-white mb-6">
//             <Users className="w-5 h-5 text-orange-500 mr-2" />
//             <span className="font-medium text-gray-900">Dedicated Team</span>
//           </div>
          
//           <h2 className="text-4xl font-bold text-gray-900 mb-6">
//             Meet Our <span className="gradient-text">Expert Team</span>
//           </h2>
          
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
//             Our team of software experts, quality analysts, and support specialists 
//             work tirelessly to ensure you get the best software solutions and support.
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button
//               onClick={handleWhatsAppContact}
//               className="group relative bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center"
//             >
//               <MessageCircle className="w-5 h-5 mr-2" />
//               <span>Chat with Our Team</span>
//               <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
//             </button>
            
//             <Link 
//               to="/products"
//               className="border-2 border-orange-500 text-orange-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-colors"
//             >
//               Explore Our Tools
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Final Banner */}
//       <div className="bg-gradient-to-r from-gray-900 to-purple-900 text-white">
//         <div className="container mx-auto px-4 py-12">
//           <div className="text-center">
//             {/* <div className="h-20 w-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
//               <span className="text-3xl">🐰</span>
//             </div> */}
//             <h3 className="text-2xl font-bold mb-4">
//               Bunny Tools - Your Subscriptions Partner
//             </h3>
//             <p className="text-gray-300 max-w-2xl mx-auto">
//               We're more than just a software store. We're your partner in 
//               digital transformation, helping you achieve more with the right tools.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutPage;



// src/pages/AboutPage.jsx - Premium 3D About Page with BunnyFlow Showcase
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, Award, Globe, TrendingUp, Users, Star, Zap, ArrowRight,
  CheckCircle, Trophy, Shield, Clock, Sparkles, Crown, Gem,
  Video, Image, CreditCard, Chrome, Infinity, Rocket, Wallet,
  ChevronRight, Quote, Play, Download, ExternalLink
} from 'lucide-react';

// ─── THEME TOKENS (Homepage style) ─────────────────────────────────────────────
const T = {
  p: '#7c3aed',
  pl: '#a78bfa',
  y: '#f59e0b',
  d: '#0f0a1e',
  dd: '#160d2e',
  gP: 'linear-gradient(135deg,#7c3aed,#a855f7)',
  gY: 'linear-gradient(135deg,#f59e0b,#fbbf24)',
};

// ─── CSS ANIMATIONS ────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@500;600;700&family=Cabinet+Grotesk:wght@400;500;700;800&family=Fira+Code:wght@400;500&display=swap');

@keyframes float-y { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes gradient-x { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
@keyframes blob-morph {
  0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}
  50%{border-radius:50% 60% 30% 60%/40% 50% 60% 50%}
}
@keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
@keyframes pulse-glow { 0%,100%{opacity:.4;box-shadow:0 0 20px rgba(124,58,237,.3)} 50%{opacity:1;box-shadow:0 0 50px rgba(124,58,237,.6)} }

.font-display { font-family:'Clash Display',sans-serif; }
.font-body { font-family:'Cabinet Grotesk',sans-serif; }
.font-mono { font-family:'Fira Code',monospace; }

.glass-light {
  background: rgba(255,255,255,.65);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(124,58,237,.1);
}
.glass-dark {
  background: rgba(15,10,30,.8);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(124,58,237,.18);
}
.text-gradient-p {
  background: linear-gradient(90deg,#7c3aed,#a855f7,#c084fc);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-x 4s ease infinite;
}
.text-gradient-y {
  background: linear-gradient(90deg,#f59e0b,#fbbf24,#fcd34d);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-x 4s ease infinite;
}
`;

// ─── HOOK: INTERSECTION OBSERVER ───────────────────────────────────────────────
const useInView = (ref, threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return isVisible;
};

// ─── BLOB COMPONENT ────────────────────────────────────────────────────────────
const Blob = ({ color = 'rgba(124,58,237,.08)', size = 400, style = {} }) => (
  <div
    className="absolute pointer-events-none"
    style={{
      width: size, height: size,
      background: `radial-gradient(ellipse,${color},transparent 70%)`,
      animation: 'blob-morph 14s ease-in-out infinite',
      filter: 'blur(60px)', ...style,
    }}
  />
);

// ─── REVEAL COMPONENT ──────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const isVisible = useInView(ref, 0.08);
  return (
    <div ref={ref} className={className} style={{
      transform: isVisible ? 'translateY(0)' : 'translateY(48px)',
      opacity: isVisible ? 1 : 0,
      transition: `all .85s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>{children}</div>
  );
};

// ─── 3D TILT CARD ──────────────────────────────────────────────────────────────
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
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    card.style.transition = 'transform 0.1s ease-out';
  };
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    cardRef.current.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
  };
  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={`transform-gpu ${className}`}>
      {children}
    </div>
  );
};

// ─── STAT CARD ─────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, value, label, color }) => (
  <TiltCard>
    <div className="glass-light rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 h-full">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4`} style={{ background: color }}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="font-display text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="font-mono text-xs text-gray-500 tracking-wider">{label}</div>
    </div>
  </TiltCard>
);

// ─── BUNNYFLOW SHOWCASE SECTION ────────────────────────────────────────────────
const BunnyFlowShowcase = () => {
  const features = [
    { icon: Video, title: 'Veo 3.1 Video', desc: 'Google\'s latest AI video generation — cinematic quality in seconds', color: '#7c3aed' },
    { icon: Image, title: 'Google Whisk + Imagen', desc: 'Unlimited AI images with precision models', color: '#ec4899' },
    { icon: Crown, title: 'Gemini Pro Access', desc: 'Full access to Google\'s best AI models', color: '#f59e0b' },
    { icon: Chrome, title: 'Chrome Extension', desc: 'Installs in 30 seconds — seamless integration', color: '#10b981' },
    { icon: Infinity, title: 'Unlimited Credits', desc: 'Generate without limits on Basic & Pro plans', color: '#3b82f6' },
    { icon: Rocket, title: 'No Waitlist', desc: 'Start generating immediately after signup', color: '#ef4444' },
  ];

  const plans = [
    { name: 'Free Trial', duration: '1 Day', price: 'Free', credits: 'Trial Credits', popular: false, color: 'from-gray-500 to-gray-600' },
    { name: 'Basic', duration: '15 Days', price: 'Unlimited', credits: 'Unlimited Credits', popular: true, color: 'from-blue-500 to-cyan-500' },
    { name: 'Pro', duration: '30 Days', price: 'Unlimited', credits: 'Unlimited Credits', popular: false, color: 'from-purple-500 to-pink-500' },
  ];

  const steps = [
    { num: '01', title: 'Create Account', desc: 'Sign up with email — 1-day free trial, no card required' },
    { num: '02', title: 'Install Extension', desc: 'Download BunnyFlow Chrome extension in one click' },
    { num: '03', title: 'Open Google Flow', desc: 'Visit labs.google/fx/tools/flow — extension auto-syncs' },
    { num: '04', title: 'Generate & Enjoy', desc: 'Type prompt, hit generate — credits deduct automatically' },
  ];

  const testimonials = [
    { name: 'Vamsi K.', text: 'Very happy with the tool. Does what it says — simple and smooth. Generated my first video in under a minute.', role: 'Content Creator' },
    { name: 'Layla M.', text: 'I was skeptical at first but the Chrome extension is incredibly seamless. My workflow went from hours to minutes.', role: 'Game Developer' },
    { name: 'Karl R.', text: 'I\'ve been using BunnyFlow for weeks. Support is great and I can always generate high-quality videos.', role: 'AI Enthusiast' },
    { name: 'Priya S.', text: 'On the Pro plan — unlimited access is incredible. No throttling, no waiting. Pure AI generation at full speed.', role: 'YouTuber' },
  ];

  const referralData = [
    { plan: 'Basic Plan', reward: '$0.15 USD', tokens: '5 Tokens' },
    { plan: 'Pro Plan', reward: '$0.21 USD', tokens: '7 Tokens', best: true },
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      <Blob color="rgba(124,58,237,.1)" size={600} style={{ top: '-5%', left: '-10%' }} />
      <Blob color="rgba(236,72,153,.08)" size={500} style={{ bottom: '-5%', right: '-10%' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-dark mb-6" style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
              <Crown className="w-4 h-4 text-yellow-400" />
              <span className="font-mono text-xs tracking-widest uppercase text-purple-300">Flagship Product</span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-white">Introducing </span>
              <span className="text-gradient-y">BunnyFlow</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Direct access to Google Flow's AI generation — powered by a simple credit system.
              <br className="hidden md:block" />
              <span className="text-purple-400">Veo 3.1 · Gemini Pro · Google Whisk</span>
            </p>
          </div>
        </Reveal>

        {/* CTA Buttons */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <a href="https://www.flowbybunny.com/" target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-display font-bold text-white transition-all duration-300 hover:shadow-2xl"
              style={{ background: T.gP, boxShadow: '0 10px 40px rgba(124,58,237,.4)' }}>
              <Rocket className="w-5 h-5" />
              <span>Try BunnyFlow Free</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <a href="https://www.flowbybunny.com/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-display font-bold border-2 border-purple-400 text-purple-300 hover:bg-purple-500/10 transition-all duration-300">
              <Chrome className="w-5 h-5" />
              <span>Download Extension</span>
            </a>
          </div>
        </Reveal>

        {/* Stats Row */}
        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { value: '20cr', label: 'Per AI Video' },
              { value: '5cr', label: 'Per AI Image' },
              { value: '999K', label: 'Max Credits/Plan' },
              { value: '1-Day', label: 'Free Trial' },
            ].map((stat, i) => (
              <div key={i} className="glass-dark rounded-2xl p-5 text-center border border-purple-500/20">
                <div className="font-display text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="font-mono text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Features Grid */}
        <Reveal delay={0.2}>
          <h3 className="font-display text-2xl font-bold text-white mb-6 text-center">
            <Gem className="inline w-5 h-5 text-purple-400 mr-2" />
            Premium AI Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {features.map((f, i) => (
              <TiltCard key={i}>
                <div className="glass-dark rounded-2xl p-6 h-full border border-purple-500/20 hover:border-purple-500/40 transition-all">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${f.color}20`, color: f.color }}>
                    <f.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-white text-lg mb-2">{f.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </Reveal>

        {/* Plans Comparison */}
        <Reveal delay={0.25}>
          <div className="mb-16">
            <h3 className="font-display text-2xl font-bold text-white mb-6 text-center">Simple, Powerful Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {plans.map((plan, i) => (
                <TiltCard key={i}>
                  <div className={`relative rounded-2xl p-6 h-full backdrop-blur-xl border ${plan.popular ? 'border-purple-400 shadow-xl shadow-purple-500/30' : 'border-white/10'}`}
                    style={{ background: plan.popular ? 'linear-gradient(135deg,rgba(124,58,237,.2),rgba(124,58,237,.05))' : 'rgba(255,255,255,.03)' }}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-4 py-1 rounded-full font-bold">
                        ⭐ BEST VALUE
                      </div>
                    )}
                    <div className="text-center">
                      <h4 className={`font-display text-xl font-bold ${plan.popular ? 'text-gradient-p' : 'text-white'}`}>{plan.name}</h4>
                      <p className="text-sm text-gray-400 mb-3">{plan.duration}</p>
                      <div className="text-3xl font-display font-bold text-white mb-1">{plan.price}</div>
                      <p className="text-xs text-gray-500 mb-4">{plan.credits}</p>
                      <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium ${plan.popular ? 'bg-purple-500/20 text-purple-300' : 'bg-white/5 text-gray-400'}`}>
                        {plan.duration} Access
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </Reveal>

        {/* How It Works - 4 Steps */}
        <Reveal delay={0.3}>
          <div className="mb-16">
            <h3 className="font-display text-2xl font-bold text-white mb-8 text-center">Ready in <span className="text-gradient-p">4 steps</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {steps.map((step, i) => (
                <div key={i} className="relative">
                  <div className="glass-dark rounded-2xl p-6 h-full border border-purple-500/20">
                    <div className="font-display text-4xl font-bold text-purple-500/30 mb-3">{step.num}</div>
                    <h4 className="font-display font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-gray-400 text-sm">{step.desc}</p>
                  </div>
                  {i < 3 && (
                    <ChevronRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-purple-400 z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Referral Program */}
        <Reveal delay={0.35}>
          <div className="glass-dark rounded-3xl p-8 mb-16 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white">Earn Money by Sharing</h3>
                <p className="text-gray-400">Refer friends — earn real USD credited to your wallet</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              {referralData.map((ref, i) => (
                <div key={i} className={`rounded-xl p-5 ${ref.best ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30' : 'bg-white/5'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-white">{ref.plan}</span>
                    {ref.best && <span className="text-xs bg-yellow-500 text-black px-2 py-0.5 rounded-full font-bold">BEST</span>}
                  </div>
                  <div className="text-2xl font-display font-bold text-green-400 mt-2">{ref.reward}</div>
                  <div className="text-sm text-gray-400">{ref.tokens} earned per referral</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>💰 Withdraw via Binance, Easypaisa, or Bank Transfer</span>
              <span className="font-mono text-purple-400">1 Token = $0.03 USD</span>
            </div>
          </div>
        </Reveal>

        {/* Testimonials Marquee */}
        <Reveal delay={0.4}>
          <div className="mb-8">
            <h3 className="font-display text-xl font-bold text-white mb-4 text-center">Loved by creators worldwide</h3>
            <div className="overflow-hidden">
              <div className="flex gap-4 animate-[marquee_40s_linear_infinite]">
                {[...testimonials, ...testimonials].map((t, i) => (
                  <div key={i} className="flex-shrink-0 w-80 glass-dark rounded-xl p-5 border border-purple-500/20">
                    <Quote className="w-6 h-6 text-purple-400 mb-2 opacity-50" />
                    <p className="text-gray-300 text-sm mb-3 line-clamp-4">{t.text}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-bold">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-display font-bold text-white text-sm">{t.name}</div>
                        <div className="text-xs text-gray-500">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom CTA */}
        <Reveal delay={0.45}>
          <div className="text-center">
            <a href="https://www.flowbybunny.com/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-display font-bold text-lg text-white transition-all duration-300 hover:shadow-2xl hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#7c3aed,#ec4899)', boxShadow: '0 20px 50px rgba(124,58,237,.5)' }}>
              <Play className="w-5 h-5" />
              <span>Start Generating AI Videos Today</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-gray-500 text-sm mt-4">1-day free trial · No credit card · Instant access</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ─── MAIN ABOUT PAGE ───────────────────────────────────────────────────────────
const AboutPage = () => {
  const achievements = [
    { icon: Trophy, value: '500+', label: 'Software Sold', color: 'linear-gradient(135deg,#f59e0b,#d97706)' },
    { icon: Users, value: '1000+', label: 'Happy Customers', color: 'linear-gradient(135deg,#7c3aed,#a855f7)' },
    { icon: TrendingUp, value: '98%', label: 'Satisfaction Rate', color: 'linear-gradient(135deg,#10b981,#34d399)' },
    { icon: Globe, value: '50+', label: 'Countries Served', color: 'linear-gradient(135deg,#3b82f6,#06b6d4)' },
  ];

  const principles = [
    { icon: '⭐', title: 'Quality First', desc: 'Premium, tested software solutions only' },
    { icon: '🎯', title: 'Customer Success', desc: 'Your productivity is our success metric' },
    { icon: '🔄', title: 'Continuous Support', desc: 'Lifetime updates & 24/7 support' },
    { icon: '💰', title: 'Transparent Pricing', desc: 'No hidden costs, one-time payment' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f4ff] via-white to-[#f0ebff] font-body overflow-x-hidden">
      <style>{CSS}</style>
      
      {/* Background Blobs */}
      <Blob color="rgba(124,58,237,.06)" size={500} style={{ top: '0%', left: '-5%' }} />
      <Blob color="rgba(245,158,11,.04)" size={450} style={{ bottom: '20%', right: '-5%' }} />

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <Reveal>
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6">
                  <Award className="w-4 h-4 text-purple-500" />
                  <span className="font-mono text-xs tracking-widest uppercase text-purple-600">Premium Provider</span>
                </div>
                
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  About <span className="text-gradient-p">Bunny Tools</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-700 mb-4 font-medium">
                  Empowering Productivity with Premium Solutions
                </p>
                
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Bunny Tools is your trusted partner for premium digital software solutions. 
                  We specialize in providing cutting-edge tools that help businesses and 
                  individuals boost productivity and achieve remarkable results.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link to="/products" className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-white transition-all duration-300 hover:shadow-xl"
                    style={{ background: T.gP }}>
                    <span>Browse Software</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a href="https://www.flowbybunny.com/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold border-2 border-purple-200 text-purple-600 hover:bg-purple-50 transition-all">
                    <Sparkles className="w-4 h-4" />
                    <span>Try BunnyFlow</span>
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Right Image */}
            <Reveal delay={0.1}>
              <TiltCard>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://res.cloudinary.com/dxommxt6d/image/upload/v1767085547/WhatsApp_Image_2025-12-30_at_12.04.16_PM_uxogwd.jpg" 
                    alt="Bunny Tools Team" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 glass-dark rounded-xl px-4 py-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-white text-sm font-medium">Trusted by 1000+ customers</span>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <StatCard {...item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our <span className="text-gradient-p">Story</span>
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>Bunny Tools began with a simple mission: to provide premium software solutions that actually make a difference.</p>
                  <p>Our journey started by curating the best digital tools and making them accessible to everyone. Today, we've grown into a trusted platform with a wide range of solutions.</p>
                  <p>What sets us apart is our commitment to quality. Every software is thoroughly tested to deliver real value.</p>
                </div>
                <div className="flex items-center gap-6 mt-6">
                  {[ 
                    { icon: Download, text: 'Instant Delivery', color: '#10b981' },
                    { icon: Shield, text: 'Lifetime Updates', color: '#3b82f6' },
                    { icon: Clock, text: '24/7 Support', color: '#7c3aed' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                      <span className="text-sm font-medium text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <TiltCard>
                <div className="rounded-3xl p-8 text-white" style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7,#ec4899)' }}>
                  <Target className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-bold text-center mb-4">Our Mission</h3>
                  <p className="text-center text-white/90 leading-relaxed">
                    To empower individuals and businesses with premium software tools that enhance productivity, 
                    simplify complex tasks, and drive success in the digital world.
                  </p>
                  <div className="flex justify-center mt-6">
                    <span className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm">
                      <Star className="w-4 h-4 mr-2" /> Since 2020
                    </span>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="rounded-3xl p-8 md:p-12" style={{ background: 'linear-gradient(135deg,rgba(124,58,237,.1),rgba(236,72,153,.1))' }}>
            <Reveal>
              <h2 className="font-display text-3xl font-bold text-gray-900 text-center mb-10">
                Our <span className="text-gradient-p">Principles</span>
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {principles.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="glass-light rounded-2xl p-6 text-center h-full">
                    <div className="text-4xl mb-4">{p.icon}</div>
                    <h4 className="font-display font-bold text-gray-900 mb-2">{p.title}</h4>
                    <p className="text-sm text-gray-600">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BUNNYFLOW SHOWCASE - Flagship Product Section */}
      <div className="py-8" style={{ background: T.dd }}>
        <BunnyFlowShowcase />
      </div>

      {/* Final Banner */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Reveal>
            <div className="rounded-3xl p-8 md:p-12 text-center text-white" style={{ background: 'linear-gradient(135deg,#0f0a1e,#160d2e)' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: T.gP }}>
                <span className="text-3xl">🐰</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">
                Bunny Tools — Your Digital Partner
              </h3>
              <p className="text-gray-400 max-w-2xl mx-auto mb-6">
                More than just a software store. We're your partner in digital transformation, 
                helping you achieve more with the right tools.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/products" className="px-6 py-3 rounded-xl font-display font-semibold text-white" style={{ background: T.gP }}>
                  Explore Tools
                </Link>
                <a href="https://www.flowbybunny.com/" target="_blank" rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl font-display font-semibold border border-purple-400 text-purple-300 hover:bg-purple-500/10 transition-all">
                  Try BunnyFlow →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;