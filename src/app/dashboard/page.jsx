'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Navbar from '@/components/DashboardNavbar';
import Footer from '@/components/Footer';
import BannerCarousel from '@/components/dashboard/BannerCarousel';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardWelcome from '@/components/dashboard/DashboardWelcome';
import NGOForm from '@/components/dashboard/NGOForm';
import NGOList from '@/components/dashboard/NGOList';
import ScholarshipForm from '@/components/dashboard/ScholarshipForm';
import ScholarshipList from '@/components/dashboard/ScholarshipList';
import Tabs from '@/components/dashboard/Tabs';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);
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
        {banners.length > 0 && <BannerCarousel banners={banners} />}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Dashboard Content */}
          {activeTab === 'dashboard' && (
            <div className="p-6">
              <h1 className="text-3xl font-bold text-[#039994] mb-4">Welcome, {user?.name}</h1>
              <p className="text-gray-600 mb-6">
                Thank you for being part of Big Relief. Together we can make a difference.
              </p>
              
              <DashboardStats userNgos={userNgos} scholarships={scholarships} />
              <DashboardWelcome user={user} setActiveTab={setActiveTab} />
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
                <NGOForm 
                  ngoForm={ngoForm}
                  handleNgoChange={handleNgoChange}
                  handleNgoSubmit={handleNgoSubmit}
                  submitting={submitting}
                  editingNgo={editingNgo}
                  cancelEdit={cancelEdit}
                />
              ) : (
                <NGOList 
                  userNgos={userNgos}
                  startEditNgo={startEditNgo}
                  deleteNgo={deleteNgo}
                  setEditingNgo={setEditingNgo}
                />
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
                <ScholarshipForm 
                  scholarshipForm={scholarshipForm}
                  handleScholarshipChange={handleScholarshipChange}
                  handleScholarshipSubmit={handleScholarshipSubmit}
                  submitting={submitting}
                  editingScholarship={editingScholarship}
                  cancelEdit={cancelEdit}
                  userNgos={userNgos}
                />
              ) : (
                <ScholarshipList 
                  scholarships={scholarships}
                  startEditScholarship={startEditScholarship}
                  deleteScholarship={deleteScholarship}
                  userNgos={userNgos}
                  setEditingScholarship={setEditingScholarship}
                />
              )}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}