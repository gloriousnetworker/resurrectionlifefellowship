import Link from 'next/link';

export default function Footer() {
  const footerColumns = [
    {
      title: 'About Us',
      items: [
        { name: 'Our Mission', href: '/about-us' },
        { name: 'Our Team', href: '/about-us' },
        { name: 'Financials', href: '/donate' }
      ]
    },
    {
      title: 'Relief Center',
      items: [
        { name: 'Government', href: null },
        { name: 'UN', href: null },
        { name: 'WHO', href: null },
        { name: 'Private Companies', href: null },
        { name: 'Co Relief', href: null },
        { name: 'Our Partners', href: '/partners' }
      ]
    },
    {
      title: 'Get Involved',
      items: [
        { name: 'Volunteer', href: '/login' },
        { name: 'Donate', href: '/donate' }
      ]
    },
    {
      title: 'Resources',
      items: [
        { name: 'Blog', href: null },
        { name: 'FAQs', href: null },
        { name: 'Reports', href: null },
        { name: 'Contact Us', href: null }
      ]
    }
  ];

  const contactEmails = [
    'info@bigrelief.com',
    'customersupport@bigrelief.com',
    'career@bigrelief.com',
    'sponsorship@bigrelief.com',
    'mabu@bigrelief.com'
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Logo & description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <img src="/images/BIG-RELIEF.png" alt="BigRelief Logo" className="h-12" />
            </Link>
            <p className="text-gray-400 mb-6">
              BigRelief is a content-production and profit-making company pledging 85% of annual profits to alleviate poverty and wellbeing issues.
            </p>
          </div>

          {/* Footer columns */}
          {footerColumns.map(col => (
            <div key={col.title}>
              <h3 className="text-lg font-semibold mb-4 text-[#039994]">{col.title}</h3>
              <ul className="space-y-2 text-gray-400">
                {col.items.map(item => (
                  <li key={item.name}>
                    {item.href ? (
                      <Link href={item.href} className="hover:text-white transition">
                        {item.name}
                      </Link>
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#039994]">Contact</h3>
            <div className="space-y-1 text-gray-400">
              <p>+2347089132193</p>
              {contactEmails.map(email => (
                <p key={email}>
                  <a href={`mailto:${email}`} className="hover:text-white transition">
                    {email}
                  </a>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Powered by partner */}
        <div className="mt-12 flex flex-col items-center">
          <span className="text-gray-500 text-sm mb-2">Powered by</span>
          <img
            src="/images/powered-by-shakers.jpg"
            alt="Powered by Shakers"
            className="h-16 w-16 rounded-full"
          />
        </div>

        {/* Bottom links */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} BigRelief. All rights reserved.
          </p>
          <div className="flex space-x-6 text-gray-500">
            <Link href="/privacy" className="hover:text-white text-sm transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white text-sm transition">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-white text-sm transition">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
