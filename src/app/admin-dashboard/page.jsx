'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/DashboardNavbar';
import Footer from '@/components/Footer';
import NotificationAlert from '@/components/admin/NotificationAlert';
import UserManagement from '@/components/admin/UserManagement';
import NgoManagement from '@/components/admin/NgoManagement';
import BannersManagement from '@/components/admin/BannersManagement';
import ScholarshipsManagement from '@/components/admin/ScholarshipManagement';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [pendingNgos, setPendingNgos] = useState([]);
  const [banners, setBanners] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingNgos, setLoadingNgos] = useState(false);
  const [loadingPendingNgos, setLoadingPendingNgos] = useState(false);
  const [loadingBanners, setLoadingBanners] = useState(false);
  const [loadingScholarships, setLoadingScholarships] = useState(false);
  const [activeTab, setActiveTab] = useState('users');
  const [actionMessage, setActionMessage] = useState({ type: '', message: '' });
  
  const API_URL = 'https://big-relief-backend.vercel.app/api/v1';

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userData || !token) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    if (parsedUser.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    fetchUsers(token);
    fetchNgos();
    fetchPendingNgos(token);
    fetchBanners(token);
    fetchScholarships(token);
  }, [router]);
  
  useEffect(() => {
    if (actionMessage.message) {
      const timer = setTimeout(() => {
        setActionMessage({ type: '', message: '' });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [actionMessage]);

  const fetchUsers = async (token) => {
    try {
      setLoadingUsers(true);
      const response = await fetch(`${API_URL}/admin/users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setActionMessage({ type: 'error', message: 'Failed to fetch users' });
    } finally {
      setLoadingUsers(false);
      setLoading(false);
    }
  };

  const fetchNgos = async () => {
    try {
      setLoadingNgos(true);
      const response = await fetch(`${API_URL}/ngos`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setNgos(data.data || []);
    } catch (error) {
      console.error('Error fetching NGOs:', error);
      setActionMessage({ type: 'error', message: 'Failed to fetch NGOs' });
    } finally {
      setLoadingNgos(false);
    }
  };

  const fetchPendingNgos = async (token) => {
    try {
      setLoadingPendingNgos(true);
      const response = await fetch(`${API_URL}/admin/pending-ngos`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPendingNgos(data.data || []);
    } catch (error) {
      console.error('Error fetching pending NGOs:', error);
      setActionMessage({ type: 'error', message: 'Failed to fetch pending NGOs' });
    } finally {
      setLoadingPendingNgos(false);
    }
  };

  const fetchBanners = async (token) => {
    try {
      setLoadingBanners(true);
      const response = await fetch(`${API_URL}/admin/banners`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBanners(data.data || []);
    } catch (error) {
      console.error('Error fetching banners:', error);
      setActionMessage({ type: 'error', message: 'Failed to fetch banners' });
    } finally {
      setLoadingBanners(false);
    }
  };

  const fetchScholarships = async (token) => {
    try {
      setLoadingScholarships(true);
      const response = await fetch(`${API_URL}/scholarships`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setScholarships(data.data || []);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      setActionMessage({ type: 'error', message: 'Failed to fetch scholarships' });
    } finally {
      setLoadingScholarships(false);
    }
  };

  const verifyNgo = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
  
      const response = await fetch(`${API_URL}/ngos/${id}/verify`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to verify NGO. Status: ${response.status}`);
      }
  
      const data = await response.json();
      
      // Update the lists
      setPendingNgos(pendingNgos.filter(ngo => ngo.id !== id));
      setNgos([...ngos, data.data]);
      
      // Refresh the pending NGOs list
      fetchPendingNgos(token);
      
      setActionMessage({ type: 'success', message: 'NGO verified successfully' });
      return true;
    } catch (error) {
      console.error('Error verifying NGO:', error);
      setActionMessage({ 
        type: 'error', 
        message: error.message || 'Failed to verify NGO' 
      });
      return false;
    }
  };

  const updateNgo = async (id, formData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`${API_URL}/ngos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to update NGO. Status: ${response.status}`);
      }

      const data = await response.json();
      setNgos(ngos.map(ngo => ngo.id === id ? data.data : ngo));
      setActionMessage({ type: 'success', message: 'NGO updated successfully' });
      return true;
    } catch (error) {
      console.error('Error updating NGO:', error);
      setActionMessage({ type: 'error', message: error.message || 'Failed to update NGO' });
      return false;
    }
  };

  const deleteNgo = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`${API_URL}/ngos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to delete NGO. Status: ${response.status}`);
      }

      setNgos(ngos.filter(ngo => ngo.id !== id));
      setActionMessage({ type: 'success', message: 'NGO deleted successfully' });
      return true;
    } catch (error) {
      console.error('Error deleting NGO:', error);
      setActionMessage({ type: 'error', message: error.message || 'Failed to delete NGO' });
      return false;
    }
  };

  const promoteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/users/${userId}/promote`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to promote user');
      }

      // Update the user in the list
      setUsers(users.map(user => user.id === userId ? data.data : user));
      
      setActionMessage({ type: 'success', message: 'User promoted to admin successfully' });
    } catch (error) {
      console.error('Error promoting user:', error);
      setActionMessage({ type: 'error', message: 'Failed to promote user' });
    }
  };

  const updateUser = async (userId, formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update user');
      }

      // Update the user in the list
      setUsers(users.map(user => user.id === userId ? data.data : user));
      
      setActionMessage({ type: 'success', message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      setActionMessage({ type: 'error', message: 'Failed to update user' });
    }
  };

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete user');
      }

      setUsers(users.filter(user => user.id !== userId));
      setActionMessage({ type: 'success', message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      setActionMessage({ type: 'error', message: 'Failed to delete user' });
    }
  };

  const createBanner = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/banners`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create banner');
      }

      setBanners([...banners, data.data]);
      setActionMessage({ type: 'success', message: 'Banner created successfully' });
    } catch (error) {
      console.error('Error creating banner:', error);
      setActionMessage({ type: 'error', message: error.message || 'Failed to create banner' });
    }
  };

  const updateBanner = async (id, formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/banners/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update banner');
      }

      setBanners(banners.map(banner => banner.id === id ? data.data : banner));
      setActionMessage({ type: 'success', message: 'Banner updated successfully' });
    } catch (error) {
      console.error('Error updating banner:', error);
      setActionMessage({ type: 'error', message: error.message || 'Failed to update banner' });
    }
  };

  const deleteBanner = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/banners/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete banner');
      }

      setBanners(banners.filter(banner => banner.id !== id));
      setActionMessage({ type: 'success', message: 'Banner deleted successfully' });
    } catch (error) {
      console.error('Error deleting banner:', error);
      setActionMessage({ type: 'error', message: error.message || 'Failed to delete banner' });
    }
  };

  const deleteScholarship = async (id) => {
    try {
      if (!id) {
        throw new Error("Scholarship ID is required for deletion");
      }
      
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return false;
      }
  
      console.log(`Attempting to delete scholarship with ID: ${id}`);
      
      // Debug the actual URL being called
      const deleteUrl = `${API_URL}/scholarships/${id}`;
      console.log("Delete URL:", deleteUrl);
      
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      // Log the full response for debugging
      console.log("Delete response status:", response.status);
      console.log("Delete response status text:", response.statusText);
      
      // Try to parse the response, but handle cases where it might not be JSON
      let errorData = {};
      let responseText = "";
      
      try {
        // First try to get the raw text
        responseText = await response.text();
        console.log("Raw response text:", responseText);
        
        // Then try to parse as JSON if possible
        if (responseText) {
          try {
            errorData = JSON.parse(responseText);
          } catch (parseError) {
            console.log("Response is not JSON:", parseError);
          }
        }
      } catch (textError) {
        console.error("Could not get response text:", textError);
      }
  
      if (!response.ok) {
        console.error("Delete scholarship API response error:", errorData);
        throw new Error(
          errorData.message || 
          `Failed to delete scholarship. Status: ${response.status} ${response.statusText}`
        );
      }
  
      // If we get here, the deletion was successful
      setScholarships(scholarships.filter(scholarship => scholarship.id !== id));
      setActionMessage({ type: 'success', message: 'Scholarship deleted successfully' });
      return true;
    } catch (error) {
      console.error('Error deleting scholarship:', error);
      setActionMessage({ 
        type: 'error', 
        message: `Failed to delete scholarship: ${error.message || 'Unknown error'}`
      });
      return false;
    }
  };

  const createScholarship = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/scholarships`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create scholarship');
      }

      setScholarships([...scholarships, data.data]);
      setActionMessage({ type: 'success', message: 'Scholarship created successfully' });
      return true;
    } catch (error) {
      console.error('Error creating scholarship:', error);
      setActionMessage({ type: 'error', message: error.message || 'Failed to create scholarship' });
      return false;
    }
  };

  const updateScholarship = async (id, formData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`${API_URL}/scholarships/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to update scholarship. Status: ${response.status}`);
      }

      const data = await response.json();
      setScholarships(scholarships.map(scholarship => scholarship.id === id ? data.data : scholarship));
      setActionMessage({ type: 'success', message: 'Scholarship updated successfully' });
      return true;
    } catch (error) {
      console.error('Error updating scholarship:', error);
      setActionMessage({ type: 'error', message: error.message || 'Failed to update scholarship' });
      return false;
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
        <NotificationAlert type={actionMessage.type} message={actionMessage.message} />
        
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-[#039994] mb-4">Admin Dashboard</h1>
          <p className="text-gray-600 mb-6">
            Welcome back, {user?.name}. You have administrator privileges.
          </p>
          
          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button 
              className={`py-2 px-4 font-medium ${activeTab === 'users' ? 'text-[#039994] border-b-2 border-[#039994]' : 'text-gray-500 hover:text-[#039994]'}`}
              onClick={() => setActiveTab('users')}
            >
              System Users
            </button>
            <button 
              className={`py-2 px-4 font-medium ${activeTab === 'ngos' ? 'text-[#039994] border-b-2 border-[#039994]' : 'text-gray-500 hover:text-[#039994]'}`}
              onClick={() => setActiveTab('ngos')}
            >
              Partner NGOs
            </button>
            <button 
              className={`py-2 px-4 font-medium ${activeTab === 'banners' ? 'text-[#039994] border-b-2 border-[#039994]' : 'text-gray-500 hover:text-[#039994]'}`}
              onClick={() => setActiveTab('banners')}
            >
              Banners
            </button>
            <button 
              className={`py-2 px-4 font-medium ${activeTab === 'scholarships' ? 'text-[#039994] border-b-2 border-[#039994]' : 'text-gray-500 hover:text-[#039994]'}`}
              onClick={() => setActiveTab('scholarships')}
            >
              Scholarships
            </button>
          </div>
          
          {/* Users Tab */}
          {activeTab === 'users' && (
            <UserManagement
              users={users}
              loading={loadingUsers}
              onPromoteUser={promoteUser}
              onUpdateUser={updateUser}
              onDeleteUser={deleteUser}
            />
          )}
          
          {/* NGOs Tab */}
          {activeTab === 'ngos' && (
            <NgoManagement
              ngos={ngos}
              pendingNgos={pendingNgos}
              loading={loadingNgos}
              loadingPending={loadingPendingNgos}
              onVerifyNgo={verifyNgo}
              onUpdateNgo={updateNgo}
              onDeleteNgo={deleteNgo}
            />
          )}
          
          {/* Banners Tab */}
          {activeTab === 'banners' && (
            <BannersManagement
              banners={banners}
              loading={loadingBanners}
              onCreateBanner={createBanner}
              onUpdateBanner={updateBanner}
              onDeleteBanner={deleteBanner}
            />
          )}

          {/* Scholarships Tab */}
          {activeTab === 'scholarships' && (
            <ScholarshipsManagement
              scholarships={scholarships}
              loading={loadingScholarships}
              onCreateScholarship={createScholarship}
              onUpdateScholarship={updateScholarship}
              onDeleteScholarship={deleteScholarship}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}