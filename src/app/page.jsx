'use client';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import RollingBanner from '@/components/RollingBanner';
import Footer from '@/components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const router = useRouter();
  const [currentDay, setCurrentDay] = useState('');
  const [dailyTheme, setDailyTheme] = useState('');
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
  // Background images for carousel
  const backgroundImages = [
    '/images/background.jpg', 
    '/images/background2.jpg'
  ];

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

  // Background image carousel effect
  useEffect(() => {
    const carouselInterval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(carouselInterval);
  }, [backgroundImages.length]);

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

    // Exercise card animations
    gsap.utils.toArray('.exercise-card').forEach((card, i) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%'
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

  const handleRouteChange = (route) => {
    router.push(route);
  };

  // Exercise data
  const exercises = [
    {
      id: 1,
      name: 'Walking',
      icon: 'M14 14c0-2.21-1.79-4-4-4S6 11.79 6 14s1.79 4 4 4 4-1.79 4-4zm-4-6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0-2C7.8 6 6 7.8 6 10c0 1.1.9 2 2 2s2-.9 2-2c0-1.1-.9-2-2-2M3 10c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.21-1.79 4-4 4s-4-1.79-4-4',
      description: 'Walking is a low-impact exercise that is accessible to most people. Aim for 10,000 steps daily for weight loss benefits. Walking briskly for 30 minutes can burn around 150-200 calories, depending on your weight and pace.'
    },
    {
      id: 2,
      name: 'Jumping Rope',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z',
      description: 'A high-intensity exercise that burns calories quickly. Just 10 minutes of jumping rope can burn about 100 calories. It also improves coordination, balance, and bone density while strengthening leg muscles.'
    },
    {
      id: 3,
      name: 'High-Intensity Interval Training (HIIT)',
      icon: 'M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z',
      description: 'HIIT involves short bursts of intense exercise alternated with low-intensity recovery periods. Effective for burning fat and boosting metabolism, HIIT workouts can be completed in as little as 20-30 minutes.'
    },
    {
      id: 4,
      name: 'Swimming',
      icon: 'M22 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-2-5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-10 5c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm0-9c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm8 2v-6h-2v6h2zm-4-14h2V4h-2v4zm0 12h2v-4h-2v4z',
      description: 'A full-body workout that is gentle on the joints. Swimming can burn 400-700 calories per hour depending on intensity. It builds endurance, muscle strength, and cardiovascular fitness while being low-impact.'
    },
    {
      id: 5,
      name: 'Strength Training',
      icon: 'M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43-1.43-1.43-1.43 1.43-2.57z',
      description: 'Weight training builds muscle, which increases your resting metabolic rate. This means your body burns more calories even when you are not exercising. Incorporate exercises targeting all major muscle groups 2-3 times per week.'
    },
    {
      id: 6,
      name: 'Pilates',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-8c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5zm2 0c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z',
      description: 'Focuses on core strength, flexibility, and total body awareness. While not as calorie-intensive as some exercises, Pilates improves posture, reduces risk of injury, and builds lean muscle that contributes to a higher metabolic rate.'
    },
    {
      id: 7,
      name: 'Jogging',
      icon: 'M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7',
      description: 'More intense than walking, jogging burns more calories in less time. A 155-pound person can burn about 300 calories in 30 minutes of jogging. It is excellent for cardiovascular health and builds lower body strength.'
    },
    {
      id: 8,
      name: 'Yoga',
      icon: 'M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z',
      description: 'While not typically considered a high-calorie burning exercise, yoga improves flexibility, builds strength, reduces stress, and can support weight loss by promoting mindfulness around eating and lifestyle habits.'
    },
    {
      id: 9,
      name: 'Stair Climbing',
      icon: 'M15 5v7H9V5h6m0-2H9c-1.1 0-2 .9-2 2v9h10V5c0-1.1-.9-2-2-2zm7 17H2v2h20v-2zm-1.42-5L17 14.75V19h-2v-7h1.5l3.5 5z',
      description: 'Whether using a machine or actual stairs, stair climbing is a challenging workout that targets your glutes, hamstrings, and calves. It can burn 180-260 calories in just 30 minutes while improving cardiovascular fitness.'
    },
    {
      id: 10,
      name: 'Hiking',
      icon: 'M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM17.5 10.78c-1.23-.37-2.22-1.17-2.8-2.18l-1-1.6c-.41-.65-1.11-1-1.84-1-.78 0-1.59.5-1.78 1.44S7 23 7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2.21z',
      description: 'Combines the benefits of walking with the added resistance of varied terrain. Hiking uphill significantly increases calorie burn and engages more muscle groups. It also offers the mental health benefits of being in nature.'
    },
    {
      id: 11,
      name: 'Cycling',
      icon: 'M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z',
      description: 'A low-impact exercise that can be done outdoors or on a stationary bike. Cycling can burn 400-1000 calories per hour depending on intensity and resistance. It strengthens your lower body and improves cardiovascular health.'
    }
  ];

  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <RollingBanner />
      
      {/* Hero Section with Background Image Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Background Image Carousel */}
          {backgroundImages.map((image, index) => (
            <div 
              key={index}
              className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${currentBgIndex === index ? 'opacity-100' : 'opacity-0'}`}
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          ))}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[#039994] opacity-80"></div>
        </div>
        
        <div className="container mx-auto px-6 z-10 text-center">
          <div className="flex justify-center mb-6">
            <img src="/images/BIG-RELIEF.png" alt="BigRelief Logo" className="h-28" />
          </div>
          
          <h1 className="hero-title text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            Impacting Lives Together
          </h1>
          
          <p className="hero-subtitle text-xl md:text-3xl text-white mb-10 max-w-3xl mx-auto font-light">
            {dailyTheme && `Today is ${currentDay}: ${dailyTheme}`}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => handleRouteChange('/donate')}
              className="hero-button bg-white text-[#039994] font-semibold px-10 py-4 rounded-full hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
            >
              Shop & Donate
            </button>
            <button 
              onClick={() => handleRouteChange('/login')}
              className="hero-button bg-transparent border-2 border-white text-white font-semibold px-10 py-4 rounded-full hover:bg-white hover:text-[#039994] transition transform hover:scale-105"
            >
              Join Our Cause
            </button>
          </div>
        </div>
        
        {/* Carousel Navigation Dots */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2 z-10">
          {backgroundImages.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentBgIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${currentBgIndex === index ? 'bg-white scale-125' : 'bg-white bg-opacity-50'}`}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#039994] mb-6">Our Impact in Numbers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every purchase you make directly contributes to our mission of eradicating poverty
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center transform hover:scale-105 transition duration-300">
              <div className="text-5xl font-bold text-[#039994] mb-3 counter" data-target="12500">0</div>
              <p className="text-lg text-gray-600">Products Donated</p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center transform hover:scale-105 transition duration-300">
              <div className="text-5xl font-bold text-[#039994] mb-3 counter" data-target="8500">0</div>
              <p className="text-lg text-gray-600">Lives Impacted</p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center transform hover:scale-105 transition duration-300">
              <div className="text-5xl font-bold text-[#039994] mb-3 counter" data-target="320">0</div>
              <p className="text-lg text-gray-600">Volunteers</p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center transform hover:scale-105 transition duration-300">
              <div className="text-5xl font-bold text-[#039994] mb-3 counter" data-target="85">0</div>
              <p className="text-lg text-gray-600">% Profits Donated</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exercise Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#039994] mb-6">11 Best Exercises for Weight Loss</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Up your Exercise Game with These Effective Workouts
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {exercises.map((exercise) => (
              <div key={exercise.id} className="exercise-card bg-white rounded-2xl shadow-xl overflow-hidden transform transition hover:scale-105 hover:shadow-2xl">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-[#039994] bg-opacity-10 p-4 rounded-full mr-4">
                      <svg className="w-8 h-8 text-[#039994]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={exercise.icon} />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800">{exercise.name}</h3>
                  </div>
                  <p className="text-gray-600">{exercise.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-[#039994] text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How Your Support Makes a Difference</h2>
            <p className="text-xl max-w-3xl mx-auto">
              We pledge 85% of our annual profits to alleviate poverty and wellbeing issues
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="impact-item bg-white bg-opacity-10 p-10 rounded-2xl backdrop-blur-sm transform hover:translate-y-[-10px] transition duration-300">
              <div className="text-6xl font-bold mb-6 text-white opacity-80">01</div>
              <h3 className="text-2xl font-semibold mb-4">Direct Donations</h3>
              <p className="text-lg text-gray-100">
                For every product purchased, we donate an equivalent item to someone in need.
              </p>
            </div>
            <div className="impact-item bg-white bg-opacity-10 p-10 rounded-2xl backdrop-blur-sm transform hover:translate-y-[-10px] transition duration-300">
              <div className="text-6xl font-bold mb-6 text-white opacity-80">02</div>
              <h3 className="text-2xl font-semibold mb-4">Community Programs</h3>
              <p className="text-lg text-gray-100">
                We fund education, healthcare, and shelter programs in underserved communities.
              </p>
            </div>
            <div className="impact-item bg-white bg-opacity-10 p-10 rounded-2xl backdrop-blur-sm transform hover:translate-y-[-10px] transition duration-300">
              <div className="text-6xl font-bold mb-6 text-white opacity-80">03</div>
              <h3 className="text-2xl font-semibold mb-4">Sustainable Solutions</h3>
              <p className="text-lg text-gray-100">
                We invest in long-term solutions that empower individuals to break the poverty cycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 testimonials-section bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#039994] mb-6">Stories of Change</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from those whose lives have been transformed through your support
            </p>
          </div>
          
          <div className="testimonial-card bg-white p-10 rounded-2xl shadow-xl max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-shrink-0">
                <div className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden mx-auto shadow-lg">
                  <img src="/images/testimonial-1.jpg" alt="Testimonial" className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <blockquote className="text-xl italic text-gray-700 mb-6 leading-relaxed">
                  "Thanks to BigRelief's school supplies program, my children can continue their education. The donated materials came at a time when I had lost my job and couldn't afford them."
                </blockquote>
                <div className="text-xl font-semibold text-[#039994]">Amina B.</div>
                <div className="text-gray-500">Beneficiary, Lagos</div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-10 space-x-3">
            {[1, 2, 3].map((dot) => (
              <div 
                key={dot} 
                className={`w-4 h-4 rounded-full transition ${dot === 1 ? 'bg-[#039994]' : 'bg-gray-300'} cursor-pointer hover:scale-110`}
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#02736f] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Make an Impact?</h2>
          <p className="text-2xl mb-10 max-w-3xl mx-auto font-light">
            Join our movement to eradicate poverty through conscious consumerism
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => handleRouteChange('/donate')}
              className="bg-white text-[#039994] font-semibold px-10 py-4 rounded-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
            >
              Shop & Donate
            </button>
            <button 
              onClick={() => handleRouteChange('/login')}
              className="bg-transparent border-2 border-white text-white font-semibold px-10 py-4 rounded-lg hover:bg-white hover:text-[#039994] transition transform hover:scale-105"
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