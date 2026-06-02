import React, { useState } from 'react';
import { LuxuryButton } from '../components/LuxuryButton';
import { ArrowRight, Check, Send, Globe, Palette, Megaphone, Camera, Newspaper, Scissors, PenTool, Package, Sparkles, CreditCard, FileText, MessageSquare, Mail, User, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServicesProps {
  estimatorRef: React.RefObject<HTMLDivElement | null>;
}

export const Services: React.FC<ServicesProps> = ({ estimatorRef }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const servicesData = [
    {
      id: 0,
      title: 'Shopify Development',
      subtitle: 'E-COMMERCE ENGINEERING',
      icon: <Globe className="w-6 h-6" />,
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
      title: 'Brand Building',
      subtitle: 'IDENTITY & POSITIONING',
      icon: <Palette className="w-6 h-6" />,
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
      title: 'Digital Marketing',
      subtitle: 'GROWTH & ACQUISITION',
      icon: <Megaphone className="w-6 h-6" />,
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
      title: 'Photoshoot & Media',
      subtitle: 'VISUAL PRODUCTION',
      icon: <Camera className="w-6 h-6" />,
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
      title: 'PR',
      subtitle: 'PRESS & PUBLIC RELATIONS',
      icon: <Newspaper className="w-6 h-6" />,
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
      title: 'Fabric Sourcing',
      subtitle: 'MATERIAL SUPPLY CHAIN',
      icon: <Scissors className="w-6 h-6" />,
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
      title: 'Designing',
      subtitle: 'CREATIVE DIRECTION',
      icon: <PenTool className="w-6 h-6" />,
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
      title: 'Production Support',
      subtitle: 'MANUFACTURING & LOGISTICS',
      icon: <Package className="w-6 h-6" />,
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
      title: 'Styling',
      subtitle: 'VISUAL MERCHANDISING',
      icon: <Sparkles className="w-6 h-6" />,
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
      title: 'Payment Integrations',
      subtitle: 'FINANCIAL INFRASTRUCTURE',
      icon: <CreditCard className="w-6 h-6" />,
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
      title: 'Content Creation',
      subtitle: 'DIGITAL ASSETS',
      icon: <FileText className="w-6 h-6" />,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', company: '', service: '', message: '' });
    }, 5000);
  };

  return (
    <div className="relative min-h-screen bg-bw-red pt-32 pb-24 px-8 md:px-12 z-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-[10px] tracking-[0.3em] font-bold text-bw-gray uppercase block mb-4">
            What We Do
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight mb-6">
            Our Services
          </h1>
          <div className="h-px w-20 bg-white mx-auto" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-32 border-b-2 border-white/10">

          {/* Left: Service Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            <span className="text-[10px] tracking-[0.2em] font-bold text-bw-gray uppercase block mb-3">
              Select a Service
            </span>
            {servicesData.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-full text-left p-5 border-2 transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                  activeTab === idx
                    ? 'bg-bw-card text-white border-bw-card'
                    : 'bg-bw-offwhite border-bw-gray-light hover:border-white text-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-full border transition-all duration-300 ${
                    activeTab === idx
                      ? 'border-white/20 bg-white/10'
                      : 'border-bw-gray-light bg-white'
                  }`}>
                    {item.icon}
                  </div>
                  <div>
                    <span className="font-display text-xs tracking-wide font-extrabold uppercase">
                      {item.title}
                    </span>
                    <span className={`text-[8px] tracking-widest font-bold block uppercase mt-0.5 ${
                      activeTab === idx ? 'text-white/40' : 'text-bw-gray'
                    }`}>
                      {item.subtitle}
                    </span>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 transition-all duration-300 ${
                   activeTab === idx ? 'text-white rotate-45 translate-x-1' : 'text-bw-gray group-hover:text-white'
                }`} />
              </button>
            ))}
          </div>

          {/* Right: Detail Panel */}
          <div className="lg:col-span-7 bg-bw-card border-2 border-white/10 p-8 md:p-12 relative overflow-hidden flex flex-col justify-between min-h-[540px]">
            <div className="absolute top-0 right-0 w-28 h-28 bg-bw-offwhite blur-xl pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <span className="text-[10px] tracking-[0.3em] font-bold text-bw-gray-dark uppercase block mb-2">
                  {servicesData[activeTab].subtitle}
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-black text-white tracking-tight mb-6">
                  {servicesData[activeTab].title}
                </h2>
                <p className="text-sm font-medium text-bw-gray italic leading-relaxed mb-8 border-l-2 border-white pl-4">
                  &ldquo;{servicesData[activeTab].tagline}&rdquo;
                </p>

                <h3 className="text-[10px] tracking-[0.2em] font-bold text-bw-gray uppercase mb-4">
                  What You Get
                </h3>
                <ul className="grid grid-cols-1 gap-3 mb-8">
                  {servicesData[activeTab].bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs font-semibold text-bw-gray-dark">
                      <div className="w-4 h-4 rounded-full bg-bw-offwhite border border-bw-gray-light flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                      </div>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            <div className="border-t-2 border-white/10 pt-8 mt-6">
              <h3 className="text-[10px] tracking-[0.2em] font-bold text-bw-gray uppercase mb-2">
                Expected Outcome
              </h3>
              <p className="text-xs font-medium text-bw-gray-dark leading-relaxed mb-6">
                {servicesData[activeTab].outcome}
              </p>

              <LuxuryButton variant="plain" onClick={() => estimatorRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                Get in Touch
              </LuxuryButton>
            </div>
          </div>

        </div>

        {/* Contact Us Form */}
        <div ref={estimatorRef} className="pt-32">

          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.3em] font-bold text-bw-gray uppercase block mb-4">
              Start a Conversation
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
              Contact Us
            </h2>
            <p className="text-xs font-medium text-bw-gray tracking-wider mt-4 max-w-xl mx-auto leading-relaxed">
              Tell us about your project. We will review your brief and get back within 24 hours to discuss next steps.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {submitted ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-12 bg-bw-offwhite border-2 border-white/10 text-center flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-bw-card flex items-center justify-center">
                  <Check className="w-8 h-8 text-white stroke-[3]" />
                </div>
                <span className="font-display text-xl font-black text-white uppercase tracking-[0.15em]">
                  Message Sent
                </span>
                <span className="text-sm text-bw-gray max-w-md leading-relaxed">
                  Thank you for reaching out. Our team has received your inquiry and will contact you within 24 hours to discuss your project in detail.
                </span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-bw-offwhite border-2 border-white/10 p-8 md:p-12">
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
                        className="w-full bg-white border-2 border-bw-gray-light hover:border-bw-gray focus:border-bw-red transition-colors duration-500 py-4 pl-12 pr-4 text-xs font-medium tracking-wide text-bw-black placeholder-bw-gray focus:outline-none"
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
                        className="w-full bg-white border-2 border-bw-gray-light hover:border-bw-gray focus:border-bw-red transition-colors duration-500 py-4 pl-12 pr-4 text-xs font-medium tracking-wide text-bw-black placeholder-bw-gray focus:outline-none"
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
                        className="w-full bg-white border-2 border-bw-gray-light hover:border-bw-gray focus:border-bw-red transition-colors duration-500 py-4 pl-12 pr-4 text-xs font-medium tracking-wide text-bw-black placeholder-bw-gray focus:outline-none"
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
                        className="w-full bg-white border-2 border-bw-gray-light hover:border-bw-gray focus:border-bw-red transition-colors duration-500 py-4 pl-12 pr-4 text-xs font-medium tracking-wide text-bw-black focus:outline-none appearance-none cursor-pointer"
                      >
                        <option value="">Select a service</option>
                        {servicesData.map((s) => (
                          <option key={s.id} value={s.title}>{s.title}</option>
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
                    className="w-full bg-white border-2 border-bw-gray-light hover:border-bw-gray focus:border-bw-red transition-colors duration-500 p-4 text-xs font-medium tracking-wide text-bw-black placeholder-bw-gray focus:outline-none resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <p className="text-[10px] text-bw-gray tracking-wider">
                    We respect your privacy. No spam, ever.
                  </p>
                  <button
                    type="submit"
                    className="group relative px-10 py-4 bg-white text-bw-red font-bold text-[11px] tracking-[0.3em] uppercase overflow-hidden cursor-pointer flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
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
    </div>
  );
};
