// src/pages/RefundPolicy.jsx - Premium 3D Refund Policy Page
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Mail, Phone, Clock, CheckCircle, AlertCircle, ArrowRight,
  ChevronRight, FileText, CreditCard, RefreshCw, XCircle, HelpCircle,
  MessageCircle, Sparkles, Award, Zap, ThumbsUp, ExternalLink
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

// ─── CUSTOM WHATSAPP ICON ─────────────────────────────────────────────────────
const WhatsAppIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.101.115-.207.24-.087.462.12.222.534 1.004 1.142 1.622.782.795 1.444 1.041 1.649 1.157.206.115.325.101.447-.043.122-.145.505-.59.635-.793.13-.202.26-.173.447-.101.188.072 1.183.557 1.386.658.202.101.332.159.375.245.043.087.043.505-.101.91zM12.004 2c-5.523 0-10 4.477-10 10 0 1.801.48 3.561 1.397 5.101L2 22l5.058-1.324C8.438 21.554 10.201 22 12.004 22c5.523 0 10-4.477 10-10s-4.477-10-10-10z"/>
  </svg>
);

// ─── CSS ANIMATIONS ────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@500;600;700&family=Cabinet+Grotesk:wght@400;500;700;800&family=Fira+Code:wght@400;500&display=swap');

