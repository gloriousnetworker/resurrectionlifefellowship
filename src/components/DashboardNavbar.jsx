'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      name: 'Relief Center',
      href: '/relief-center',
      subItems: [
        { name: 'Government', href: '/relief-center' },
        { name: 'UN', href: '/relief-center' },
        { name: 'WHO', href: '/relief-center' },
        { name: 'Private Companies', href: '/relief-center' },
        { name: 'Co Relief', href: '/relief-center' }
      ]
    },
    {
      name: 'Buy & Give',
      href: '/products',
      subItems: [
        { name: 'All Products', href: '/products' },
        { name: 'Scholarships', href: '/scholarships' },
        { name: 'How It Works', href: '/donate' }
      ]
    },
    {
      name: 'If You Can Help, It Will Help',
      href: '/support',
      subItems: [
        { name: 'Volunteer', href: '/register' },
        { name: 'How you can help', href: '/support' },
        { name: 'Partnerships', href: '/login' }
      ]
    }
  ];

  const handleSignIn = () => {
    router.push('/login');
  };

  const handleDashboard = () => {
    router.push('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  const handleReferAndEarn = () => {
    setShowComingSoonModal(true);
    
    // Auto close the modal after 3 seconds
    setTimeout(() => {
      setShowComingSoonModal(false);
    }, 3000);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="/images/BIG-RELIEF.png" 
              alt="BigRelief Logo" 
              className={`h-12 transition-all duration-300 ${scrolled ? 'h-10' : 'h-12'}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <button className="flex items-center text-gray-800 hover:text-[#039994] transition font-medium">
                  {item.name}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-56 origin-top-left bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#039994] hover:text-white transition"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Refer and Earn Button */}
            <button 
              onClick={handleReferAndEarn}
              className="text-gray-800 hover:text-[#039994] transition font-medium"
            >
              Refer & Earn
            </button>

            {user ? (
              <div className="relative group">
                <button className="flex items-center text-gray-800 hover:text-[#039994] transition font-medium">
                  {user.name}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    <button
                      onClick={handleDashboard}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#039994] hover:text-white transition"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#039994] hover:text-white transition"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={handleSignIn}
                className={`ml-4 px-6 py-2 rounded-full font-semibold transition ${scrolled ? 'bg-[#039994] text-white hover:bg-[#02736f]' : 'bg-white text-[#039994] hover:bg-gray-100'}`}
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-[#039994] focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className="pt-4 pb-6 space-y-2">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-gray-200">
                <button 
                  className="flex justify-between items-center w-full py-3 text-left text-gray-800 hover:text-[#039994] font-medium"
                  onClick={() => router.push(item.href)}
                >
                  {item.name}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
            
            {/* Refer and Earn Button (Mobile) */}
            <button 
              onClick={handleReferAndEarn}
              className="flex justify-between items-center w-full py-3 text-left text-gray-800 hover:text-[#039994] font-medium border-b border-gray-200"
            >
              Refer & Earn
            </button>
            
            {user ? (
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleDashboard}
                  className="w-full py-2 text-left text-gray-800 hover:text-[#039994] font-medium"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 text-left text-gray-800 hover:text-[#039994] font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={handleSignIn}
                className="w-full mt-4 px-6 py-2 bg-[#039994] text-white rounded-full font-semibold hover:bg-[#02736f] transition"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Coming Soon Modal */}
      {showComingSoonModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4 relative animate-fade-in">
            <h3 className="text-xl font-bold text-[#039994] mb-4">Coming Soon!</h3>
            <p className="text-gray-700">This feature is under development. Stay tuned!</p>
            <button 
              onClick={() => setShowComingSoonModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}