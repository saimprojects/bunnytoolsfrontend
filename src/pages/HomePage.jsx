// src/pages/HomePage.jsx - Complete with BunnyFlow Section (Simple Animation)
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeCards from '../components/home/HomeCards';
import Testimonials from '../components/home/Testimonials';
import Hero from '../components/home/hero';
import { getProducts } from '../api/api';
import {
  Sparkles, Star, Download, Shield, Zap, Cpu, ArrowRight, Users,
  Package, HeartHandshake, Globe, BarChart3, Lock, RefreshCw, Rocket,
  Award, Headphones, CreditCard, MessageCircle, ThumbsUp, Layers,
  Crown, Gem, Video, Image as ImageIcon, Chrome, ExternalLink, Play,
  Check, TrendingUp, Infinity
} from 'lucide-react';

// ─── THEME TOKENS ────────────────────────────────────────────────────────────
const T = {
  p: '#7c3aed',
  pl: '#a78bfa',
  y: '#f59e0b',
  d: '#0f0a1e',
  dd: '#160d2e',
  g: '#64748b',
  gP: 'linear-gradient(135deg,#7c3aed,#a855f7)',
  gY: 'linear-gradient(135deg,#f59e0b,#fbbf24)',
};

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@500;600;700&family=Cabinet+Grotesk:wght@400;500;700;800&family=Fira+Code:wght@400;500&display=swap');

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }

@keyframes float-y { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
@keyframes fade-up { from{opacity:0;transform:translateY(48px)} to{opacity:1;transform:translateY(0)} }
@keyframes blob-morph{
  0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}
  50%{border-radius:50% 60% 30% 60%/40% 50% 60% 50%}
}
@keyframes gradient-x{
  0%,100%{background-position:0% 50%}
  50%{background-position:100% 50%}
}
@keyframes pulse-glow {
  0%,100%{opacity:.4;box-shadow:0 0 20px rgba(124,58,237,.3)}
  50%{opacity:1;box-shadow:0 0 40px rgba(124,58,237,.6)}
}
@keyframes slide-left {
  from{transform:translateX(0)}
  to{transform:translateX(-50%)}
}
@keyframes scale-in {
  from{opacity:0;transform:scale(.9)}
  to{opacity:1;transform:scale(1)}
}

