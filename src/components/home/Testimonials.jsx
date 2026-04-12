// // src/components/home/Testimonials.jsx
// import React, { useState, useEffect } from 'react';
// import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

// const Testimonials = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [autoplay, setAutoplay] = useState(true);

//   const testimonials = [
//     {
//       name: "Hira Malik",
//       role: ".",
//       content: "Very reliable service. Got my LinkedIn Premium and VidIQ instantly. Customer support is super helpful.",
//       rating: 5,
//       image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed"
//     },
//     {
//       name: "Sara Khan",
//       role: "",
//       content: "Affordable prices and real accounts. I’ve been using their tools for months without any issues",
//       rating: 5,
//       image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara"
//     },
//     {
//       name: "Ali Hassan",
//       role: "",
//       content: "Best platform for premium tools. I got Google AI and CapCut Pro in minutes. Smooth experience and great support",
//       rating: 5,
//       image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali"
//     },
//     {
//       name: "Fatima Ahmed",
//       role: "",
//       content: "Bought ChatGPT Plus and Canva Pro from here. Instant delivery and 100% genuine access. Highly recommended!",
//       rating: 4,
//       image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima"
//     },
//     {
//       name: "Omar Sheikh",
//       role: "",
//       content: "Perfect place for digital creators. All premium tools in one place at a very reasonable price.",
//       rating: 5,
//       image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar"
//     }
//   ];

//   useEffect(() => {
//     let interval;
//     if (autoplay) {
//       interval = setInterval(() => {
//         setActiveIndex((prev) => (prev + 1) % testimonials.length);
//       }, 4000);
//     }
//     return () => clearInterval(interval);
//   }, [autoplay, testimonials.length]);

//   const nextSlide = () => {
//     setActiveIndex((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevSlide = () => {
//     setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   return (
//     <section className="py-20 bg-gradient-to-b from-white to-gray-50">
//       <div className="container mx-auto px-4 lg:px-8">
//         {/* Header */}
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-50 border border-yellow-100 mb-6">
//             <Star className="w-4 h-4 text-yellow-500 mr-2 fill-current" />
//             <span className="text-sm font-medium text-yellow-700">Testimonials</span>
//           </div>
          
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//             What Our <span className="gradient-text">Clients Say</span>
//           </h2>
          
//           <p className="text-lg text-gray-600">
//             Don't just take our word for it. Here's what our satisfied customers have to say about their experience.
//           </p>
//         </div>

//         {/* Main Testimonial Carousel */}
//         <div className="relative max-w-4xl mx-auto">
//           <Quote className="absolute -top-6 -left-6 w-12 h-12 text-purple-100 -z-10" />
          
//           <div 
//             className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden"
//             onMouseEnter={() => setAutoplay(false)}
//             onMouseLeave={() => setAutoplay(true)}
//           >
//             {/* Background Pattern */}
//             <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            
//             <div className="relative">
//               {/* Rating */}
//               <div className="flex mb-6">
//                 {[...Array(5)].map((_, i) => (
//                   <Star 
//                     key={i}
//                     className={`w-5 h-5 ${i < testimonials[activeIndex].rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
//                   />
//                 ))}
//               </div>

//               {/* Content */}
//               <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 leading-relaxed">
//                 "{testimonials[activeIndex].content}"
//               </blockquote>

