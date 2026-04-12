// // src/components/products/ProductCard.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { Star, TrendingUp, Zap, Shield, Heart, ShoppingBag, Eye } from 'lucide-react';

// function ProductCard({ product, featured = false }) {
//   const mainImage =
//     product.images && product.images.length > 0
//       ? product.images[0].image
//       : null;

//   const discountPercentage = product.discount_percentage || 0;
//   const isOnSale = discountPercentage > 0;
//   const isFeatured = product.is_featured || featured;
//   const isTrending = product.is_trending || false;

//   return (
//     <div className="group relative bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200">
//       {/* Badges Container */}
//       <div className="absolute top-4 left-4 z-10 space-y-2">
//         {isOnSale && (
//           <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-r-lg shadow-lg">
//             -{discountPercentage}% OFF
//           </div>
//         )}
        
//         {isFeatured && (
//           <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-bold px-3 py-1.5 rounded-r-lg shadow-lg flex items-center gap-1.5">
//             <Star className="w-3 h-3 fill-current" />
//             Featured
//           </div>
//         )}
        
//         {isTrending && (
//           <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-r-lg shadow-lg flex items-center gap-1.5">
//             <TrendingUp className="w-3 h-3" />
//             Trending
//           </div>
//         )}
//       </div>

//       {/* Quick Action Buttons */}
//       <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
//         <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
//           <Heart className="w-4 h-4 text-gray-600" />
//         </button>
//         <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
//           <Eye className="w-4 h-4 text-gray-600" />
//         </button>
//       </div>

//       {/* Image Container */}
//       <Link to={`/product/${product.id}`}>
//         <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
//           {mainImage ? (
//             <>
//               <img
//                 src={mainImage}
//                 alt={product.title}
//                 className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//                 loading="lazy"
//               />
//               {/* Image Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             </>
//           ) : (
//             <div className="flex h-full w-full items-center justify-center text-gray-400">
//               <div className="text-center">
//                 <div className="text-5xl mb-2">📷</div>
//                 <div className="text-sm font-medium">No Image Available</div>
//               </div>
//             </div>
//           )}
//         </div>
//       </Link>

//       {/* Content */}
//       <div className="p-5">
//         {/* Categories */}
//         {product.categories?.length > 0 && (
//           <div className="flex items-center gap-2 mb-3">
//             {product.categories.slice(0, 2).map((cat) => (
//               <Link
//                 key={cat.id}
//                 to={`/category/${cat.slug || cat.id}`}
//                 className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-brand-purple hover:bg-purple-100 transition-colors"
//               >
//                 {cat.name}
//               </Link>
//             ))}
//             {product.categories.length > 2 && (
//               <span className="text-xs text-gray-500 font-medium">
//                 +{product.categories.length - 2}
//               </span>
//             )}
//           </div>
//         )}

//         {/* Title */}
//         <Link to={`/product/${product.id}`}>
//           <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-brand-purple transition-colors">
//             {product.title}
//           </h3>
//         </Link>

//         {/* Rating & Reviews */}
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-1">
//             <div className="flex">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className={`w-4 h-4 ${
//                     i < (product.rating || 4)
//                       ? "text-yellow-400 fill-current"
//                       : "text-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>
//             <span className="text-sm text-gray-600 ml-2">
//               ({product.review_count || 0} reviews)
//             </span>
//           </div>
          
//           {/* Best Seller Badge */}
//           {product.is_bestseller && (
//             <span className="text-xs px-2.5 py-1 bg-yellow-100 text-yellow-800 font-medium rounded-full">
//               Bestseller
//             </span>
//           )}
//         </div>

//         {/* Description */}
//         {product.short_description && (
//           <p className="text-sm text-gray-600 mb-5 line-clamp-2">
//             {product.short_description}
//           </p>
//         )}

//         {/* Price & Actions Section */}
//         <div className="pt-4 border-t border-gray-100">
//           {/* Price Row */}
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-baseline gap-2">
//               <span className="text-2xl font-bold text-gray-900">
//                 {product.price !== null && product.price !== undefined
//                   ? `Rs. ${product.price.toLocaleString()}`
//                   : "Contact for Price"}
//               </span>
              
//               {product.original_price && product.price < product.original_price && (
//                 <div className="flex flex-col">
//                   <span className="text-sm text-gray-500 line-through">
//                     Rs. {product.original_price.toLocaleString()}
//                   </span>
//                   <span className="text-xs text-red-500 font-medium">
//                     Save Rs. {(product.original_price - product.price).toLocaleString()}
//                   </span>
//                 </div>
//               )}
//             </div>

