import { useState } from 'react';
import NgoModal from './NgoModal';

const NgoManagement = ({ 
  ngos, 
  pendingNgos,
  loading, 
  loadingPending,
  onVerifyNgo,
  onUpdateNgo,
  onDeleteNgo
}) => {
  const [activeTab, setActiveTab] = useState('verified');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const openModal = (type, ngo) => {
    setModalType(type);
    setSelectedNgo(ngo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('');
    setSelectedNgo(null);
  };

  const handleVerify = async (id) => {
    setIsVerifying(true);
    try {
      const success = await onVerifyNgo(id);
      if (success) {
        closeModal();
      }
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleUpdate = async (id, formData) => {
    const success = await onUpdateNgo(id, formData);
    if (success) {
      closeModal();
    }
  };

  const handleDelete = async (id) => {
    const success = await onDeleteNgo(id);
    if (success) {
      closeModal();
    }
  };

  const getAuthToken = () => {
    const possibleKeys = ['authToken', 'token', 'accessToken', 'jwt', 'bearerToken'];
    
    for (const key of possibleKeys) {
      const token = localStorage.getItem(key);
      if (token) {
        return token;
      }
    }
    
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.token || user.authToken || user.accessToken) {
          return user.token || user.authToken || user.accessToken;
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
    
    return null;
  };

  const handleCreateNgo = async (formData) => {
    setIsCreating(true);
    try {
      const authToken = getAuthToken();
      
      if (!authToken) {
        const errorMessage = 'Authentication required. Please log in again.';
        if (typeof toast !== 'undefined') {
          toast.error(errorMessage);
        } else {
          alert(errorMessage);
        }
        setIsCreating(false);
        return false;
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      };
      
      const response = await fetch('https://big-relief-backend.vercel.app/api/v1/ngos', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const newNgo = await response.json();
        const successMessage = 'NGO created successfully!';
        if (typeof toast !== 'undefined') {
          toast.success(successMessage);
        } else {
          alert(successMessage);
        }
        closeModal();
        return true;
      } else {
        const errorData = await response.json();
        let errorMessage = 'Failed to create NGO';
        
        if (response.status === 401) {
          errorMessage = 'Authentication failed. Please log in again.';
        } else if (response.status === 403) {
          errorMessage = 'You do not have permission to create NGOs.';
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
        
        if (typeof toast !== 'undefined') {
          toast.error(errorMessage);
        } else {
          alert(errorMessage);
        }
        return false;
      }
    } catch (error) {
      console.error('Create NGO error:', error);
      let errorMessage = 'Failed to create NGO. Please try again.';
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      }
      
      if (typeof toast !== 'undefined') {
        toast.error(errorMessage);
      } else {
        alert(errorMessage);
      }
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  const currentNgos = activeTab === 'verified' ? ngos : pendingNgos;

  const renderTabContent = () => {
    if (activeTab === 'create') {
      return (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Create New NGO</h3>
          <CreateNgoForm onSubmit={handleCreateNgo} isCreating={isCreating} />
        </div>
      );
    }

    return (
      <>
        {(loading && activeTab === 'verified') || (loadingPending && activeTab === 'pending') ? (
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
                  {activeTab === 'verified' && (
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Verification Status
                    </th>
                  )}
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentNgos.length > 0 ? (
                  currentNgos.map((ngo) => (
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
                      {activeTab === 'verified' && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ngo.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {ngo.isVerified ? 'Verified' : 'Not Verified'}
                          </span>
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button 
                          onClick={() => openModal('viewNgo', ngo)} 
                          className="text-[#039994] hover:text-[#02736f] px-3 py-1 rounded"
                        >
                          View
                        </button>
                        {activeTab === 'pending' ? (
                          <>
                            <button 
                              onClick={() => handleVerify(ngo.id)}
                              disabled={isVerifying}
                              className="text-green-500 hover:text-green-600 px-3 py-1 rounded disabled:opacity-50"
                            >
                              {isVerifying ? 'Verifying...' : 'Verify'}
                            </button>
                            <button 
                              onClick={() => openModal('deleteNgo', ngo)} 
                              className="text-red-500 hover:text-red-600 px-3 py-1 rounded"
                            >
                              Delete
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => openModal('editNgo', ngo)} 
                              className="text-blue-500 hover:text-blue-600 px-3 py-1 rounded"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => openModal('deleteNgo', ngo)} 
                              className="text-red-500 hover:text-red-600 px-3 py-1 rounded"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={activeTab === 'verified' ? 5 : 4} className="px-6 py-4 text-center text-gray-500">
                      No {activeTab === 'verified' ? 'verified' : 'pending'} NGOs found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#039994]">Partner NGOs</h2>
        <div className="flex border-b border-gray-200">
          <button 
            className={`py-2 px-4 font-medium ${activeTab === 'verified' ? 'text-[#039994] border-b-2 border-[#039994]' : 'text-gray-500 hover:text-[#039994]'}`}
            onClick={() => setActiveTab('verified')}
          >
            Verified NGOs
          </button>
          <button 
            className={`py-2 px-4 font-medium ${activeTab === 'pending' ? 'text-[#039994] border-b-2 border-[#039994]' : 'text-gray-500 hover:text-[#039994]'}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending Verification
          </button>
          <button 
            className={`py-2 px-4 font-medium ${activeTab === 'create' ? 'text-[#039994] border-b-2 border-[#039994]' : 'text-gray-500 hover:text-[#039994]'}`}
            onClick={() => setActiveTab('create')}
          >
            Create NGO
          </button>
        </div>
      </div>
      
      {renderTabContent()}

      <NgoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        type={modalType}
        ngo={selectedNgo}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

// Create NGO Form Component
const CreateNgoForm = ({ onSubmit, isCreating }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    accountNumber: '',
    bankName: '',
    accountName: '',
    website: '',
    contactEmail: '',
    imageUrl: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }
    
    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }
    
    if (!formData.accountName.trim()) {
      newErrors.accountName = 'Account name is required';
    }
    
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    }
    
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Please enter a valid URL starting with http:// or https://';
    }
    
    if (formData.imageUrl && !/^https?:\/\/.+/.test(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL starting with http:// or https://';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const success = await onSubmit(formData);
    if (success) {
      setFormData({
        name: '',
        description: '',
        accountNumber: '',
        bankName: '',
        accountName: '',
        website: '',
        contactEmail: '',
        imageUrl: ''
      });
      setErrors({});
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994] ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Email *</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994] ${
              errors.contactEmail ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.contactEmail && <p className="mt-1 text-sm text-red-600">{errors.contactEmail}</p>}
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994] ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          ></textarea>
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Website</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994] ${
              errors.website ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="https://example.org"
          />
          {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994] ${
              errors.imageUrl ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="https://example.org/logo.png"
          />
          {errors.imageUrl && <p className="mt-1 text-sm text-red-600">{errors.imageUrl}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Bank Name *</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994] ${
              errors.bankName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.bankName && <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Account Name *</label>
          <input
            type="text"
            name="accountName"
            value={formData.accountName}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994] ${
              errors.accountName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.accountName && <p className="mt-1 text-sm text-red-600">{errors.accountName}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Account Number *</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994] ${
              errors.accountNumber ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.accountNumber && <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>}
        </div>
      </div>
      
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isCreating}
          className="px-6 py-2 bg-[#039994] text-white rounded hover:bg-[#028885] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isCreating && (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
          )}
          {isCreating ? 'Creating NGO...' : 'Create NGO'}
        </button>
      </div>
    </div>
  );
};

export default NgoManagement;