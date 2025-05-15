'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function SupportPage() {
  const router = useRouter();

  useEffect(() => {
    // Initialize animations
    initAnimations();
  }, []);

  const initAnimations = () => {
    // Hero section animations
    gsap.from('.hero-title', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.hero-subtitle', {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out'
    });

    // Image animations
    gsap.utils.toArray('.image-card').forEach((card, i) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.2,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%'
        }
      });
    });

    // Quote animation
    gsap.from('.quote-text', {
      y: 30,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.quote-section',
        start: 'top 70%'
      }
    });

    // Ways to help animations
    gsap.utils.toArray('.help-card').forEach((card, i) => {
      gsap.from(card, {
        x: i % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: card,
          start: 'top 80%'
        }
      });
    });
  };

  const handleRouteChange = (route) => {
    router.push(route);
  };

  // Support ways data
  const supportWays = [
    {
      id: 1,
      title: "Direct Financial Support",
      description: "Your monetary donations help us provide immediate relief to those in need. Even small amounts can make a significant difference in someone's life.",
      icon: "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"
    },
    {
      id: 2,
      title: "Volunteer Your Time",
      description: "Dedicate a few hours each week to help others. Your time and skills can provide valuable support to those experiencing hardship.",
      icon: "M16.67 13.13C18.04 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.57-3.47-6.33-3.87zM15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24C14.5 5.27 15 6.58 15 8s-.5 2.73-1.33 3.76c.42.14.86.24 1.33.24zm-9 5c0-1.66 1.34-3 3-3s3 1.34 3 3v1h-6v-1zm3-5c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm9 4c-.6 0-3.33.89-3.33 2.67V17h6.67v-1.33c0-1.78-2.74-2.67-3.34-2.67zM9 4c0-1.66-1.34-3-3-3S3 2.34 3 4s1.34 3 3 3 3-1.34 3-3zm2 14H3v-3c0-2.18 3.31-3.33 4.5-3.63.48.81 1.07 1.52 1.78 2.08-.31.34-.78.55-1.28.55-1.66 0-3 1.34-3 3v1h6v-1c0-.69-.28-1.32-.72-1.76.9-.54 1.63-1.26 2.14-2.08z"
    },
    {
      id: 3,
      title: "Share Essential Items",
      description: "Donate clothing, food, books, or other necessities to those around you who may be struggling. Small items can make a big difference.",
      icon: "M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"
    },
    {
      id: 4,
      title: "Be a Mentor",
      description: "Share your knowledge and experience with others. Mentorship can provide guidance and support that transforms lives forever.",
      icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
    }
  ];

  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-[#02736f] to-[#02736f] text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="hero-title text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            If You Can Help, It Will Help
          </h1>
          
          <p className="hero-subtitle text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light">
            Make someone grateful for being alive — your friend, brother, or that person that really needs your help. 
            Give and you will not regret blessing someone today.
          </p>
        </div>
      </section>

      {/* Inspiring Images Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#039994] mb-6">Inspiring Acts of Kindness</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Small acts of kindness can create ripples of positive change in our communities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="image-card relative overflow-hidden rounded-2xl shadow-xl group h-80">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('/images/support-1.jpg')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-6 z-10">
                <h3 className="text-white text-xl font-semibold mb-2">Community Support</h3>
                <p className="text-gray-200 text-sm">Neighbors helping neighbors build stronger communities</p>
              </div>
            </div>

            <div className="image-card relative overflow-hidden rounded-2xl shadow-xl group h-80">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('/images/support-2.jpg')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-6 z-10">
                <h3 className="text-white text-xl font-semibold mb-2">Education Access</h3>
                <p className="text-gray-200 text-sm">Empowering through knowledge and learning opportunities</p>
              </div>
            </div>

            <div className="image-card relative overflow-hidden rounded-2xl shadow-xl group h-80">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('/images/support-3.jpg')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-6 z-10">
                <h3 className="text-white text-xl font-semibold mb-2">Food Security</h3>
                <p className="text-gray-200 text-sm">Ensuring no one goes hungry in our communities</p>
              </div>
            </div>

            <div className="image-card relative overflow-hidden rounded-2xl shadow-xl group h-80">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('/images/support-4.png')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-6 z-10">
                <h3 className="text-white text-xl font-semibold mb-2">Mentorship</h3>
                <p className="text-gray-200 text-sm">Guidance that can change the trajectory of someone's life</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-gray-50 quote-section">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <svg className="w-16 h-16 text-[#039994] opacity-20 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
            </svg>
            
            <blockquote className="quote-text text-2xl md:text-3xl font-medium text-gray-700 italic leading-relaxed mb-8">
              "No one has ever become poor by giving. We make a living by what we get, but we make a life by what we give."
            </blockquote>
            
            <div className="text-lg font-semibold text-[#039994]">Anne Frank</div>
          </div>
        </div>
      </section>

      {/* Ways to Help Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#039994] mb-6">Ways You Can Help</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              There are countless ways to make a positive impact in someone's life
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {supportWays.map((way) => (
              <div key={way.id} className="help-card bg-white rounded-2xl shadow-xl overflow-hidden transform transition hover:shadow-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-[#039994] bg-opacity-10 p-4 rounded-full mr-4">
                    <svg className="w-8 h-8 text-[#039994]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={way.icon} />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800">{way.title}</h3>
                </div>
                <p className="text-gray-600">{way.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#039994] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Make a Difference?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Your generosity can transform someone's life today. Every act of kindness, no matter how small, creates a ripple effect of positive change.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => handleRouteChange('/donate')}
              className="bg-white text-[#039994] font-semibold px-10 py-4 rounded-full hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
            >
              Donate Now
            </button>
            <button 
              onClick={() => handleRouteChange('/register')}
              className="bg-transparent border-2 border-white text-white font-semibold px-10 py-4 rounded-full hover:bg-white hover:text-[#039994] transition transform hover:scale-105"
            >
              Become a Volunteer
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}