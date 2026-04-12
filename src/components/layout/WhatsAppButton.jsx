// src/components/layout/WhatsAppButton.jsx
import React, { useEffect, useRef, useState } from 'react';
import { getWhatsAppNumber } from '../../api/api';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('+923000000000');
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    fetchWhatsAppNumber();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 80) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollYRef.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchWhatsAppNumber = async () => {
    try {
      const number = await getWhatsAppNumber();
      if (number) setWhatsappNumber(number);
    } catch (error) {
      console.error('Error fetching WhatsApp number:', error);
    }
  };

  const handleClick = () => {
    const message = encodeURIComponent(
      "Hello Bunny Tools! I'm interested in your products."
    );
    const cleanNumber = whatsappNumber.replace('+', '');
    const url = `https://wa.me/${cleanNumber}?text=${message}`;
    window.open(url, '_blank');

    if (window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'whatsapp_button',
      });
    }
  };

  return (
    <>
      <style>{`
        @keyframes wa-float-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes wa-glow-soft {
          0%, 100% {
            box-shadow:
              0 12px 30px rgba(37, 211, 102, 0.22),
              0 0 0 0 rgba(37, 211, 102, 0);
          }
          50% {
            box-shadow:
              0 16px 36px rgba(37, 211, 102, 0.30),
              0 0 0 10px rgba(37, 211, 102, 0);
          }
        }

        @keyframes wa-badge-pop {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        @keyframes wa-icon-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
      `}</style>

      <div
        className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 transition-all duration-500 ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-6 opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={handleClick}
          aria-label="Chat on WhatsApp"
          className="group relative flex items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 active:scale-[0.96] focus:outline-none"
          style={{
            width: '68px',
            height: '68px',
            background:
              'linear-gradient(135deg, #1fa855 0%, #25D366 55%, #2ee879 100%)',
            border: '1px solid rgba(255,255,255,.16)',
            boxShadow:
              '0 12px 30px rgba(37,211,102,.24), inset 0 1px 0 rgba(255,255,255,.18)',
            animation: 'wa-float-soft 3.2s ease-in-out infinite, wa-glow-soft 3s ease-in-out infinite',
            WebkitBackdropFilter: 'blur(14px)',
            backdropFilter: 'blur(14px)',
          }}
        >
          <div
            className="absolute inset-[2px] rounded-full pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,.12), rgba(255,255,255,0) 40%)',
            }}
          />

          <div
            className="relative flex items-center justify-center"
            style={{ animation: 'wa-icon-breathe 2.2s ease-in-out infinite' }}
          >
            <FaWhatsapp
              className="text-white transition-transform duration-300 group-hover:scale-110"
              style={{ width: 32, height: 32 }}
            />
          </div>

          <div
            className="absolute -top-1 -right-1 min-w-[24px] h-[24px] px-1 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
            style={{
              background: 'linear-gradient(135deg,#f59e0b,#fbbf24)',
              boxShadow: '0 6px 14px rgba(245,158,11,.35)',
              animation: 'wa-badge-pop 1.8s ease-in-out infinite',
            }}
          >
            1
          </div>
        </button>
      </div>
    </>
  );
};

export default WhatsAppButton;