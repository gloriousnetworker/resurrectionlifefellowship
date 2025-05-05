'use client';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const router = useRouter();
  const [currentDay, setCurrentDay] = useState('');
  const [dailyTheme, setDailyTheme] = useState('');

  // Set daily theme based on current day
  useEffect(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    const dayName = days[date.getDay()];
    setCurrentDay(dayName);

    const themes = {
      Monday: 'Freshly Pricked',
      Tuesday: 'Testimonials Tuesday',
      Wednesday: 'Shakers Day',
      Thursday: 'Do You Remember the Time',
      Friday: 'TGIF',
      Saturday: 'Handout Day',
      Sunday: 'Worship'
    };
    setDailyTheme(themes[dayName]);

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

    gsap.from('.hero-button', {
      y: 20,
      opacity: 0,
      duration: 1,
      delay: 0.6,
      ease: 'power3.out'
    });

    // Stats counter animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = { value: 0 };
      gsap.to(count, {
        value: target,
        duration: 2,
        scrollTrigger: counter,
        onUpdate: () => {
          counter.textContent = Math.floor(count.value).toLocaleString();
        }
      });
    });

    // Product card animations
    gsap.utils.toArray('.product-card').forEach((card, i) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: card,
          start: 'top 80%'
        }
      });
    });

    // Testimonial animations
    gsap.from('.testimonial-card', {
      x: -50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.testimonials-section',
        start: 'top 70%'
      }
    });

    gsap.from('.impact-item', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.impact-section',
        start: 'top 70%'
      }
    });
  };

  const handleShopNow = () => {
    router.push('/buy-give');
  };

  const handleVolunteer = () => {
    router.push('/help');
  };

  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-[#039994] to-[#02736f] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/hero-pattern.png')] bg-cover bg-center opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[#039994] opacity-80"></div>
        </div>
        
        <div className="container mx-auto px-6 z-10 text-center">
          <div className="flex justify-center mb-6">
            <img src="/images/BIG-RELIEF.png" alt="BigRelief Logo" className="h-24" />
          </div>
          
          <h1 className="hero-title text-5xl md:text-7xl font-bold text-white mb-4">
            Impacting Lives Together
          </h1>
          
          <p className="hero-subtitle text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
            {dailyTheme && `Today is ${currentDay}: ${dailyTheme}`}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleShopNow}
              className="hero-button bg-white text-[#039994] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition transform hover:scale-105"
            >
              Shop & Donate
            </button>
            <button 
              onClick={handleVolunteer}
              className="hero-button bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-[#039994] transition transform hover:scale-105"
            >
              Join Our Cause
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#039994] mb-4">Our Impact in Numbers</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every purchase you make directly contributes to our mission of eradicating poverty
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-4xl font-bold text-[#039994] mb-2 counter" data-target="12500">0</div>
              <p className="text-gray-600">Products Donated</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-4xl font-bold text-[#039994] mb-2 counter" data-target="8500">0</div>
              <p className="text-gray-600">Lives Impacted</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-4xl font-bold text-[#039994] mb-2 counter" data-target="320">0</div>
              <p className="text-gray-600">Volunteers</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-4xl font-bold text-[#039994] mb-2 counter" data-target="85">0</div>
              <p className="text-gray-600">% Profits Donated</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#039994] mb-4">Shop & Give Back</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every purchase triggers a matching donation to those in need
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 1, name: 'Eco Toothbrush', price: 8.99, image: '/images/toothbrush.jpg', impact: 'Provides oral care for 1 child' },
              { id: 2, name: 'Hygiene Kit', price: 24.99, image: '/images/hygiene-kit.jpg', impact: 'Supports 3 people for a month' },
              { id: 3, name: 'School Supplies', price: 19.99, image: '/images/school-supplies.jpg', impact: 'Equips 2 students' },
              { id: 4, name: 'Food Basket', price: 39.99, image: '/images/food-basket.jpg', impact: 'Feeds a family for a week' }
            ].map((product) => (
              <div key={product.id} className="product-card bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <img src={product.image} alt={product.name} className="h-40 object-contain" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-lg font-bold text-[#039994] mb-3">${product.price}</p>
                  <p className="text-sm text-gray-600 mb-4">{product.impact}</p>
                  <button className="w-full bg-[#039994] text-white py-2 rounded-lg hover:bg-[#02736f] transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={handleShopNow}
              className="bg-[#039994] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#02736f] transition transform hover:scale-105"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-[#039994] text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Your Support Makes a Difference</h2>
            <p className="text-lg max-w-2xl mx-auto">
              We pledge 85% of our annual profits to alleviate poverty and wellbeing issues
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="impact-item bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-sm">
              <div className="text-5xl font-bold mb-4">01</div>
              <h3 className="text-xl font-semibold mb-3">Direct Donations</h3>
              <p className="text-gray-200">
                For every product purchased, we donate an equivalent item to someone in need.
              </p>
            </div>
            <div className="impact-item bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-sm">
              <div className="text-5xl font-bold mb-4">02</div>
              <h3 className="text-xl font-semibold mb-3">Community Programs</h3>
              <p className="text-gray-200">
                We fund education, healthcare, and shelter programs in underserved communities.
              </p>
            </div>
            <div className="impact-item bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-sm">
              <div className="text-5xl font-bold mb-4">03</div>
              <h3 className="text-xl font-semibold mb-3">Sustainable Solutions</h3>
              <p className="text-gray-200">
                We invest in long-term solutions that empower individuals to break the poverty cycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 testimonials-section bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#039994] mb-4">Stories of Change</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from those whose lives have been transformed through your support
            </p>
          </div>
          
          <div className="testimonial-card bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mx-auto">
                  <img src="/images/testimonial-1.jpg" alt="Testimonial" className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <blockquote className="text-lg italic text-gray-700 mb-4">
                  "Thanks to BigRelief's school supplies program, my children can continue their education. The donated materials came at a time when I had lost my job and couldn't afford them."
                </blockquote>
                <div className="font-semibold text-[#039994]">Amina B.</div>
                <div className="text-sm text-gray-500">Beneficiary, Lagos</div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {[1, 2, 3].map((dot) => (
              <div key={dot} className={`w-3 h-3 rounded-full ${dot === 1 ? 'bg-[#039994]' : 'bg-gray-300'}`}></div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#02736f] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our movement to eradicate poverty through conscious consumerism
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleShopNow}
              className="bg-white text-[#039994] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105"
            >
              Shop & Donate
            </button>
            <button 
              onClick={handleVolunteer}
              className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-[#039994] transition transform hover:scale-105"
            >
              Volunteer With Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}