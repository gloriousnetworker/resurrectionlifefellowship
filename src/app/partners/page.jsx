'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function PartnersPage() {
  const router = useRouter();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://big-relief-backend.vercel.app/api/v1/ngos');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch partners');
      }

      setPartners(data.data);
    } catch (error) {
      console.error('Error fetching partners:', error);
    } finally {
      setLoading(false);
    }
  };

  const openPartnerModal = (partner) => {
    setSelectedPartner(partner);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setSelectedPartner(null);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Partner Introduction Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#039994] mb-6">Our Partners</h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 mb-8">
                At Big Relief, we collaborate with trusted NGOs worldwide to deliver aid where it's needed most. 
                Our partners share our commitment to transparency, efficiency, and meaningful impact.
              </p>
              <p className="text-lg text-gray-700">
                Through these partnerships, we ensure that your contributions make a real difference in communities 
                affected by crises, poverty, and injustice. Together, we're building a better world.
              </p>
            </div>
          </div>

          {/* Partners Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#039994]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((partner) => (
                <div 
                  key={partner.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
                  onClick={() => openPartnerModal(partner)}
                >
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    {partner.imageUrl ? (
                      <img 
                        src={partner.imageUrl} 
                        alt={partner.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#039994]/10">
                        <span className="text-2xl font-bold text-[#039994]">
                          {partner.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{partner.name}</h3>
                    <p className="text-gray-600 line-clamp-3">{partner.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold text-[#039994] mb-4">Interested in becoming a partner?</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              We're always looking to expand our network of trusted partners to reach more communities in need.
              If your organization shares our values and mission, we'd love to hear from you.
            </p>
            <button 
              onClick={() => router.push('/login')}
              className="px-8 py-3 bg-[#039994] text-white font-semibold rounded-full hover:bg-[#02736f] transition"
            >
              Apply for Partnership
            </button>
          </div>
        </div>
      </div>

      {/* Partner Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                <XMarkIcon className="w-6 h-6" />
              </button>

              <div className="h-56 bg-gray-200">
                {selectedPartner?.imageUrl ? (
                  <img 
                    src={selectedPartner.imageUrl} 
                    alt={selectedPartner.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#039994]/10">
                    <span className="text-4xl font-bold text-[#039994]">
                      {selectedPartner?.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-8">
                <h2 className="text-2xl font-bold text-[#039994] mb-4">{selectedPartner?.name}</h2>
                <p className="text-gray-700 mb-6">{selectedPartner?.description}</p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Bank Details</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 mb-1">
                      <span className="font-medium">Bank Name:</span> {selectedPartner?.bankName}
                    </p>
                    <p className="text-gray-700 mb-1">
                      <span className="font-medium">Account Name:</span> {selectedPartner?.accountName}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Account Number:</span> {selectedPartner?.accountNumber}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedPartner?.website && (
                    <a 
                      href={selectedPartner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-[#039994] hover:underline"
                    >
                      <span className="font-medium">Website:</span> {selectedPartner.website}
                    </a>
                  )}
                  
                  {selectedPartner?.contactEmail && (
                    <a 
                      href={`mailto:${selectedPartner.contactEmail}`}
                      className="block text-[#039994] hover:underline"
                    >
                      <span className="font-medium">Contact Email:</span> {selectedPartner.contactEmail}
                    </a>
                  )}
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