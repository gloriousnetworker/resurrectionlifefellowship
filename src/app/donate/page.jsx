'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DonatePage() {
  const router = useRouter();
  const [donationAmount, setDonationAmount] = useState(5000);
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [paymentMade, setPaymentMade] = useState(false);
  const [donationComplete, setDonationComplete] = useState(false);

  const presetAmounts = [5000, 10000, 20000, 50000, 100000];

  const handleAmountChange = (amount) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) {
      setDonationAmount(parseInt(value));
    }
  };

  const handleDonateNow = () => {
    setDonationComplete(true);
  };

  const handleReturnHome = () => {
    router.push('/');
  };

  if (donationComplete) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto">
            <div className="text-green-500 text-8xl mb-6">✓</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Thank You for Your Generous Donation!</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Your contribution of ₦{donationAmount.toLocaleString()} will help transform lives and bring hope to those in need.
            </p>
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <p className="text-gray-700 mb-2">Donation Reference: <span className="font-semibold">DON-{Math.floor(100000 + Math.random() * 900000)}</span></p>
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
            Your donation helps us provide essential resources to communities in need
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-[#039994] mb-6">Donation Information</h2>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3">Donation Type</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setDonationType('one-time')}
                    className={`px-6 py-3 rounded-lg ${donationType === 'one-time' ? 'bg-[#039994] text-white' : 'bg-gray-100 text-gray-800'} transition`}
                  >
                    One-time Donation
                  </button>
                  <button
                    onClick={() => setDonationType('monthly')}
                    className={`px-6 py-3 rounded-lg ${donationType === 'monthly' ? 'bg-[#039994] text-white' : 'bg-gray-100 text-gray-800'} transition`}
                  >
                    Monthly Donation
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3">Donation Amount (₦)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  {presetAmounts.map(amount => (
                    <button
                      key={amount}
                      onClick={() => handleAmountChange(amount)}
                      className={`py-3 rounded-lg ${donationAmount === amount && !customAmount ? 'bg-[#039994] text-white' : 'bg-gray-100 text-gray-800'} transition`}
                    >
                      {amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Or enter custom amount:</label>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#039994]"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Payment Method</h2>
              
              <div className="border-2 border-[#039994] rounded-xl p-4">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full border-2 mr-3 border-[#039994] bg-[#039994]"></div>
                  <h3 className="font-medium">Bank Transfer</h3>
                </div>
                
                <div className="mt-4 pl-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium mb-2">Make transfer to:</p>
                    <p className="text-gray-600 mb-1">Bank: GTBank</p>
                    <p className="text-gray-600 mb-1">Account Name: Shakers Network Media Limited</p>
                    <p className="text-gray-600 mb-1">Account Number: 0556638338</p>
                    <p className="text-sm text-gray-500 mt-3">
                      Please use "DONATION" as the payment reference
                    </p>
                  </div>

                  <div className="mt-6">
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={paymentMade}
                        onChange={() => setPaymentMade(!paymentMade)}
                        className="h-5 w-5 text-[#039994] rounded border-gray-300 focus:ring-[#039994]"
                      />
                      <span className="ml-2 text-gray-700">I've made the payment</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Donation Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Donation Type:</span>
                  <span className="font-medium capitalize">{donationType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">₦{donationAmount.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-[#039994] mb-2">Your Impact</h3>
                <p className="text-gray-600">
                  {donationAmount >= 50000 ? 
                    "Your donation can provide food and education for 10 children for a month." :
                   donationAmount >= 20000 ? 
                    "Your donation can provide hygiene kits for 5 families." :
                   donationAmount >= 10000 ?
                    "Your donation can provide school supplies for 3 children." :
                    "Your donation will help provide essential resources to those in need."}
                </p>
              </div>
              
              <button 
                onClick={handleDonateNow}
                disabled={!paymentMade || donationAmount <= 0}
                className={`w-full font-semibold px-6 py-4 rounded-lg transition ${
                  paymentMade && donationAmount > 0
                    ? 'bg-[#039994] text-white hover:bg-[#02736f] cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Complete Donation
              </button>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                All donations are tax-deductible as allowed by law.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}