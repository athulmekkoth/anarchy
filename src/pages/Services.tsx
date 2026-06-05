import React, { useState } from 'react';
import { ArrowRight, Send, Check, Mail, User, Building2, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import photoshootImg from '../assets/editorial_photoshoot.png';
import boutiqueImg from '../assets/boutique_paris.png';
import fabricImg from '../assets/luxury_fabric.png';
import heroImg from '../assets/hero.png';

interface ServicesProps {
  estimatorRef: React.RefObject<HTMLDivElement | null>;
}

const disciplines = [
  {
    id: 0,
    num: '01',
    title: 'Shopify Development',
    subtitle: 'E-COMMERCE ENGINEERING',
    image: boutiqueImg,
    tagline: 'Bespoke Shopify stores engineered for conversion, speed, and scale.',
    bullets: [
      'Custom Liquid & Hydrogen headless storefronts',
      'Zero-template builds with unique UX/UI systems',
      '99+ mobile speed & Core Web Vitals optimization',
      'Custom cart, checkout flows & app integrations',
      'Multi-market, multi-currency global deployment',
    ],
    outcome: 'A high-performing digital boutique that converts visitors into loyal customers at scale.',
  },
  {
    id: 1,
    num: '02',
    title: 'Brand Building',
    subtitle: 'IDENTITY & POSITIONING',
    image: photoshootImg,
    tagline: 'Forge a brand identity that commands attention and builds trust.',
    bullets: [
      'Strategic brand positioning & market differentiation',
      'Logo, typography & complete visual identity systems',
      'Brand guidelines, voice & tone documentation',
      'Packaging design & physical brand collateral',
      'Naming, messaging & storytelling frameworks',
    ],
    outcome: 'A cohesive, memorable brand that stands out in crowded markets and resonates with your audience.',
  },
  {
    id: 2,
    num: '03',
    title: 'Digital Marketing',
    subtitle: 'GROWTH & ACQUISITION',
    image: fabricImg,
    tagline: 'Data-driven campaigns that amplify reach and drive revenue.',
    bullets: [
      'SEO, SEM & paid media strategy & execution',
      'Social media management & content calendars',
      'Email marketing automation & retention flows',
      'Influencer outreach & partnership programs',
      'Analytics, attribution & performance reporting',
    ],
    outcome: 'Sustainable traffic growth and customer acquisition channels that deliver measurable ROI.',
  },
  {
    id: 3,
    num: '04',
    title: 'Photoshoot & Media',
    subtitle: 'VISUAL PRODUCTION',
    image: photoshootImg,
    tagline: 'Stunning visuals that tell your brand story and sell products.',
    bullets: [
      'Editorial & e-commerce photography direction',
      'Campaign video production & lookbook creation',
      'Model casting, styling & set design coordination',
      'Post-production, retouching & color grading',
      'Lifestyle, product & architectural shoots',
    ],
    outcome: 'A premium visual library that elevates every customer touchpoint and marketing channel.',
  },
  {
    id: 4,
    num: '05',
    title: 'PR',
    subtitle: 'PRESS & PUBLIC RELATIONS',
    image: boutiqueImg,
    tagline: 'Earned media coverage that builds credibility and buzz.',
    bullets: [
      'Press release writing & media pitch strategy',
      'Fashion editor & journalist relationship building',
      'Event planning, showrooms & launch activations',
      'Crisis communication & reputation management',
      'Award submissions & industry recognition programs',
    ],
    outcome: 'Strategic press placements that position your brand as a leader and drive organic discovery.',
  },
  {
    id: 5,
    num: '06',
    title: 'Fabric Sourcing',
    subtitle: 'MATERIAL SUPPLY CHAIN',
    image: fabricImg,
    tagline: 'Direct access to historic mills and premium textile suppliers.',
    bullets: [
      'Direct mill partnerships across Paris, Milan, Lyon',
      'Organic silk, cashmere, linen & sustainable fabrics',
      'Custom dyeing, printing & finishing coordination',
      'Sustainability auditing & traceability reports',
      'Swatch libraries, MOQ negotiation & logistics',
    ],
    outcome: 'Premium material foundations that elevate product quality and support ethical production.',
  },
  {
    id: 6,
    num: '07',
    title: 'Designing',
    subtitle: 'CREATIVE DIRECTION',
    image: heroImg,
    tagline: 'From concept to creation — design that defines your vision.',
    bullets: [
      'Collection concept & mood board development',
      'Technical flat sketches & spec sheet creation',
      'Pattern making & prototype coordination',
      'CAD illustrations & 3D garment visualization',
      'Line planning, color stories & seasonal direction',
    ],
    outcome: 'A clear, executable creative vision that guides every stage of product development.',
  },
  {
    id: 7,
    num: '08',
    title: 'Production Support',
    subtitle: 'MANUFACTURING & LOGISTICS',
    image: boutiqueImg,
    tagline: 'End-to-end production management from factory to fulfillment.',
    bullets: [
      'Factory vetting, negotiation & relationship management',
      'Sampling, fittings & quality control oversight',
      'Production scheduling & deadline management',
      'Shipping, customs & logistics coordination',
      'Inventory planning & reorder strategy',
    ],
    outcome: 'Seamless production execution that delivers on time, on budget, and on quality.',
  },
  {
    id: 8,
    num: '09',
    title: 'Styling',
    subtitle: 'VISUAL MERCHANDISING',
    image: photoshootImg,
    tagline: 'Curated styling that brings your brand aesthetic to life.',
    bullets: [
      'Editorial & campaign styling direction',
      'E-commerce flat lay & on-model styling',
      'Showroom, boutique & retail VM design',
      'Trend forecasting & seasonal curation',
      'Wardrobe planning for shoots & events',
    ],
    outcome: 'A distinct visual language that unifies every presentation of your brand.',
  },
  {
    id: 9,
    num: '10',
    title: 'Payment Integrations',
    subtitle: 'FINANCIAL INFRASTRUCTURE',
    image: fabricImg,
    tagline: 'Seamless, secure checkout experiences that reduce friction.',
    bullets: [
      'Shopify Payments, Stripe & gateway configuration',
      'Multi-currency & regional tax automation',
      'BNPL integrations (Klarna, Afterpay, Affirm)',
      'Subscription & recurring billing setups',
      'Fraud detection, compliance & PCI security',
    ],
    outcome: 'A checkout experience that builds trust, reduces cart abandonment, and maximizes conversions.',
  },
  {
    id: 10,
    num: '11',
    title: 'Content Creation',
    subtitle: 'DIGITAL ASSETS',
    image: heroImg,
    tagline: 'Scroll-stopping content tailored for every platform.',
    bullets: [
      'Social media graphics, carousels & Reels/TikToks',
      'Blog writing, SEO copy & product descriptions',
      'Newsletter design & email template builds',
      'Brand films, motion graphics & animated assets',
      'UGC strategy & creator content direction',
    ],
    outcome: 'A consistent stream of on-brand content that engages audiences and drives organic growth.',
  },
];

export const Services: React.FC<ServicesProps> = ({ estimatorRef }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', company: '', service: '', message: '' });
    }, 5000);
  };

  const currentIdx = hoveredIdx !== null ? hoveredIdx : activeIdx;
  const current = disciplines[currentIdx];

  return (
    <div className="relative min-h-screen bg-bw-red pt-32 z-10">

      {/* Header */}
      <div className="text-center mb-16 px-8">
        <span className="text-[10px] tracking-[0.3em] font-bold text-bw-gray uppercase block mb-4">
          What We Do
        </span>
        <h1 className="font-brutal text-4xl sm:text-6xl font-black text-bw-white tracking-tight leading-tight mb-6">
          Our Services
        </h1>
        <div className="h-px w-20 bg-bw-white mx-auto" />
      </div>

      {/* Desktop: Three-Column Layout — Image in Center */}
      <div className="hidden lg:block max-w-[1400px] mx-auto px-8 pb-24">
        <div className="grid grid-cols-12 gap-6 min-h-[700px]">

          {/* Left Column: Service List */}
          <div className="col-span-3 flex flex-col justify-center">
            {disciplines.slice(0, 6).map((d) => (
              <div
                key={d.id}
                className="relative py-4 border-b border-bw-white/10 cursor-pointer transition-all duration-500 group"
                onMouseEnter={() => setHoveredIdx(d.id)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setActiveIdx(d.id)}
              >
                <div className="flex items-baseline gap-3">
                  <span className={`font-brutal text-xl font-black transition-all duration-500 ${
                    currentIdx === d.id ? 'text-bw-white' : 'text-bw-white/20 group-hover:text-bw-white/40'
                  }`}>
                    {d.num}
                  </span>
                  <h3 className={`font-brutal text-sm font-black tracking-wide uppercase transition-all duration-500 ${
                    currentIdx === d.id ? 'text-bw-white' : 'text-bw-white/50 group-hover:text-bw-white/80'
                  }`}>
                    {d.title}
                  </h3>
                </div>
                <span className={`text-[9px] tracking-[0.2em] font-bold uppercase block mt-0.5 transition-all duration-500 ${
                  currentIdx === d.id ? 'text-bw-gray' : 'text-bw-white/20 group-hover:text-bw-white/30'
                }`}>
                  {d.subtitle}
                </span>
              </div>
            ))}
          </div>

          {/* Center Column: Image Stage */}
          <div className="col-span-6 relative overflow-hidden bg-bw-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover grayscale brightness-50"
                />
                <div className="absolute inset-0 bg-bw-red/30" />
              </motion.div>
            </AnimatePresence>

            {/* Overlay number */}
            <div className="absolute bottom-6 left-6 z-10">
              <span className="font-brutal text-[100px] md:text-[140px] font-black leading-none stroked-number text-bw-white/20">
                {current.num}
              </span>
            </div>
          </div>

          {/* Right Column: Service List */}
          <div className="col-span-3 flex flex-col justify-center">
            {disciplines.slice(6).map((d) => (
              <div
                key={d.id}
                className="relative py-4 border-b border-bw-white/10 cursor-pointer transition-all duration-500 group"
                onMouseEnter={() => setHoveredIdx(d.id)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setActiveIdx(d.id)}
              >
                <div className="flex items-baseline gap-3">
                  <span className={`font-brutal text-xl font-black transition-all duration-500 ${
                    currentIdx === d.id ? 'text-bw-white' : 'text-bw-white/20 group-hover:text-bw-white/40'
                  }`}>
                    {d.num}
                  </span>
                  <h3 className={`font-brutal text-sm font-black tracking-wide uppercase transition-all duration-500 ${
                    currentIdx === d.id ? 'text-bw-white' : 'text-bw-white/50 group-hover:text-bw-white/80'
                  }`}>
                    {d.title}
                  </h3>
                </div>
                <span className={`text-[9px] tracking-[0.2em] font-bold uppercase block mt-0.5 transition-all duration-500 ${
                  currentIdx === d.id ? 'text-bw-gray' : 'text-bw-white/20 group-hover:text-bw-white/30'
                }`}>
                  {d.subtitle}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom detail bar */}
        <div className="mt-8 border-t border-bw-white/10 pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="grid grid-cols-12 gap-6"
            >
              <div className="col-span-4">
                <h2 className="font-brutal text-2xl font-black text-bw-white tracking-tight mb-2">
                  {current.title}
                </h2>
                <p className="font-serif text-sm font-medium text-bw-white/70 italic leading-relaxed border-l-2 border-bw-white/30 pl-4">
                  &ldquo;{current.tagline}&rdquo;
                </p>
              </div>
              <div className="col-span-4">
                <h3 className="text-[10px] tracking-[0.25em] font-bold text-bw-gray uppercase mb-3">
                  What You Get
                </h3>
                <ul className="space-y-1.5">
                  {current.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 text-[11px] font-bold text-bw-white leading-snug tracking-tight uppercase">
                      <span className="text-bw-white/40 shrink-0 mt-0.5 font-black">/</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-4">
                <h3 className="text-[10px] tracking-[0.25em] font-bold text-bw-gray uppercase mb-3">
                  Expected Outcome
                </h3>
                <p className="text-xs font-medium text-bw-white/70 leading-relaxed mb-4">
                  {current.outcome}
                </p>
                <button
                  type="button"
                  onClick={() => estimatorRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="group inline-flex items-center gap-2.5 text-[11px] font-bold tracking-[0.28em] text-bw-white uppercase transition-all duration-300 hover:gap-4 cursor-pointer"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile: Accordion Stack */}
      <div className="lg:hidden px-4 pb-16">
        {disciplines.map((d, idx) => (
          <div
            key={d.id}
            className="border-b border-bw-white/10"
          >
            <button
              onClick={() => setMobileOpen(mobileOpen === idx ? null : idx)}
              className="w-full text-left py-6 px-2 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-brutal text-2xl font-black text-bw-white/30">
                  {d.num}
                </span>
                <h3 className="font-brutal text-lg font-black tracking-wide uppercase text-bw-white">
                  {d.title}
                </h3>
              </div>
              <div className={`transition-transform duration-300 ${mobileOpen === idx ? 'rotate-90' : ''}`}>
                <ArrowRight className="w-5 h-5 text-bw-white/40" />
              </div>
            </button>

            <AnimatePresence>
              {mobileOpen === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 px-2">
                    {/* Image */}
                    <div className="relative h-48 mb-6 overflow-hidden">
                      <img
                        src={d.image}
                        alt={d.title}
                        className="w-full h-full object-cover grayscale brightness-75"
                      />
                      <div className="absolute inset-0 bg-bw-red/30" />
                    </div>

                    <span className="text-[10px] tracking-[0.3em] font-bold text-bw-gray uppercase block mb-3">
                      {d.subtitle}
                    </span>

                    <p className="font-serif text-sm font-medium text-bw-white/80 italic leading-relaxed mb-5 border-l-2 border-bw-white/30 pl-4">
                      &ldquo;{d.tagline}&rdquo;
                    </p>

                    <h3 className="text-[10px] tracking-[0.25em] font-bold text-bw-gray uppercase mb-3">
                      What You Get
                    </h3>
                    <ul className="space-y-2 mb-5">
                      {d.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3 text-xs font-bold text-bw-white leading-snug tracking-tight uppercase">
                          <span className="text-bw-white/40 shrink-0 mt-0.5 font-black">/</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="border-t border-bw-white/15 pt-4">
                      <p className="text-xs font-medium text-bw-white/60 leading-relaxed mb-4">
                        {d.outcome}
                      </p>
                      <button
                        type="button"
                        onClick={() => estimatorRef.current?.scrollIntoView({ behavior: 'smooth' })}
                        className="group inline-flex items-center gap-2.5 text-[11px] font-bold tracking-[0.28em] text-bw-white uppercase transition-all duration-300 hover:gap-4 cursor-pointer"
                      >
                        Get in Touch
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div ref={estimatorRef} className="bg-bw-black py-32 px-8 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.3em] font-bold text-bw-gray uppercase block mb-4">
              Start a Conversation
            </span>
            <h2 className="font-brutal text-4xl sm:text-5xl font-black text-bw-white tracking-tight">
              Contact Us
            </h2>
            <p className="text-xs font-medium text-bw-gray tracking-wider mt-4 max-w-xl mx-auto leading-relaxed">
              Tell us about your project. We will review your brief and get back within 24 hours to discuss next steps.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-12 bg-bw-red border border-bw-white/20 text-center flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-bw-white flex items-center justify-center">
                <Check className="w-8 h-8 text-bw-red stroke-[3]" />
              </div>
              <span className="font-brutal text-xl font-black text-bw-white uppercase tracking-[0.15em]">
                Message Sent
              </span>
              <span className="text-sm text-bw-gray max-w-md leading-relaxed">
                Thank you for reaching out. Our team has received your inquiry and will contact you within 24 hours.
              </span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-bw-red border border-bw-white/20 p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-[10px] tracking-[0.25em] font-bold text-bw-gray uppercase block mb-3">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bw-gray" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      required
                      className="w-full bg-bw-white border-2 border-bw-gray-light hover:border-bw-gray focus:border-bw-red transition-colors duration-500 py-4 pl-12 pr-4 text-xs font-medium tracking-wide text-bw-black placeholder-bw-gray focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.25em] font-bold text-bw-gray uppercase block mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bw-gray" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      required
                      className="w-full bg-bw-white border-2 border-bw-gray-light hover:border-bw-gray focus:border-bw-red transition-colors duration-500 py-4 pl-12 pr-4 text-xs font-medium tracking-wide text-bw-black placeholder-bw-gray focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.25em] font-bold text-bw-gray uppercase block mb-3">
                    Company / Brand
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bw-gray" />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your Brand Name"
                      className="w-full bg-bw-white border-2 border-bw-gray-light hover:border-bw-gray focus:border-bw-red transition-colors duration-500 py-4 pl-12 pr-4 text-xs font-medium tracking-wide text-bw-black placeholder-bw-gray focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.25em] font-bold text-bw-gray uppercase block mb-3">
                    Service Interest
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bw-gray" />
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-bw-white border-2 border-bw-gray-light hover:border-bw-gray focus:border-bw-red transition-colors duration-500 py-4 pl-12 pr-4 text-xs font-medium tracking-wide text-bw-black focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="">Select a service</option>
                      {disciplines.map((d) => (
                        <option key={d.id} value={d.title}>{d.title}</option>
                      ))}
                      <option value="Multiple Services">Multiple Services</option>
                      <option value="Not Sure Yet">Not Sure Yet</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <label className="text-[10px] tracking-[0.25em] font-bold text-bw-gray uppercase block mb-3">
                  Project Brief
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project, goals, timeline, and anything else we should know."
                  rows={5}
                  required
                  className="w-full bg-bw-white border-2 border-bw-gray-light hover:border-bw-gray focus:border-bw-red transition-colors duration-500 p-4 text-xs font-medium tracking-wide text-bw-black placeholder-bw-gray focus:outline-none resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <p className="text-[10px] text-bw-gray tracking-wider">
                  We respect your privacy. No spam, ever.
                </p>
                <button
                  type="submit"
                  className="group relative px-10 py-4 bg-bw-white text-bw-red font-bold text-[11px] tracking-[0.3em] uppercase overflow-hidden cursor-pointer flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-linear" />
                  <span className="relative z-10">Send Message</span>
                  <Send className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

    </div>
  );
};
