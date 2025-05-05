import Link from 'next/link';

export default function Footer() {
  const footerLinks = [
    {
      title: 'About Us',
      links: [
        { name: 'Our Mission', href: '/about/mission' },
        { name: 'Our Team', href: '/about/team' },
        { name: 'Financials', href: '/about/financials' },
        { name: 'Careers', href: '/about/careers' }
      ]
    },
    {
      title: 'Relief Center',
      links: [
        { name: 'Programs', href: '/relief-center/programs' },
        { name: 'Impact Stories', href: '/relief-center/stories' },
        { name: 'Get Help', href: '/relief-center/get-help' },
        { name: 'Partner NGOs', href: '/relief-center/partners' }
      ]
    },
    {
      title: 'Get Involved',
      links: [
        { name: 'Volunteer', href: '/get-involved/volunteer' },
        { name: 'Donate', href: '/get-involved/donate' },
        { name: 'Partnerships', href: '/get-involved/partnerships' },
        { name: 'Fundraise', href: '/get-involved/fundraise' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '/resources/blog' },
        { name: 'FAQs', href: '/resources/faqs' },
        { name: 'Reports', href: '/resources/reports' },
        { name: 'Contact Us', href: '/resources/contact' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <img 
                src="/images/BIG-RELIEF.png" 
                alt="BigRelief Logo" 
                className="h-12"
              />
            </Link>
            <p className="text-gray-400 mb-6">
              BigRelief is a content-production and profit-making company pledging 85% of annual profits to alleviate poverty and wellbeing issues.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a 
                  key={social} 
                  href={`https://${social}.com/bigrelief`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#039994] transition"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-lg font-semibold mb-4 text-[#039994]">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#039994]">Contact Us</h3>
            <address className="not-italic text-gray-400 space-y-2">
              <p>123 Charity Avenue</p>
              <p>Lagos, Nigeria</p>
              <p>
                <a href="mailto:contact@bigrelief.com.ng" className="hover:text-white transition">
                  contact@bigrelief.com.ng
                </a>
              </p>
              <p>
                <a href="tel:+2348000000000" className="hover:text-white transition">
                  +234 800 000 0000
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Copyright and bottom links */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} BigRelief. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-500 hover:text-white text-sm transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-white text-sm transition">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-500 hover:text-white text-sm transition">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}