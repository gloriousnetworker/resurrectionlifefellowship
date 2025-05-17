'use client';

import { useState, useEffect } from 'react';

export default function BannerCarousel({ banners }) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prevIndex) => 
          prevIndex === banners.length - 1 ? 0 : prevIndex + 1
        );
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [banners]);

  return (
    <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8 shadow-lg">
      {banners.map((banner, index) => (
        <div 
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${index === currentBannerIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="text-center px-8 text-white">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">{banner.title}</h2>
              <p className="text-lg md:text-xl">{banner.description}</p>
            </div>
          </div>
          <img 
            src={banner.imageUrl} 
            alt={banner.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBannerIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentBannerIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}