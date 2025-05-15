// components/admin/NgoModal.jsx
import { useState, useEffect } from 'react';

const NgoModal = ({ 
  isOpen, 
  onClose, 
  type, 
  ngo, 
  onUpdate,
  onDelete
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    accountNumber: '',
    bankName: '',
    accountName: '',
    website: '',
    contactEmail: '',
    imageUrl: '',
    isVerified: false
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (ngo && (type === 'editNgo' || type === 'viewNgo')) {
      setFormData({
        name: ngo.name || '',
        description: ngo.description || '',
        accountNumber: ngo.accountNumber || '',
        bankName: ngo.bankName || '',
        accountName: ngo.accountName || '',
        website: ngo.website || '',
        contactEmail: ngo.contactEmail || '',
        imageUrl: ngo.imageUrl || '',
        isVerified: ngo.isVerified || false
      });
    }
  }, [ngo, type]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      if (type === 'editNgo') {
        await onUpdate(ngo.id, formData);
      } else if (type === 'deleteNgo') {
        await onDelete(ngo.id);
      }
      onClose();
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderContent = () => {
    switch (type) {
      case 'viewNgo':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{ngo.name}</h3>
              <p className="text-sm text-gray-500">ID: {ngo.id}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Description</p>
                <p className="text-gray-900">{ngo.description}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Contact Email</p>
                <p className="text-gray-900">{ngo.contactEmail || 'N/A'}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Website</p>
                {ngo.website ? (
                  <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="text-[#039994] hover:underline">
                    {ngo.website}
                  </a>
                ) : (
                  <p className="text-gray-900">N/A</p>
                )}
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Bank Details</p>
                <p className="text-gray-900">{ngo.bankName || 'N/A'}</p>
                <p className="text-gray-900">{ngo.accountName || 'N/A'}</p>
                <p className="text-gray-900">{ngo.accountNumber || 'N/A'}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Verification Status</p>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ngo.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {ngo.isVerified ? 'Verified' : 'Not Verified'}
                </span>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Created At</p>
                <p className="text-gray-900">{formatDate(ngo.createdAt)}</p>
              </div>
            </div>
          </div>
        );
        
      case 'editNgo':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994]"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994]"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994]"
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994]"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Name</label>
                <input
                  type="text"
                  name="accountName"
                  value={formData.accountName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994]"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#039994] focus:border-[#039994]"
                  required
                />
              </div>
              
              <div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isVerified"
                    checked={formData.isVerified}
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
                onClick={onClose}
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
        );
        
      case 'deleteNgo':
        return (
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mt-4">Delete NGO</h3>
            <p className="text-sm text-gray-500 mt-2">
              Are you sure you want to delete <span className="font-medium">{ngo?.name}</span>?
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
                onClick={handleSubmit}
                disabled={isProcessing}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50"
              >
                {isProcessing ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
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
            {type === 'viewNgo' && 'NGO Details'}
            {type === 'editNgo' && 'Edit NGO'}
            {type === 'deleteNgo' && 'Delete NGO'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {isProcessing && type !== 'deleteNgo' ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#039994]"></div>
          </div>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
};

export default NgoModal;