@keyframes float-y { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
@keyframes gradient-x { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
@keyframes blob-morph {
  0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}
  50%{border-radius:50% 60% 30% 60%/40% 50% 60% 50%}
}
@keyframes pulse-glow { 0%,100%{opacity:.4} 50%{opacity:.8} }

.font-display { font-family:'Clash Display',sans-serif; }
.font-body { font-family:'Cabinet Grotesk',sans-serif; }
.font-mono { font-family:'Fira Code',monospace; }

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
.text-gradient-p {
  background: linear-gradient(90deg,#7c3aed,#a855f7,#c084fc);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-x 4s ease infinite;
}
`;

// ─── BLOB COMPONENT ────────────────────────────────────────────────────────────
const Blob = ({ color = 'rgba(124,58,237,.06)', size = 400, style = {} }) => (
  <div className="absolute pointer-events-none" style={{
    width: size, height: size,
    background: `radial-gradient(ellipse,${color},transparent 70%)`,
    animation: 'blob-morph 14s ease-in-out infinite',
    filter: 'blur(60px)', ...style,
  }} />
);

// ─── TIMELINE ITEM ─────────────────────────────────────────────────────────────
const TimelineItem = ({ step, title, description, icon: Icon, color }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: color }}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {step < 3 && <div className="w-0.5 h-full bg-gradient-to-b from-purple-300 to-transparent mt-2" />}
    </div>
    <div className="flex-1 pb-8">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-sm font-bold text-purple-600">Step {step}</span>
        <h4 className="font-display font-bold text-gray-900">{title}</h4>
      </div>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

// ─── FAQ ITEM ──────────────────────────────────────────────────────────────────
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="glass-light rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left"
      >
        <span className="font-display font-semibold text-gray-900">{question}</span>
        <ChevronRight className={`w-5 h-5 text-purple-500 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      <div className={`px-6 overflow-hidden transition-all duration-300 ${isOpen ? 'pb-4 max-h-40' : 'max-h-0'}`}>
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

// ─── MAIN REFUND POLICY PAGE ───────────────────────────────────────────────────
const RefundPolicy = () => {
  const whatsappNumber = '+923446969962';
  const email = 'usmanfrombunny@gmail.com';

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber.replace(/\+/g, '')}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f4ff] via-white to-[#f0ebff] font-body overflow-x-hidden">
      <style>{CSS}</style>
      
      <Blob color="rgba(124,58,237,.06)" size={500} style={{ top: '-5%', left: '-5%' }} />
      <Blob color="rgba(239,68,68,.04)" size={400} style={{ bottom: '10%', right: '-5%' }} />

      {/* Hero Section */}
      <section className="relative pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-gray-500 mb-8">
              <Link to="/" className="hover:text-purple-600 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-gray-900 font-medium">Refund Policy</span>
            </nav>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-light mb-6">
                <Shield className="w-4 h-4 text-purple-500" />
                <span className="font-mono text-xs tracking-widest uppercase text-purple-600">Customer Protection</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                <span className="text-gradient-p">Refund</span> Policy
              </h1>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Transparent, fair, and straightforward. We believe in protecting our customers 
                while maintaining the integrity of our digital products.
              </p>
            </div>

            {/* Important Notice Banner */}
            <div className="mt-8 p-6 rounded-2xl border-l-4 border-yellow-500" style={{ background: 'linear-gradient(135deg,rgba(245,158,11,.1),rgba(245,158,11,.02))' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-gray-900 mb-1">Important Notice</h3>
                  <p className="text-gray-700">
                    Since our products are <span className="font-semibold">digital goods delivered instantly</span>, 
                    all sales are final. Refunds will only be issued if the product access link or account 
                    does not work and our team is unable to fix it within a reasonable timeframe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Refund Eligibility */}
              <div className="glass-light rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-gray-900">When You're Eligible</h2>
                </div>
                
                <div className="space-y-4">
                  {[
                    'Product access link or account provided does not work',
                    'Our technical team confirms the issue cannot be resolved',
                    'Refund request made within 3 days of purchase',
                    'You have cooperated with our support team for troubleshooting'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      </div>
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Non-Refundable Situations */}
              <div className="glass-light rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-gray-900">Non-Refundable Situations</h2>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Change of Mind', desc: 'Decided you no longer want the product' },
                    { title: 'Accidental Purchase', desc: 'Purchased by mistake or wrong product' },
                    { title: 'Incomplete Usage', desc: 'Did not fully use the product features' },
                    { title: 'Compatibility Issues', desc: 'Did not check system requirements' },
                    { title: 'Found Cheaper Elsewhere', desc: 'Price difference after purchase' },
                    { title: 'Failure to Follow Instructions', desc: 'Did not follow setup guidelines' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/40">
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Refund Process Timeline */}
              <div className="glass-light rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-gray-900">Refund Process</h2>
                </div>
                
                <TimelineItem step={1} title="Contact Support" icon={MessageCircle} color="linear-gradient(135deg,#7c3aed,#a855f7)"
                  description="Reach out within 3 days of purchase via email or WhatsApp. Provide your order details and describe the issue you're experiencing." />
                
                <TimelineItem step={2} title="Technical Verification" icon={Zap} color="linear-gradient(135deg,#3b82f6,#06b6d4)"
                  description="Our team will verify the issue and attempt to resolve it. This typically takes 1-2 business days. We may ask for additional information." />
                
                <TimelineItem step={3} title="Refund Processing" icon={CreditCard} color="linear-gradient(135deg,#10b981,#34d399)"
                  description="If the issue cannot be resolved, your refund will be approved and processed within 5 working days to your original payment method." />
              </div>

              {/* FAQ Section */}
              <div className="glass-light rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                </div>
                
                <div className="space-y-3">
                  <FAQItem question="Can I get a refund if I change my mind?" answer="No, since our products are digital and delivered instantly, we do not offer refunds for change of mind or accidental purchases." />
                  <FAQItem question="What if the product doesn't work?" answer="Contact us immediately within 3 days. Our team will try to fix the issue. If unresolved, you may be eligible for a refund." />
                  <FAQItem question="How long does refund processing take?" answer="Once approved, refunds are processed within 5 working days. Bank processing time varies." />
                  <FAQItem question="Can I transfer my purchase to someone else?" answer="No, digital product licenses are non-transferable and tied to the original purchaser." />
                  <FAQItem question="What if I purchased the wrong plan?" answer="Contact us within 24 hours. We may be able to help you upgrade/downgrade, but refunds are not guaranteed." />
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="glass-light rounded-3xl p-6 sticky top-24">
                <h3 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-purple-500" />
                  Need Help?
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Email Support</p>
                      <a href={`mailto:${email}`} className="font-mono text-sm text-purple-600 hover:text-purple-700">
                        {email}
                      </a>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                      <WhatsAppIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">WhatsApp</p>
                      <p className="font-mono text-sm text-gray-900">{whatsappNumber}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Response Time</p>
                      <p className="font-medium text-gray-900">24-48 Hours</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleWhatsApp}
                  className="w-full py-3 rounded-xl font-display font-semibold text-white flex items-center justify-center gap-2 mb-4"
                  style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </button>

                <Link
                  to="/contact"
                  className="w-full py-3 rounded-xl font-display font-semibold border-2 border-purple-200 text-purple-600 flex items-center justify-center gap-2 hover:bg-purple-50 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Support</span>
                </Link>
              </div>

              {/* Important Timeframes */}
              <div className="glass-light rounded-3xl p-6">
                <h4 className="font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-500" />
                  Important Timeframes
                </h4>
                
                <div className="space-y-3">
                  {[
                    { label: 'Refund Request Window', value: '3 Days', color: 'bg-yellow-100 text-yellow-700' },
                    { label: 'Verification Period', value: '1-2 Days', color: 'bg-blue-100 text-blue-700' },
                    { label: 'Refund Processing', value: '5 Working Days', color: 'bg-green-100 text-green-700' },
                    { label: 'Support Response', value: '24-48 Hours', color: 'bg-purple-100 text-purple-700' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/40">
                      <span className="text-sm text-gray-600">{item.label}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="glass-light rounded-3xl p-6">
                <h4 className="font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-green-500" />
                  Tips for Smooth Resolution
                </h4>
                
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Keep your order confirmation email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Take screenshots of any errors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Describe the issue clearly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Respond promptly to follow-up questions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Summary */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="rounded-3xl p-8 md:p-10 text-white" style={{ background: T.dd }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold mb-1">Policy Summary</h3>
                  <p className="text-gray-400">Everything you need to know at a glance</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link to="/products" className="px-6 py-3 rounded-xl font-display font-semibold text-white" style={{ background: T.gP }}>
                  Browse Products
                </Link>
                <button onClick={handleWhatsApp} className="px-6 py-3 rounded-xl font-display font-semibold border border-purple-400 text-purple-300 hover:bg-purple-500/10">
                  Contact Support
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
              {[
                { icon: CheckCircle, text: '3-Day Window', color: 'text-green-400' },
                { icon: RefreshCw, text: 'Verified Issues Only', color: 'text-blue-400' },
                { icon: CreditCard, text: '5-Day Processing', color: 'text-purple-400' },
                { icon: Shield, text: 'Digital Products', color: 'text-yellow-400' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-sm text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
          <p className="text-sm text-gray-500">
            Last updated: May 2026 · Bunny Tools Refund Policy
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RefundPolicy;