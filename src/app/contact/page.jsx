'use client';
import Navbar from '../../components/Navbar';
import { useEffect, useRef, useState } from 'react';

const Contact = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailto = `mailto:info@rlfchurch.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    )}`;
    window.location.href = mailto;
  };

  return (
    <div className="bg-[#0C3C4C] text-[#F3EFE6] font-cinzel min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 md:px-8 lg:px-16">
        <div ref={sectionRef} className={`max-w-6xl mx-auto transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#D6B16A] mb-12 text-center">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-[#D6B16A] mb-6">Get In Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-lora">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-[#F3EFE6] text-[#0C3C4C] border border-[#5A7D89] font-lora"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-lora">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-[#F3EFE6] text-[#0C3C4C] border border-[#5A7D89] font-lora"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-lora">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-[#F3EFE6] text-[#0C3C4C] border border-[#5A7D89] font-lora"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-lora">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-[#F3EFE6] text-[#0C3C4C] border border-[#5A7D89] font-lora"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-lora">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2 bg-[#F3EFE6] text-[#0C3C4C] border border-[#5A7D89] font-lora"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-[#D6B16A] text-[#0C3C4C] px-6 py-3 font-semibold hover:bg-[#C4A657] transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#D6B16A] mb-6">Contact Information</h2>
              <div className="font-lora space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Address</h3>
                  <p>7065 State Route 20</p>
                  <p>Madison, NY 13402</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Phone</h3>
                  <p>(315) 893-7877</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <p>info@rlfchurch.com</p>
                </div>
                <div className="h-64 bg-cover bg-center mt-6" style={{ backgroundImage: "url('/images/church-building.jpg')" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

//something needs to be fixed