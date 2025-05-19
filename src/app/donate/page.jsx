'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DonatePage() {
  const router = useRouter();
  const [sponsorshipCategory, setSponsorshipCategory] = useState('community-projects');
  const [contributionMade, setContributionMade] = useState(false);
  const [contributionComplete, setContributionComplete] = useState(false);

  const handleContribute = () => {
    setContributionComplete(true);
  };

  const handleReturnHome = () => {
    router.push('/');
  };

  const sponsorshipCategories = [
    { id: 'community-projects', label: 'Community Projects' },
    { id: 'healthcare', label: 'Health Care Services' },
    { id: 'education', label: 'Education' },
    { id: 'special-needs', label: 'Children with Special Needs' }
  ];

  if (contributionComplete) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto">
            <div className="text-green-500 text-8xl mb-6">✓</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Thank You for Your Generous Contribution!</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Your sponsorship will help transform lives and bring hope to those in need.
            </p>
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <p className="text-gray-700 mb-2">Sponsorship Reference: <span className="font-semibold">SPO-{Math.floor(100000 + Math.random() * 900000)}</span></p>
              <p className="text-gray-700">Date: <span className="font-semibold">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
            </div>
            <button 
              onClick={handleReturnHome}
              className="bg-[#039994] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#02736f] transition"
            >
              Return to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <div className="relative bg-gradient-to-br from-[#039994] to-[#02736f] py-24">
        <div className="absolute inset-0 bg-[url('/images/donate-bg.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Make a Difference Today</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Your sponsorship helps us provide essential resources to communities in need
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-[#039994] mb-6">Sponsorship Information</h2>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3">Sponsorship Category</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sponsorshipCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSponsorshipCategory(category.id)}
                      className={`px-4 py-3 rounded-lg text-sm ${sponsorshipCategory === category.id ? 'bg-[#039994] text-white' : 'bg-gray-100 text-gray-800'} transition`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3">Contribution Type</label>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="goods"
                      name="contributionType"
                      className="h-4 w-4 text-[#039994] focus:ring-[#039994]"
                    />
                    <label htmlFor="goods" className="ml-2 text-gray-700">Goods/Supplies</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="services"
                      name="contributionType"
                      className="h-4 w-4 text-[#039994] focus:ring-[#039994]"
                    />
                    <label htmlFor="services" className="ml-2 text-gray-700">Services/Expertise</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="other"
                      name="contributionType"
                      className="h-4 w-4 text-[#039994] focus:ring-[#039994]"
                    />
                    <label htmlFor="other" className="ml-2 text-gray-700">Other Contribution</label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Contribution Details</h2>
              
              <div className="border-2 border-[#039994] rounded-xl p-4">
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Describe your contribution:</label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#039994]"
                    rows="4"
                    placeholder="Please describe what you're contributing (goods, services, etc.)"
                  ></textarea>
                </div>

                <div className="mt-6">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={contributionMade}
                      onChange={() => setContributionMade(!contributionMade)}
                      className="h-5 w-5 text-[#039994] rounded border-gray-300 focus:ring-[#039994]"
                    />
                    <span className="ml-2 text-gray-700">I confirm my contribution</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Sponsorship Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">
                    {sponsorshipCategories.find(c => c.id === sponsorshipCategory)?.label || ''}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">In-kind contribution</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-[#039994] mb-2">Your Impact</h3>
                <p className="text-gray-600">
                  {sponsorshipCategory === 'community-projects' && (
                    "Your sponsorship will support key community development initiatives."
                  )}
                  {sponsorshipCategory === 'healthcare' && (
                    "Your contribution will help make healthcare more accessible."
                  )}
                  {sponsorshipCategory === 'education' && (
                    "Your contribution will help provide educational opportunities."
                  )}
                  {sponsorshipCategory === 'special-needs' && (
                    "Your contribution will support programs for children with special needs."
                  )}
                </p>
              </div>
              
              <button 
                onClick={handleContribute}
                disabled={!contributionMade}
                className={`w-full font-semibold px-6 py-4 rounded-lg transition ${
                  contributionMade
                    ? 'bg-[#039994] text-white hover:bg-[#02736f] cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Complete Sponsorship
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Thank you for supporting our initiatives.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}