//               {/* Author */}
//               <div className="flex items-center">
//                 <img
//                   src={testimonials[activeIndex].image}
//                   alt={testimonials[activeIndex].name}
//                   className="h-14 w-14 rounded-full bg-gradient-to-r from-brand-purple to-purple-600 p-1"
//                 />
//                 <div className="ml-4">
//                   <div className="font-bold text-gray-900 text-lg">
//                     {testimonials[activeIndex].name}
//                   </div>
//                   <div className="text-gray-600">
//                     {testimonials[activeIndex].role}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Navigation Buttons */}
//             <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between">
//               <button
//                 onClick={prevSlide}
//                 className="h-10 w-10 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all shadow-lg"
//               >
//                 <ChevronLeft className="w-5 h-5" />
//               </button>
//               <button
//                 onClick={nextSlide}
//                 className="h-10 w-10 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all shadow-lg"
//               >
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           {/* Dots Navigation */}
//           <div className="flex justify-center space-x-2 mt-8">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setActiveIndex(index)}
//                 className={`h-2 rounded-full transition-all duration-300 ${
//                   index === activeIndex 
//                     ? 'w-8 bg-brand-purple' 
//                     : 'w-2 bg-gray-300 hover:bg-gray-400'
//                 }`}
//                 aria-label={`Go to testimonial ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Small Testimonials Grid */}
//         <div className="grid md:grid-cols-3 gap-6 mt-16">
//           {testimonials.slice(0, 3).map((testimonial, index) => (
//             <div 
//               key={index} 
//               className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-shadow"
//             >
//               <div className="flex items-center mb-4">
//                 <img
//                   src={testimonial.image}
//                   alt={testimonial.name}
//                   className="h-12 w-12 rounded-full"
//                 />
//                 <div className="ml-4">
//                   <div className="font-semibold text-gray-900">{testimonial.name}</div>
//                   <div className="text-sm text-gray-600">{testimonial.role}</div>
//                 </div>
//               </div>
//               <div className="flex mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <Star 
//                     key={i}
//                     className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
//                   />
//                 ))}
//               </div>
//               <p className="text-gray-600 line-clamp-3">"{testimonial.content}"</p>
//             </div>
//           ))}
//         </div>

//         {/* Trust Badges */}
//         <div className="mt-20 bg-gradient-to-r from-brand-purple to-purple-700 rounded-3xl p-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//             <div>
//               <div className="text-4xl font-bold text-white mb-2">500+</div>
//               <div className="text-purple-200">Happy Clients</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold text-white mb-2">98%</div>
//               <div className="text-purple-200">Satisfaction Rate</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold text-white mb-2">4.9/5</div>
//               <div className="text-purple-200">Average Rating</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold text-white mb-2">24/7</div>
//               <div className="text-purple-200">Support</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;








// src/components/home/Testimonials.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const T = {
  p: '#7c3aed', pl: '#a78bfa', y: '#f59e0b',
  d: '#0f0a1e', dd: '#160d2e',
  gP: 'linear-gradient(135deg,#7c3aed,#a855f7)',
};

const TESTIMONIALS_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@500;600;700&family=Cabinet+Grotesk:wght@400;500;700;800&family=Fira+Code:wght@400;500&display=swap');

.t-font-display { font-family:'Clash Display',sans-serif }
.t-font-mono    { font-family:'Fira Code',monospace }
.t-font-body    { font-family:'Cabinet Grotesk',sans-serif }

