import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X } from 'lucide-react';

import photoshootImg from '../assets/editorial_photoshoot.png';
import boutiqueImg from '../assets/boutique_paris.png';
import fabricImg from '../assets/luxury_fabric.png';

gsap.registerPlugin(ScrollTrigger);

interface ReelVideo {
  poster: string;
  src: string;
  title: string;
  tag: string;
}

const reelVideos: ReelVideo[] = [
  {
    poster: photoshootImg,
    src: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4',
    title: 'Editorial Campaign — Paris',
    tag: 'Visual Direction',
  },
  {
    poster: boutiqueImg,
    src: 'https://videos.pexels.com/video-files/4065383/4065383-uhd_2560_1440_25fps.mp4',
    title: 'Boutique Walkthrough',
    tag: 'Spatial Design',
  },
  {
    poster: fabricImg,
    src: 'https://videos.pexels.com/video-files/3255275/3255275-uhd_3840_2160_24fps.mp4',
    title: 'Material & Texture Study',
    tag: 'Material Sourcing',
  },
  {
    poster: photoshootImg,
    src: 'https://videos.pexels.com/video-files/3129957/3129957-uhd_3840_2160_25fps.mp4',
    title: 'Paris Fashion Week',
    tag: 'Photography',
  },
  {
    poster: boutiqueImg,
    src: 'https://videos.pexels.com/video-files/3196277/3196277-uhd_2560_1440_25fps.mp4',
    title: 'Showroom Design',
    tag: 'Interior Architecture',
  },
  {
    poster: fabricImg,
    src: 'https://videos.pexels.com/video-files/4065383/4065383-uhd_2560_1440_25fps.mp4',
    title: 'Textile Collection',
    tag: 'Fabric Sourcing',
  },
  {
    poster: photoshootImg,
    src: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4',
    title: 'Lookbook Session',
    tag: 'Creative Direction',
  },
  {
    poster: boutiqueImg,
    src: 'https://videos.pexels.com/video-files/3129957/3129957-uhd_3840_2160_25fps.mp4',
    title: 'Boutique Opening',
    tag: 'Spatial Design',
  },
];

export const PortraitVideoReel: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<ReelVideo | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cards = track.querySelectorAll('.reel-card');
    if (cards.length === 0) return;

    const cardWidth = cards[0].clientWidth;
    const gap = 24;
    const totalScroll = cardWidth * cards.length + gap * (cards.length - 1) - section.offsetWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${totalScroll + 100}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(track, {
      x: () => -totalScroll,
      ease: 'none',
    });

    return () => {
      tl.kill();
      tl.scrollTrigger?.kill();
    };
  }, []);

  const openVideo = useCallback((video: ReelVideo) => {
    setActiveVideo(video);
  }, []);

  const closeVideo = useCallback(() => {
    setActiveVideo(null);
  }, []);

  useEffect(() => {
    if (activeVideo && modalVideoRef.current) {
      modalVideoRef.current.load();
      modalVideoRef.current.play().catch(() => {});
    }
  }, [activeVideo]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeVideo();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeVideo]);

  return (
    <>
      <div ref={sectionRef} className="relative w-full overflow-hidden" style={{ height: '80vh' }}>
        <div
          ref={trackRef}
          className="flex gap-6 h-full items-center pl-4 md:pl-12"
          style={{ willChange: 'transform' }}
        >
          {reelVideos.map((video, i) => (
            <button
              key={i}
              className="reel-card relative group flex-shrink-0 cursor-pointer overflow-hidden border-2 border-white/10"
              style={{
                width: 'clamp(240px, 28vw, 360px)',
                aspectRatio: '9/16',
              }}
              onClick={() => openVideo(video)}
            >
              <img
                src={video.poster}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bw-card via-bw-card/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                  <Play className="w-6 h-6 text-white ml-0.5" fill="currentColor" />
                </div>
              </div>

              <div className="absolute top-0 right-0 p-4">
                <span className="px-3 py-1 text-[8px] tracking-widest font-bold bg-bw-card/60 backdrop-blur-sm text-white border border-white/10 uppercase">
                  {video.tag}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                <span className="text-[9px] tracking-widest text-white/50 font-bold uppercase block mb-2">
                  REEL 0{i + 1}
                </span>
                <h3 className="font-display text-lg md:text-xl font-black text-white tracking-tight leading-tight">
                  {video.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] bg-bw-card/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={closeVideo}
        >
          <button
            onClick={closeVideo}
            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4">
              <span className="text-[9px] tracking-widest text-white/40 font-bold uppercase">
                {activeVideo.tag}
              </span>
              <h3 className="font-display text-xl md:text-2xl font-black text-white tracking-tight mt-2">
                {activeVideo.title}
              </h3>
            </div>

            <video
              ref={modalVideoRef}
              src={activeVideo.src}
              poster={activeVideo.poster}
              className="w-full border border-white/10"
              controls
              playsInline
            />
          </div>
        </div>
      )}
    </>
  );
};
