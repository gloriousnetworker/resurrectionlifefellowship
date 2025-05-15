'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/DashboardNavbar';
import Footer from '@/components/Footer';

export default function ScholarshipsPage() {
  const router = useRouter();
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const API_URL = 'https://big-relief-backend.vercel.app/api/v1';

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userData || !token) {
      fetchScholarships();
    } else {
      setUser(JSON.parse(userData));
      fetchScholarships(token);
    }
  }, []);

  const fetchScholarships = async (token = null) => {
    try {
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      const response = await fetch(`${API_URL}/scholarships`, { headers });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch scholarships');
      }

      setScholarships(data.data);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (scholarship) => {
    setSelectedScholarship(scholarship);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedScholarship(null);
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#039994]">Available Scholarships</h1>
          {user ? (
            <Link href="/dashboard?tab=scholarships" className="bg-[#039994] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#02736f] transition">
              Create Scholarship
            </Link>
          ) : (
            <Link href="/login" className="bg-[#039994] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#02736f] transition">
              Login to Create Scholarship
            </Link>
          )}
        </div>

        {scholarships.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No scholarships available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarships.map(scholarship => (
              <div key={scholarship.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
                {scholarship.imageUrl && (
                  <img 
                    src={scholarship.imageUrl} 
                    alt={scholarship.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#039994] mb-2">{scholarship.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{scholarship.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Amount:</span>
                      <span className="text-sm font-semibold">{scholarship.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Deadline:</span>
                      <span className="text-sm font-semibold">
                        {new Date(scholarship.deadline).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Eligibility:</span>
                      <span className="text-sm font-semibold line-clamp-1">{scholarship.eligibility}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => window.open(scholarship.applicationUrl, '_blank')}
                      className="text-[#039994] hover:text-[#02736f] font-medium"
                    >
                      Apply Now
                    </button>
                    <button
                      onClick={() => handleViewDetails(scholarship)}
                      className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scholarship Details Modal */}
      {isModalOpen && selectedScholarship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-[#039994]">{selectedScholarship.title}</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {selectedScholarship.imageUrl && (
                <img 
                  src={selectedScholarship.imageUrl} 
                  alt={selectedScholarship.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/800x400?text=No+Image";
                  }}
                />
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Description</h3>
                  <p className="text-gray-600">{selectedScholarship.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Amount</h3>
                    <p className="text-gray-600">{selectedScholarship.amount}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Deadline</h3>
                    <p className="text-gray-600">
                      {new Date(selectedScholarship.deadline).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Eligibility Criteria</h3>
                  <p className="text-gray-600">{selectedScholarship.eligibility}</p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      window.open(selectedScholarship.applicationUrl, '_blank');
                      closeModal();
                    }}
                    className="w-full bg-[#039994] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#02736f] transition"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}