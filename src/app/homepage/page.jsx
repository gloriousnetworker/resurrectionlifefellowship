'use client';
import { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const aboutRef = useRef(null);
  const [aboutVisible, setAboutVisible] = useState(false);
  const pastorsRef = useRef(null);
  const [pastorsVisible, setPastorsVisible] = useState(false);

  const slides = [
    { id: 1, image: '/images/slide1.jpg' },
    { id: 2, image: '/images/slide2.jpg' },
    { id: 3, image: '/images/slide3.jpg' },
  ];

  const pastors = [
    {
      id: 1,
      image: '/images/pastor-nathaniel.jpg',
      name: 'Pastor Nathaniel'
    },
    {
      id: 2,
      image: '/images/pastor-marcus.jpg',
      name: 'Pastor Marcus'
    },
    {
      id: 3,
      image: '/images/pastor-caleb.jpg',
      name: 'Pastor Caleb'
    },
    {
      id: 4,
      image: '/images/accountant.jpg',
      name: 'The Accountant'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const aboutObserver = new IntersectionObserver(
      ([entry]) => setAboutVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (aboutRef.current) aboutObserver.observe(aboutRef.current);

    const pastorsObserver = new IntersectionObserver(
      ([entry]) => setPastorsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (pastorsRef.current) pastorsObserver.observe(pastorsRef.current);

    return () => {
      if (aboutRef.current) aboutObserver.unobserve(aboutRef.current);
      if (pastorsRef.current) pastorsObserver.unobserve(pastorsRef.current);
    };
  }, []);

  return (
    <div className="bg-[#0C3C4C] text-[#F3EFE6] font-cinzel">
      <Navbar />
      
      <div className="relative h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div 
              className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${index === currentSlide ? 'scale-100' : 'scale-110'}`}
              style={{ 
                backgroundImage: `url(${slide.image})`,
                animation: index === currentSlide ? 'slideIn 1s ease-out' : ''
              }}
            ></div>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#D6B16A] mb-6 drop-shadow-2xl">
                RESURRECTION LIFE FELLOWSHIP
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl font-lora drop-shadow-lg">
                Building meaningful relationships in Christ
              </p>
            </div>
          </div>
        ))}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 mx-1 rounded-full ${index === currentSlide ? 'bg-[#D6B16A]' : 'bg-[#5A7D89]'}`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      <div ref={aboutRef} className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className={`flex flex-col md:flex-row items-center mb-20 transition-all duration-1000 ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#D6B16A] mb-6">Who are We?</h2>
              <p className="text-lg font-lora mb-6">
                "We are a community of people who believe in Jesus Christ. We seek to build meaningful relationships that unlock our creative purpose and encourages us to live passionately for God."
              </p>
              <p className="text-sm font-lora italic">— Matt 22:37-38</p>
            </div>
            <div className="md:w-1/2 h-96 bg-cover bg-center" style={{ backgroundImage: "url('/images/about.jpg')" }}></div>
          </div>

          <div className={`flex flex-col md:flex-row-reverse items-center mb-20 transition-all duration-1000 ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="md:w-1/2 mb-10 md:mb-0 md:pl-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#D6B16A] mb-6">Our Mission</h2>
              <p className="text-lg font-lora">
                To create a community where individuals can grow in their relationship with Christ, discover their purpose, and make a difference in the world around them through love, service, and faith.
              </p>
            </div>
            <div className="md:w-1/2 h-96 bg-cover bg-center" style={{ backgroundImage: "url('/images/mission.jpg')" }}></div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-[#1a4b5a] px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#D6B16A] mb-8">Weekly Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#0C3C4C] p-8 border border-[#5A7D89]">
              <h3 className="text-2xl font-bold text-[#D6B16A] mb-4">Sunday Service</h3>
              <p className="text-xl font-lora">10:00 AM</p>
            </div>
            <div className="bg-[#0C3C4C] p-8 border border-[#5A7D89]">
              <h3 className="text-2xl font-bold text-[#D6B16A] mb-4">Wednesday Prayer</h3>
              <p className="text-xl font-lora">7:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div ref={pastorsRef} className="py-20 px-4 md:px-8 lg:px-16 bg-[#0C3C4C]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#D6B16A] mb-8 text-center">Our Spiritual Leaders</h2>
          <div className="text-center mb-16">
            <p className="text-lg font-lora mb-6 max-w-4xl mx-auto">
              God has blessed our fellowship with dedicated men of faith who serve as shepherds and guides on your spiritual journey. Through their wisdom, prayer, and biblical teaching, they help cultivate an environment where souls can flourish and grow deeper in their relationship with Christ.
            </p>
            <p className="text-lg font-lora max-w-4xl mx-auto">
              Each leader brings unique gifts and perspectives, united in their commitment to nurturing your faith, providing biblical counsel, and walking alongside you as you discover God's purpose for your life. Their hearts burn with passion to see every member of our congregation mature in Christ and step boldly into their divine calling.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pastors.map((pastor, index) => (
              <div 
                key={pastor.id}
                className={`text-center transition-all duration-1000 ${pastorsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="h-80 w-80 mx-auto bg-cover bg-center rounded-lg overflow-hidden mb-6 shadow-lg" style={{ backgroundImage: `url(${pastor.image})` }}></div>
                <h3 className="text-2xl font-bold text-[#D6B16A] mb-2">{pastor.name}</h3>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg font-lora max-w-4xl mx-auto">
              Whether you're seeking guidance in prayer, biblical understanding, or navigating life's challenges, our pastoral team stands ready to support you with open hearts and godly wisdom. They are committed to creating a safe space where you can grow, heal, and discover the abundant life that Christ has promised to all who believe.
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-[#1a4b5a] py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="font-lora mb-2">©2025 Resurrection Life Fellowship</p>
          <p className="font-lora">
            7065 US RT. 20 - Madison NY 13402
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%) scale(1.2);
            opacity: 0;
          }
          to {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;