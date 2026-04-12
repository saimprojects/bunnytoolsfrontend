// // src/components/home/Hero.jsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, Play, Download, Shield, Zap, Cpu } from 'lucide-react';
// import { getWhatsAppNumber } from '../../api/api'; // Import your WhatsApp API function

// const Hero = () => {
//   const [currentFeature, setCurrentFeature] = useState(0);
//   const [loadingWhatsapp, setLoadingWhatsapp] = useState(false);
//   const [whatsappNumber, setWhatsappNumber] = useState(null);
  
//   const features = [
//     { icon: Download, text: 'Instant Digital Delivery' },
//     { icon: Shield, text: 'Lifetime License & Updates' },
//     { icon: Zap, text: '24/7 Premium Support' },
//   ];

//   // Image URLs
//   const softwareImages = [
//     'https://res.cloudinary.com/dxommxt6d/image/upload/v1767184269/znxburenjudygfdmpzxw.webp',
//     'https://res.cloudinary.com/dxommxt6d/image/upload/v1767184555/zmrqvw7txeztmhimo7o4.webp',
//     'https://res.cloudinary.com/dxommxt6d/image/upload/v1767186255/fen2w8dlushcthzqnmtt.png'
//   ];

//   // Product details for Bunny Pro Suite
//   const bunnyProSuite = {
//     title: 'Bunny Pro Suite',
//     description: 'Complete Subscriptions bundle for maximum productivity',
//     price: 999,
//     originalPrice: 1499,
//     discount: 30,
//     features: [
//       'AI-Powered Automation Tools',
//       'Advanced Analytics Dashboard',
//       'Unlimited Team Members',
//       'Priority Customer Support',
//       'Lifetime Updates & Upgrades'
//     ]
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentFeature((prev) => (prev + 1) % features.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   // Fetch WhatsApp number on component mount
//   useEffect(() => {
//     fetchWhatsappNumber();
//   }, []);

//   const fetchWhatsappNumber = async () => {
//     try {
//       const number = await getWhatsAppNumber();
//       setWhatsappNumber(number);
//     } catch (err) {
//       console.error('Error fetching WhatsApp number:', err);
//     }
//   };

//   const handleBunnySuitePurchase = async () => {
//     try {
//       setLoadingWhatsapp(true);
      
//       let number = whatsappNumber;
      
//       // If WhatsApp number is not loaded, fetch it
//       if (!number) {
//         number = await getWhatsAppNumber();
//         setWhatsappNumber(number);
//       }

//       const cleanNumber = number.replace('+', '');
      
//       // Create a beautiful WhatsApp message template
//       const message = `✨ *BUNNY PRO SUITE - PURCHASE INQUIRY* ✨

// 🎯 *Product Details:*
// 📦 Product: ${bunnyProSuite.title}
// 💎 Description: ${bunnyProSuite.description}
// 💰 Price: Rs. ${bunnyProSuite.price}
// 🎁 Discount: ${bunnyProSuite.discount}% OFF
// 📊 Original Price: Rs. ${bunnyProSuite.originalPrice}

// 🚀 *Key Features:*
// ${bunnyProSuite.features.map(feature => `✅ ${feature}`).join('\n')}


// ━━━━━━━━━━━━━━━━━━━━━━
// 📞 *Contact Information:*
// I'm ready to proceed with the purchase. Please share the payment details and next steps.

// Thank you! 🙏`;

//       const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
      
//       window.open(url, '_blank');
//     } catch (err) {
//       alert('Unable to contact WhatsApp. Please try again or contact support.');
//     } finally {
//       setLoadingWhatsapp(false);
//     }
//   };

//   return (
//     <section className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50 to-white">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
//       {/* Purple Gradient Blobs */}
//       <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
//       <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      
//       <div className="container mx-auto px-4 lg:px-8 py-16 md:py-24 relative">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
          
//           {/* Left Content */}
//           <div className="space-y-8">
//             {/* Badge */}
//             <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-yellow-50 px-4 py-2 rounded-full border border-purple-100">
//               <div className="h-2 w-2 bg-brand-yellow rounded-full animate-pulse"></div>
//               <span className="text-sm font-medium text-brand-purple">Premium Tools Subscriptions</span>
//             </div>

//             {/* Main Heading */}
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
//               Premium Digital
//               <span className="block">
//                 <span className="relative">
//                   <span className="relative z-10">Tools Subscriptions</span>
//                   <span className="absolute bottom-2 left-0 w-full h-3 bg-brand-yellow opacity-30 -rotate-1"></span>
//                 </span>
//               </span>
//             </h1>

//             {/* Description */}
//             <p className="text-lg text-gray-600 max-w-lg">
//               Discover cutting-edge software tools, Subscriptions, premium digital products, 
//               and expert solutions. Everything you need to boost your productivity 
//               and business growth.
//             </p>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Link 
//                 to="/products"
//                 className="group relative bg-gradient-to-r from-brand-purple to-brand-purple-light text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-200 transition-all duration-300 inline-flex items-center justify-center"
//               >
//                 <span>Browse Tools</span>
//                 <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 <div className="absolute -inset-1 bg-gradient-to-r from-brand-purple to-brand-purple-light rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
//               </Link>
              
//             </div>

//             {/* Features */}
//             <div className="pt-8">
//               <div className="flex flex-wrap gap-4 mb-6">
//                 {features.map((feature, index) => (
//                   <div 
//                     key={index}
//                     className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
//                       currentFeature === index 
//                         ? 'bg-white shadow-lg border border-purple-100' 
//                         : 'opacity-70'
//                     }`}
//                   >
//                     <feature.icon className={`w-5 h-5 ${
//                       currentFeature === index ? 'text-brand-purple' : 'text-gray-400'
//                     }`} />
//                     <span className={`font-medium ${
//                       currentFeature === index ? 'text-gray-900' : 'text-gray-600'
//                     }`}>
//                       {feature.text}
//                     </span>
//                   </div>
//                 ))}
//               </div>
              
//               {/* Stats */}
//               <div className="flex items-center space-x-8">
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-brand-purple">1000+</div>
//                   <div className="text-sm text-gray-600">Happy Customers</div>
//                 </div>
//                 <div className="h-8 w-px bg-gray-300"></div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-brand-purple">50+</div>
//                   <div className="text-sm text-gray-600">Premium Tools</div>
//                 </div>
//                 <div className="h-8 w-px bg-gray-300"></div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-brand-purple">24/7</div>
//                   <div className="text-sm text-gray-600">Support</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Software Showcase */}
//           <div className="relative">
//             {/* Main Software Card */}
//             <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//               <div className="absolute inset-0 bg-gradient-to-br from-brand-purple to-purple-900"></div>
//               <div className="relative p-8">
//                 <div className="text-white mb-6">
//                   <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 mb-4">
//                     <span className="text-sm">Featured Tools</span>
//                   </div>
//                   <h3 className="text-2xl font-bold mb-2">{bunnyProSuite.title}</h3>
//                   <p className="text-purple-200">{bunnyProSuite.description}</p>
//                 </div>
                
//                 {/* Software Features with Images */}
//                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
//                   <div className="grid grid-cols-3 gap-4 mb-6">
//                     {softwareImages.map((imageUrl, index) => (
//                       <div key={index} className="bg-white/20 rounded-lg p-3">
//                         <div className="h-20 bg-white/30 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
//                           <img 
//                             src={imageUrl} 
//                             alt={`Software feature ${index + 1}`}
//                             className="w-full h-full object-cover rounded-lg"
//                           />
//                         </div>
//                         <div className="h-2 bg-white/40 rounded w-3/4 mx-auto"></div>
//                       </div>
//                     ))}
//                   </div>
                  
//                   {/* Features List */}
//                   <div className="mb-6">
//                     <h4 className="text-white font-semibold mb-3">✨ Included Features:</h4>
//                     <ul className="space-y-2">
//                       {bunnyProSuite.features.slice(0, 3).map((feature, index) => (
//                         <li key={index} className="flex items-center text-sm text-purple-100">
//                           <div className="w-2 h-2 bg-brand-yellow rounded-full mr-3"></div>
//                           {feature}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <div className="text-2xl font-bold text-white">Rs. {bunnyProSuite.price}</div>
//                       <div className="text-sm text-purple-200 line-through">Rs. {bunnyProSuite.originalPrice}</div>
//                     </div>
//                     <button 
//                       onClick={handleBunnySuitePurchase}
//                       disabled={loadingWhatsapp}
//                       className={`bg-white text-brand-purple px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center ${
//                         loadingWhatsapp ? 'opacity-70 cursor-not-allowed' : ''
//                       }`}
//                     >
//                       {loadingWhatsapp ? (
//                         <>
//                           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-purple mr-2"></div>
//                           Loading...
//                         </>
//                       ) : (
//                         'Buy Now'
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Floating Elements */}
//               <div className="absolute -top-4 -right-4 bg-brand-yellow text-white p-3 rounded-xl shadow-lg animate-bounce-slow">
//                 <div className="text-center">
//                   <div className="text-xs">SAVE</div>
//                   <div className="text-lg font-bold">{bunnyProSuite.discount}%</div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Floating Cards */}
//             <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 w-56">
//               <div className="flex items-center space-x-3">
//                 <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
//                   <Download className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <div className="font-semibold text-gray-900">Instant Download</div>
//                   <div className="text-sm text-gray-600">Get Access immediately</div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 w-56">
//               <div className="flex items-center space-x-3">
//                 <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
//                   <Shield className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <div className="font-semibold text-gray-900">Lifetime Updates</div>
//                   <div className="text-sm text-gray-600">Free updates forever</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;



