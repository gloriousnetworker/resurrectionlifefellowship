'use client';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';

function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('form');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    
    const emailBody = `Email: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
    const mailto = `mailto:pastormarcusellington@resurrectionlifefellowship.com,pastorcalebthornton@resurrectionlifefellowship.com?subject=Support Request&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailto;
    
    setStep('success');
    setTimeout(() => {
      setIsOpen(false);
      setStep('form');
      setFormData({ email: '', phone: '', message: '' });
    }, 2000);
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#D6B16A] text-[#0C3C4C] px-4 py-3 rounded-full shadow-lg hover:bg-[#C4A657] transition-colors font-cinzel font-semibold"
      >
        <i className="fas fa-comments mr-2"></i>
        Support
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-[#0C3C4C] border border-[#5A7D89] rounded-lg p-6 w-80 shadow-2xl">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-[#F3EFE6] hover:text-[#D6B16A] text-xl"
          >
            <i className="fas fa-times"></i>
          </button>

          {step === 'form' && (
            <>
              <h3 className="text-[#D6B16A] text-xl font-bold mb-4 font-cinzel">Contact Support</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 text-[15px] font-medium text-[#F3EFE6] font-lora">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-[#5A7D89] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D6B16A] bg-[#F3EFE6] text-[#444444] font-lora"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-[15px] font-medium text-[#F3EFE6] font-lora">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-[#5A7D89] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D6B16A] bg-[#F3EFE6] text-[#444444] font-lora"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-[15px] font-medium text-[#F3EFE6] font-lora">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full rounded-md border border-[#5A7D89] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D6B16A] bg-[#F3EFE6] text-[#444444] font-lora resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-[#D6B16A] text-[#0C3C4C] font-semibold py-2 hover:bg-[#C4A657] focus:outline-none focus:ring-2 focus:ring-[#D6B16A] font-cinzel"
                >
                  Send Message
                </button>
              </form>
            </>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <i className="fas fa-check-circle text-[#D6B16A] text-4xl mb-4"></i>
              <h3 className="text-[#D6B16A] text-xl font-bold mb-2 font-cinzel">Message Sent!</h3>
              <p className="text-[#F3EFE6] font-lora">Your message has been sent to our support team.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" />
        {children}
        <ChatSupport />
      </body>
    </html>
  );
}