'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Navbar from '@/components/DashboardNavbar';
import Footer from '@/components/Footer';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ngoForm, setNgoForm] = useState({
    name: '',
    description: '',
    accountNumber: '',
    bankName: '',
    accountName: '',
    website: '',
    contactEmail: '',
    imageUrl: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userData || !token) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
    setLoading(false);
  }, [router]);

  const handleNgoChange = (e) => {
    const { name, value } = e.target;
    setNgoForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNgoSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://big-relief-backend.vercel.app/api/v1/ngos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(ngoForm)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register NGO');
      }

      toast.success('NGO registered successfully!');
      setNgoForm({
        name: '',
        description: '',
        accountNumber: '',
        bankName: '',
        accountName: '',
        website: '',
        contactEmail: '',
        imageUrl: ''
      });
    } catch (error) {
      toast.error(error.message || 'Failed to register NGO');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#039994]"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-[#039994] mb-4">Welcome, {user?.name}</h1>
          <p className="text-gray-600 mb-6">
            Thank you for being part of Big Relief. Together we can make a difference.
          </p>
          
          <div className="bg-[#039994] bg-opacity-10 p-6 rounded-xl border-l-4 border-[#039994] mb-8">
            <h2 className="text-xl font-semibold text-[#039994] mb-3">Partner with Us</h2>
            <p className="text-gray-700 mb-4">
              Register your NGO to become an official partner and enjoy exclusive benefits.
            </p>
            
            <form onSubmit={handleNgoSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">NGO Name</label>
                  <input
                    type="text"
                    name="name"
                    value={ngoForm.name}
                    onChange={handleNgoChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Contact Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={ngoForm.contactEmail}
                    onChange={handleNgoChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={ngoForm.description}
                  onChange={handleNgoChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Bank Name</label>
                  <input
                    type="text"
                    name="bankName"
                    value={ngoForm.bankName}
                    onChange={handleNgoChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Account Number</label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={ngoForm.accountNumber}
                    onChange={handleNgoChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Account Name</label>
                  <input
                    type="text"
                    name="accountName"
                    value={ngoForm.accountName}
                    onChange={handleNgoChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={ngoForm.website}
                    onChange={handleNgoChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={ngoForm.imageUrl}
                    onChange={handleNgoChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={submitting}
                className={`bg-[#039994] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#02736f] transition ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {submitting ? 'Submitting...' : 'Register NGO'}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}