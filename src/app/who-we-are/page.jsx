'use client';
import Navbar from '../../components/Navbar';
import { useEffect, useRef, useState } from 'react';

const WhoWeAre = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div className="bg-[#0C3C4C] text-[#F3EFE6] font-cinzel min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 md:px-8 lg:px-16">
        <div ref={sectionRef} className={`max-w-6xl mx-auto transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#D6B16A] mb-12 text-center">Who We Are</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="h-96 bg-cover bg-center rounded" style={{ backgroundImage: "url('/images/church-community.jpg')" }}></div>
            <div>
              <h2 className="text-3xl font-bold text-[#D6B16A] mb-6">Our Community</h2>
              <p className="font-lora mb-6">
                "We are a community of people who believe in Jesus Christ. We seek to build meaningful relationships that unlock our creative purpose and encourages us to live passionately for God."
              </p>
              <p className="font-lora italic">— Matt 22:37-38</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-[#D6B16A] mb-6">Our Beliefs</h2>
              <ul className="font-lora space-y-4">
                <li className="flex items-start">
                  <span className="text-[#D6B16A] mr-2">•</span>
                  <span>We believe in the Holy Trinity: Father, Son, and Holy Spirit</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D6B16A] mr-2">•</span>
                  <span>The Bible is the inspired and infallible Word of God</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D6B16A] mr-2">•</span>
                  <span>Salvation comes through faith in Jesus Christ alone</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D6B16A] mr-2">•</span>
                  <span>The Church is the body of Christ on earth</span>
                </li>
              </ul>
            </div>
            <div className="h-96 bg-cover bg-center rounded order-2 md:order-1" style={{ backgroundImage: "url('/images/bible-study.jpg')" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;