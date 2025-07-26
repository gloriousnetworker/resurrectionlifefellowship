'use client';
import Navbar from '../../components/Navbar';
import { useEffect, useRef, useState } from 'react';

const Events = () => {
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

  const events = [
    {
      id: 1,
      title: 'Sunday Worship Service',
      date: 'Every Sunday',
      time: '10:00 AM',
      location: 'Main Sanctuary',
      image: '/images/sunday-service.jpg'
    },
    {
      id: 2,
      title: 'Wednesday Prayer Meeting',
      date: 'Every Wednesday',
      time: '7:00 PM',
      location: 'Prayer Hall',
      image: '/images/prayer-meeting.jpg'
    },
    {
      id: 3,
      title: 'Youth Fellowship',
      date: 'Every Friday',
      time: '6:30 PM',
      location: 'Youth Center',
      image: '/images/youth-fellowship.jpg'
    }
  ];

  return (
    <div className="bg-[#0C3C4C] text-[#F3EFE6] font-cinzel min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 md:px-8 lg:px-16">
        <div ref={sectionRef} className={`max-w-6xl mx-auto transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#D6B16A] mb-12 text-center">Upcoming Events</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-[#1a4b5a] border border-[#5A7D89] rounded overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${event.image})` }}></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#D6B16A] mb-2">{event.title}</h3>
                  <div className="font-lora space-y-2">
                    <p><span className="font-semibold">Date:</span> {event.date}</p>
                    <p><span className="font-semibold">Time:</span> {event.time}</p>
                    <p><span className="font-semibold">Location:</span> {event.location}</p>
                  </div>
                  <button className="mt-4 bg-[#D6B16A] text-[#0C3C4C] px-4 py-2 rounded font-semibold hover:bg-[#C4A657] transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;