import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Download,
  Shield,
  Zap,
  Cpu,
  Users,
  Star,
  TrendingUp,
  Bolt,
} from 'lucide-react';
import { getWhatsAppNumber } from '../../api/api';

// ─── THEME ────────────────────────────────────────────────────────────────────
const T = {
  p: '#7c3aed',
  pl: '#a78bfa',
  y: '#f59e0b',
  d: '#0f0a1e',
  dd: '#160d2e',
  gP: 'linear-gradient(135deg,#7c3aed,#a855f7)',
  gY: 'linear-gradient(135deg,#f59e0b,#fbbf24)',
  glow: '0 0 60px rgba(124,58,237,.3)',
};

// ─── HERO CSS ─────────────────────────────────────────────────────────────────
const HERO_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@500;600;700&family=Cabinet+Grotesk:wght@400;500;700;800&family=Fira+Code:wght@400;500&display=swap');

.hero-font-display { font-family:'Clash Display',sans-serif }
.hero-font-mono    { font-family:'Fira Code',monospace }
.hero-font-body    { font-family:'Cabinet Grotesk',sans-serif }

@keyframes hero-fade-up  { from{opacity:0;transform:translateY(42px)} to{opacity:1;transform:translateY(0)} }
@keyframes hero-float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes hero-blob     { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 25%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} 50%{border-radius:50% 60% 30% 60%/40% 50% 60% 50%} 75%{border-radius:40% 60% 70% 30%/60% 40% 50% 60%} }
@keyframes hero-spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes hero-spin-rev { from{transform:rotate(360deg)} to{transform:rotate(0deg)} }
@keyframes hero-shimmer  { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
@keyframes hero-glow-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(124,58,237,.35)} 50%{box-shadow:0 0 0 12px rgba(124,58,237,0)} }
@keyframes hero-particle { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-10px) scale(1.08)} }
@keyframes hero-pulse-dot{ 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.6)} }
@keyframes hero-word-in  { from{transform:translateY(110%);opacity:0} to{transform:translateY(0);opacity:1} }
@keyframes hero-word-out { from{transform:translateY(0);opacity:1} to{transform:translateY(-110%);opacity:0} }
@keyframes hero-grad-x   { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
@keyframes hero-scroll-cue { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }
@keyframes hero-badge-enter { from{opacity:0;transform:translateY(-10px) scale(.94)} to{opacity:1;transform:translateY(0) scale(1)} }
@keyframes hero-line-grow { from{transform:scaleX(0)} to{transform:scaleX(1)} }

.hero-text-grad {
  background: linear-gradient(90deg,#7c3aed,#a855f7,#c084fc,#7c3aed);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: hero-grad-x 5s ease infinite;
}
.hero-text-grad-y {
  background: linear-gradient(90deg,#f59e0b,#fbbf24,#fcd34d,#f59e0b);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: hero-grad-x 5s ease infinite;
}
.hero-glass {
  background: rgba(255,255,255,.04);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border: 1px solid rgba(255,255,255,.09);
}
.hero-glass-card {
  background: rgba(11,8,24,.78);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border: 1px solid rgba(124,58,237,.16);
}
.hero-ha1 { animation: hero-fade-up .85s cubic-bezier(.16,1,.3,1) .05s both }
.hero-ha2 { animation: hero-fade-up .85s cubic-bezier(.16,1,.3,1) .18s both }
.hero-ha3 { animation: hero-fade-up .85s cubic-bezier(.16,1,.3,1) .32s both }
.hero-ha4 { animation: hero-fade-up .85s cubic-bezier(.16,1,.3,1) .48s both }
.hero-ha5 { animation: hero-fade-up .85s cubic-bezier(.16,1,.3,1) .64s both }
.hero-ha6 { animation: hero-fade-up .85s cubic-bezier(.16,1,.3,1) .80s both }
.hero-ha7 { animation: hero-fade-up .85s cubic-bezier(.16,1,.3,1) .96s both }
`;

// ─── MOUSE PARALLAX ───────────────────────────────────────────────────────────
function useMouseParallax(str = 18) {
  const [o, setO] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let tgt = { x: 0, y: 0 };
    let cur = { x: 0, y: 0 };
    let raf;

    const h = (e) => {
      tgt.x = (e.clientX / window.innerWidth - 0.5) * str;
      tgt.y = (e.clientY / window.innerHeight - 0.5) * str;
    };

    const l = () => {
      cur.x += (tgt.x - cur.x) * 0.07;
      cur.y += (tgt.y - cur.y) * 0.07;
      setO({ ...cur });
      raf = requestAnimationFrame(l);
    };

    window.addEventListener('mousemove', h, { passive: true });
    raf = requestAnimationFrame(l);

    return () => {
      window.removeEventListener('mousemove', h);
      cancelAnimationFrame(raf);
    };
  }, [str]);

  return o;
}

// ─── PARTICLES ────────────────────────────────────────────────────────────────
function HeroParticles({ count = 28 }) {
  const ps = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 3.2 + 1,
        d: Math.random() * 24 + 14,
        dl: Math.random() * 14,
        o: 0.05 + Math.random() * 0.14,
      })),
    [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {ps.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            background: `rgba(124,58,237,${p.o})`,
            animation: `hero-particle ${p.d}s ease-in-out ${p.dl}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

// ─── WORD ROTATOR ─────────────────────────────────────────────────────────────
function HeroWordRotator({ words, interval = 3200 }) {
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState(null);
  const [key, setKey] = useState(0);
  const measureRef = useRef(null);
  const [width, setWidth] = useState('auto');

  useEffect(() => {
    if (measureRef.current) setWidth(measureRef.current.offsetWidth + 8);
  }, [cur]);

  useEffect(() => {
    const t = setInterval(() => {
      setPrev(cur);
      setCur((c) => (c + 1) % words.length);
      setKey((k) => k + 1);
    }, interval);
    return () => clearInterval(t);
  }, [cur, words.length, interval]);

  useEffect(() => {
    if (prev !== null) {
      const t = setTimeout(() => setPrev(null), 450);
      return () => clearTimeout(t);
    }
  }, [prev]);

  const gradSt = {
    display: 'inline-block',
    background: 'linear-gradient(90deg,#7c3aed,#a855f7,#c084fc,#7c3aed)',
    backgroundSize: '300% 100%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'hero-grad-x 5s ease infinite',
    whiteSpace: 'nowrap',
  };

  return (
    <>
      <span
        ref={measureRef}
        style={{ ...gradSt, position: 'absolute', visibility: 'hidden', pointerEvents: 'none' }}
        aria-hidden
      >
        {words[cur]}
      </span>
      <span
        style={{
          display: 'inline-flex',
          position: 'relative',
          verticalAlign: 'baseline',
          width: typeof width === 'number' ? width : 'auto',
          transition: 'width .5s cubic-bezier(.16,1,.3,1)',
          overflow: 'hidden',
        }}
      >
        {prev !== null && (
          <span
            key={`out-${key}`}
            style={{
              ...gradSt,
              position: 'absolute',
              top: 0,
              left: 0,
              animation: 'hero-word-out .4s cubic-bezier(.7,0,.84,0) forwards, hero-grad-x 5s ease infinite',
            }}
          >
            {words[prev]}
          </span>
        )}
        <span
          key={`in-${key}`}
          style={{
            ...gradSt,
            animation: 'hero-word-in .6s cubic-bezier(.16,1,.3,1) forwards, hero-grad-x 5s ease infinite',
          }}
        >
          {words[cur]}
        </span>
      </span>
    </>
  );
}

// ─── FLOATING BADGE ───────────────────────────────────────────────────────────
function FloatingBadge({ icon, text, position, delay, mouse, mobile }) {
  if (mobile) return null;

  const pos = {
    'top-left': { top: '18%', left: '5%' },
    'top-right': { top: '14%', right: '4%' },
    'bottom-left': { bottom: '22%', left: '4%' },
    'bottom-right': { bottom: '18%', right: '5%' },
  }[position] || {};

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        ...pos,
        animation: `hero-badge-enter .8s cubic-bezier(.16,1,.3,1) ${delay}s both`,
        transform: `translate(${mouse.x * 0.07}px, ${mouse.y * 0.07}px)`,
      }}
    >
      <div className="px-3 py-2 rounded-xl flex items-center gap-2 hero-glass-card">
        <span style={{ color: T.pl }}>{icon}</span>
        <span className="hero-font-mono text-[10px] font-bold tracking-widest" style={{ color: '#94a3b8' }}>
          {text}
        </span>
      </div>
    </div>
  );
}

