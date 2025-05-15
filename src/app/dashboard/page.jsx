'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Navbar from '@/components/DashboardNavbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [userNgos, setUserNgos] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // NGO Form State
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
  
  // Scholarship Form State
  const [scholarshipForm, setScholarshipForm] = useState({
    title: '',
    description: '',
    ngoId: '',
    deadline: '',
    eligibility: '',
    applicationUrl: '',
    amount: '',
    imageUrl: ''
  });

  const [editingNgo, setEditingNgo] = useState(null);
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const API_URL = 'https://big-relief-backend.vercel.app/api/v1';

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userData || !token) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchBanners();
    fetchUserNgos(token);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prevIndex) => 
          prevIndex === banners.length - 1 ? 0 : prevIndex + 1
        );
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [banners]);

  useEffect(() => {
    if (userNgos.length > 0 && activeTab === 'scholarships') {
      const token = localStorage.getItem('token');
      fetchScholarships(token);
    }
  }, [userNgos, activeTab]);

  const fetchBanners = async () => {
    try {
      const response = await fetch(`${API_URL}/banners/active`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch banners');
      }

      setBanners(data.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  const fetchUserNgos = async (token) => {
    try {
      const response = await fetch(`${API_URL}/ngos`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch NGOs');
      }

      setUserNgos(data.data);
    } catch (error) {
      console.error('Error fetching NGOs:', error);
    }
  };

  const fetchScholarships = async (token) => {
    try {
      const response = await fetch(`${API_URL}/scholarships`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch scholarships');
      }

      setScholarships(data.data);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
    }
  };

  const handleNgoChange = (e) => {
    const { name, value } = e.target;
    setNgoForm(prev => ({ ...prev, [name]: value }));
  };

  const handleScholarshipChange = (e) => {
    const { name, value } = e.target;
    setScholarshipForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNgoSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const url = editingNgo?.id 
        ? `${API_URL}/ngos/${editingNgo.id}`
        : `${API_URL}/ngos`;
      
      const method = editingNgo?.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(ngoForm)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Failed to ${editingNgo?.id ? 'update' : 'register'} NGO`);
      }

      toast.success(`NGO ${editingNgo?.id ? 'updated' : 'registered'} successfully!`);
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
      setEditingNgo(null);
      fetchUserNgos(token);
    } catch (error) {
      toast.error(error.message || `Failed to ${editingNgo?.id ? 'update' : 'register'} NGO`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleScholarshipSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const url = editingScholarship?.id 
        ? `${API_URL}/scholarships/${editingScholarship.id}`
        : `${API_URL}/scholarships`;
      
      const method = editingScholarship?.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...scholarshipForm,
          deadline: new Date(scholarshipForm.deadline).toISOString()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Failed to ${editingScholarship?.id ? 'update' : 'create'} scholarship`);
      }

      toast.success(`Scholarship ${editingScholarship?.id ? 'updated' : 'created'} successfully!`);
      setScholarshipForm({
        title: '',
        description: '',
        ngoId: '',
        deadline: '',
        eligibility: '',
        applicationUrl: '',
        amount: '',
        imageUrl: ''
      });
      setEditingScholarship(null);
      fetchScholarships(token);
    } catch (error) {
      toast.error(error.message || `Failed to ${editingScholarship?.id ? 'update' : 'create'} scholarship`);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteNgo = async (id) => {
    if (!confirm('Are you sure you want to delete this NGO? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/ngos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete NGO');
      }

      toast.success('NGO deleted successfully!');
      fetchUserNgos(token);
    } catch (error) {
      toast.error(error.message || 'Failed to delete NGO');
    }
  };

  const deleteScholarship = async (id) => {
    if (!confirm('Are you sure you want to delete this scholarship? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/scholarships/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete scholarship');
      }

      toast.success('Scholarship deleted successfully!');
      fetchScholarships(token);
    } catch (error) {
      toast.error(error.message || 'Failed to delete scholarship');
    }
  };

  const startEditNgo = (ngo) => {
    setEditingNgo(ngo);
    setNgoForm({
      name: ngo.name,
      description: ngo.description,
      accountNumber: ngo.accountNumber,
      bankName: ngo.bankName,
      accountName: ngo.accountName,
      website: ngo.website,
      contactEmail: ngo.contactEmail,
      imageUrl: ngo.imageUrl
    });
    setActiveTab('ngos');
  };

  const startEditScholarship = (scholarship) => {
    setEditingScholarship(scholarship);
    setScholarshipForm({
      title: scholarship.title,
      description: scholarship.description,
      ngoId: scholarship.ngoId,
      deadline: scholarship.deadline.split('T')[0],
      eligibility: scholarship.eligibility,
      applicationUrl: scholarship.applicationUrl,
      amount: scholarship.amount,
      imageUrl: scholarship.imageUrl
    });
    setActiveTab('scholarships');
  };

  const cancelEdit = () => {
    setEditingNgo(null);
    setEditingScholarship(null);
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
    setScholarshipForm({
      title: '',
      description: '',
      ngoId: '',
      deadline: '',
      eligibility: '',
      applicationUrl: '',
      amount: '',
      imageUrl: ''
    });
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
        {/* Banner Carousel */}
        {banners.length > 0 && (
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8 shadow-lg">
            {banners.map((banner, index) => (
              <div 
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${index === currentBannerIndex ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="text-center px-8 text-white">
                    <h2 className="text-2xl md:text-4xl font-bold mb-2">{banner.title}</h2>
                    <p className="text-lg md:text-xl">{banner.description}</p>
                  </div>
                </div>
                <img 
                  src={banner.imageUrl} 
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBannerIndex(index)}
                  className={`w-3 h-3 rounded-full ${index === currentBannerIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200">
            <button 
              className={`py-3 px-6 font-medium ${activeTab === 'dashboard' ? 'text-[#039994] border-b-2 border-[#039994]' : 'text-gray-500 hover:text-[#039994]'}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={`py-3 px-6 font-medium ${activeTab === 'ngos' ? 'text-[#039994] border-b-2 border-[#039994]' : 'text-gray-500 hover:text-[#039994]'}`}
              onClick={() => setActiveTab('ngos')}
            >
              My NGOs
            </button>
            <button 
              className={`py-3 px-6 font-medium ${activeTab === 'scholarships' ? 'text-[#039994] border-b-2 border-[#039994]' : 'text-gray-500 hover:text-[#039994]'}`}
              onClick={() => setActiveTab('scholarships')}
            >
              Scholarships
            </button>
          </div>

          {/* Dashboard Content */}
          {activeTab === 'dashboard' && (
            <div className="p-6">
              <h1 className="text-3xl font-bold text-[#039994] mb-4">Welcome, {user?.name}</h1>
              <p className="text-gray-600 mb-6">
                Thank you for being part of Big Relief. Together we can make a difference.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#039994] bg-opacity-10 p-6 rounded-xl border-l-4 border-[#039994]">
                  <h3 className="text-xl font-semibold text-[#039994] mb-2">NGOs</h3>
                  <p className="text-3xl font-bold">{userNgos.length}</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">Active Scholarships</h3>
                  <p className="text-3xl font-bold">{scholarships.length}</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                  <h3 className="text-xl font-semibold text-purple-600 mb-2">Messages</h3>
                  <p className="text-3xl font-bold">0</p>
                </div>
              </div>

              <div className="bg-[#039994] bg-opacity-10 p-6 rounded-xl border-l-4 border-[#039994]">
                <h2 className="text-xl font-semibold text-[#039994] mb-3">Partner with Us</h2>
                <p className="text-gray-700 mb-4">
                  Register your NGO to become an official partner and enjoy exclusive benefits.
                </p>
                <button
                  onClick={() => setActiveTab('ngos')}
                  className="bg-[#039994] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#02736f] transition"
                >
                  Register NGO
                </button>
              </div>
            </div>
          )}

          {/* NGOs Content */}
          {activeTab === 'ngos' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#039994]">
                  {editingNgo ? 'Edit NGO' : 'My NGOs'}
                </h2>
                {!editingNgo && (
                  <button
                    onClick={() => setEditingNgo({})}
                    className="bg-[#039994] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#02736f] transition"
                  >
                    + Add NGO
                  </button>
                )}
              </div>

              {editingNgo ? (
                <form onSubmit={handleNgoSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1">NGO Name*</label>
                      <input
                        type="text"
                        name="name"
                        value={ngoForm.name}
                        onChange={handleNgoChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Contact Email*</label>
                      <input
                        type="email"
                        name="contactEmail"
                        value={ngoForm.contactEmail}
                        onChange={handleNgoChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Description*</label>
                    <textarea
                      name="description"
                      value={ngoForm.description}
                      onChange={handleNgoChange}
                      required
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Bank Name*</label>
                      <input
                        type="text"
                        name="bankName"
                        value={ngoForm.bankName}
                        onChange={handleNgoChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Account Number*</label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={ngoForm.accountNumber}
                        onChange={handleNgoChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Account Name*</label>
                      <input
                        type="text"
                        name="accountName"
                        value={ngoForm.accountName}
                        onChange={handleNgoChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Image URL</label>
                      <input
                        type="url"
                        name="imageUrl"
                        value={ngoForm.imageUrl}
                        onChange={handleNgoChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`bg-[#039994] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#02736f] transition ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {submitting ? 'Processing...' : editingNgo.id ? 'Update NGO' : 'Register NGO'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="overflow-x-auto">
                  {userNgos.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {userNgos.map(ngo => (
                          <tr key={ngo.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {ngo.imageUrl && (
                                  <img className="h-10 w-10 rounded-full object-cover mr-4" src={ngo.imageUrl} alt={ngo.name} />
                                )}
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{ngo.name}</div>
                                  <div className="text-sm text-gray-500">{ngo.contactEmail}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ngo.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {ngo.isVerified ? 'Verified' : 'Pending Verification'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button 
                                onClick={() => startEditNgo(ngo)}
                                className="text-blue-500 hover:text-blue-600 px-3 py-1 rounded"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => deleteNgo(ngo.id)}
                                className="text-red-500 hover:text-red-600 px-3 py-1 rounded"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      You haven't registered any NGOs yet.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Scholarships Content */}
          {activeTab === 'scholarships' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#039994]">
                  {editingScholarship ? (editingScholarship.id ? 'Edit Scholarship' : 'Create Scholarship') : 'My Scholarships'}
                </h2>
                {!editingScholarship && userNgos.length > 0 && (
                  <button
                    onClick={() => setEditingScholarship({})}
                    className="bg-[#039994] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#02736f] transition"
                  >
                    + Add Scholarship
                  </button>
                )}
              </div>

              {editingScholarship ? (
                <form onSubmit={handleScholarshipSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Title*</label>
                      <input
                        type="text"
                        name="title"
                        value={scholarshipForm.title}
                        onChange={handleScholarshipChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">NGO*</label>
                      <select
                        name="ngoId"
                        value={scholarshipForm.ngoId}
                        onChange={handleScholarshipChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
                      >
                        <option value="">Select NGO</option>
                        {userNgos.map(ngo => (
                          <option key={ngo.id} value={ngo.id}>{ngo.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Description*</label>
                    <textarea
                      name="description"
                      value={scholarshipForm.description}
                      onChange={handleScholarshipChange}
                      required
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Deadline*</label>
                      <input
                        type="date"
                        name="deadline"
                        value={scholarshipForm.deadline}
                        onChange={handleScholarshipChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Amount*</label>
                      <input
                        type="text"
                        name="amount"
                        value={scholarshipForm.amount}
                        onChange={handleScholarshipChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Application URL*</label>
                      <input
                        type="url"
                        name="applicationUrl"
                        value={scholarshipForm.applicationUrl}
                        onChange={handleScholarshipChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Eligibility Criteria*</label>
                    <textarea
                      name="eligibility"
                      value={scholarshipForm.eligibility}
                      onChange={handleScholarshipChange}
                      required
                      rows="2"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Image URL</label>
                    <input
                      type="url"
                      name="imageUrl"
                      value={scholarshipForm.imageUrl}
                      onChange={handleScholarshipChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#039994] focus:border-[#039994]"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`bg-[#039994] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#02736f] transition ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {submitting ? 'Processing...' : editingScholarship.id ? 'Update Scholarship' : 'Create Scholarship'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="overflow-x-auto">
                  {userNgos.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      You need to register an NGO before creating scholarships.
                    </div>
                  ) : scholarships.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {scholarships.map(scholarship => (
                        <div key={scholarship.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
                          {scholarship.imageUrl && (
                            <img 
                              src={scholarship.imageUrl} 
                              alt={scholarship.title}
                              className="w-full h-48 object-cover"
                            />
                          )}
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-[#039994] mb-2">{scholarship.title}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-2">{scholarship.description}</p>
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-sm font-medium text-gray-500">Amount: {scholarship.amount}</span>
                              <span className="text-sm font-medium text-gray-500">Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <button 
                                onClick={() => startEditScholarship(scholarship)}
                                className="text-blue-500 hover:text-blue-600 px-3 py-1 rounded"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => deleteScholarship(scholarship.id)}
                                className="text-red-500 hover:text-red-600 px-3 py-1 rounded"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      You haven't created any scholarships yet.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}