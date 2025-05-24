'use client';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';

const ScholarshipModal = ({ 
  isOpen, 
  onClose, 
  type, 
  scholarship,
  onDelete,
  onCreate,
  isProcessing
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ngoId: '',
    amount: '',
    deadline: '',
    eligibility: '',
    applicationUrl: '',
    imageUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [ngos, setNgos] = useState([]);
  const [loadingNgos, setLoadingNgos] = useState(false);

  // Fetch NGOs when modal opens for creating scholarship
  useEffect(() => {
    if (isOpen && type === 'createScholarship') {
      fetchNgos();
    }
  }, [isOpen, type]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen && type === 'createScholarship') {
      setFormData({
        title: '',
        description: '',
        ngoId: '',
        amount: '',
        deadline: '',
        eligibility: '',
        applicationUrl: '',
        imageUrl: ''
      });
      setErrors({});
    }
  }, [isOpen, type]);

  // Set default NGO when NGOs are loaded
  useEffect(() => {
    if (ngos.length > 0 && !formData.ngoId && isOpen && type === 'createScholarship') {
      setFormData(prev => ({
        ...prev,
        ngoId: ngos[0].id
      }));
    }
  }, [ngos, formData.ngoId, isOpen, type]);

  // Fetch NGOs function
  const fetchNgos = async () => {
    setLoadingNgos(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch('https://big-relief-backend.vercel.app/api/v1/ngos', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch NGOs');
      }

      if (data.success && data.data) {
        setNgos(data.data);
      } else {
        setNgos([]);
      }
    } catch (error) {
      console.error('Error fetching NGOs:', error);
      toast.error('Failed to load NGOs');
      setNgos([]);
    } finally {
      setLoadingNgos(false);
    }
  };

  // Memoize the validation function
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.ngoId) newErrors.ngoId = 'NGO selection is required';
    if (!formData.amount) newErrors.amount = 'Amount is required';
    if (!formData.deadline) newErrors.deadline = 'Deadline is required';
    if (!formData.eligibility.trim()) newErrors.eligibility = 'Eligibility criteria is required';
    if (!formData.applicationUrl.trim()) newErrors.applicationUrl = 'Application URL is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Memoize the formatDate function
  const formatDate = useCallback((dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }, []);

  // Early return if modal is not open
  if (!isOpen) return null;

  const handleDelete = async () => {
    if (!scholarship || !scholarship.id) {
      console.error("No scholarship ID available for deletion");
      return;
    }
    
    try {
      const success = await onDelete(scholarship.id);
      if (success) {
        onClose();
      }
    } catch (error) {
      console.error("Error in ScholarshipModal.handleDelete:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        ngoId: formData.ngoId,
        amount: formData.amount.trim(),
        deadline: formData.deadline, // Send as YYYY-MM-DD format
        eligibility: formData.eligibility.trim(),
        applicationUrl: formData.applicationUrl.trim(),
        imageUrl: formData.imageUrl.trim() || undefined
      };
      
      const response = await fetch('https://big-relief-backend.vercel.app/api/v1/scholarships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create scholarship');
      }

      toast.success('Scholarship created successfully!');
      
      // Call the onCreate callback if provided
      if (onCreate) {
        onCreate(data.data); // Pass the created scholarship data
      }
      
      onClose();
    } catch (error) {
      console.error("Error in ScholarshipModal.handleCreateSubmit:", error);
      toast.error(error.message || 'Failed to create scholarship');
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'viewScholarship':
        return (
          <div className="space-y-4">
            <div className="flex items-start">
              {scholarship?.imageUrl && (
                <img 
                  src={scholarship.imageUrl} 
                  alt={scholarship.title}
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                />
              )}
              <div>
                <h3 className="text-xl font-bold text-[#039994]">{scholarship?.title}</h3>
                <p className="text-gray-600">Amount: {scholarship?.amount}</p>
                <p className="text-gray-600">Deadline: {scholarship?.deadline ? formatDate(scholarship.deadline) : 'N/A'}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Description</p>
                <p className="text-gray-900">{scholarship?.description}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Eligibility</p>
                <p className="text-gray-900">{scholarship?.eligibility}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Application URL</p>
                {scholarship?.applicationUrl ? (
                  <a 
                    href={scholarship.applicationUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#039994] hover:underline"
                  >
                    {scholarship.applicationUrl}
                  </a>
                ) : (
                  <p className="text-gray-900">N/A</p>
                )}
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Created At</p>
                <p className="text-gray-900">{scholarship?.createdAt ? formatDate(scholarship.createdAt) : 'N/A'}</p>
              </div>
            </div>
          </div>
        );
        
      case 'deleteScholarship':
        return (
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mt-4">Delete Scholarship</h3>
            <p className="text-sm text-gray-500 mt-2">
              Are you sure you want to delete <span className="font-medium">{scholarship?.title}</span>?
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-center space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isProcessing}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50"
              >
                {isProcessing ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        );
      
      case 'createScholarship':
        return (
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#039994] focus:border-[#039994]`}
                  placeholder="Enter scholarship title"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              <div>
                <label htmlFor="ngoId" className="block text-sm font-medium text-gray-700">
                  NGO*
                </label>
                <div className="relative">
                  <select
                    id="ngoId"
                    name="ngoId"
                    value={formData.ngoId}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full border ${errors.ngoId ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#039994] focus:border-[#039994] ${loadingNgos ? 'bg-gray-100' : ''}`}
                    disabled={loadingNgos || ngos.length === 0}
                  >
                    {loadingNgos ? (
                      <option value="">Loading NGOs...</option>
                    ) : ngos.length === 0 ? (
                      <option value="">No NGOs available</option>
                    ) : (
                      <>
                        <option value="">Select NGO</option>
                        {ngos.map(ngo => (
                          <option key={ngo.id} value={ngo.id}>
                            {ngo.name}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                  {loadingNgos && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="animate-spin h-4 w-4 text-[#039994]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  )}
                </div>
                {errors.ngoId && <p className="mt-1 text-sm text-red-600">{errors.ngoId}</p>}
                {!loadingNgos && ngos.length === 0 && (
                  <p className="mt-1 text-sm text-yellow-600">
                    You need to create an NGO first before creating a scholarship.{' '}
                    <button
                      type="button"
                      onClick={fetchNgos}
                      className="text-[#039994] hover:underline font-medium"
                    >
                      Retry loading NGOs
                    </button>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount*
                </label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#039994] focus:border-[#039994]`}
                  placeholder="e.g., $5,000"
                />
                {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
              </div>

              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                  Deadline*
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`mt-1 block w-full border ${errors.deadline ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#039994] focus:border-[#039994]`}
                />
                {errors.deadline && <p className="mt-1 text-sm text-red-600">{errors.deadline}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#039994] focus:border-[#039994]"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#039994] focus:border-[#039994]`}
                  placeholder="Describe the scholarship program..."
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="eligibility" className="block text-sm font-medium text-gray-700">
                  Eligibility Criteria*
                </label>
                <textarea
                  id="eligibility"
                  name="eligibility"
                  rows={3}
                  value={formData.eligibility}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border ${errors.eligibility ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#039994] focus:border-[#039994]`}
                  placeholder="Who is eligible to apply for this scholarship..."
                />
                {errors.eligibility && <p className="mt-1 text-sm text-red-600">{errors.eligibility}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="applicationUrl" className="block text-sm font-medium text-gray-700">
                  Application URL*
                </label>
                <input
                  type="url"
                  id="applicationUrl"
                  name="applicationUrl"
                  value={formData.applicationUrl}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border ${errors.applicationUrl ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#039994] focus:border-[#039994]`}
                  placeholder="https://example.com/apply"
                />
                {errors.applicationUrl && <p className="mt-1 text-sm text-red-600">{errors.applicationUrl}</p>}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing || loadingNgos || ngos.length === 0}
                className={`px-4 py-2 bg-[#039994] text-white rounded hover:bg-[#02736f] transition ${(isProcessing || loadingNgos || ngos.length === 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isProcessing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </span>
                ) : 'Create Scholarship'}
              </button>
            </div>
          </form>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#039994]">
            {type === 'viewScholarship' && 'Scholarship Details'}
            {type === 'deleteScholarship' && 'Delete Scholarship'}
            {type === 'createScholarship' && 'Create New Scholarship'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            disabled={isProcessing}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default ScholarshipModal;