// ─── HERO COMPONENT ───────────────────────────────────────────────────────────
const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [loadingWhatsapp, setLoadingWhatsapp] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState(null);
  const [mobile, setMobile] = useState(false);
  const heroRef = useRef(null);
  const mouse = useMouseParallax(18);

  useEffect(() => {
    const checkMob = () => setMobile(window.innerWidth < 768);
    checkMob();
    window.addEventListener('resize', checkMob);
    return () => window.removeEventListener('resize', checkMob);
  }, []);

  useEffect(() => {
    const h = () => {
      const hH = heroRef.current ? heroRef.current.offsetHeight : window.innerHeight;
      setScrollY(Math.min(window.scrollY / hH, 1));
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setWhatsappNumber(await getWhatsAppNumber());
      } catch {
        // ignore
      }
    })();
  }, []);

  const bunnyProSuite = {
    title: 'Bunny Pro Suite',
    description: 'All-in-one premium tools bundle',
    price: 999,
    originalPrice: 1499,
    discount: 30,
    features: [
      'AI-Powered Tools Access',
      'Advanced Dashboard',
      'Unlimited Usage',
      '24/7 Priority Support',
      'Lifetime Updates',
    ],
  };

  const handlePurchase = async () => {
    try {
      setLoadingWhatsapp(true);
      const number = whatsappNumber || (await getWhatsAppNumber());
      const clean = number.replace('+', '');
      const msg = `✨ *BUNNY PRO SUITE INQUIRY* ✨\n\n📦 Product: ${bunnyProSuite.title}\n💰 Price: Rs. ${bunnyProSuite.price} (${bunnyProSuite.discount}% OFF)\n\n${bunnyProSuite.features
        .map((f) => `✅ ${f}`)
        .join('\n')}\n\nI'd like to proceed with the purchase. Please share payment details. 🙏`;
      window.open(`https://wa.me/${clean}?text=${encodeURIComponent(msg)}`, '_blank');
    } catch {
      alert('Unable to open WhatsApp. Please try again.');
    } finally {
      setLoadingWhatsapp(false);
    }
  };

  const softwareImages = [
    'https://res.cloudinary.com/dxommxt6d/image/upload/v1767184269/znxburenjudygfdmpzxw.webp',
    'https://res.cloudinary.com/dxommxt6d/image/upload/v1767184555/zmrqvw7txeztmhimo7o4.webp',
    'https://res.cloudinary.com/dxommxt6d/image/upload/v1767186255/fen2w8dlushcthzqnmtt.png',
  ];

  const parallaxStyle = mobile
    ? {}
    : {
        transform: `translateY(${scrollY * -58}px)`,
        opacity: Math.max(1 - scrollY * 1.25, 0),
      };

  return (
    <>
      <style>{HERO_CSS}</style>
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden hero-font-body"
        style={{
          background: `
            radial-gradient(circle at 18% 18%, rgba(124,58,237,.14), transparent 34%),
            radial-gradient(circle at 82% 78%, rgba(245,158,11,.08), transparent 30%),
            radial-gradient(circle at 50% 50%, rgba(167,139,250,.05), transparent 42%),
            linear-gradient(135deg,#0b0716,#140b29 52%,#090413)
          `,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(124,58,237,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,.035) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
            transform: mobile ? 'none' : `translate(${mouse.x * 0.04}px,${mouse.y * 0.04}px)`,
          }}
        />

        {!mobile && (
          <>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                width: 700,
                height: 700,
                border: '1px solid rgba(124,58,237,.06)',
                borderRadius: '50%',
                animation: 'hero-spin 90s linear infinite',
              }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                style={{ background: T.pl, opacity: 0.3, boxShadow: `0 0 14px ${T.p}` }}
              />
            </div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                width: 950,
                height: 950,
                border: '1px solid rgba(124,58,237,.035)',
                borderRadius: '50%',
                animation: 'hero-spin-rev 120s linear infinite',
              }}
            >
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full"
                style={{ background: T.y, opacity: 0.22, boxShadow: `0 0 10px ${T.y}` }}
              />
            </div>
          </>
        )}

        <div
          className="absolute pointer-events-none"
          style={{
            top: '10%',
            left: '10%',
            width: mobile ? 220 : 500,
            height: mobile ? 220 : 500,
            background: 'radial-gradient(ellipse,rgba(124,58,237,.12),transparent 65%)',
            animation: 'hero-blob 16s ease-in-out infinite',
            filter: 'blur(55px)',
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: '12%',
            right: '8%',
            width: mobile ? 180 : 360,
            height: mobile ? 180 : 360,
            background: 'radial-gradient(ellipse,rgba(245,158,11,.06),transparent 65%)',
            animation: 'hero-blob 22s ease-in-out 4s infinite',
            filter: 'blur(50px)',
          }}
        />

        <HeroParticles count={mobile ? 10 : 28} />

        <FloatingBadge icon={<Download size={13} />} text="INSTANT DELIVERY" position="top-left" delay={1.3} mouse={mouse} mobile={mobile} />
        <FloatingBadge icon={<Shield size={13} />} text="VERIFIED TOOLS" position="top-right" delay={1.55} mouse={mouse} mobile={mobile} />
        <FloatingBadge icon={<Star size={13} />} text="1000+ CUSTOMERS" position="bottom-left" delay={1.8} mouse={mouse} mobile={mobile} />
        <FloatingBadge icon={<TrendingUp size={13} />} text="98% SATISFACTION" position="bottom-right" delay={2.05} mouse={mouse} mobile={mobile} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-28 sm:py-32 md:py-36" style={parallaxStyle}>
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <div className="hero-ha1">
                <div
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-6"
                  style={{
                    background: 'rgba(124,58,237,.12)',
                    border: '1px solid rgba(124,58,237,.28)',
                    animation: 'hero-glow-pulse 4s ease-in-out 2s infinite',
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: T.pl, animation: 'hero-pulse-dot 2s ease infinite' }} />
                  <span className="hero-font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase" style={{ color: T.pl }}>
                    Premium Digital Tools Platform
                  </span>
                </div>
              </div>

              <div className="hero-ha2">
                <h1 className="hero-font-display font-bold leading-[1.05] mb-6" style={{ letterSpacing: '-.03em' }}>
                  <span className="block text-white" style={{ fontSize: mobile ? 'clamp(2.2rem,9vw,3rem)' : 'clamp(3rem,5.3vw,5.3rem)' }}>
                    Access premium tools
                  </span>
                  <span className="block" style={{ fontSize: mobile ? 'clamp(2.2rem,9vw,3rem)' : 'clamp(3rem,5.3vw,5.3rem)', minHeight: mobile ? '2.8rem' : '1.2em' }}>
                    <HeroWordRotator
                      words={[
                        'at better pricing.',
                        'instantly.',
                        'with full access.',
                        'like a pro.',
                      ]}
                      interval={3200}
                    />
                  </span>
                </h1>
              </div>

              <div className="hero-ha3">
                <div
                  className="mb-6 h-px w-32 md:w-48"
                  style={{
                    background: `linear-gradient(90deg,transparent,${T.pl}60,transparent)`,
                    animation: 'hero-line-grow 1.4s cubic-bezier(.16,1,.3,1) .8s both',
                    transformOrigin: 'center',
                  }}
                />
              </div>

              <div className="hero-ha3">
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-xl" style={{ color: '#94a3b8' }}>
                  Discover premium software subscriptions, high-value digital tools, and reliable access built for creators,
                  freelancers, and businesses that want professional results without inflated pricing.
                </p>
              </div>

              <div className="hero-ha4">
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center gap-2 sm:gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base group relative overflow-hidden"
                    style={{
                      background: T.gP,
                      color: '#fff',
                      textDecoration: 'none',
                      boxShadow: '0 0 50px rgba(124,58,237,.42), 0 0 100px rgba(124,58,237,.12)',
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(105deg,transparent 40%,rgba(255,255,255,.14) 45%,rgba(255,255,255,.28) 50%,rgba(255,255,255,.14) 55%,transparent 60%)',
                        backgroundSize: '250% 100%',
                        animation: 'hero-shimmer 3s ease-in-out infinite',
                      }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      Browse All Tools
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>

                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base group transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,.06)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(124,58,237,.25)',
                      color: '#cbd5e1',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(167,139,250,.42)';
                      e.currentTarget.style.background = 'rgba(255,255,255,.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(124,58,237,.25)';
                      e.currentTarget.style.background = 'rgba(255,255,255,.06)';
                    }}
                  >
                    <Bolt size={16} style={{ color: T.pl }} className="group-hover:scale-110 transition-transform" />
                    Start Exploring
                  </Link>
                </div>
              </div>

              <div className="hero-ha5">
                <div className="flex flex-wrap gap-6 md:gap-10 mt-10 md:mt-12">
                  {[
                    { v: '1000+', l: 'Happy Customers', icon: <Users size={14} /> },
                    { v: '50+', l: 'Premium Tools', icon: <Zap size={14} /> },
                    { v: '98%', l: 'Satisfaction', icon: <TrendingUp size={14} /> },
                  ].map((s, i) => (
                    <div key={i} className="text-center relative">
                      <div className="flex items-center justify-center gap-1 mb-0.5">
                        <span style={{ color: `${T.pl}70` }}>{s.icon}</span>
                        <div className="hero-font-display text-xl md:text-2xl font-bold text-white">{s.v}</div>
                      </div>
                      <div className="hero-font-mono text-[10px] text-gray-500">{s.l}</div>
                      {i < 2 && (
                        <div className="hidden md:block absolute right-[-2rem] top-1/2 -translate-y-1/2 w-px h-8" style={{ background: 'rgba(255,255,255,.06)' }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="hero-ha6">
                <div className="mt-8 flex items-center gap-3 flex-wrap">
                  <div className="flex -space-x-2">
                    {['👩‍💼', '👨‍💻', '👩‍🚀', '🧑‍💼', '👨‍💼'].map((a, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs border-2"
                        style={{ background: 'rgba(124,58,237,.15)', borderColor: T.d }}
                      >
                        {a}
                      </div>
                    ))}
                  </div>
                  <p className="hero-font-mono text-[10px] text-gray-500">Trusted by 1000+ creators & businesses</p>
                </div>
              </div>

              <div className="hero-ha7">
                <div className="mt-12 flex flex-col items-start gap-2" style={{ opacity: Math.max(0.5 - scrollY * 2.5, 0) }}>
                  <span className="hero-font-mono text-[9px] tracking-widest uppercase text-gray-600">Scroll</span>
                  <div className="w-5 h-8 rounded-full flex justify-center pt-1.5" style={{ border: '1px solid rgba(124,58,237,.25)' }}>
                    <div className="w-1 h-2 rounded-full" style={{ background: T.pl, animation: 'hero-scroll-cue 2s ease-in-out infinite' }} />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="relative"
              style={{
                transform: mobile ? 'none' : `translate(${mouse.x * 0.035}px, ${mouse.y * 0.035}px)`,
                transition: 'transform .3s ease',
              }}
            >
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: 'rgba(11,8,24,.62)',
                  border: '1px solid rgba(124,58,237,.18)',
                  backdropFilter: 'blur(22px)',
                  boxShadow: '0 40px 100px rgba(0,0,0,.58), inset 0 1px 0 rgba(255,255,255,.05)',
                  animation: 'hero-float 10s ease-in-out infinite',
                }}
              >
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 20%,rgba(124,58,237,.22),transparent 60%)' }} />

                <div className="relative p-6 md:p-8">
                  <div className="flex items-start justify-between mb-5 gap-3">
                    <div>
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
                        style={{ background: 'rgba(124,58,237,.16)', border: '1px solid rgba(167,139,250,.16)' }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: T.pl, animation: 'hero-pulse-dot 2s ease infinite' }} />
                        <span className="hero-font-mono text-[10px] text-purple-300">FEATURED BUNDLE</span>
                      </div>
                      <h3 className="hero-font-display text-xl md:text-2xl font-bold text-white mb-1">{bunnyProSuite.title}</h3>
                      <p className="text-xs text-purple-300">{bunnyProSuite.description}</p>
                    </div>

                    <div className="text-center px-3 py-2 rounded-xl" style={{ background: T.gY, boxShadow: '0 4px 20px rgba(245,158,11,.25)' }}>
                      <div className="hero-font-mono text-[9px] font-bold text-amber-900">SAVE</div>
                      <div className="hero-font-display text-lg font-bold text-amber-900">{bunnyProSuite.discount}%</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {softwareImages.map((img, i) => (
                      <div
                        key={i}
                        className="rounded-xl overflow-hidden"
                        style={{
                          background: 'rgba(255,255,255,.05)',
                          border: '1px solid rgba(255,255,255,.07)',
                          aspectRatio: '1',
                        }}
                      >
                        <img src={img} alt={`Tool ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    ))}
                  </div>

                  <div className="mb-5 space-y-2">
                    {bunnyProSuite.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: T.y }} />
                        <span className="text-xs text-purple-200">{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 gap-4" style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
                    <div>
                      <div className="hero-font-display text-2xl font-bold text-white">Rs. {bunnyProSuite.price}</div>
                      <div className="text-xs line-through" style={{ color: 'rgba(255,255,255,.35)' }}>
                        Rs. {bunnyProSuite.originalPrice}
                      </div>
                    </div>
                    <button
                      onClick={handlePurchase}
                      disabled={loadingWhatsapp}
                      className="relative overflow-hidden px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300"
                      style={{
                        background: T.gP,
                        color: '#fff',
                        boxShadow: '0 0 24px rgba(124,58,237,.36)',
                        opacity: loadingWhatsapp ? 0.7 : 1,
                      }}
                    >
                      {loadingWhatsapp ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Loading...
                        </div>
                      ) : (
                        'Get Access →'
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-5 -left-5 rounded-2xl p-4 w-52 shadow-2xl hidden md:flex items-center gap-3"
                style={{
                  background: 'rgba(15,10,30,.88)',
                  border: '1px solid rgba(124,58,237,.18)',
                  backdropFilter: 'blur(24px)',
                  animation: 'hero-badge-enter .8s cubic-bezier(.16,1,.3,1) 1.2s both',
                }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(16,185,129,.15)', color: '#10b981' }}>
                  <Download size={20} />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Instant Access</div>
                  <div className="text-xs text-gray-500">Ready in &lt;60 seconds</div>
                </div>
              </div>

              <div
                className="absolute -top-5 -right-5 rounded-2xl p-4 w-52 shadow-2xl hidden md:flex items-center gap-3"
                style={{
                  background: 'rgba(15,10,30,.88)',
                  border: '1px solid rgba(124,58,237,.18)',
                  backdropFilter: 'blur(24px)',
                  animation: 'hero-badge-enter .8s cubic-bezier(.16,1,.3,1) 1.5s both',
                }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(124,58,237,.15)', color: T.pl }}>
                  <Shield size={20} />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">30-Day Guarantee</div>
                  <div className="text-xs text-gray-500">Risk-free purchase</div>
                </div>
              </div>

              <div
                className="absolute inset-0 -z-10 rounded-3xl"
                style={{
                  background: 'radial-gradient(ellipse,rgba(124,58,237,.22),transparent 65%)',
                  filter: 'blur(30px)',
                  transform: 'scale(1.15)',
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
