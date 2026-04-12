import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Star,
  TrendingUp,
  Shield,
  Zap,
  CheckCircle,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const T = {
  p: '#7c3aed',
  pl: '#a78bfa',
  y: '#f59e0b',
  gP: 'linear-gradient(135deg,#7c3aed,#a855f7)',
  gY: 'linear-gradient(135deg,#f59e0b,#fbbf24)',
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@500;600;700&family=Cabinet+Grotesk:wght@400;500;700;800&family=Fira+Code:wght@400;500&display=swap');

.hc-display { font-family:'Clash Display',sans-serif; }
.hc-body    { font-family:'Cabinet Grotesk',sans-serif; }
.hc-mono    { font-family:'Fira Code',monospace; }

@keyframes hc-grad {
  0%,100%{background-position:0% 50%}
  50%{background-position:100% 50%}
}
@keyframes hc-shimmer {
  0%{background-position:-200% 0}
  100%{background-position:200% 0}
}
@keyframes hc-pulse {
  0%,100%{opacity:.5}
  50%{opacity:1}
}

.hc-grad-p {
  background:linear-gradient(90deg,#7c3aed,#a855f7,#c084fc);
  background-size:200% 100%;
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  background-clip:text;
  animation:hc-grad 4s ease infinite;
}
.hc-grad-y {
  background:linear-gradient(90deg,#f59e0b,#fbbf24,#fcd34d);
  background-size:200% 100%;
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  background-clip:text;
  animation:hc-grad 4s ease infinite;
}

.hc-glass-dark {
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow:
    0 32px 80px rgba(0,0,0,0.45),
    0 8px 24px rgba(124,58,237,0.14),
    inset 0 1px 0 rgba(255,255,255,0.08);
}

.hc-stack-shell {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.hc-stack {
  position: relative;
  width: min(100%, var(--hc-stack-width, 760px));
  height: var(--hc-stack-height, 620px);
  margin: 0 auto;
  user-select: none;
  touch-action: pan-y;
}

.hc-card {
  position: absolute;
  inset: 0;
  border-radius: 28px;
  overflow: hidden;
  cursor: grab;
  will-change: transform, opacity;
  display: flex;
  flex-direction: column;
}
.hc-card:active { cursor: grabbing; }

.hc-card-image {
  position: relative;
  height: var(--hc-image-height, 238px);
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, rgba(255,255,255,0.98) 0%, rgba(241,238,255,0.95) 72%, rgba(228,221,255,0.90) 100%);
}

.hc-card-body {
  padding: 18px 20px 18px;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.hc-shimmer-overlay {
  position:absolute;
  inset:0;
  background: linear-gradient(
    105deg,
    transparent 35%,
    rgba(255,255,255,0.04) 42%,
    rgba(255,255,255,0.12) 50%,
    rgba(255,255,255,0.04) 58%,
    transparent 65%
  );
  background-size: 220% 100%;
  animation: hc-shimmer 3.5s ease-in-out infinite;
  pointer-events: none;
}

.hc-dot {
  height: 8px;
  border-radius: 99px;
  transition: width .35s cubic-bezier(.16,1,.3,1), background .35s;
}

.hc-btn-view {
  position: relative;
  overflow: hidden;
}
.hc-btn-view::after {
  content:'';
  position:absolute;
  inset:0;
  background:rgba(255,255,255,0);
  transition:background .25s;
}
.hc-btn-view:hover::after { background:rgba(255,255,255,0.10); }

.hc-pulse { animation:hc-pulse 1.8s ease-in-out infinite; }

@media (max-width: 1024px) {
  .hc-stack {
    width: min(100%, 640px);
    height: 575px;
  }

  .hc-card-image {
    height: 220px;
  }
}

@media (max-width: 767px) {
  .hc-stack-shell {
    gap: 14px;
  }

  .hc-stack {
    width: min(100%, 92vw);
    height: var(--hc-stack-height-mobile, 450px);
  }

  .hc-card {
    border-radius: 22px;
  }

  .hc-card-image {
    height: var(--hc-image-height-mobile, 162px);
    padding: 12px;
  }

  .hc-card-body {
    padding: 14px 14px 16px;
  }
}
`;

function formatPrice(v) {
  if (v == null) return 'Contact Us';
  return `Rs. ${Number(v).toLocaleString()}`;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return isMobile;
}

function Badges({ product, featuredMode, trendingMode, isMobile }) {
  const disc = product.discount_percentage || 0;
  const isFeatured = product.is_featured || featuredMode;
  const isTrending = product.is_trending || trendingMode;

  return (
    <div
      style={{
        position: 'absolute',
        top: isMobile ? 12 : 16,
        left: isMobile ? 12 : 16,
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      {disc > 0 && (
        <span
          className="hc-mono"
          style={{
            fontSize: isMobile ? 9 : 10,
            fontWeight: 700,
            padding: isMobile ? '3px 8px' : '4px 10px',
            borderRadius: 8,
            background: 'linear-gradient(135deg,#ef4444,#dc2626)',
            color: '#fff',
            boxShadow: '0 4px 14px rgba(239,68,68,.3)',
          }}
        >
          -{disc}% OFF
        </span>
      )}

      {isFeatured && (
        <span
          className="hc-mono"
          style={{
            fontSize: isMobile ? 9 : 10,
            fontWeight: 700,
            padding: isMobile ? '3px 8px' : '4px 10px',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: T.gP,
            color: '#fff',
            boxShadow: '0 4px 14px rgba(124,58,237,.3)',
          }}
        >
          <Star size={9} fill="#fff" strokeWidth={0} /> Featured
        </span>
      )}

      {isTrending && (
        <span
          className="hc-mono"
          style={{
            fontSize: isMobile ? 9 : 10,
            fontWeight: 700,
            padding: isMobile ? '3px 8px' : '4px 10px',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: T.gY,
            color: '#fff',
            boxShadow: '0 4px 14px rgba(245,158,11,.3)',
          }}
        >
          <TrendingUp size={9} /> Trending
        </span>
      )}
    </div>
  );
}

function Meta({ product, isMobile }) {
  const rating = Math.max(0, Math.min(5, Math.round(product.rating || 4)));
  const reviews = product.review_count || 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {product.categories?.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
          {product.categories.slice(0, 2).map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug || cat.id}`}
              style={{
                fontFamily: 'Fira Code,monospace',
                fontSize: isMobile ? 8 : 9,
                fontWeight: 700,
                padding: isMobile ? '3px 7px' : '3px 8px',
                borderRadius: 6,
                background: 'rgba(124,58,237,.12)',
                color: '#a78bfa',
                border: '1px solid rgba(124,58,237,.18)',
                textDecoration: 'none',
              }}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}

      <h3
        className="hc-display"
        style={{
          fontSize: isMobile ? 18 : 20,
          fontWeight: 700,
          color: '#fff',
          lineHeight: 1.18,
          marginBottom: 8,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: isMobile ? 42 : 48,
        }}
      >
        {product.title}
      </h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 2 }}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={isMobile ? 11 : 12}
              style={{
                color: i < rating ? T.y : 'rgba(255,255,255,.2)',
                fill: i < rating ? T.y : 'none',
              }}
            />
          ))}
        </div>

        <span className="hc-mono" style={{ fontSize: isMobile ? 9 : 10, color: 'rgba(255,255,255,.42)' }}>
          ({reviews})
        </span>

        {product.is_bestseller && (
          <span
            className="hc-mono"
            style={{
              fontSize: 9,
              padding: '2px 8px',
              borderRadius: 99,
              background: 'rgba(245,158,11,.15)',
              color: '#fbbf24',
            }}
          >
            Bestseller
          </span>
        )}
      </div>

      {product.short_description && (
        <p
          className="hc-body"
          style={{
            fontSize: isMobile ? 12 : 13,
            color: 'rgba(255,255,255,.56)',
            lineHeight: 1.45,
            marginBottom: 12,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: isMobile ? 34 : 38,
          }}
        >
          {product.short_description}
        </p>
      )}

      <div style={{ display: 'flex', gap: isMobile ? 10 : 14, marginBottom: 0, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <Shield size={isMobile ? 10 : 11} style={{ color: '#34d399' }} />
          <span className="hc-mono" style={{ fontSize: isMobile ? 8 : 9, color: 'rgba(255,255,255,.42)' }}>
            Verified
          </span>
        </div>

        {product.delivery_days && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Zap size={isMobile ? 10 : 11} style={{ color: T.pl }} />
            <span className="hc-mono" style={{ fontSize: isMobile ? 8 : 9, color: 'rgba(255,255,255,.42)' }}>
              {product.delivery_days}d Delivery
            </span>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <CheckCircle size={isMobile ? 10 : 11} style={{ color: T.p }} />
          <span className="hc-mono" style={{ fontSize: isMobile ? 8 : 9, color: 'rgba(255,255,255,.42)' }}>
            Genuine
          </span>
        </div>
      </div>
    </div>
  );
}

function CardBottom({ product, featuredMode, isMobile }) {
  return (
    <div
      style={{
        paddingTop: isMobile ? 12 : 14,
        marginTop: 'auto',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 12,
        borderTop: '1px solid rgba(255,255,255,.08)',
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div className="hc-display" style={{ fontSize: isMobile ? 19 : 24, fontWeight: 700, color: '#fff', lineHeight: 1 }}>
          {formatPrice(product.price)}
        </div>

        {product.original_price && product.price < product.original_price && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
            <span
              className="hc-mono"
              style={{
                fontSize: isMobile ? 9 : 10,
                textDecoration: 'line-through',
                color: 'rgba(255,255,255,.32)',
              }}
            >
              Rs.{Number(product.original_price).toLocaleString()}
            </span>

            <span className="hc-mono" style={{ fontSize: isMobile ? 8 : 9, fontWeight: 700, color: '#f87171' }}>
              Save Rs.{Number(product.original_price - product.price).toLocaleString()}
            </span>
          </div>
        )}
      </div>

      <Link
        to={`/product/${product.id}`}
        className="hc-btn-view hc-mono"
        style={{
          flexShrink: 0,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          padding: isMobile ? '10px 14px' : '11px 18px',
          borderRadius: isMobile ? 14 : 16,
          color: '#fff',
          background: featuredMode ? T.gP : T.gY,
          boxShadow: featuredMode
            ? '0 8px 24px rgba(124,58,237,.35)'
            : '0 8px 24px rgba(245,158,11,.35)',
          fontWeight: 700,
          fontSize: isMobile ? 12 : 13,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <ShoppingBag size={isMobile ? 13 : 14} />
        View
      </Link>
    </div>
  );
}

function getPositions(isMobile) {
  if (isMobile) {
    return [
      { x: 0, y: 0, rot: 0, scale: 1, z: 40, opacity: 1 },
      { x: -10, y: 10, rot: -3, scale: 0.97, z: 30, opacity: 0.84 },
      { x: 10, y: 18, rot: 3, scale: 0.93, z: 20, opacity: 0.64 },
      { x: 0, y: 24, rot: 0, scale: 0.89, z: 10, opacity: 0.36 },
    ];
  }

  return [
    { x: 0, y: 0, rot: 0, scale: 1, z: 40, opacity: 1 },
    { x: -34, y: 18, rot: -5, scale: 0.965, z: 30, opacity: 0.86 },
    { x: 34, y: 30, rot: 5, scale: 0.925, z: 20, opacity: 0.64 },
    { x: 0, y: 42, rot: 0, scale: 0.885, z: 10, opacity: 0.38 },
  ];
}

function getCardStyle({
  posIdx,
  isMobile,
  isDragging,
  dragX,
  dragY,
  isExiting,
  exitDir,
}) {
  const positions = getPositions(isMobile);
  const pos = positions[Math.min(posIdx, positions.length - 1)];

  let tx = pos.x;
  let ty = pos.y;
  let rot = pos.rot;
  let transition = 'transform .72s cubic-bezier(.16,1,.3,1), opacity .48s ease';

  if (posIdx === 0) {
    if (isExiting) {
      tx = exitDir === 'left' ? -140 : 140;
      ty = -42;
      rot = exitDir === 'left' ? -22 : 22;
      transition = 'transform .54s cubic-bezier(.4,0,.6,1), opacity .38s ease';
    } else if (isDragging) {
      tx = dragX * 0.56;
      ty = dragY * 0.16;
      rot = dragX * 0.05;
      transition = 'none';
    }
  }

  return {
    transform: `translate(calc(-50% + ${tx}px), ${ty}px) rotate(${rot}deg) scale(${pos.scale})`,
    opacity: isExiting && posIdx === 0 ? 0 : pos.opacity,
    zIndex: pos.z,
    filter: posIdx === 0 ? 'none' : `blur(${posIdx * 0.35}px)`,
    transition,
    left: '50%',
    top: 0,
  };
}

function StackCard({ product, isFront, featuredMode, trendingMode, style, isMobile }) {
  const mainImage = product?.images?.[0]?.image;

  return (
    <div className="hc-card hc-glass-dark" style={style}>
      <div className="hc-card-image">
        {mainImage ? (
          <>
            <img
              src={mainImage}
              alt={product.title}
              draggable={false}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                pointerEvents: 'none',
                padding: isMobile ? '10px' : '18px',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg,rgba(20,10,40,.02) 0%,rgba(15,10,35,.10) 55%,rgba(10,5,30,.48) 100%)',
              }}
            />
            {isFront && <div className="hc-shimmer-overlay" />}
          </>
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg,rgba(124,58,237,.18),rgba(245,158,11,.10))',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <span style={{ fontSize: 36 }}>📦</span>
            <span className="hc-mono" style={{ fontSize: 10, color: 'rgba(255,255,255,.35)' }}>
              No Preview
            </span>
          </div>
        )}

        <Badges product={product} featuredMode={featuredMode} trendingMode={trendingMode} isMobile={isMobile} />
      </div>

      <div className="hc-card-body">
        <Meta product={product} isMobile={isMobile} />
        <CardBottom product={product} featuredMode={featuredMode} isMobile={isMobile} />
      </div>
    </div>
  );
}