@keyframes t-fade-up  { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
@keyframes t-grad-x   { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
@keyframes t-blob     { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 50%{border-radius:40% 60% 70% 30%/50% 40% 60% 50%} }
@keyframes t-pulse    { 0%,100%{opacity:1} 50%{opacity:.4} }
@keyframes t-card-in  { from{opacity:0;transform:translateX(40px) scale(.96)} to{opacity:1;transform:translateX(0) scale(1)} }
@keyframes t-shimmer  { 0%{background-position:-200% 0} 100%{background-position:200% 0} }

.t-glass {
  background: rgba(255,255,255,.04);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,.08);
}
.t-glass-light {
  background: rgba(255,255,255,.65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(124,58,237,.1);
}
.t-text-grad {
  background: linear-gradient(90deg,#7c3aed,#a855f7,#c084fc);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: t-grad-x 5s ease infinite;
}
`;

function useInView(ref, th = 0.08) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: th });
    obs.observe(el); return () => obs.disconnect();
  }, [ref, th]);
  return v;
}

function Reveal({ children, delay = 0, dir = 'up', className = '' }) {
  const ref = useRef(null);
  const iv = useInView(ref);
  const dx = { up: [0, 44], left: [44, 0], right: [-44, 0], scale: [0, 0] }[dir] || [0, 44];
  return (
    <div ref={ref} className={className} style={{
      transform: iv ? 'translate(0,0) scale(1)' : `translate(${dx[0]}px,${dx[1]}px) scale(${dir === 'scale' ? .88 : 1})`,
      opacity: iv ? 1 : 0,
      transition: `all .85s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

const testimonials = [
  { name: 'Hira Malik', role: 'Digital Creator', content: 'Very reliable service. Got my LinkedIn Premium and VidIQ instantly. Customer support is super helpful and responsive.', rating: 5, avatar: '👩‍💼', initials: 'HM' },
  { name: 'Sara Khan', role: 'Freelancer', content: 'Affordable prices and real accounts. I\'ve been using their tools for months without any issues. Best platform for subscriptions!', rating: 5, avatar: '👩‍🚀', initials: 'SK' },
  { name: 'Ali Hassan', role: 'Content Creator', content: 'Best platform for premium tools. I got Google AI and CapCut Pro in minutes. Smooth experience and great support throughout.', rating: 5, avatar: '👨‍💻', initials: 'AH' },
  { name: 'Fatima Ahmed', role: 'Entrepreneur', content: 'Bought ChatGPT Plus and Canva Pro from here. Instant delivery and 100% genuine access. Highly recommended to everyone!', rating: 4, avatar: '💼', initials: 'FA' },
  { name: 'Omar Sheikh', role: 'Marketing Manager', content: 'Perfect place for digital creators. All premium tools in one place at a very reasonable price. Will definitely buy again.', rating: 5, avatar: '🧑‍💼', initials: 'OS' },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef(null);
  const iv = useInView(containerRef, .1);

  useEffect(() => {
    let t;
    if (autoplay) t = setInterval(() => { setDirection(1); setActive(p => (p + 1) % testimonials.length); }, 4500);
    return () => clearInterval(t);
  }, [autoplay]);

  const goNext = () => { setDirection(1); setActive(p => (p + 1) % testimonials.length); };
  const goPrev = () => { setDirection(-1); setActive(p => (p - 1 + testimonials.length) % testimonials.length); };

  return (
    <>
      <style>{TESTIMONIALS_CSS}</style>
      <section ref={containerRef} className="t-font-body py-20 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#0f0a1e,#160d2e 50%,#0a0519)' }}>

        {/* Background blobs */}
        <div className="absolute pointer-events-none" style={{ top: '15%', left: '5%', width: 300, height: 300, background: 'radial-gradient(ellipse,rgba(124,58,237,.08),transparent 65%)', animation: 't-blob 18s ease-in-out infinite', filter: 'blur(50px)' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '10%', right: '5%', width: 250, height: 250, background: 'radial-gradient(ellipse,rgba(245,158,11,.06),transparent 65%)', animation: 't-blob 24s ease-in-out 5s infinite', filter: 'blur(50px)' }} />

        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px,rgba(124,58,237,.04) 1px,transparent 0)', backgroundSize: '44px 44px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">

          {/* Header */}
          <div className="text-center mb-14 md:mb-18">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(124,58,237,.1)', border: '1px solid rgba(124,58,237,.25)' }}>
                <Star size={13} style={{ color: T.y, fill: T.y }} />
                <span className="t-font-mono text-[10px] font-bold tracking-widest uppercase" style={{ color: T.pl }}>Customer Reviews</span>
              </div>
            </Reveal>
            <Reveal delay={.06}>
              <h2 className="t-font-display text-3xl md:text-5xl font-bold text-white mb-3">
                Loved by <span className="t-text-grad">1000+</span> customers.
              </h2>
            </Reveal>
            <Reveal delay={.1}>
              <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto">
                Don't take our word for it. Here's what creators and businesses say about Bunny Tools.
              </p>
            </Reveal>
          </div>

          {/* Main testimonial showcase */}
          <div className="max-w-4xl mx-auto mb-16"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <div className="relative rounded-3xl overflow-hidden" style={{
              background: 'rgba(124,58,237,.07)',
              border: '1px solid rgba(124,58,237,.18)',
              backdropFilter: 'blur(28px)',
              boxShadow: '0 40px 100px rgba(0,0,0,.5)',
            }}>
              {/* Inner glow */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 0%,rgba(124,58,237,.15),transparent 55%)' }} />

              <div className="relative p-8 md:p-12">
                {/* Quote icon */}
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(124,58,237,.15)', border: '1px solid rgba(124,58,237,.2)' }}>
                    <Quote size={22} style={{ color: T.pl }} />
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} style={{ color: i < testimonials[active].rating ? T.y : 'rgba(255,255,255,.15)', fill: i < testimonials[active].rating ? T.y : 'transparent' }} />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="t-font-display text-xl md:text-2xl lg:text-3xl font-medium text-white leading-relaxed mb-8" key={active} style={{ animation: 't-fade-up .6s cubic-bezier(.16,1,.3,1) both' }}>
                  "{testimonials[active].content}"
                </blockquote>

                {/* Author + Nav */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4" key={`auth-${active}`} style={{ animation: 't-fade-up .6s cubic-bezier(.16,1,.3,1) .1s both' }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg" style={{ background: 'rgba(124,58,237,.2)', border: '1px solid rgba(124,58,237,.3)' }}>
                      {testimonials[active].avatar}
                    </div>
                    <div>
                      <div className="t-font-display font-bold text-white">{testimonials[active].name}</div>
                      <div className="t-font-mono text-[10px] text-gray-500">{testimonials[active].role}</div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center gap-3">
                    <button onClick={goPrev} className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300" style={{
                      background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', color: '#94a3b8',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = `rgba(124,58,237,.2)`; e.currentTarget.style.color = T.pl; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.06)'; e.currentTarget.style.color = '#94a3b8'; }}
                    >
                      <ChevronLeft size={18} />
                    </button>

                    {/* Dots */}
                    <div className="flex gap-1.5">
                      {testimonials.map((_, i) => (
                        <button key={i} onClick={() => setActive(i)} className="rounded-full transition-all duration-300" style={{
                          width: i === active ? 24 : 6, height: 6,
                          background: i === active ? T.p : 'rgba(124,58,237,.25)',
                        }} />
                      ))}
                    </div>

                    <button onClick={goNext} className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300" style={{
                      background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', color: '#94a3b8',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = `rgba(124,58,237,.2)`; e.currentTarget.style.color = T.pl; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.06)'; e.currentTarget.style.color = '#94a3b8'; }}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom gradient progress line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: 'rgba(124,58,237,.08)' }}>
                <div className="h-full" style={{
                  background: T.gP,
                  width: `${((active + 1) / testimonials.length) * 100}%`,
                  transition: 'width .5s cubic-bezier(.16,1,.3,1)',
                }} />
              </div>
            </div>
          </div>

          {/* Cards grid — transparent cards */}
          <div className="grid md:grid-cols-3 gap-5 mb-16">
            {testimonials.slice(0, 3).map((t, i) => (
              <Reveal key={i} delay={i * .07}>
                <div
                  className="relative rounded-2xl p-6 overflow-hidden group cursor-pointer transition-all duration-500 t-glass"
                  onClick={() => setActive(i)}
                  style={{
                    border: active === i ? `1px solid rgba(124,58,237,.35)` : '1px solid rgba(255,255,255,.06)',
                    background: active === i ? 'rgba(124,58,237,.1)' : 'rgba(255,255,255,.03)',
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(124,58,237,.1),transparent 60%)' }} />

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} size={14} style={{ color: si < t.rating ? T.y : 'rgba(255,255,255,.12)', fill: si < t.rating ? T.y : 'transparent' }} />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-xs md:text-sm leading-relaxed mb-5 text-gray-400 line-clamp-3">
                    "{t.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm" style={{ background: 'rgba(124,58,237,.15)', border: '1px solid rgba(124,58,237,.2)' }}>
                      {t.avatar}
                    </div>
                    <div>
                      <div className="t-font-display text-sm font-bold text-white">{t.name}</div>
                      <div className="t-font-mono text-[9px] text-gray-600">{t.role}</div>
                    </div>
                  </div>

                  {/* Active indicator */}
                  {active === i && (
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full" style={{ background: T.pl, animation: 't-pulse 2s ease infinite' }} />
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Trust badges strip */}
          <Reveal>
            <div className="rounded-2xl p-8" style={{ background: 'rgba(124,58,237,.08)', border: '1px solid rgba(124,58,237,.15)' }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { v: '1000+', l: 'Happy Customers' },
                  { v: '98%', l: 'Satisfaction Rate' },
                  { v: '4.9/5', l: 'Average Rating' },
                  { v: '24/7', l: 'Support Available' },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="t-font-display text-3xl md:text-4xl font-bold mb-1" style={{
                      background: 'linear-gradient(90deg,#7c3aed,#a855f7)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>{s.v}</div>
                    <div className="t-font-mono text-[10px] text-gray-500">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Testimonials;