.text-gradient-p {
  background: linear-gradient(90deg,#7c3aed,#a855f7,#c084fc);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-x 4s ease infinite;
}
.text-gradient-y {
  background: linear-gradient(90deg,#f59e0b,#fbbf24,#fcd34d);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-x 4s ease infinite;
}
.glass-light {
  background: rgba(255,255,255,.65);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(124,58,237,.1);
}
.glass-dark {
  background: rgba(255,255,255,.04);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,.08);
}
.font-display { font-family:'Clash Display',sans-serif; }
.font-body { font-family:'Cabinet Grotesk',sans-serif; }
.font-mono { font-family:'Fira Code',monospace; }

.scroll-lock-wrapper { position: relative; overscroll-behavior: contain; }
.scroll-lock-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-ring {
  transform: rotate(-90deg);
  transform-origin: center;
}
`;

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useInView(ref, th = 0.1) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: th });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, th]);
  return v;
}

function useWindowSize() {
  const [size, setSize] = useState({ width: typeof window !== 'undefined' ? window.innerWidth : 1200, height: typeof window !== 'undefined' ? window.innerHeight : 800 });
  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return size;
}

function useScrollLockSection(totalVirtualScroll = 1200) {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const currentProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const touchStartYRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
    const startThreshold = 110;

    const getMetrics = () => {
      const el = sectionRef.current;
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const lockY = window.scrollY + rect.top;
      const enteringFromTop = rect.top <= startThreshold && rect.top >= -startThreshold;
      const inLockZone = rect.top <= startThreshold && rect.bottom >= window.innerHeight - startThreshold;
      return { rect, lockY, enteringFromTop, inLockZone };
    };

    const pinViewport = (lockY) => {
      if (Math.abs(window.scrollY - lockY) > 1) {
        window.scrollTo({ top: lockY, behavior: 'auto' });
      }
    };

    const animateToTarget = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) < 0.0006) {
        currentProgressRef.current = targetProgressRef.current;
        setProgress(currentProgressRef.current);
        rafRef.current = null;
        return;
      }
      currentProgressRef.current += diff * 0.13;
      setProgress(currentProgressRef.current);
      rafRef.current = requestAnimationFrame(animateToTarget);
    };

    const queueProgressDelta = (delta) => {
      targetProgressRef.current = clamp(targetProgressRef.current + delta / Math.max(1, totalVirtualScroll));
      if (!rafRef.current) rafRef.current = requestAnimationFrame(animateToTarget);
    };

    const shouldCapture = (delta) => {
      const metrics = getMetrics();
      if (!metrics) return { capture: false, metrics: null };
      const movingDown = delta > 0, movingUp = delta < 0;
      const hasRoomForward = targetProgressRef.current < 0.999, hasRoomBackward = targetProgressRef.current > 0.001;
      const shouldEnter = movingDown && metrics.enteringFromTop && hasRoomForward;
      const shouldHold = metrics.inLockZone && ((movingDown && hasRoomForward) || (movingUp && hasRoomBackward));
      const shouldReverseEnter = movingUp && metrics.rect.top <= 0 && metrics.rect.bottom >= window.innerHeight - startThreshold && hasRoomBackward;
      return { capture: shouldEnter || shouldHold || shouldReverseEnter, metrics };
    };

    const onWheel = (e) => {
      const { capture, metrics } = shouldCapture(e.deltaY);
      if (!capture || !metrics) return;
      e.preventDefault(); e.stopPropagation();
      pinViewport(metrics.lockY);
      queueProgressDelta(e.deltaY * 0.74);
    };

    const onTouchStart = (e) => { touchStartYRef.current = e.touches[0]?.clientY || 0; };
    const onTouchMove = (e) => {
      const currentY = e.touches[0]?.clientY || 0;
      const delta = touchStartYRef.current - currentY;
      touchStartYRef.current = currentY;
      const { capture, metrics } = shouldCapture(delta);
      if (!capture || !metrics) return;
      e.preventDefault();
      pinViewport(metrics.lockY);
      queueProgressDelta(delta * 0.96);
    };

    const onKeyDown = (e) => {
      let delta = 0;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) delta = 90;
      if (['ArrowUp', 'PageUp'].includes(e.key)) delta = -90;
      if (!delta) return;
      const { capture, metrics } = shouldCapture(delta);
      if (!capture || !metrics) return;
      e.preventDefault();
      pinViewport(metrics.lockY);
      queueProgressDelta(delta);
    };

    const onScroll = () => {
      const metrics = getMetrics();
      if (!metrics) return;
      if (metrics.rect.top > 140 && (currentProgressRef.current !== 0 || targetProgressRef.current !== 0)) {
        currentProgressRef.current = 0; targetProgressRef.current = 0; setProgress(0); return;
      }
      if (metrics.rect.bottom < window.innerHeight - 140 && (currentProgressRef.current !== 1 || targetProgressRef.current !== 1)) {
        currentProgressRef.current = 1; targetProgressRef.current = 1; setProgress(1);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [totalVirtualScroll]);

  const wrapperStyle = useMemo(() => ({ position: 'relative', height: `calc(100vh + ${Math.round(Math.max(1, totalVirtualScroll) * 0.54)}px)` }), [totalVirtualScroll]);
  return { sectionRef, progress, wrapperStyle };
}

// ─── UI PARTS ─────────────────────────────────────────────────────────────────
function ScrollBar() {
  const [p, setP] = useState(0);
  useEffect(() => { const h = () => { const d = document.documentElement.scrollHeight - window.innerHeight; setP(d > 0 ? (window.scrollY / d) * 100 : 0); }; window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);
  return (<div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none"><div className="h-full transition-[width_.1s]" style={{ width: `${p}%`, background: T.gP, boxShadow: `0 0 10px ${T.p}` }} /></div>);
}

function Blob({ color = 'rgba(124,58,237,.1)', size = 300, style = {} }) {
  return (<div className="absolute pointer-events-none" style={{ width: size, height: size, background: `radial-gradient(ellipse,${color},transparent 70%)`, animation: 'blob-morph 14s ease-in-out infinite', filter: 'blur(50px)', ...style }} />);
}

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const iv = useInView(ref, 0.08);
  return (<div ref={ref} className={className} style={{ transform: iv ? 'translateY(0)' : 'translateY(48px)', opacity: iv ? 1 : 0, transition: `all .85s cubic-bezier(.16,1,.3,1) ${delay}s` }}>{children}</div>);
}

function ProgressRing({ progress }) {
  const r = 18, c = 2 * Math.PI * r, offset = c - progress * c;
  return (<div className="fixed bottom-8 right-8 z-50 pointer-events-none" style={{ opacity: progress > 0.02 && progress < 0.98 ? 1 : 0, transition: 'opacity .3s' }}><div className="relative w-16 h-16 flex items-center justify-center rounded-full" style={{ background: 'rgba(10,5,30,.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(124,58,237,.3)' }}><svg width="52" height="52" className="progress-ring absolute"><circle cx="26" cy="26" r={r} fill="none" stroke="rgba(124,58,237,.2)" strokeWidth="3" /><circle cx="26" cy="26" r={r} fill="none" stroke="#a78bfa" strokeWidth="3" strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset .1s' }} /></svg><span className="font-mono text-[10px] text-purple-300">{Math.round(progress * 100)}%</span></div></div>);
}

function ScrollHint({ visible, progress }) {
  if (!visible || progress > 0.05) return null;
  return (<div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none" style={{ animation: 'fade-up .6s ease forwards' }}><span className="font-mono text-[10px] text-purple-400 tracking-widest uppercase">Scroll to continue</span><div className="w-5 h-8 rounded-full border border-purple-500/40 flex items-start justify-center p-1"><div className="w-1 h-2 rounded-full bg-purple-400" style={{ animation: 'float-y 1.5s ease-in-out infinite' }} /></div></div>);
}

// ─── SECTIONS ─────────────────────────────────────────────────────────────────
function PinnedManifesto() {
  const { sectionRef, progress, wrapperStyle } = useScrollLockSection(430);
  const lines = [
    { text: 'Premium digital tools,', hl: ['Premium', 'digital'] },
    { text: 'subscription plans that actually fit', hl: ['subscription', 'fit'] },
    { text: 'your budget.', hl: ['budget.'] },
    { text: 'No hidden fees. No hassle.', hl: ['No', 'hassle.'] },
    { text: 'Just powerful tools at', hl: [] },
    { text: 'unbeatable prices.', hl: ['unbeatable', 'prices.'] },
  ];

  return (
    <div ref={sectionRef} className="scroll-lock-wrapper" style={{ ...wrapperStyle, background: T.dd }}>
      <div className="scroll-lock-sticky">
        <Blob color="rgba(124,58,237,.12)" size={500} style={{ top: '10%', left: '-10%' }} />
        <Blob color="rgba(168,85,247,.08)" size={400} style={{ bottom: '10%', right: '-5%' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.14 + progress * 0.2, background: `radial-gradient(circle at 50% 50%, rgba(167,139,250,${0.16 + progress * 0.14}), transparent 42%)`, transform: `scale(${0.86 + progress * 0.16})` }} />
        <div className="absolute left-1/2 top-1/2 pointer-events-none" style={{ width: 420, height: 420, borderRadius: '9999px', border: '1px solid rgba(167,139,250,.12)', transform: `translate(-50%,-50%) rotate(${progress * 180}deg) scale(${0.9 + progress * 0.08})`, opacity: 0.25 + progress * 0.2 }} />
        <div className="w-full px-4 sm:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div style={{ opacity: Math.min(1, progress * 5), transform: `translateY(${(1 - Math.min(1, progress * 5)) * 20}px)` }} className="mb-3">
              <span className="font-mono text-[10px] tracking-widest uppercase text-purple-400 flex items-center gap-2"><span className="w-6 h-px bg-purple-500" />Our Promise</span>
            </div>
            <div className="space-y-2.5 md:space-y-3">
              {lines.map((line, i) => {
                const lineProgress = Math.max(0, Math.min(1, (progress - i * 0.1) / 0.13));
                const words = line.text.split(' ');
                return (<div key={i} style={{ overflow: 'hidden' }}><p className="font-display text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight" style={{ transform: `translateY(${(1 - lineProgress) * 70}px)`, opacity: lineProgress }}>{words.map((w, wi) => { const isHL = line.hl.some((h) => w === h || w.replace(/[.,!?]/g, '') === h.replace(/[.,!?]/g, '')); return (<span key={wi} className="inline-block mr-[.22em]" style={{ color: isHL && lineProgress > 0.35 ? T.pl : `rgba(255,255,255,${0.12 + lineProgress * 0.88})` }}>{w}</span>); })}</p></div>);
              })}
            </div>
            <div className="mt-4 md:mt-6 flex items-center gap-4"><div className="flex-1 h-px bg-white/5 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${progress * 100}%`, background: T.gP }} /></div><span className="font-mono text-xs text-purple-400">{Math.round(progress * 100)}%</span></div>
          </div>
        </div>
        <ProgressRing progress={progress} /><ScrollHint visible progress={progress} />
      </div>
    </div>
  );
}

