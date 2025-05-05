'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      name: 'Relief Center',
      href: '/relief-center',
      subItems: [
        { name: 'Our Programs', href: '/relief-center/programs' },
        { name: 'Impact Stories', href: '/relief-center/stories' },
        { name: 'Partner NGOs', href: '/relief-center/partners' }
      ]
    },
    {
      name: 'Buy & Give',
      href: '/buy-give',
      subItems: [
        { name: 'All Products', href: '/buy-give/products' },
        { name: 'Best Sellers', href: '/buy-give/best-sellers' },
        { name: 'How It Works', href: '/buy-give/how-it-works' }
      ]
    },
    {
      name: 'If You Can Help, It Will Help',
      href: '/help',
      subItems: [
        { name: 'Volunteer', href: '/help/volunteer' },
        { name: 'Donate', href: '/help/donate' },
        { name: 'Partnerships', href: '/help/partnerships' }
      ]
    },
    {
      name: 'Sign Up',
      href: '/signup',
      subItems: [
        { name: 'Create Account', href: '/signup/create-account' },
        { name: 'Login', href: '/signup/login' },
        { name: 'Dashboard', href: '/dashboard' }
      ]
    }
  ];

  const handleSignIn = () => {
    router.push('/signup/login');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
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

            <button 
              onClick={handleSignIn}
              className={`ml-4 px-6 py-2 rounded-full font-semibold transition ${scrolled ? 'bg-[#039994] text-white hover:bg-[#02736f]' : 'bg-white text-[#039994] hover:bg-gray-100'}`}
            >
              Sign In
            </button>
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
            <button 
              onClick={handleSignIn}
              className="w-full mt-4 px-6 py-2 bg-[#039994] text-white rounded-full font-semibold hover:bg-[#02736f] transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}