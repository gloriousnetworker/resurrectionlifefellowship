'use client';
import { useState } from 'react';

const ScholarshipModal = ({ 
  isOpen, 
  onClose, 
  type, 
  scholarship,
  onDelete
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = async () => {
    if (!scholarship || !scholarship.id) {
      console.error("No scholarship ID available for deletion");
      return;
    }
    
    console.log("ScholarshipModal - Attempting to delete scholarship:", scholarship.id);
    
    setIsProcessing(true);
    try {
      const success = await onDelete(scholarship.id);
      console.log("ScholarshipModal - Delete result:", success);
      
      if (success) {
        onClose();
      } else {
        console.error("Delete operation returned false");
      }
    } catch (error) {
      console.error("Error in ScholarshipModal.handleDelete:", error);
    } finally {
      setIsProcessing(false);
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
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {isProcessing && type !== 'deleteScholarship' ? (
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

export default ScholarshipModal;