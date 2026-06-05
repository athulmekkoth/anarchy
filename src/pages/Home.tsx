import React, { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LuxuryButton } from '../components/LuxuryButton';
import { PortraitVideoReel } from '../components/PortraitVideoReel';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

import fabricImg from '../assets/luxury_fabric.png';
import boutiqueImg from '../assets/boutique_paris.png';
import photoshootImg from '../assets/editorial_photoshoot.png';
import heroImg from '../assets/hero.png';

gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  setActiveView: (view: 'home' | 'services') => void;
}

const pillars = [
  {
    num: '01',
    title: 'Digital Architecture',
    desc: 'Bespoke e-commerce platforms engineered on Shopify with zero pre-made templates, achieving elite performance and brand distinction.',
    image: boutiqueImg,
  },
  {
    num: '02',
    title: 'Brand Strategy',
    desc: 'Precision marketing directives, search curation, and campaign orchestration calibrated for luxury audiences.',
    image: photoshootImg,
  },
  {
    num: '03',
    title: 'Visual Direction',
    desc: 'Professional photography, cinematic video production, and editorial lookbook creation in studio and on location.',
    image: fabricImg,
  },
  {
    num: '04',
    title: 'Material Sourcing',
    desc: 'Direct supply chains with historic mills across Paris, Milan, and Lyon for premium fabrics and textiles.',
    image: fabricImg,
  },
  {
    num: '05',
    title: 'Spatial Design',
    desc: 'Boutique architecture, showroom layouts, ambient lighting plans, and luxury visual merchandising for physical retail.',
    image: boutiqueImg,
  },
];

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
      const color = `rgba(242, 242, 242, ${opacity})`;
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
          { y: 40, opacity: 0, scale: 0.95, filter: 'blur(10px)' },
          { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2 },
          0
        )
        .fromTo(
          heroSubRef.current,
          { y: 20, opacity: 0, filter: 'blur(6px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8 },
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = document.querySelectorAll('[data-gsap-reveal]');
      sections.forEach((section) => {
        const targets = section.querySelectorAll('.gsap-reveal');
        gsap.fromTo(
          targets,
          { y: 60, opacity: 0, filter: 'blur(8px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
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
      <section ref={heroRef} id="atelier" className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 z-10 overflow-visible">

        <div className="w-full text-center pt-24 pb-12">

          <h1 ref={heroTextRef} className="font-brutal font-black text-bw-white leading-[0.9] tracking-tighter">
            <span className="block text-[14vw] md:text-[16vw]">
              ANARCHY
            </span>
            <span className="block font-brutal font-black text-bw-white text-[14vw] md:text-[16vw] leading-[0.88]">
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
          <div className="w-px h-10 bg-bw-white/10 relative overflow-hidden rounded-full">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="absolute top-0 left-0 w-full h-3 bg-bw-white rounded-full"
            />
          </div>
        </div>
      </section>

      {/* Moodboard Collage */}
      <section id="collage" className="relative py-24 md:py-32 px-4 md:px-12 border-t border-bw-white/10 z-10 bg-bw-red overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-20">
            <span className="text-[10px] tracking-[0.3em] font-bold text-bw-gray uppercase block mb-3">
              Selected Moments
            </span>
            <h2 className="font-brutal text-3xl sm:text-4xl font-black text-bw-white tracking-tight">
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="row-span-2 overflow-hidden border border-bw-white/20 shadow-xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500"
            >
              <img src={photoshootImg} alt="Editorial" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="overflow-hidden border border-bw-white/20 shadow-xl rotate-[1deg] hover:rotate-0 transition-transform duration-500"
            >
              <img src={fabricImg} alt="Fabric" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="row-span-2 overflow-hidden border border-bw-white/20 shadow-xl rotate-[2deg] hover:rotate-0 transition-transform duration-500"
            >
              <img src={heroImg} alt="Hero" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="overflow-hidden border border-bw-white/20 shadow-xl rotate-[-1deg] hover:rotate-0 transition-transform duration-500"
            >
              <img src={boutiqueImg} alt="Boutique" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="overflow-hidden border border-bw-white/20 shadow-xl rotate-[1.5deg] hover:rotate-0 transition-transform duration-500"
            >
              <img src={boutiqueImg} alt="Boutique detail" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="overflow-hidden border border-bw-white/20 shadow-xl rotate-[-1.5deg] hover:rotate-0 transition-transform duration-500"
            >
              <img src={fabricImg} alt="Fabric detail" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="row-span-2 overflow-hidden border border-bw-white/20 shadow-xl rotate-[1deg] hover:rotate-0 transition-transform duration-500"
            >
              <img src={photoshootImg} alt="Editorial detail" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="overflow-hidden border border-bw-white/20 shadow-xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500"
            >
              <img src={heroImg} alt="Hero detail" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="overflow-hidden border border-bw-white/20 shadow-xl rotate-[2deg] hover:rotate-0 transition-transform duration-500"
            >
              <img src={fabricImg} alt="Texture" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="overflow-hidden border border-bw-white/20 shadow-xl rotate-[-1deg] hover:rotate-0 transition-transform duration-500"
            >
              <img src={boutiqueImg} alt="Spatial" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section id="manifest" className="relative py-28 px-8 md:px-12 border-t border-bw-white/5 z-10 bg-bw-red">
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
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-2xl sm:text-[38px] font-medium text-bw-white leading-[1.3] mb-12 tracking-tight"
          >
            &ldquo;A website is not a container; it is the digital boutique of your house. Like fine tailoring or studied architecture, it must speak without effort.&rdquo;
          </motion.h2>
          <div className="w-16 h-px bg-bw-white mx-auto mb-8" />
          <p className="text-[10px] tracking-[0.25em] font-bold text-bw-gray uppercase">
            ANARCHY ANTS — ESTABLISHED 2026
          </p>
        </div>
      </section>

      {/* The Five Pillars — Invisible Grid */}
      <section id="services" className="relative py-32 px-8 md:px-12 border-t border-bw-white/10 z-10 bg-bw-red">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[10px] tracking-[0.3em] font-bold text-bw-gray uppercase block mb-4">
                The Five Disciplines
              </span>
              <h2 className="font-brutal text-4xl sm:text-5xl font-black text-bw-white tracking-tight">
                Our Services
              </h2>
            </div>
            <p className="text-sm font-medium text-bw-gray max-w-sm leading-relaxed">
              We guide premium brands through full-spectrum transformation, from material sourcing to digital architecture and physical retail.
            </p>
          </div>

          {/* Invisible Grid — 1px lines dividing columns */}
          <div className="grid grid-cols-1 md:grid-cols-5 border-t border-bw-white/20">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className={`relative group cursor-pointer transition-all duration-700 ${
                  idx !== 4 ? 'border-b md:border-b-0 md:border-r border-bw-white/20' : ''
                }`}
                onClick={() => setActiveView('services')}
              >
                {/* B&W hover background image */}
                <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover grayscale brightness-50"
                  />
                  <div className="absolute inset-0 bg-bw-red/40" />
                </div>

                <div className="relative z-10 p-6 md:p-8 min-h-[320px] md:min-h-[400px] flex flex-col justify-between group-hover:brightness-110 transition-all duration-500">
                  {/* Massive outlined number */}
                  <span className="font-brutal text-[80px] md:text-[100px] font-black leading-none stroked-number text-bw-white/80 group-hover:text-bw-white transition-all duration-500 stroked-number-hover">
                    {pillar.num}
                  </span>

                  <div className="mt-8">
                    {/* Serif title */}
                    <h3 className="font-serif text-lg md:text-xl font-semibold text-bw-white mb-3 tracking-wide uppercase">
                      {pillar.title}
                    </h3>

                    {/* Monospace description */}
                    <p className="font-mono text-[10px] md:text-[11px] font-light text-bw-gray leading-relaxed mb-6">
                      {pillar.desc}
                    </p>

                    <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] font-bold text-bw-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                      <span>ENTER</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
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
      <section id="showcase" className="relative py-32 px-8 md:px-12 border-t border-bw-white/5 z-10 bg-bw-red">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-24">
            <span className="text-[10px] tracking-[0.3em] font-bold text-bw-gray uppercase block mb-4">
              Selected Work
            </span>
            <h2 className="font-brutal text-4xl sm:text-5xl font-black text-bw-white tracking-tight">
              The Portfolio
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
              className="group relative overflow-hidden border border-bw-white/10 flex flex-col justify-between h-[500px] bg-bw-card"
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
                <span className="px-4 py-1.5 text-[9px] tracking-widest font-bold bg-bw-white/10 text-bw-white border border-bw-white/20 uppercase">
                  Material Sourcing
                </span>
              </div>

              <div className="relative z-10 p-8">
                <span className="text-[9px] tracking-widest text-bw-white/60 font-bold block mb-2">PROJECT 01</span>
                <h3 className="font-brutal text-2xl font-black text-bw-white group-hover:text-bw-white transition-colors duration-500 mb-4 tracking-tight leading-tight">
                  Fine Silk — Lyons & Paris Mills
                </h3>
                <p className="text-xs font-medium text-bw-white/50 leading-relaxed mb-6 max-w-sm">
                  Curated premium organic silk textiles and built the direct-to-consumer fabric chain for a leading Parisian fashion house.
                </p>
                <div className="flex items-center gap-1.5 text-[9px] tracking-[0.25em] font-bold text-bw-white">
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
              className="group relative overflow-hidden border border-bw-white/10 flex flex-col justify-between h-[500px] md:translate-y-8 bg-bw-card"
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
                <span className="px-4 py-1.5 text-[9px] tracking-widest font-bold bg-bw-white/10 text-bw-white border border-bw-white/20 uppercase">
                  Photography
                </span>
              </div>

              <div className="relative z-10 p-8">
                <span className="text-[9px] tracking-widest text-bw-white/60 font-bold block mb-2">PROJECT 02</span>
                <h3 className="font-brutal text-2xl font-black text-bw-white group-hover:text-bw-white transition-colors duration-500 mb-4 tracking-tight leading-tight">
                  Visual Direction — Autumn Lookbook
                </h3>
                <p className="text-xs font-medium text-bw-white/50 leading-relaxed mb-6 max-w-sm">
                  A high-fashion photoshoot shot in Paris, managing complete creative direction, architectural lighting, and post-production.
                </p>
                <div className="flex items-center gap-1.5 text-[9px] tracking-[0.25em] font-bold text-bw-white">
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
              className="group relative overflow-hidden border border-bw-white/10 flex flex-col justify-between h-[500px] bg-bw-card"
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
                <span className="px-4 py-1.5 text-[9px] tracking-widest font-bold bg-bw-white/10 text-bw-white border border-bw-white/20 uppercase">
                  Spatial Design
                </span>
              </div>

              <div className="relative z-10 p-8">
                <span className="text-[9px] tracking-widest text-bw-white/60 font-bold block mb-2">PROJECT 03</span>
                <h3 className="font-brutal text-2xl font-black text-bw-white group-hover:text-bw-white transition-colors duration-500 mb-4 tracking-tight leading-tight">
                  Maison Elegance — Store Setup
                </h3>
                <p className="text-xs font-medium text-bw-white/50 leading-relaxed mb-6 max-w-sm">
                  Engineered and configured a minimalist luxury boutique salon in Paris with sweeping arches and warm ambient lighting.
                </p>
                <div className="flex items-center gap-1.5 text-[9px] tracking-[0.25em] font-bold text-bw-white">
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
            <div className="h-px w-24 bg-bw-white/20 mx-auto" />
          </div>

        </div>
      </section>

      {/* Portrait Video Reel */}
      <section
        id="reel"
        data-gsap-reveal
        className="relative py-32 px-4 md:px-12 border-t border-bw-white/10 z-10 bg-bw-red"
      >
        <div className="max-w-7xl mx-auto mb-16">
          <div className="text-center gsap-reveal">
            <span className="text-[10px] tracking-[0.3em] font-bold text-bw-gray uppercase block mb-4">
              Our Reel
            </span>
            <h2 className="font-brutal text-4xl sm:text-5xl font-black text-bw-white tracking-tight">
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