//             {/* Unit Price */}
//             {product.price_type === 'per_unit' && product.unit && (
//               <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
//                 Per {product.unit}
//               </div>
//             )}
//           </div>

//           {/* Features */}
//           <div className="grid grid-cols-2 gap-3 mb-4">
//             <div className="flex items-center text-xs text-gray-600">
//               <Shield className="w-3 h-3 mr-1.5 text-green-500 flex-shrink-0" />
//               <span className="truncate">Warranty Included</span>
//             </div>
            
//             {product.delivery_days && (
//               <div className="flex items-center text-xs text-gray-600">
//                 <Zap className="w-3 h-3 mr-1.5 text-blue-500 flex-shrink-0" />
//                 <span className="truncate">{product.delivery_days} Day Delivery</span>
//               </div>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-2">
//             <Link
//               to={`/product/${product.id}`}
//               className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-semibold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 flex items-center justify-center gap-2"
//             >
//               <ShoppingBag className="w-4 h-4" />
//               View Details
//             </Link>
//             <button className="w-12 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center">
//               <Heart className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Hover Effect */}
//       <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-200 rounded-xl transition-colors duration-300 pointer-events-none"></div>
//     </div>
//   );
// }

// export default ProductCard;

// src/components/products/ProductCard.jsx - Extreme 3D Box Card
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, TrendingUp, Zap, Shield, Heart, ShoppingBag, Eye, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

const T = {
  p: '#7c3aed', pl: '#a78bfa', y: '#f59e0b',
  d: '#0f0a1e',
  gP: 'linear-gradient(135deg,#7c3aed,#a855f7)',
  glow: '0 0 50px rgba(124,58,237,.25)',
};

const CARD_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@500;600;700&family=Cabinet+Grotesk:wght@400;500;700;800&family=Fira+Code:wght@400;500&display=swap');

.pc-font-display { font-family:'Clash Display',sans-serif }
.pc-font-mono    { font-family:'Fira Code',monospace }
.pc-font-body    { font-family:'Cabinet Grotesk',sans-serif }

