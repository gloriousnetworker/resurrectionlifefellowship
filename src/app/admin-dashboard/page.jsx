'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/DashboardNavbar';
import Footer from '@/components/Footer';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingNgos, setLoadingNgos] = useState(false);
  const [activeTab, setActiveTab] = useState('users');
  
  // States for modal management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
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
  }, [router]);
  
  // Clear action message after 5 seconds
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch users');
      }

      setUsers(data.data);
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
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch NGOs');
      }

      setNgos(data.data);
    } catch (error) {
      console.error('Error fetching NGOs:', error);
      setActionMessage({ type: 'error', message: 'Failed to fetch NGOs' });
    } finally {
      setLoadingNgos(false);
    }
  };

  const fetchSingleNgo = async (id) => {
    try {
      setIsProcessing(true);
      const response = await fetch(`${API_URL}/ngos/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch NGO details');
      }

      setSelectedNgo(data.data);
      setFormData({
        name: data.data.name,
        description: data.data.description,
        accountNumber: data.data.accountNumber,
        bankName: data.data.bankName,
        accountName: data.data.accountName,
        website: data.data.website,
        contactEmail: data.data.contactEmail,
        imageUrl: data.data.imageUrl,
        isVerified: data.data.isVerified
      });
    } catch (error) {
      console.error('Error fetching NGO details:', error);
      setActionMessage({ type: 'error', message: 'Failed to fetch NGO details' });
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteNgo = async (id) => {
    try {
      setIsProcessing(true);
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

      setNgos(ngos.filter(ngo => ngo.id !== id));
      setActionMessage({ type: 'success', message: 'NGO deleted successfully' });
      closeModal();
    } catch (error) {
      console.error('Error deleting NGO:', error);
      setActionMessage({ type: 'error', message: 'Failed to delete NGO' });
    } finally {
      setIsProcessing(false);
    }
  };

  const updateNgo = async (e) => {
    e.preventDefault();
    try {
      setIsProcessing(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/ngos/${selectedNgo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update NGO');
      }

      // Update the NGO in the list
      const updatedNgos = ngos.map(ngo => 
        ngo.id === selectedNgo.id ? data.data : ngo
      );
      setNgos(updatedNgos);
      
      setActionMessage({ type: 'success', message: 'NGO updated successfully' });
      closeModal();
    } catch (error) {
      console.error('Error updating NGO:', error);
      setActionMessage({ type: 'error', message: 'Failed to update NGO' });
    } finally {
      setIsProcessing(false);
    }
  };

  const promoteUser = async (userId) => {
    try {
      setIsProcessing(true);
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
      const updatedUsers = users.map(user => 
        user.id === userId ? data.data : user
      );
      setUsers(updatedUsers);
      
      setActionMessage({ type: 'success', message: 'User promoted to admin successfully' });
      closeModal();
    } catch (error) {
      console.error('Error promoting user:', error);
      setActionMessage({ type: 'error', message: 'Failed to promote user' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const openModal = (type, item) => {
    setModalType(type);
    
    if (type === 'viewNgo' || type === 'editNgo' || type === 'deleteNgo') {
      setSelectedNgo(item);
      if (type === 'editNgo' || type === 'viewNgo') {
        fetchSingleNgo(item.id);
      }
    } else if (type === 'promoteUser') {
      setSelectedUser(item);
    }
    
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('');
    setSelectedNgo(null);
    setSelectedUser(null);
    setFormData({});
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderModal = () => {
    if (!isModalOpen) return null;

    switch (modalType) {
      case 'viewNgo':
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-[#039994]">NGO Details</h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {isProcessing ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#039994]"></div>
                </div>
              ) : selectedNgo ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{selectedNgo.name}</h3>
                    <p className="text-sm text-gray-500">ID: {selectedNgo.id}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Description</p>
                      <p className="text-gray-900">{selectedNgo.description}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Contact Email</p>
                      <p className="text-gray-900">{selectedNgo.contactEmail || 'N/A'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Website</p>
                      {selectedNgo.website ? (
                        <a href={selectedNgo.website} target="_blank" rel="noopener noreferrer" className="text-[#039994] hover:underline">
                          {selectedNgo.website}
                        </a>
                      ) : (
                        <p className="text-gray-900">N/A</p>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Bank Details</p>
                      <p className="text-gray-900">{selectedNgo.bankName || 'N/A'}</p>
                      <p className="text-gray-900">{selectedNgo.accountName || 'N/A'}</p>
                      <p className="text-gray-900">{selectedNgo.accountNumber || 'N/A'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Verification Status</p>
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${selectedNgo.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {selectedNgo.isVerified ? 'Verified' : 'Not Verified'}
                      </span>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Created At</p>
                      <p className="text-gray-900">{formatDate(selectedNgo.createdAt)}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 mt-6">
                    <button 
                      onClick={() => {
                        closeModal();
                        openModal('editNgo', selectedNgo);
                      }} 
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => {
                        closeModal();
                        openModal('deleteNgo', selectedNgo);
                      }} 
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-500">No NGO details available</p>
              )}
            </div>
          </div>
        );
        
      case 'editNgo':
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-[#039994]">Edit NGO</h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {isProcessing ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#039994]"></div>
                </div>
              ) : (
                <form onSubmit={updateNgo} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                      <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994]"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        name="description"
                        value={formData.description || ''}
                        onChange={handleInputChange}
                        rows="3"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994]"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Website</label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Image URL</label>
                      <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                      <input
                        type="text"
                        name="bankName"
                        value={formData.bankName || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Account Name</label>
                      <input
                        type="text"
                        name="accountName"
                        value={formData.accountName || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Account Number</label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994]"
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="isVerified"
                          checked={formData.isVerified || false}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-[#039994] focus:ring-[#039994] border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                          Verified
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="px-4 py-2 bg-[#039994] text-white rounded hover:bg-[#028885] transition disabled:opacity-50"
                    >
                      {isProcessing ? 'Updating...' : 'Update NGO'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        );
        
      case 'deleteNgo':
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mt-4">Delete NGO</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Are you sure you want to delete <span className="font-medium">{selectedNgo?.name}</span>?
                  This action cannot be undone.
                </p>
              </div>

              <div className="mt-6 flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => deleteNgo(selectedNgo?.id)}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50"
                >
                  {isProcessing ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'promoteUser':
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mt-4">Promote User</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Are you sure you want to promote <span className="font-medium">{selectedUser?.name}</span> to Admin?
                  This will grant them full administrator privileges.
                </p>
              </div>

              <div className="mt-6 flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => promoteUser(selectedUser?.id)}
                  disabled={isProcessing || selectedUser?.role === 'admin'}
                  className={`px-4 py-2 ${selectedUser?.role === 'admin' 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'} text-white rounded transition disabled:opacity-50`}
                >
                  {isProcessing 
                    ? 'Promoting...' 
                    : selectedUser?.role === 'admin' 
                      ? 'Already Admin' 
                      : 'Promote to Admin'}
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
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
        {actionMessage.message && (
          <div className={`mb-6 p-4 rounded-lg ${actionMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {actionMessage.message}
          </div>
        )}
        
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
          </div>
          
          {/* Users Table */}
          {activeTab === 'users' && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#039994] mb-4">System Users</h2>
              
              {loadingUsers ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#039994]"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{formatDate(user.createdAt)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button 
                              onClick={() => openModal('promoteUser', user)} 
                              className={`text-white px-4 py-2 rounded ${user.role === 'admin' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                              disabled={user.role === 'admin'}
                            >
                              {user.role === 'admin' ? 'Already Admin' : 'Promote to Admin'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          
          {/* NGOs Table */}
          {activeTab === 'ngos' && (
            <div>
              <h2 className="text-2xl font-semibold text-[#039994] mb-4">Partner NGOs</h2>
              
              {loadingNgos ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#039994]"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Website
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Verification Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {ngos.map((ngo) => (
                        <tr key={ngo.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{ngo.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{ngo.contactEmail || 'N/A'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {ngo.website ? (
                              <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="text-[#039994] hover:underline">
                                {ngo.website}
                              </a>
                            ) : (
                              <div className="text-sm text-gray-500">N/A</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ngo.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {ngo.isVerified ? 'Verified' : 'Not Verified'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button 
                              onClick={() => openModal('viewNgo', ngo)} 
                              className="text-[#039994] hover:text-[#02736f] px-4 py-2 rounded"
                            >
                              View
                            </button>
                            <button 
                              onClick={() => openModal('editNgo', ngo)} 
                              className="text-blue-500 hover:text-blue-600 px-4 py-2 rounded"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => openModal('deleteNgo', ngo)} 
                              className="text-red-500 hover:text-red-600 px-4 py-2 rounded"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
        {renderModal()}
      </div>
    </div>
  );
}