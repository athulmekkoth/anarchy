import React, { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LuxuryButton } from '../components/LuxuryButton';
import { PortraitVideoReel } from '../components/PortraitVideoReel';
import { ArrowUpRight, Sparkles, Compass, Eye, Scissors, Store } from 'lucide-react';
import { motion } from 'framer-motion';

import fabricImg from '../assets/luxury_fabric.png';
import boutiqueImg from '../assets/boutique_paris.png';
import photoshootImg from '../assets/editorial_photoshoot.png';
import heroImg from '../assets/hero.png';

gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  setActiveView: (view: 'home' | 'services') => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveView }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLDivElement>(null);
  const heroCTARef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.tx = e.clientX;
      mouseRef.current.ty = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    mouseRef.current.x = width / 2;
    mouseRef.current.y = height / 2;
    mouseRef.current.tx = width / 2;
    mouseRef.current.ty = height / 2;

    const threadCount = 10;
    const threads: Array<{
      points: Array<{ x: number; y: number; ox: number; oy: number }>;
      seed: number;
      speed: number;
      color: string;
      width: number;
    }> = [];

    for (let i = 0; i < threadCount; i++) {
      const points = [];
      const segmentCount = 8;
      const seed = Math.random() * 100;
      const speed = 0.0008 + Math.random() * 0.0015;

      for (let j = 0; j < segmentCount; j++) {
        const x = (width / (segmentCount - 1)) * j;
        const y = height * 0.48 + Math.sin(j + seed) * 100 + (i * 20 - (threadCount * 10));
        points.push({ x, y, ox: x, oy: y });
      }

      const opacity = 0.02 + (i / threadCount) * 0.04;
      const color = `rgba(255, 255, 255, ${opacity})`;
      const lineWidth = 0.5 + Math.random() * 1;

      threads.push({ points, seed, speed, color, width: lineWidth });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      threads.forEach((thread, tIdx) => {
        thread.seed += thread.speed;

        ctx.beginPath();
        ctx.strokeStyle = thread.color;
        ctx.lineWidth = thread.width;

        for (let j = 0; j < thread.points.length; j++) {
          const pt = thread.points[j];

          const yWave = Math.sin(j * 0.6 + thread.seed + tIdx) * 40;
          const xWave = Math.cos(j * 0.35 + thread.seed) * 10;

          const dx = pt.ox + xWave - mouse.x;
          const dy = pt.oy + yWave - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxInfluence = 200;
          let pushX = 0;
          let pushY = 0;

          if (dist < maxInfluence) {
            const force = (maxInfluence - dist) / maxInfluence;
            pushX = (dx / dist) * force * 35;
            pushY = (dy / dist) * force * 35;
          }

          pt.x += (pt.ox + xWave + pushX - pt.x) * 0.06;
          pt.y += (pt.oy + yWave + pushY - pt.y) * 0.06;
        }

        ctx.moveTo(thread.points[0].x, thread.points[0].y);
        for (let j = 0; j < thread.points.length - 1; j++) {
          const p1 = thread.points[j];
          const p2 = thread.points[j + 1];
          const xc = (p1.x + p2.x) / 2;
          const yc = (p1.y + p2.y) / 2;
          ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
        }
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!heroRef.current) return;

      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      loadTl
        .fromTo(
          heroTextRef.current,
          { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2 },
          0
        )
        .fromTo(
          heroSubRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.4
        )
        .fromTo(
          heroCTARef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          0.7
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      num: '01',
      title: 'Digital Architecture',
      desc: 'Bespoke e-commerce platforms engineered on Shopify with zero pre-made templates, achieving elite performance and brand distinction.',
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      num: '02',
      title: 'Brand Strategy',
      desc: 'Precision marketing directives, search curation, and campaign orchestration calibrated for luxury audiences.',
      icon: <Compass className="w-5 h-5" />,
    },
    {
      num: '03',
      title: 'Visual Direction',
      desc: 'Professional photography, cinematic video production, and editorial lookbook creation in studio and on location.',
      icon: <Eye className="w-5 h-5" />,
    },
    {
      num: '04',
      title: 'Material Sourcing',
      desc: 'Direct supply chains with historic mills across Paris, Milan, and Lyon for premium fabrics and textiles.',
      icon: <Scissors className="w-5 h-5" />,
    },
    {
      num: '05',
      title: 'Spatial Design',
      desc: 'Boutique architecture, showroom layouts, ambient lighting plans, and luxury visual merchandising for physical retail.',
      icon: <Store className="w-5 h-5" />,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = document.querySelectorAll('[data-gsap-reveal]');
      sections.forEach((section) => {
        const targets = section.querySelectorAll('.gsap-reveal');
        gsap.fromTo(
          targets,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-bw-red overflow-x-hidden">
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60"
      />

      {/* Hero Section */}
      <section ref={heroRef} id="atelier" className="relative min-h-screen flex items-center justify-center px-4 md:px-8 z-10 overflow-hidden">
        
        <div className="w-full text-center">
          
          {/* <div className="flex items-center justify-center gap-3 mb-4 md:mb-8">
            <span className="h-px w-8 bg-bw-red/20" />
            <span className="text-[10px] tracking-[0.4em] font-bold text-bw-gray uppercase">
              Creative Collective
            </span>
            <span className="h-px w-8 bg-bw-red/20" />
          </div> */}

          <h1 ref={heroTextRef} className="font-display font-black text-white leading-[0.88] tracking-tighter">
            <span className="block text-[18vw] md:text-[20vw]">
              ANARCHY
            </span>
            <span className="block font-display font-black text-white text-[18vw] md:text-[20vw] leading-[0.85]">
              ANTS
            </span>
          </h1>

          <div ref={heroSubRef} className="mt-6 md:mt-10">
            <p className="text-sm md:text-[15px] font-medium text-bw-gray tracking-wide max-w-md mx-auto leading-relaxed">
              An elite collective engineering digital chaos into structured brilliance.
            </p>
          </div>

          <div ref={heroCTARef} className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <LuxuryButton variant="primary" onClick={() => setActiveView('services')}>
              Enter the Colony
            </LuxuryButton>
            <LuxuryButton variant="outline" onClick={() => setActiveView('services')}>
              Start a Project
            </LuxuryButton>
          </div>

        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 opacity-40 hover:opacity-80 transition-opacity duration-300">
          <span className="text-[8px] tracking-[0.35em] font-bold text-bw-gray uppercase">Scroll</span>
          <div className="w-px h-10 bg-white/10 relative overflow-hidden rounded-full">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="absolute top-0 left-0 w-full h-3 bg-white rounded-full"
            />
          </div>
        </div>
      </section>








      <section id="collage" className="relative py-24 md:py-32 px-4 md:px-12 border-t border-white/10 z-10 bg-bw-red overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-20">
            <span className="text-[10px] tracking-[0.3em] font-bold text-bw-gray uppercase block mb-3">
              Selected Moments
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
              The Moodboard
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[220px]"
          >
            {/* Row 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="row-span-2 overflow-hidden border border-white/20 shadow-xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500"
            >
              <img src={photoshootImg} alt="Editorial" className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="overflow-hidden border border-white/20 shadow-xl rotate-[1deg] hover:rotate-0 transition-transform duration-500"
            >
              <img src={fabricImg} alt="Fabric" className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="row-span-2 overflow-hidden border border-white/20 shadow-xl rotate-[2deg] hover:rotate-0 transition-transform duration-500"
            >
              <img src={heroImg} alt="Hero" className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="overflow-hidden border border-white/20 shadow-xl rotate-[-1deg] hover:rotate-0 transition-transform duration-500"
            >
              <img src={boutiqueImg} alt="Boutique" className="w-full h-full object-cover" />
            </motion.div>

            {/* Row 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="overflow-hidden border border-white/20 shadow-xl rotate-[1.5deg] hover:rotate-0 transition-transform duration-500"
            >
              <img src={boutiqueImg} alt="Boutique detail" className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="overflow-hidden border border-white/20 shadow-xl rotate-[-1.5deg] hover:rotate-0 transition-transform duration-500"
            >
              <img src={fabricImg} alt="Fabric detail" className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="row-span-2 overflow-hidden border border-white/20 shadow-xl rotate-[1deg] hover:rotate-0 transition-transform duration-500"
            >
              <img src={photoshootImg} alt="Editorial detail" className="w-full h-full object-cover" />
            </motion.div>

            {/* Row 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="overflow-hidden border border-white/20 shadow-xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500"
            >
              <img src={heroImg} alt="Hero detail" className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="overflow-hidden border border-white/20 shadow-xl rotate-[2deg] hover:rotate-0 transition-transform duration-500"
            >
              <img src={fabricImg} alt="Texture" className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="overflow-hidden border border-white/20 shadow-xl rotate-[-1deg] hover:rotate-0 transition-transform duration-500"
            >
              <img src={boutiqueImg} alt="Spatial" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Philosophy */}
      <section id="manifest" className="relative py-28 px-8 md:px-12 border-t border-white/5 z-10 bg-bw-red">
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.35em] font-bold text-bw-gray uppercase block mb-8"
          >
            Our Philosophy
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-2xl sm:text-[38px] font-extrabold text-white leading-[1.3] mb-12 tracking-tight"
          >
            &ldquo;A website is not a container; it is the digital boutique of your house. Like fine tailoring or studied architecture, it must speak without effort.&rdquo;
          </motion.h2>
          <div className="w-16 h-px bg-white mx-auto mb-8" />
          <p className="text-[10px] tracking-[0.25em] font-bold text-bw-gray uppercase">
            ANARCHY ANTS — ESTABLISHED 2026
          </p>
        </div>
      </section>

      {/* The Five Pillars */}
      <section id="services" className="relative py-32 px-8 md:px-12 border-t border-black/5 z-10 bg-bw-white">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-6">
            <div>
              <span className="text-[10px] tracking-[0.3em] font-bold text-bw-red uppercase block mb-4">
                The Five Disciplines
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-bw-red tracking-tight">
                Our Services
              </h2>
            </div>
            <p className="text-sm font-medium text-bw-black/60 max-w-sm leading-relaxed">
              We guide premium brands through full-spectrum transformation, from material sourcing to digital architecture and physical retail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-bw-red/10">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                className="bg-bw-white p-8 md:p-10 cursor-pointer group"
                onClick={() => setActiveView('services')}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className="font-display text-5xl md:text-6xl font-black text-bw-red block mb-6">
                  {pillar.num}
                </span>

                <h3 className="font-display text-sm tracking-[0.1em] font-extrabold text-bw-red mb-4 uppercase">
                  {pillar.title}
                </h3>

                <p className="text-xs font-medium text-bw-red/70 leading-relaxed mb-8">
                  {pillar.desc}
                </p>

                <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] font-bold text-bw-red">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <LuxuryButton variant="primary" onClick={() => setActiveView('services')}>
              View All Services
            </LuxuryButton>
          </div>

        </div>
      </section>

      {/* Creative Showcase */}
      <section id="showcase" className="relative py-32 px-8 md:px-12 border-t border-white/5 z-10 bg-bw-red">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-24">
            <span className="text-[10px] tracking-[0.3em] font-bold text-bw-gray uppercase block mb-4">
              Selected Work
            </span>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
              The Portfolio
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
              className="group relative overflow-hidden border-2 border-white/10 flex flex-col justify-between h-[500px] bg-bw-card"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={fabricImg}
                  alt="Premium Fabric Sourcing"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1200ms] ease-out grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bw-card via-bw-card/40 to-transparent opacity-90" />
              </div>

              <div className="relative z-10 p-8 flex justify-end">
                <span className="px-4 py-1.5 text-[9px] tracking-widest font-bold bg-white/10 text-white border border-white/20 uppercase">
                  Material Sourcing
                </span>
              </div>

              <div className="relative z-10 p-8">
                <span className="text-[9px] tracking-widest text-white/60 font-bold block mb-2">PROJECT 01</span>
                <h3 className="font-display text-2xl font-black text-white group-hover:text-white transition-colors duration-500 mb-4 tracking-tight leading-tight">
                  Fine Silk — Lyons & Paris Mills
                </h3>
                <p className="text-xs font-medium text-white/50 leading-relaxed mb-6 max-w-sm">
                  Curated premium organic silk textiles and built the direct-to-consumer fabric chain for a leading Parisian fashion house.
                </p>
                <div className="flex items-center gap-1.5 text-[9px] tracking-[0.25em] font-bold text-white">
                  <span>VIEW PROJECT</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, type: 'spring', stiffness: 80 }}
              className="group relative overflow-hidden border-2 border-white/10 flex flex-col justify-between h-[500px] md:translate-y-8 bg-bw-card"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={photoshootImg}
                  alt="Editorial Photography"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1200ms] ease-out grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bw-card via-bw-card/40 to-transparent opacity-90" />
              </div>

              <div className="relative z-10 p-8 flex justify-end">
                <span className="px-4 py-1.5 text-[9px] tracking-widest font-bold bg-white/10 text-white border border-white/20 uppercase">
                  Photography
                </span>
              </div>

              <div className="relative z-10 p-8">
                <span className="text-[9px] tracking-widest text-white/60 font-bold block mb-2">PROJECT 02</span>
                <h3 className="font-display text-2xl font-black text-white group-hover:text-white transition-colors duration-500 mb-4 tracking-tight leading-tight">
                  Visual Direction — Autumn Lookbook
                </h3>
                <p className="text-xs font-medium text-white/50 leading-relaxed mb-6 max-w-sm">
                  A high-fashion photoshoot shot in Paris, managing complete creative direction, architectural lighting, and post-production.
                </p>
                <div className="flex items-center gap-1.5 text-[9px] tracking-[0.25em] font-bold text-white">
                  <span>VIEW PROJECT</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 80 }}
              className="group relative overflow-hidden border-2 border-white/10 flex flex-col justify-between h-[500px] bg-bw-card"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={boutiqueImg}
                  alt="Minimalist Boutique"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1200ms] ease-out grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bw-card via-bw-card/40 to-transparent opacity-90" />
              </div>

              <div className="relative z-10 p-8 flex justify-end">
                <span className="px-4 py-1.5 text-[9px] tracking-widest font-bold bg-white/10 text-white border border-white/20 uppercase">
                  Spatial Design
                </span>
              </div>

              <div className="relative z-10 p-8">
                <span className="text-[9px] tracking-widest text-white/60 font-bold block mb-2">PROJECT 03</span>
                <h3 className="font-display text-2xl font-black text-white group-hover:text-white transition-colors duration-500 mb-4 tracking-tight leading-tight">
                  Maison Elegance — Store Setup
                </h3>
                <p className="text-xs font-medium text-white/50 leading-relaxed mb-6 max-w-sm">
                  Engineered and configured a minimalist luxury boutique salon in Paris with sweeping arches and warm ambient lighting.
                </p>
                <div className="flex items-center gap-1.5 text-[9px] tracking-[0.25em] font-bold text-white">
                  <span>VIEW PROJECT</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </motion.div>

          </div>

          <div className="mt-28 text-center">
            <p className="text-xs text-bw-gray tracking-wider mb-6 italic">
              All digital experiences are engineered on Shopify Plus with zero templates, achieving 99+ mobile speed indexing.
            </p>
            <div className="h-px w-24 bg-white/20 mx-auto" />
          </div>

        </div>
      </section>

      {/* Scattered Collage — Homescreen Moodboard */}


      {/* Portrait Video Reel */}
      <section
        id="reel"
        data-gsap-reveal
        className="relative py-32 px-4 md:px-12 border-t border-white/10 z-10 bg-bw-red"
      >
        <div className="max-w-7xl mx-auto mb-16">
          <div className="text-center gsap-reveal">
            <span className="text-[10px] tracking-[0.3em] font-bold text-bw-gray uppercase block mb-4">
              Our Reel
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
              Work in Motion
            </h2>
            <p className="text-sm font-medium text-bw-gray max-w-lg mx-auto mt-4 leading-relaxed">
              A curated selection of our cinematic work, boutique walkthroughs, and editorial campaigns.
            </p>
          </div>
        </div>

        <PortraitVideoReel />
      </section>

    </div>
  );
};
