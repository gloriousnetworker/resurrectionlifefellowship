'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Who we are', path: '/who-we-are' },
    { name: 'Events', path: '/events' },
    { name: 'Sermon', path: 'https://www.youtube.com/channel/UCQNCOaXJiM-rIKkq-O6D_YQ', external: true },
    { name: 'Davids KidZ', path: 'https://www.davidskidz.org/', external: true },
    { name: 'Mighty Men', path: 'https://www.rlfchurch.com/mightymen', external: true },
    { name: 'Contact', path: '/contact' },
    { name: 'Give Online', path: 'https://www.rlfchurch.com/give1', external: true },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0C3C4C] shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-20 bg-cover bg-center" style={{ backgroundImage: "url('/images/resurrectionlifelogo.jpg')" }}></div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                item.external ? (
                  <a
                    key={item.name}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3 py-2 text-sm font-medium ${pathname === item.path ? 'text-[#D6B16A]' : 'text-[#F3EFE6] hover:text-[#D6B16A]'}`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`px-3 py-2 text-sm font-medium ${pathname === item.path ? 'text-[#D6B16A]' : 'text-[#F3EFE6] hover:text-[#D6B16A]'}`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#F3EFE6] hover:text-[#D6B16A] focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#0C3C4C]">
          {navItems.map((item) => (
            item.external ? (
              <a
                key={item.name}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-base font-medium text-[#F3EFE6] hover:text-[#D6B16A]"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                href={item.path}
                className="block px-3 py-2 text-base font-medium text-[#F3EFE6] hover:text-[#D6B16A]"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            )
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;