function PinnedHorizontalFeatures() {
  const { sectionRef, progress, wrapperStyle } = useScrollLockSection(700);
  const { width: ww } = useWindowSize();
  const mob = ww < 768;
  const items = [
    { icon: <Download size={28} />, title: 'Instant Digital Delivery', desc: 'Get access immediately after purchase. Zero waiting, zero delays.', color: '#10b981', stat: '<1min', sl: 'Avg Delivery' },
    { icon: <Shield size={28} />, title: 'Lifetime License & Updates', desc: 'Pay once. Use forever. All future updates included.', color: T.p, stat: '∞', sl: 'Free Updates' },
    { icon: <Zap size={28} />, title: '24/7 Premium Support', desc: 'Dedicated support team always online.', color: T.y, stat: '24/7', sl: 'Live Support' },
    { icon: <Cpu size={28} />, title: 'Premium Tool Quality', desc: 'Every subscription is rigorously tested.', color: '#ec4899', stat: '98%', sl: 'Satisfaction' },
  ];

  if (mob) {
    return (<section className="py-16 px-4 bg-purple-50"><div className="mb-8 text-center"><p className="font-mono text-xs text-purple-600 mb-2">Why Bunny Tools</p><h2 className="font-display text-2xl font-bold text-gray-900">Built for <span className="text-gradient-p">serious creators.</span></h2></div><div className="space-y-4">{items.map((item, i) => (<div key={i} className="p-6 rounded-2xl glass-light"><div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${item.color}18`, color: item.color }}>{item.icon}</div><h3 className="font-display font-bold mb-2 text-gray-900">{item.title}</h3><p className="text-sm text-gray-600 mb-4">{item.desc}</p><div className="text-2xl font-bold" style={{ color: item.color }}>{item.stat}</div><div className="font-mono text-[10px] text-gray-400 mt-1">{item.sl}</div></div>))}</div></section>);
  }

  return (
    <div ref={sectionRef} className="scroll-lock-wrapper" style={{ ...wrapperStyle, background: '#f8f4ff' }}>
      <div className="scroll-lock-sticky">
        <div className="w-full px-8 relative z-10">
          <div className="max-w-7xl mx-auto mb-6">
            <p className="font-mono text-xs text-purple-600 mb-2">Why Bunny Tools</p>
            <div className="flex items-end justify-between"><h2 className="font-display text-3xl lg:text-5xl font-bold text-gray-900">Built for <span className="text-gradient-p">serious creators.</span></h2><span className="font-mono text-sm text-purple-400 hidden md:block">{Math.round(progress * 100)}% explored</span></div>
            <div className="mt-4 h-[2px] rounded-full overflow-hidden bg-purple-200/60"><div className="h-full rounded-full" style={{ width: `${18 + progress * 82}%`, background: T.gP, boxShadow: '0 0 24px rgba(124,58,237,.25)' }} /></div>
          </div>
          {(() => {
            const cardW = 480, gap = 24, totalW = items.length * (cardW + gap), maxShift = Math.max(0, totalW - (ww - 80)), shift = progress * maxShift;
            return (<><div className="overflow-hidden"><div className="flex gap-6" style={{ transform: `translateX(-${shift}px)` }}>{items.map((item, i) => { const ip = Math.max(0, Math.min(1, (progress - i * 0.14) / 0.22)); return (<div key={i} className="flex-shrink-0 w-[480px] p-8 rounded-3xl glass-light group relative overflow-hidden" style={{ opacity: 0.12 + ip * 0.88, transform: `scale(${0.88 + ip * 0.12}) translateY(${(1 - ip) * 30}px)` }}><div className="absolute top-0 right-0 w-52 h-52 pointer-events-none" style={{ background: `radial-gradient(circle,${item.color}12,transparent 65%)` }} /><div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${item.color}15`, color: item.color }}>{item.icon}</div><h3 className="font-display text-xl font-bold mb-3 text-gray-900">{item.title}</h3><p className="text-sm text-gray-600 mb-8 leading-relaxed">{item.desc}</p><div className="flex items-end justify-between"><div><div className="font-display text-4xl font-bold" style={{ color: item.color }}>{item.stat}</div><div className="font-mono text-[10px] text-gray-400 mt-1">{item.sl}</div></div><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${item.color}15`, color: item.color }}><ArrowRight size={16} /></div></div></div>); })}</div></div><div className="flex justify-center gap-2 mt-5">{items.map((_, i) => { const active = progress > i / items.length && progress <= (i + 1) / items.length; return (<div key={i} className="h-1 rounded-full transition-all duration-300" style={{ width: active ? 32 : 8, background: active ? T.p : 'rgba(124,58,237,.2)' }} />); })}</div></>);
          })()}
        </div>
        <ProgressRing progress={progress} /><ScrollHint visible progress={progress} />
      </div>
    </div>
  );
}

function PinnedTextReveal() {
  const { sectionRef, progress, wrapperStyle } = useScrollLockSection(900);
  const text = "Bunny Tools isn't just another reseller. It's the smartest way to access the digital tools you need at prices that actually make sense for creators, freelancers, and businesses that refuse to overpay.";
  const highlightWords = ['smartest', 'digital', 'creators', 'freelancers', 'businesses', 'overpay'];

  return (
    <div ref={sectionRef} className="scroll-lock-wrapper" style={{ ...wrapperStyle, background: '#f0ebff' }}>
      <div className="scroll-lock-sticky">
        <Blob color="rgba(124,58,237,.06)" size={500} style={{ top: '-10%', right: '-10%' }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="mb-4" style={{ opacity: Math.min(1, progress * 4) }}><span className="font-mono text-[10px] tracking-widest uppercase text-purple-500">About Us</span></div>
          <p className="font-display text-2xl md:text-4xl lg:text-5xl font-bold leading-relaxed">{text.split(' ').map((w, i, arr) => { const wp = Math.max(0, Math.min(1, (progress - (i / Math.max(1, arr.length - 1)) * 0.82) / 0.09)); const clean = w.replace(/[.,!?:—]/g, '').toLowerCase(); const isHL = highlightWords.includes(clean); return (<span key={i} className="inline-block mr-[.25em]" style={{ opacity: 0.07 + wp * 0.93, transform: `translateY(${(1 - wp) * 20}px)`, filter: `blur(${(1 - wp) * 1.2}px)`, color: isHL && wp > 0.5 ? T.p : '#1e1b4b' }}>{w}</span>); })}</p>
          <div className="mt-5 h-[3px] w-full rounded-full overflow-hidden bg-purple-200/70"><div className="h-full rounded-full" style={{ width: `${progress * 100}%`, background: 'linear-gradient(90deg,#7c3aed,#a855f7,#f59e0b)', boxShadow: '0 0 20px rgba(124,58,237,.22)' }} /></div>
        </div>
        <ProgressRing progress={progress} /><ScrollHint visible progress={progress} />
      </div>
    </div>
  );
}

function PinnedNumbers() {
  const { sectionRef, progress, wrapperStyle } = useScrollLockSection(500);
  const nums = [
    { val: 1000, sfx: '+', label: 'Happy Customers', desc: 'Creators and businesses trust Bunny Tools globally.', icon: <Users size={22} /> },
    { val: 50, sfx: '+', label: 'Premium Tools', desc: 'Curated collection of top-tier digital subscriptions.', icon: <Package size={22} /> },
    { val: 98, sfx: '%', label: 'Satisfaction Rate', desc: 'Overwhelmingly positive feedback every month.', icon: <Star size={22} /> },
    { val: 30, sfx: 'd', label: 'Money-Back Guarantee', desc: 'Risk-free purchases with full, no-questions refund.', icon: <HeartHandshake size={22} /> },
  ];

  return (
    <div ref={sectionRef} className="scroll-lock-wrapper" style={{ ...wrapperStyle, background: '#fff' }}>
      <div className="scroll-lock-sticky">
        <Blob color="rgba(124,58,237,.05)" size={600} style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="w-full px-4 sm:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8"><h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900" style={{ opacity: Math.min(1, progress * 3), transform: `translateY(${(1 - Math.min(1, progress * 3)) * 32}px)` }}>Numbers that <span className="text-gradient-p">speak for us.</span></h2></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">{nums.map((n, i) => { const ip = Math.max(0, Math.min(1, (progress - 0.03 - i * 0.09) / 0.16)); const counted = (1 - Math.pow(1 - ip, 4)) * n.val; return (<div key={i} className="text-center group" style={{ opacity: ip, transform: `translateY(${(1 - ip) * 38}px)` }}><div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: `${T.p}12`, color: T.p }}>{n.icon}</div><div className="font-display text-4xl md:text-5xl font-bold mb-1" style={{ background: T.gP, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{Math.round(counted).toLocaleString()}{n.sfx}</div><h3 className="font-display font-bold mt-3 mb-2 text-gray-900">{n.label}</h3><p className="text-sm text-gray-500">{n.desc}</p></div>); })}</div>
          </div>
        </div>
        <ProgressRing progress={progress} /><ScrollHint visible progress={progress} />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// 🚀 BUNNYFLOW SECTION - SIMPLE REVEAL ANIMATION (NO SCROLL LOCK)
// ──────────────────────────────────────────────────────────────────────────────
function BunnyFlowSection() {
  const ref = useRef(null);
  const isVisible = useInView(ref, 0.1);
  const { width: ww } = useWindowSize();
  const mob = ww < 768;

  const plans = [
    { name: 'Free Trial', duration: '1 Day', price: 'Free', popular: false, color: 'from-gray-500 to-gray-600' },
    { name: 'Basic', duration: '15 Days', price: 'Unlimited', popular: true, color: 'from-blue-500 to-cyan-500' },
    { name: 'Pro', duration: '30 Days', price: 'Unlimited', popular: false, color: 'from-purple-500 to-pink-500' },
  ];

  const features = [
    { icon: Video, title: 'Veo 3.1 Video', desc: 'Cinematic AI videos in seconds', color: '#7c3aed' },
    { icon: ImageIcon, title: 'Google Whisk', desc: 'Unlimited AI image generation', color: '#ec4899' },
    { icon: Crown, title: 'Gemini Pro', desc: 'Full Google AI access', color: '#f59e0b' },
    { icon: Chrome, title: 'Chrome Extension', desc: '30-second setup', color: '#10b981' },
  ];

  const testimonials = [
    { name: 'Vamsi K.', text: 'Generated my first video in under a minute. Simple and smooth.' },
    { name: 'Layla M.', text: 'My workflow went from hours to minutes with BunnyFlow.' },
    { name: 'Karl R.', text: 'Unlimited access is incredible. No throttling, no waiting.' },
    { name: 'Priya S.', text: 'Clean interface, simple credits, and just works out of the box.' },
  ];

  if (mob) {
    return (
      <section ref={ref} className="py-16 px-4" style={{ background: T.dd }}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(124,58,237,.15)', border: '1px solid rgba(124,58,237,.3)' }}>
            <Crown className="w-4 h-4 text-yellow-400" /><span className="font-mono text-xs text-purple-300">Flagship Product</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-white mb-3">Introducing <span className="text-gradient-y">BunnyFlow</span></h2>
          <p className="text-gray-400">Veo 3.1 · Gemini Pro · Google Whisk</p>
        </div>
        <div className="space-y-4">
          {plans.map((p, i) => (
            <div key={i} className={`p-6 rounded-2xl glass-dark ${p.popular ? 'border-2 border-purple-400' : ''}`}>
              <div className="flex items-center justify-between mb-3"><h3 className="font-display text-xl font-bold text-white">{p.name}</h3><span className="text-sm text-gray-400">{p.duration}</span></div>
              <div className="text-2xl font-bold text-white mb-4">{p.price}</div>
              {p.popular && <span className="text-xs bg-yellow-500 text-black px-3 py-1 rounded-full">⭐ BEST VALUE</span>}
            </div>
          ))}
        </div>
        <div className="mt-8"><a href="https://www.flowbybunny.com/" target="_blank" rel="noopener noreferrer" className="block w-full py-4 rounded-xl font-bold text-white text-center" style={{ background: T.gP }}>Try BunnyFlow Free <ExternalLink className="inline w-4 h-4 ml-2" /></a></div>
      </section>
    );
  }

  return (
    <section ref={ref} className="py-20 relative overflow-hidden" style={{ background: T.dd }}>
      <Blob color="rgba(124,58,237,.12)" size={600} style={{ top: '-10%', left: '-5%' }} />
      <Blob color="rgba(236,72,153,.08)" size={500} style={{ bottom: '-10%', right: '-5%' }} />
      <Blob color="rgba(245,158,11,.06)" size={400} style={{ top: '40%', right: '10%' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Header with Reveal Animation */}
        <div style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(40px)', transition: 'all .8s cubic-bezier(.16,1,.3,1)' }}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full" style={{ background: 'rgba(124,58,237,.15)', border: '1px solid rgba(124,58,237,.3)', animation: 'pulse-glow 3s ease-in-out infinite' }}>
              <Crown className="w-4 h-4 text-yellow-400" />
              <span className="font-mono text-xs tracking-widest uppercase text-purple-300">Our Topmost Loving Product</span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <h2 className="font-display text-4xl lg:text-6xl font-bold text-center mb-3">
            <span className="text-white">Introducing </span>
            <span className="text-gradient-y">BunnyFlow</span>
          </h2>
          <p className="text-lg text-gray-400 text-center max-w-2xl mx-auto">
            Direct access to Google Flow's AI generation — powered by a simple credit system.
            <br /><span className="text-purple-400">Veo 3.1 · Gemini Pro · Google Whisk</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all .8s cubic-bezier(.16,1,.3,1) .1s' }}>
          <div className="flex flex-wrap gap-4 justify-center my-8">
            <a href="https://www.flowbybunny.com/" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-display font-bold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105" style={{ background: T.gP, boxShadow: '0 10px 40px rgba(124,58,237,.4)' }}>
              <Rocket className="w-5 h-5" />
              <span>Try BunnyFlow Free</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <a href="https://www.flowbybunny.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-display font-bold border-2 border-purple-400 text-purple-300 hover:bg-purple-500/10 transition-all duration-300">
              <Chrome className="w-5 h-5" />
              <span>Download Extension</span>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'scale(1)' : 'scale(.9)', transition: 'all .7s cubic-bezier(.16,1,.3,1) .15s' }}>
          <div className="flex justify-center gap-8 my-8">
            {[{ v: '20cr', l: 'Per Video' }, { v: '5cr', l: 'Per Image' }, { v: '999K', l: 'Max Credits' }].map((s, i) => (
              <div key={i} className="text-center glass-dark rounded-xl px-6 py-3 border border-purple-500/20">
                <div className="font-display text-2xl font-bold text-white">{s.v}</div>
                <div className="font-mono text-[10px] text-gray-400">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all .7s cubic-bezier(.16,1,.3,1) .2s' }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {features.map((f, i) => (
              <div key={i} className="glass-dark rounded-2xl p-5 border border-purple-500/20 hover:border-purple-400/40 transition-all hover:scale-105 duration-300">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${f.color}20`, color: f.color }}>
                  <f.icon className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-white text-sm mb-1">{f.title}</h4>
                <p className="text-gray-400 text-xs">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all .7s cubic-bezier(.16,1,.3,1) .25s' }}>
          <div className="grid lg:grid-cols-3 gap-5 mb-8">
            {plans.map((p, i) => (
              <div key={i} className={`relative rounded-2xl p-6 backdrop-blur-xl border transition-all hover:scale-105 duration-300 ${p.popular ? 'border-purple-400 shadow-xl shadow-purple-500/30' : 'border-white/10'}`} style={{ background: p.popular ? 'linear-gradient(135deg,rgba(124,58,237,.2),rgba(124,58,237,.05))' : 'rgba(255,255,255,.03)' }}>
                {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-4 py-1 rounded-full font-bold">⭐ BEST VALUE</div>}
                <div className="text-center">
                  <h4 className={`font-display text-xl font-bold ${p.popular ? 'text-gradient-p' : 'text-white'}`}>{p.name}</h4>
                  <p className="text-sm text-gray-400 mb-3">{p.duration}</p>
                  <div className="text-3xl font-display font-bold text-white mb-1">{p.price}</div>
                  <p className="text-xs text-gray-500 mb-4">{p.name === 'Free Trial' ? 'Trial Credits' : 'Unlimited Credits'}</p>
                  <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium ${p.popular ? 'bg-purple-500/20 text-purple-300' : 'bg-white/5 text-gray-400'}`}>
                    {p.duration} Access
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Marquee */}
        <div style={{ opacity: isVisible ? 1 : 0, transition: 'opacity .8s ease .3s' }}>
          <div className="overflow-hidden mb-8">
            <div className="flex gap-4 animate-[slide-left_30s_linear_infinite]">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div key={i} className="flex-shrink-0 w-72 glass-dark rounded-xl p-4 border border-purple-500/20">
                  <p className="text-gray-300 text-sm mb-2">"{t.text}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-bold">{t.name.charAt(0)}</div>
                    <p className="font-display font-bold text-white text-sm">{t.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all .7s cubic-bezier(.16,1,.3,1) .35s' }}>
          <div className="text-center">
            <a href="https://www.flowbybunny.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-display font-bold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105" style={{ background: T.gP, boxShadow: '0 20px 50px rgba(124,58,237,.5)' }}>
              <Play className="w-5 h-5" />
              <span>Start Generating AI Videos Today</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-gray-500 text-sm mt-3">1-day free trial · No credit card · Instant access</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, description, index }) {
  const ref = useRef(null);
  const iv = useInView(ref, 0.06);
  const [hover, setHover] = useState(false);
  return (<div ref={ref} className="relative p-6 rounded-2xl cursor-default transition-all duration-500" style={{ background: hover ? '#160d2e' : 'rgba(255,255,255,.55)', backdropFilter: 'blur(20px)', border: `1px solid ${hover ? `${T.p}30` : 'rgba(124,58,237,.1)'}`, transform: iv ? 'translateY(0)' : 'translateY(50px)', opacity: iv ? 1 : 0, transition: `all .7s cubic-bezier(.16,1,.3,1) ${index * 0.04}s` }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}><div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500" style={{ background: hover ? `${T.p}25` : `${T.p}12`, color: T.p, transform: hover ? 'scale(1.15) rotate(-6deg)' : 'scale(1)' }}><Icon size={20} /></div><h3 className="font-display font-bold mb-2 transition-colors duration-300" style={{ color: hover ? T.pl : '#1e1b4b' }}>{title}</h3><p className="text-sm leading-relaxed transition-colors duration-300" style={{ color: hover ? '#94a3b8' : '#64748b' }}>{description}</p></div>);
}

function TrustSection() {
  const trust = [
    { icon: Award, title: 'Verified Quality', desc: 'Every product is checked before delivery.' },
    { icon: Headphones, title: 'Human Support', desc: 'Fast support when you actually need help.' },
    { icon: CreditCard, title: 'Easy Payments', desc: 'Smooth checkout and simple ordering process.' },
    { icon: ThumbsUp, title: 'Trusted Experience', desc: 'Built for repeat buyers and real users.' },
  ];
  return (<section className="py-20 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-8"><Reveal><div className="text-center mb-12"><span className="font-mono text-xs text-purple-500 uppercase tracking-widest">Trust Layer</span><h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mt-3">Reliable from first click to final delivery</h2></div></Reveal><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{trust.map((t, i) => (<Reveal key={i} delay={i * 0.05}><div className="p-6 rounded-2xl border border-purple-100 bg-white shadow-sm"><div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-purple-100 text-purple-700"><t.icon size={20} /></div><h3 className="font-display text-lg font-bold text-gray-900 mb-2">{t.title}</h3><p className="text-sm text-gray-600">{t.desc}</p></div></Reveal>))}</div></div></section>);
}

function ProcessSection() {
  const steps = [
    { icon: Sparkles, title: 'Choose your tool', desc: 'Pick the subscription that fits your workflow.' },
    { icon: RefreshCw, title: 'Place the order', desc: 'Fast checkout with no confusing steps.' },
    { icon: Rocket, title: 'Get access quickly', desc: 'We deliver credentials with speed and clarity.' },
  ];
  return (<section className="py-20 bg-[#faf7ff]"><div className="max-w-7xl mx-auto px-4 sm:px-8"><Reveal><div className="text-center mb-12"><span className="font-mono text-xs text-purple-500 uppercase tracking-widest">How it works</span><h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mt-3">Simple process. Fast result.</h2></div></Reveal><div className="grid md:grid-cols-3 gap-5">{steps.map((s, i) => (<Reveal key={i} delay={i * 0.06}><div className="glass-light rounded-3xl p-7 h-full"><div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-purple-100 text-purple-700"><s.icon size={22} /></div><h3 className="font-display text-xl font-bold text-gray-900 mb-3">{s.title}</h3><p className="text-gray-600 leading-relaxed">{s.desc}</p></div></Reveal>))}</div></div></section>);
}

function StatsSection() {
  const stats = [{ value: '1000+', label: 'Happy Customers' }, { value: '50+', label: 'Premium Tools' }, { value: '98%', label: 'Satisfaction Rate' }, { value: '24/7', label: 'Support' }];
  return (<section className="py-20" style={{ background: 'linear-gradient(90deg,#6d28d9 0%, #7c3aed 50%, #8b5cf6 100%)' }}><div className="max-w-7xl mx-auto px-4 sm:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">{stats.map((stat, i) => (<div key={i}><div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div><div className="text-purple-200">{stat.label}</div></div>))}</div></div></section>);
}

function WhySection() {
  const reasons = [
    { icon: BarChart3, title: 'Smart pricing', desc: 'Better value without sacrificing quality.' },
    { icon: Lock, title: 'Secure access', desc: 'Cleaner, safer, more dependable accounts.' },
    { icon: Layers, title: 'Curated catalog', desc: 'Only useful tools. No random filler.' },
  ];
  return (<section className="py-20 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-8"><Reveal><div className="text-center mb-12"><span className="font-mono text-xs text-purple-500 uppercase tracking-widest">Why us</span><h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mt-3">Made for people who care about quality</h2></div></Reveal><div className="grid md:grid-cols-3 gap-5">{reasons.map((r, i) => (<Reveal key={i} delay={i * 0.05}><div className="rounded-3xl border border-purple-100 p-7 bg-white shadow-sm h-full"><div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-purple-100 text-purple-700"><r.icon size={22} /></div><h3 className="font-display text-xl font-bold text-gray-900 mb-3">{r.title}</h3><p className="text-gray-600 leading-relaxed">{r.desc}</p></div></Reveal>))}</div></div></section>);
}

function FAQSection() {
  const faqs = [
    { q: 'How fast is delivery?', a: 'Most orders are processed very quickly and shared soon after purchase.' },
    { q: 'Are these subscriptions verified?', a: 'Yes. Quality and access are checked before delivery.' },
    { q: 'What if I need help after purchase?', a: 'Support stays available, so you are not left alone after checkout.' },
  ];
  return (<section className="py-20 bg-[#faf7ff]"><div className="max-w-5xl mx-auto px-4 sm:px-8"><Reveal><div className="text-center mb-12"><span className="font-mono text-xs text-purple-500 uppercase tracking-widest">FAQ</span><h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mt-3">Common questions, clear answers</h2></div></Reveal><div className="space-y-4">{faqs.map((f, i) => (<Reveal key={i} delay={i * 0.04}><div className="rounded-2xl border border-purple-100 bg-white p-6"><h3 className="font-display text-lg font-bold text-gray-900 mb-2">{f.q}</h3><p className="text-gray-600">{f.a}</p></div></Reveal>))}</div></div></section>);
}

function CTASection() {
  return (<section className="py-24 bg-[#160d2e] relative overflow-hidden"><Blob color="rgba(124,58,237,.10)" size={520} style={{ top: '-10%', left: '-5%' }} /><Blob color="rgba(245,158,11,.08)" size={420} style={{ bottom: '-10%', right: '-5%' }} /><div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10"><Reveal><div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12 text-center"><div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 bg-white/5 border border-white/10"><Sparkles size={14} className="text-purple-300" /><span className="font-mono text-[10px] tracking-widest uppercase text-purple-300">Ready to start</span></div><h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">Get the tools you need<br /><span className="text-gradient-p">without overpaying.</span></h2><p className="text-white/65 max-w-2xl mx-auto mb-8 leading-relaxed">Browse premium subscriptions, pick what fits your work, and get access fast.</p><div className="flex flex-col sm:flex-row items-center justify-center gap-4"><Link to="/products" className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white transition-all duration-300 relative overflow-hidden" style={{ background: T.gP, boxShadow: '0 14px 40px rgba(124,58,237,.45)' }}><div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />Browse All Tools<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></Link><Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 transition-all duration-300"><MessageCircle size={16} />Contact for Custom Quote</Link></div><Reveal delay={0.24}><div className="flex items-center justify-center gap-6 mt-10 pt-10 border-t border-white/10"><div className="flex -space-x-2">{[T.p, '#10b981', T.y, '#ec4899'].map((c, i) => (<div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center" style={{ background: c, borderColor: '#160d2e', fontSize: '10px', color: '#fff', fontWeight: 700 }}>{['A', 'M', 'S', 'R'][i]}</div>))}</div><div className="text-left"><div className="flex gap-0.5 mb-1">{[...Array(5)].map((_, i) => (<Star key={i} size={12} fill={T.y} stroke="none" />))}</div><p className="font-mono text-[10px] text-gray-400">Loved by 1,000+ customers</p></div></div></Reveal></div></Reveal></div></section>);
}

// ─── MAIN HOME ────────────────────────────────────────────────────────────────
const HomePage = () => {
  const [featuredSoftwares, setFeaturedSoftwares] = useState([]);
  const [trendingSoftwares, setTrendingSoftwares] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try { setLoading(true); const products = await getProducts(); setFeaturedSoftwares(products.slice(0, 4)); setTrendingSoftwares(products.slice(4, 8)); } 
      catch (e) { console.error(e); } 
      finally { setLoading(false); }
    })();
  }, []);

  const features = [
    { icon: Download, title: 'Instant Delivery', description: 'Get access immediately after purchase. Credentials in your inbox in under 60 seconds.' },
    { icon: Shield, title: 'Lifetime License', description: 'One-time payment. All future updates included forever at no extra cost.' },
    { icon: Zap, title: 'Premium Support', description: '24/7 dedicated technical support via chat, email, and WhatsApp.' },
    { icon: Cpu, title: 'Always Updated', description: 'Latest features always included. We keep your tools current automatically.' },
    { icon: Lock, title: 'Private & Secure', description: 'Dedicated accounts assigned only to you. Complete privacy, zero sharing.' },
    { icon: Globe, title: 'Global Access', description: 'Use your tools from anywhere in the world, on any device, anytime.' },
  ];

  const marqueeItems = ['Trusted by 1000+ creators', '✦', 'Instant digital delivery', '✦', '98% satisfaction rate', '✦', '30-day money back', '✦', 'Premium subscriptions', '✦', 'Real verified accounts', '✦', '24/7 live support', '✦', 'Lowest prices guaranteed', '✦'];

  return (
    <div className="font-body overflow-x-hidden bg-white">
      <style>{CSS}</style>
      <ScrollBar />
      <Hero />

      <div className="py-3 overflow-hidden bg-[#160d2e] border-y border-purple-500/10">
        <div className="flex whitespace-nowrap animate-[marquee_35s_linear_infinite]">
          {[...Array(3)].map((_, si) => (<React.Fragment key={si}>{marqueeItems.map((t, i) => (<span key={`${si}-${i}`} className="mx-4 md:mx-6 font-mono text-[10px] md:text-xs font-medium tracking-wide" style={{ color: t === '✦' ? '#a78bfa' : '#cbd5e1' }}>{t}</span>))}</React.Fragment>))}
        </div>
      </div>

      <PinnedManifesto />

      <HomeCards
        title={<>Featured <span style={{ background: 'linear-gradient(90deg,#7c3aed,#a855f7,#c084fc)', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'gradient-x 4s ease infinite' }}>Subscriptions</span></>}
        subtitle="Handpicked premium tools with a cleaner compact card layout, smoother shuffle, and stronger purple branding."
        products={featuredSoftwares} loading={loading} viewAllLink="/products" featuredMode={true} trendingMode={false} cardMaxWidth={720}
      />

      {/* 🚀 BUNNYFLOW FLAGSHIP SECTION - After Featured Tools */}
      <BunnyFlowSection />

      <TrustSection />
      <ProcessSection />
      <PinnedHorizontalFeatures />

      <section className="py-20 relative overflow-hidden bg-purple-50">
        <Blob color="rgba(124,58,237,.06)" size={400} style={{ top: 0, right: 0 }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="text-center mb-12">
            <Reveal><div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 bg-purple-500/10 border border-purple-500/20"><span className="font-mono text-[10px] tracking-widest uppercase text-purple-600">Everything included</span></div></Reveal>
            <Reveal delay={0.06}><h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-3">All the tools you need to<br /><span className="text-gradient-p">dominate your work.</span></h2></Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{features.map((f, i) => (<FeatureCard key={i} icon={f.icon} title={f.title} description={f.description} index={i} />))}</div>
        </div>
      </section>

      <PinnedTextReveal />
      <PinnedNumbers />
      <StatsSection />
      <WhySection />
      <FAQSection />
      <Testimonials />
      <CTASection />
    </div>
  );
};

export default HomePage;