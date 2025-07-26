'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(console.error);
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.muted = !isMuted;
      setIsMuted(!isMuted);
      if (!isMuted) {
        video.play();
      }
    }
  };

  const handleEnterSite = () => {
    router.push('/homepage');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src="/videos/church-video.mp4" type="video/mp4" />
          <source src="/videos/church-video.webm" type="video/webm" />
        </video>
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#D6B16A] mb-6 font-cinzel tracking-wide drop-shadow-2xl">
            RESURRECTION LIFE FELLOWSHIP
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-[#F3EFE6] font-lora drop-shadow-lg">
            Welcome to Our Community
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={toggleMute}
            className="bg-[#0C3C4C] bg-opacity-90 text-[#F3EFE6] px-6 py-3 rounded-full border-2 border-[#5A7D89] hover:bg-[#D6B16A] hover:text-[#0C3C4C] hover:border-[#D6B16A] transition-all duration-300 font-cinzel font-semibold shadow-xl"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            <i className={`fas ${isMuted ? 'fa-volume-mute' : 'fa-volume-up'} mr-2`}></i>
            {isMuted ? 'Unmute' : 'Mute'}
          </button>

          <button
            onClick={handleEnterSite}
            className="bg-[#D6B16A] text-[#0C3C4C] px-10 py-4 rounded-full font-bold hover:bg-[#C4A657] transition-all duration-300 font-cinzel shadow-xl text-lg transform hover:scale-105"
          >
            <i className="fas fa-arrow-right mr-3"></i>
            Enter Site
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .relative.z-20 > div:first-child {
          animation: fadeInUp 1.5s ease-out;
        }
        
        .relative.z-20 > div:nth-child(2) {
          animation: fadeInUp 1.5s ease-out 0.3s both;
        }
        
        video {
          filter: brightness(0.85) contrast(1.1) saturate(1.1);
        }
      `}</style>
    </div>
  );
}