@keyframes pc-shimmer  { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
@keyframes pc-float   { 0%,100%{transform:translateY(0) translateZ(0)} 50%{transform:translateY(-6px) translateZ(20px)} }
@keyframes pc-grad-x  { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
@keyframes pc-rotate3d { 0%{transform:rotateY(0deg)} 100%{transform:rotateY(360deg)} }
@keyframes pc-glow-pulse { 0%,100%{opacity:.3} 50%{opacity:.7} }

.pc-text-grad {
  background: linear-gradient(90deg,#7c3aed,#a855f7,#c084fc);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: pc-grad-x 4s ease infinite;
}
`;

// ─── 3D BOX CARD COMPONENT ────────────────────────────────────────────────────
function ProductCard({ product, featured = false }) {
  const [hover, setHover] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [wishlist, setWishlist] = useState(false);
  const cardRef = useRef(null);
  const contentRef = useRef(null);

  const mainImage = product.images && product.images.length > 0 ? product.images[0].image : null;
  const discountPct = product.discount_percentage || 0;
  const isOnSale = discountPct > 0;
  const isFeatured = product.is_featured || featured;
  const isTrending = product.is_trending || false;
  const rating = product.rating || 4;
  const reviewCount = product.review_count || 0;

  // 3D Transform calculations
  const calculate3DTransform = () => {
    if (!hover) return 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    
    const rotateY = (mousePos.x - 0.5) * 25; // -12.5 to 12.5 degrees
    const rotateX = (mousePos.y - 0.5) * -20; // -10 to 10 degrees
    const translateZ = 30;
    
    return `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
  };

  // Shadow calculations based on mouse position
  const calculateShadow = () => {
    if (!hover) return '0 4px 20px rgba(0,0,0,.1), 0 2px 8px rgba(124,58,237,.05)';
    
    const shadowX = (mousePos.x - 0.5) * 30;
    const shadowY = (mousePos.y - 0.5) * 20 + 15;
    const blur = 40;
    const spread = -5;
    
    return `
      ${shadowX}px ${shadowY}px ${blur}px ${spread}px rgba(124,58,237,.25),
      ${shadowX * 1.5}px ${shadowY * 1.5}px 60px rgba(124,58,237,.15),
      0 30px 60px rgba(0,0,0,.2),
      inset 0 0 0 1px rgba(255,255,255,.1)
    `;
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
    setMousePos({ x: 0.5, y: 0.5 });
  };

  // Calculate light position for 3D effect
  const lightX = mousePos.x * 100;
  const lightY = mousePos.y * 100;

  return (
    <>
      <style>{CARD_CSS}</style>
      <div
        ref={cardRef}
        className="pc-font-body relative cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          transform: calculate3DTransform(),
          transition: hover 
            ? 'transform 0.1s ease-out' 
            : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Card Body with 3D Extrusion Effect */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: calculateShadow(),
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {/* 3D Extrusion Layers (Side thickness effect) */}
          {hover && (
            <>
              {/* Bottom extrusion */}
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  transform: 'translateZ(-8px)',
                  background: 'linear-gradient(135deg,#5b21b6,#4c1d95)',
                  filter: 'brightness(0.7)',
                }}
              />
              {/* Left extrusion */}
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  transform: 'translateX(-6px) translateZ(-4px)',
                  background: 'linear-gradient(90deg,#6d28d9,#5b21b6)',
                  filter: 'brightness(0.8)',
                }}
              />
              {/* Right extrusion */}
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  transform: 'translateX(6px) translateZ(-4px)',
                  background: 'linear-gradient(270deg,#6d28d9,#5b21b6)',
                  filter: 'brightness(0.8)',
                }}
              />
            </>
          )}

          {/* Front Face - Main Content */}
          <div
            ref={contentRef}
            className="relative rounded-2xl overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              background: hover 
                ? 'linear-gradient(135deg,rgba(255,255,255,.95),rgba(255,255,255,.85))' 
                : 'linear-gradient(135deg,rgba(255,255,255,.9),rgba(255,255,255,.75))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(124,58,237,.15)',
            }}
          >
            {/* Dynamic Light Reflection */}
            {hover && (
              <div 
                className="absolute inset-0 pointer-events-none z-30"
                style={{
                  background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,.4) 0%, rgba(124,58,237,.1) 40%, transparent 70%)`,
                  mixBlendMode: 'overlay',
                }}
              />
            )}

            {/* Glossy Overlay */}
            {hover && (
              <div 
                className="absolute inset-0 pointer-events-none z-25"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(255,255,255,.5) 0%, 
                    transparent 30%,
                    transparent 70%,
                    rgba(124,58,237,.2) 100%)`,
                }}
              />
            )}

            {/* Edge Highlight */}
            <div 
              className="absolute inset-0 rounded-2xl pointer-events-none z-20"
              style={{
                boxShadow: hover 
                  ? `inset 0 0 0 1px rgba(255,255,255,.3), inset 0 0 20px rgba(124,58,237,.1)`
                  : 'inset 0 0 0 1px rgba(124,58,237,.08)',
                transition: 'box-shadow 0.3s ease',
              }}
            />

            {/* Badges - Floating 3D Style */}
            <div className="absolute top-3 left-3 z-40 flex flex-col gap-1.5" style={{ transform: 'translateZ(25px)' }}>
              {isOnSale && (
                <div 
                  className="pc-font-mono text-[10px] font-bold px-3 py-1.5 rounded-xl text-white"
                  style={{
                    background: 'linear-gradient(135deg,#ef4444,#dc2626)',
                    boxShadow: hover 
                      ? '0 8px 20px rgba(239,68,68,.4), 0 2px 4px rgba(0,0,0,.2)' 
                      : '0 4px 12px rgba(239,68,68,.3)',
                    transform: hover ? 'translateZ(5px)' : 'translateZ(0)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  -{discountPct}% OFF
                </div>
              )}
              {isFeatured && (
                <div 
                  className="pc-font-mono text-[10px] font-bold px-3 py-1.5 rounded-xl text-white flex items-center gap-1"
                  style={{
                    background: T.gP,
                    boxShadow: hover 
                      ? '0 8px 20px rgba(124,58,237,.4), 0 2px 4px rgba(0,0,0,.2)' 
                      : '0 4px 12px rgba(124,58,237,.35)',
                    transform: hover ? 'translateZ(8px)' : 'translateZ(0)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Star size={10} fill="white" /> Featured
                </div>
              )}
              {isTrending && (
                <div 
                  className="pc-font-mono text-[10px] font-bold px-3 py-1.5 rounded-xl text-white flex items-center gap-1"
                  style={{
                    background: 'linear-gradient(135deg,#f59e0b,#d97706)',
                    boxShadow: hover 
                      ? '0 8px 20px rgba(245,158,11,.4), 0 2px 4px rgba(0,0,0,.2)' 
                      : '0 4px 12px rgba(245,158,11,.3)',
                    transform: hover ? 'translateZ(5px)' : 'translateZ(0)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <TrendingUp size={10} /> Trending
                </div>
              )}
            </div>

            {/* Quick Actions - 3D Floating */}
            <div 
              className="absolute top-3 right-3 z-40 flex flex-col gap-2"
              style={{
                transform: hover ? 'translateZ(35px)' : 'translateZ(10px)',
                opacity: hover ? 1 : 0,
                transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            >
              <button
                onClick={(e) => { e.preventDefault(); setWishlist(w => !w); }}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: wishlist ? 'rgba(239,68,68,.2)' : 'rgba(255,255,255,.9)',
                  backdropFilter: 'blur(10px)',
                  border: wishlist ? '1px solid rgba(239,68,68,.4)' : '1px solid rgba(124,58,237,.2)',
                  color: wishlist ? '#ef4444' : '#64748b',
                  boxShadow: '0 8px 20px rgba(0,0,0,.15)',
                  transform: hover ? 'translateZ(5px)' : 'translateZ(0)',
                }}
              >
                <Heart size={16} fill={wishlist ? '#ef4444' : 'transparent'} />
              </button>
              <Link 
                to={`/product/${product.id}`} 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(255,255,255,.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(124,58,237,.2)',
                  color: '#64748b',
                  boxShadow: '0 8px 20px rgba(0,0,0,.15)',
                  transform: hover ? 'translateZ(5px)' : 'translateZ(0)',
                }}
              >
                <Eye size={16} />
              </Link>
            </div>

            {/* Image Container with 3D Depth */}
            <Link to={`/product/${product.id}`}>
              <div 
                className="relative overflow-hidden"
                style={{ 
                  height: 220,
                  transform: hover ? 'translateZ(15px)' : 'translateZ(0)',
                  transition: 'transform 0.4s ease',
                }}
              >
                {mainImage ? (
                  <>
                    <img
                      src={mainImage}
                      alt={product.title}
                      className="w-full h-full object-cover transition-all duration-700"
                      style={{
                        transform: hover ? 'scale(1.1) translateZ(10px)' : 'scale(1) translateZ(0)',
                      }}
                      loading="lazy"
                    />
                    
                    {/* 3D Shimmer Effect */}
                    {hover && (
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(105deg,transparent 35%,rgba(255,255,255,.1) 42%,rgba(255,255,255,.3) 50%,rgba(255,255,255,.1) 58%,transparent 65%)',
                          backgroundSize: '250% 100%',
                          animation: 'pc-shimmer 2s ease-in-out infinite',
                          transform: 'translateZ(5px)',
                        }}
                      />
                    )}
                    
                    {/* Bottom Gradient */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to top,rgba(0,0,0,.4) 0%,transparent 50%)',
                        transform: hover ? 'translateZ(5px)' : 'translateZ(0)',
                      }}
                    />
                  </>
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg,rgba(124,58,237,.15),rgba(124,58,237,.05))',
                      transform: hover ? 'translateZ(5px)' : 'translateZ(0)',
                    }}
                  >
                    <div className="text-center">
                      <div className="text-5xl mb-2">📦</div>
                      <div className="pc-font-mono text-[11px] text-gray-500">No Preview</div>
                    </div>
                  </div>
                )}

                {/* 3D Color Bar */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-[3px]"
                  style={{
                    background: T.gP,
                    transform: hover ? 'scaleX(1) translateZ(8px)' : 'scaleX(0) translateZ(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.5s cubic-bezier(.16,1,.3,1)',
                  }}
                />
              </div>
            </Link>

            {/* Content Area with 3D Layering */}
            <div 
              className="relative z-10 p-5"
              style={{
                transform: hover ? 'translateZ(20px)' : 'translateZ(0)',
                transition: 'transform 0.4s ease',
              }}
            >
              {/* Categories */}
              {product.categories?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {product.categories.slice(0, 2).map(cat => (
                    <Link 
                      key={cat.id} 
                      to={`/category/${cat.slug || cat.id}`}
                      className="pc-font-mono text-[9px] font-bold px-2.5 py-1 rounded-lg transition-all duration-300"
                      style={{
                        background: 'rgba(124,58,237,.1)',
                        color: T.p,
                        border: '1px solid rgba(124,58,237,.15)',
                        transform: hover ? 'translateZ(5px)' : 'translateZ(0)',
                      }}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Title */}
              <Link to={`/product/${product.id}`}>
                <h3 
                  className="pc-font-display text-base font-bold mb-2 line-clamp-2 leading-snug transition-all duration-300"
                  style={{
                    color: hover ? T.p : '#1e1b4b',
                    textShadow: hover ? '0 2px 4px rgba(124,58,237,.1)' : 'none',
                  }}
                >
                  {product.title}
                </h3>
              </Link>

              {/* Rating with 3D Stars */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={13} 
                      style={{ 
                        color: i < rating ? T.y : '#d1d5db',
                        fill: i < rating ? T.y : 'transparent',
                        filter: hover && i < rating ? 'drop-shadow(0 0 4px rgba(245,158,11,.5))' : 'none',
                      }} 
                    />
                  ))}
                </div>
                <span className="pc-font-mono text-[10px] text-gray-400">({reviewCount})</span>
                {product.is_bestseller && (
                  <span 
                    className="pc-font-mono text-[9px] px-2 py-0.5 rounded-full"
                    style={{
                      background: 'rgba(245,158,11,.15)',
                      color: '#b45309',
                      transform: hover ? 'translateZ(3px)' : 'translateZ(0)',
                    }}
                  >
                    Bestseller
                  </span>
                )}
              </div>

              {/* Short Description */}
              {product.short_description && (
                <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                  {product.short_description}
                </p>
              )}

              {/* Trust Badges */}
              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-1.5">
                  <Shield size={12} style={{ color: '#10b981' }} />
                  <span className="pc-font-mono text-[9px] text-gray-400">Verified</span>
                </div>
                {product.delivery_days && (
                  <div className="flex items-center gap-1.5">
                    <Zap size={12} style={{ color: T.pl }} />
                    <span className="pc-font-mono text-[9px] text-gray-400">{product.delivery_days}d</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={12} style={{ color: T.p }} />
                  <span className="pc-font-mono text-[9px] text-gray-400">Genuine</span>
                </div>
              </div>

              {/* Price & CTA */}
              <div 
                className="pt-4"
                style={{ 
                  borderTop: '1px solid rgba(124,58,237,.1)',
                  transform: hover ? 'translateZ(5px)' : 'translateZ(0)',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="pc-font-display text-2xl font-bold" style={{ color: '#1e1b4b' }}>
                      {product.price != null ? `Rs. ${product.price.toLocaleString()}` : 'Contact Us'}
                    </div>
                    {product.original_price && product.price < product.original_price && (
                      <div className="flex items-center gap-2">
                        <span className="pc-font-mono text-[10px] line-through text-gray-400">
                          Rs. {product.original_price.toLocaleString()}
                        </span>
                        <span className="pc-font-mono text-[9px] font-bold" style={{ color: '#ef4444' }}>
                          Save Rs. {(product.original_price - product.price).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link 
                    to={`/product/${product.id}`} 
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-white transition-all duration-300 group"
                    style={{
                      background: T.gP,
                      boxShadow: hover 
                        ? '0 12px 30px rgba(124,58,237,.4), 0 4px 8px rgba(0,0,0,.2)' 
                        : '0 4px 12px rgba(124,58,237,.2)',
                      transform: hover ? 'translateZ(10px)' : 'translateZ(0)',
                    }}
                  >
                    <ShoppingBag size={16} />
                    View Details
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button
                    onClick={(e) => { e.preventDefault(); setWishlist(w => !w); }}
                    className="w-12 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: wishlist ? 'rgba(239,68,68,.15)' : 'rgba(124,58,237,.1)',
                      border: `1px solid ${wishlist ? 'rgba(239,68,68,.3)' : 'rgba(124,58,237,.15)'}`,
                      color: wishlist ? '#ef4444' : T.p,
                      transform: hover ? 'translateZ(10px)' : 'translateZ(0)',
                      boxShadow: hover ? '0 8px 20px rgba(0,0,0,.1)' : 'none',
                    }}
                  >
                    <Heart size={16} fill={wishlist ? '#ef4444' : 'transparent'} />
                  </button>
                </div>
              </div>
            </div>

            {/* Sparkle Effect on Hover */}
            {hover && (
              <div className="absolute top-1/4 right-1/4 pointer-events-none z-50">
                <Sparkles 
                  size={20} 
                  style={{ 
                    color: T.pl,
                    filter: 'drop-shadow(0 0 10px rgba(124,58,237,.5))',
                    animation: 'pc-float 2s ease-in-out infinite',
                  }} 
                />
              </div>
            )}
          </div>
        </div>

        {/* Floating Shadow on Ground */}
        <div 
          className="absolute -bottom-4 left-1/2 w-[90%] h-8 rounded-full bg-black/20 blur-xl"
          style={{
            transform: `translateX(-50%) translateZ(-20px) scale(${hover ? 1.1 : 1})`,
            opacity: hover ? 0.4 : 0.2,
            transition: 'all 0.4s ease',
          }}
        />
      </div>
    </>
  );
}

export default ProductCard;