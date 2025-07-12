'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const whyUsRef = useRef(null);
  const contactRef = useRef(null);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const backgroundImages = [
    { src: '/images/beach-resort.jpg', alt: 'Luxury Beach Resort' },
    { src: '/images/cityscape.jpg', alt: 'Cityscape View' },
    { src: '/images/mountain-retreat.jpg', alt: 'Mountain Retreat' },
    { src: '/images/hotel-suite.jpg', alt: 'Luxury Hotel Suite' },
    { src: '/images/pool-view.jpg', alt: 'Infinity Pool View' }
  ];

  useEffect(() => {
    const carouselInterval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    const initAnimations = () => {
      gsap.utils.toArray('.animate-on-scroll').forEach(element => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });

      gsap.utils.toArray('.parallax-image').forEach(image => {
        gsap.to(image, {
          scrollTrigger: {
            trigger: image,
            scrub: true
          },
          y: 100,
          ease: 'none'
        });
      });
    };

    initAnimations();

    return () => {
      clearInterval(carouselInterval);
      ScrollTrigger.getAll().forEach(instance => instance.kill());
    };
  }, []);

  return (
    <div className="bg-white text-gray-800 font-playfair">
      <Navbar />
      
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((image, index) => (
            <div 
              key={index}
              className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${currentBgIndex === index ? 'opacity-100' : 'opacity-0'}`}
              style={{ backgroundImage: `url(${image.src})` }}
            ></div>
          ))}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-60"></div>
        </div>
        
        <div className="container mx-auto px-6 z-10 text-left max-w-6xl">
          <h1 className="hero-title text-5xl md:text-7xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Maximize Your Online Presence <br />and Drive Bookings
          </h1>
          
          <p className="hero-subtitle text-xl md:text-2xl text-white mb-12 max-w-2xl">
            Expert Affiliate Marketing Solutions for Hotels and Travel Brands
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="hero-button bg-[#D4AF37] text-white font-semibold px-12 py-4 hover:bg-[#B7950B] transition transform hover:scale-105 shadow-lg border-0"
            >
              Get Started
            </button>
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="hero-button bg-transparent border-2 border-white text-white font-semibold px-12 py-4 hover:bg-white hover:text-[#D4AF37] transition transform hover:scale-105"
            >
              Discover How
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <section ref={aboutRef} id="about" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-left mb-16 max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-6">About Our Agency</h2>
            <p className="text-xl text-gray-700">
              At Luxe Affiliates, we specialize in affiliate marketing for hotels and travel brands. Our team of experts crafts tailored strategies to drive revenue, boost online presence, and connect travelers with unforgettable experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-on-scroll">
            <div className="bg-white p-8 shadow-lg border-t-4 border-[#D4AF37]">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Innovation</h3>
              <p className="text-gray-600">Cutting-edge strategies tailored for the modern traveler</p>
            </div>
            <div className="bg-white p-8 shadow-lg border-t-4 border-[#D4AF37]">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Expertise</h3>
              <p className="text-gray-600">Decades of combined industry experience</p>
            </div>
            <div className="bg-white p-8 shadow-lg border-t-4 border-[#D4AF37]">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Results-Driven</h3>
              <p className="text-gray-600">Focused on measurable outcomes and ROI</p>
            </div>
            <div className="bg-white p-8 shadow-lg border-t-4 border-[#D4AF37]">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Partnership</h3>
              <p className="text-gray-600">We treat your success as our own</p>
            </div>
          </div>
        </div>
      </section>

      <section ref={servicesRef} id="services" className="py-24 relative">
        <div className="parallax-image absolute inset-0 z-0">
          <img src="/images/hotel-lobby.jpg" alt="Luxury Hotel Lobby" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-6">Our Services</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Comprehensive solutions designed to elevate your brand
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-on-scroll">
            <div className="bg-white p-8 shadow-lg border-l-4 border-[#D4AF37]">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Affiliate Marketing</h3>
              <p className="text-gray-600 mb-6">Leverage our expertise in affiliate marketing to drive bookings and revenue growth.</p>
              <img src="/images/affiliate-marketing.jpg" alt="Affiliate Marketing" className="w-full h-48 object-cover" />
            </div>
            <div className="bg-white p-8 shadow-lg border-l-4 border-[#D4AF37]">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Strategy Development</h3>
              <p className="text-gray-600 mb-6">We'll work with you to develop a customized affiliate marketing strategy that meets your business goals.</p>
              <img src="/images/strategy-development.jpg" alt="Strategy Development" className="w-full h-48 object-cover" />
            </div>
            <div className="bg-white p-8 shadow-lg border-l-4 border-[#D4AF37]">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Campaign Management</h3>
              <p className="text-gray-600 mb-6">Our team will manage your affiliate marketing campaigns, ensuring maximum ROI and efficiency.</p>
              <img src="/images/campaign-management.jpg" alt="Campaign Management" className="w-full h-48 object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section ref={whyUsRef} id="why-us" className="py-24 bg-[#D4AF37] text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Us</h2>
            <p className="text-xl max-w-3xl mx-auto">
              The Luxe Affiliates difference
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 animate-on-scroll">
            <div className="bg-white bg-opacity-20 p-10 backdrop-blur-sm border border-white border-opacity-30">
              <div className="text-5xl font-bold mb-6 text-white opacity-80">01</div>
              <h3 className="text-2xl font-semibold mb-4">Expertise</h3>
              <p className="text-lg">
                Our team has years of experience in affiliate marketing for hotels and travel.
              </p>
            </div>
            <div className="bg-white bg-opacity-20 p-10 backdrop-blur-sm border border-white border-opacity-30">
              <div className="text-5xl font-bold mb-6 text-white opacity-80">02</div>
              <h3 className="text-2xl font-semibold mb-4">Results-Driven</h3>
              <p className="text-lg">
                We're focused on delivering tangible results and driving business growth.
              </p>
            </div>
            <div className="bg-white bg-opacity-20 p-10 backdrop-blur-sm border border-white border-opacity-30">
              <div className="text-5xl font-bold mb-6 text-white opacity-80">03</div>
              <h3 className="text-2xl font-semibold mb-4">Partnership</h3>
              <p className="text-lg">
                We believe in building strong partnerships with our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={contactRef} id="contact" className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Elevate Your Brand?</h2>
          <p className="text-2xl mb-10 max-w-3xl mx-auto">
            Contact us today to learn more about our affiliate marketing solutions
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => window.location.href = 'mailto:info@luxeaffiliates.com'}
              className="bg-[#D4AF37] text-gray-900 font-semibold px-12 py-4 hover:bg-[#B7950B] transition transform hover:scale-105 shadow-lg border-0"
            >
              Contact Us
            </button>
            <button 
              onClick={() => window.open('https://wa.me/2348158251042', '_blank')}
              className="bg-transparent border-2 border-white text-white font-semibold px-12 py-4 hover:bg-white hover:text-gray-900 transition transform hover:scale-105"
            >
              WhatsApp Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}