function ShuffleStack({ products, featuredMode, trendingMode, cardMaxWidth = 760 }) {
  const isMobile = useIsMobile();
  const [order, setOrder] = useState(() => products.map((_, i) => i));
  const [isExiting, setIsExiting] = useState(false);
  const [exitDir, setExitDir] = useState('left');
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);

  const dragStartRef = useRef({ x: 0, y: 0 });
  const shufflingRef = useRef(false);

  useEffect(() => {
    setOrder(products.map((_, i) => i));
  }, [products]);

  const shuffle = useCallback((dir = 'left') => {
    if (shufflingRef.current || products.length <= 1) return;

    shufflingRef.current = true;
    setIsExiting(true);
    setExitDir(dir);

    setTimeout(() => {
      setOrder((prev) => {
        const next = [...prev];
        next.push(next.shift());
        return next;
      });
      setIsExiting(false);
      shufflingRef.current = false;
    }, 480);
  }, [products.length]);

  useEffect(() => {
    if (isDragging || isHovered || products.length <= 1) return;
    const id = setInterval(() => shuffle('right'), 4200);
    return () => clearInterval(id);
  }, [isDragging, isHovered, shuffle, products.length]);

  const beginDrag = useCallback((clientX, clientY) => {
    if (shufflingRef.current) return;
    dragStartRef.current = { x: clientX, y: clientY };
    setDragX(0);
    setDragY(0);
    setIsDragging(true);
  }, []);

  const moveDrag = useCallback((clientX, clientY) => {
    setDragX(clientX - dragStartRef.current.x);
    setDragY(clientY - dragStartRef.current.y);
  }, []);

  const endDrag = useCallback(() => {
    if (!isDragging) return;

    const currentDragX = dragX;
    setIsDragging(false);
    setDragX(0);
    setDragY(0);

    if (Math.abs(currentDragX) > (isMobile ? 45 : 75)) {
      shuffle(currentDragX < 0 ? 'left' : 'right');
    }
  }, [dragX, isDragging, isMobile, shuffle]);

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e) => moveDrag(e.clientX, e.clientY);
    const onMouseUp = () => endDrag();
    const onTouchMove = (e) => {
      if (e.touches[0]) moveDrag(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => endDrag();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, moveDrag, endDrag]);

  const visible = order.slice(0, 4);
  const stackHeight = isMobile ? 450 : 620;
  const imageHeight = isMobile ? 162 : 238;

  return (
    <div className="hc-stack-shell">
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 16 }}>
        <button
          type="button"
          onClick={() => shuffle('right')}
          aria-label="Previous card"
          style={{
            width: isMobile ? 40 : 46,
            height: isMobile ? 40 : 46,
            borderRadius: isMobile ? 12 : 14,
            border: '1px solid rgba(255,255,255,.12)',
            background: 'rgba(255,255,255,.06)',
            color: 'rgba(255,255,255,.72)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all .25s ease',
          }}
        >
          <ChevronLeft size={isMobile ? 16 : 18} />
        </button>

        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {products.map((_, i) => {
            const active = order[0] === i;
            return (
              <div
                key={i}
                className="hc-dot"
                style={{
                  width: active ? 28 : 8,
                  background: active
                    ? (featuredMode ? T.p : T.y)
                    : 'rgba(255,255,255,.22)',
                }}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => shuffle('left')}
          aria-label="Next card"
          style={{
            width: isMobile ? 40 : 46,
            height: isMobile ? 40 : 46,
            borderRadius: isMobile ? 12 : 14,
            border: '1px solid rgba(255,255,255,.12)',
            background: 'rgba(255,255,255,.06)',
            color: 'rgba(255,255,255,.72)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all .25s ease',
          }}
        >
          <ChevronRight size={isMobile ? 16 : 18} />
        </button>
      </div>

      <div
        className="hc-stack"
        style={{
          '--hc-stack-width': `${cardMaxWidth}px`,
          '--hc-stack-height': `${stackHeight}px`,
          '--hc-stack-height-mobile': '450px',
          '--hc-image-height': `${imageHeight}px`,
          '--hc-image-height-mobile': '162px',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          if (isDragging) endDrag();
        }}
        onMouseDown={(e) => beginDrag(e.clientX, e.clientY)}
        onTouchStart={(e) => {
          if (e.touches[0]) beginDrag(e.touches[0].clientX, e.touches[0].clientY);
        }}
      >
        {[...visible].reverse().map((productIdx, reversedI) => {
          const posIdx = visible.length - 1 - reversedI;
          const product = products[productIdx];

          return (
            <StackCard
              key={`${product?.id || productIdx}-${order.join(',')}-${posIdx}`}
              product={product}
              isFront={posIdx === 0 && !isDragging}
              featuredMode={featuredMode}
              trendingMode={trendingMode}
              isMobile={isMobile}
              style={getCardStyle({
                posIdx,
                isMobile,
                isDragging,
                dragX,
                dragY,
                isExiting,
                exitDir,
              })}
            />
          );
        })}
      </div>

      <p
        className="hc-mono"
        style={{
          fontSize: isMobile ? 10 : 11,
          color: 'rgba(255,255,255,.42)',
          textAlign: 'center',
          marginTop: -2,
        }}
      >
        Drag or swipe cards to shuffle
      </p>
    </div>
  );
}

function LoadingSkeleton({ cardMaxWidth = 760 }) {
  const isMobile = useIsMobile();

  return (
    <div className="hc-stack-shell">
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="hc-pulse"
            style={{
              width: i === 1 ? 28 : 8,
              height: 8,
              borderRadius: 999,
              background: i === 1 ? 'rgba(124,58,237,.9)' : 'rgba(255,255,255,.18)',
            }}
          />
        ))}
      </div>

      <div
        className="hc-stack"
        style={{
          '--hc-stack-width': `${cardMaxWidth}px`,
          '--hc-stack-height': `${isMobile ? 450 : 620}px`,
          '--hc-stack-height-mobile': '450px',
          '--hc-image-height': `${isMobile ? 162 : 238}px`,
          '--hc-image-height-mobile': '162px',
        }}
      >
        {[0, 1, 2].reverse().map((i) => {
          const style = getCardStyle({
            posIdx: i,
            isMobile,
            isDragging: false,
            dragX: 0,
            dragY: 0,
            isExiting: false,
            exitDir: 'left',
          });

          return (
            <div key={i} className="hc-card hc-glass-dark hc-pulse" style={style}>
              <div className="hc-card-image" style={{ background: 'rgba(255,255,255,.06)' }} />
              <div className="hc-card-body">
                {[80, 58, 100].map((w, j) => (
                  <div
                    key={j}
                    style={{
                      height: j === 1 ? 22 : 10,
                      width: `${w}%`,
                      borderRadius: 10,
                      background: 'rgba(255,255,255,.07)',
                      marginBottom: j === 1 ? 12 : 10,
                    }}
                  />
                ))}

                <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                  {[0, 1, 2].map((k) => (
                    <div
                      key={k}
                      style={{
                        width: 70,
                        height: 10,
                        borderRadius: 999,
                        background: 'rgba(255,255,255,.06)',
                      }}
                    />
                  ))}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid rgba(255,255,255,.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
                  <div>
                    <div style={{ width: 110, height: 24, borderRadius: 10, background: 'rgba(255,255,255,.08)' }} />
                    <div style={{ width: 80, height: 10, borderRadius: 10, background: 'rgba(255,255,255,.05)', marginTop: 8 }} />
                  </div>
                  <div style={{ width: 96, height: 40, borderRadius: 14, background: 'rgba(124,58,237,.35)' }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HomeCards({
  title,
  subtitle,
  products,
  loading,
  viewAllLink,
  featuredMode = false,
  trendingMode = false,
  cardMaxWidth,
}) {
  const isMobile = useIsMobile();
  const validProducts = useMemo(() => (Array.isArray(products) ? products.filter(Boolean) : []), [products]);

  useEffect(() => {
    if (!document.getElementById('homecards-css')) {
      const style = document.createElement('style');
      style.id = 'homecards-css';
      style.innerHTML = CSS;
      document.head.appendChild(style);
    }
  }, []);

  const resolvedMaxWidth = cardMaxWidth || (isMobile ? 320 : 720);

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        background: 'radial-gradient(circle at top, rgba(124,58,237,0.18) 0%, rgba(22,13,46,0.96) 45%, #0b0618 100%)',
        paddingTop: isMobile ? '26px' : '40px',
        paddingBottom: isMobile ? '28px' : '40px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(124,58,237,0.20), transparent 30%),
            radial-gradient(circle at 80% 35%, rgba(168,85,247,0.14), transparent 28%),
            linear-gradient(180deg, rgba(22,13,46,0.20) 0%, rgba(11,6,24,0.30) 100%)
          `,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: isMobile ? '0 14px' : '0 20px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', alignItems: isMobile ? 'stretch' : 'flex-end', justifyContent: 'space-between', gap: 18, marginBottom: isMobile ? 18 : 28, flexDirection: isMobile ? 'column' : 'row' }}>
          <div style={{ maxWidth: 760 }}>
            <div
              className="hc-mono"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 10,
                fontSize: isMobile ? 10 : 11,
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                color: featuredMode ? '#a78bfa' : '#fbbf24',
              }}
            >
              <span style={{ width: 26, height: 1, background: featuredMode ? '#7c3aed' : '#f59e0b' }} />
              {featuredMode ? 'Featured Collection' : trendingMode ? 'Trending Right Now' : 'Browse Products'}
            </div>

            <h2
              className="hc-display"
              style={{
                fontSize: isMobile ? 28 : 44,
                lineHeight: 1.02,
                fontWeight: 700,
                color: '#fff',
                marginBottom: 10,
              }}
            >
              {title}
            </h2>

            {subtitle && (
              <p
                className="hc-body"
                style={{
                  fontSize: isMobile ? 14 : 17,
                  lineHeight: 1.65,
                  color: 'rgba(255,255,255,.62)',
                  maxWidth: 620,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="hc-mono"
              style={{
                alignSelf: isMobile ? 'flex-start' : 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                textDecoration: 'none',
                color: '#fff',
                padding: isMobile ? '11px 14px' : '12px 16px',
                borderRadius: 14,
                border: '1px solid rgba(255,255,255,.12)',
                background: 'rgba(255,255,255,.05)',
                fontSize: isMobile ? 11 : 12,
                fontWeight: 700,
              }}
            >
              View All
              <ArrowRight size={14} />
            </Link>
          )}
        </div>

        {loading ? (
          <LoadingSkeleton cardMaxWidth={resolvedMaxWidth} />
        ) : validProducts.length > 0 ? (
          <ShuffleStack
            products={validProducts}
            featuredMode={featuredMode}
            trendingMode={trendingMode}
            cardMaxWidth={resolvedMaxWidth}
          />
        ) : (
          <div
            className="hc-glass-dark"
            style={{
              borderRadius: 24,
              padding: isMobile ? 22 : 28,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 10 }}>📦</div>
            <h3 className="hc-display" style={{ color: '#fff', fontSize: isMobile ? 20 : 24, marginBottom: 8 }}>
              No products found
            </h3>
            <p className="hc-body" style={{ color: 'rgba(255,255,255,.6)', fontSize: 14 }}>
              We could not find products for this section right now.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default HomeCards;